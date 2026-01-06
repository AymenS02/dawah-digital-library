import { NextResponse } from 'next/server';
import AccessRequest from '@/lib/models/accessRequestSchema';
import User from '@/lib/models/userSchema';
import { requireAdmin } from '@/lib/auth';
import connectDB from '@/lib/config/db';

export async function POST(request) {
  try {
    await connectDB();
    
    // Verify user is admin
    const authResult = await requireAdmin(request);
    if (authResult.error) {
      return NextResponse.json(
        { message: authResult.error },
        { status: authResult.status }
      );
    }

    const { user: admin } = authResult;
    const { requestId, action, adminNotes } = await request.json();

    // Validate input
    if (!requestId || !action) {
      return NextResponse.json(
        { message: 'Request ID and action are required' },
        { status: 400 }
      );
    }

    if (!['approved', 'denied'].includes(action)) {
      return NextResponse.json(
        { message: 'Action must be either "approved" or "denied"' },
        { status: 400 }
      );
    }

    // Find the access request
    const accessRequest = await AccessRequest.findById(requestId);
    
    if (!accessRequest) {
      return NextResponse.json(
        { message: 'Access request not found' },
        { status: 404 }
      );
    }

    if (accessRequest.status !== 'pending') {
      return NextResponse.json(
        { message: 'This request has already been reviewed' },
        { status: 400 }
      );
    }

    // Update the access request
    accessRequest.status = action;
    accessRequest.reviewedBy = admin._id;
    accessRequest.reviewedAt = new Date();
    if (adminNotes) {
      accessRequest.adminNotes = adminNotes.trim();
    }
    await accessRequest.save();

    // If approved, grant access to the user
    if (action === 'approved') {
      await User.findByIdAndUpdate(accessRequest.user, {
        hasStudentKnowledgeAccess: true
      });
    }

    return NextResponse.json({
      message: `Access request ${action} successfully`,
      request: accessRequest
    });

  } catch (error) {
    console.error('Failed to respond to access request:', error);
    return NextResponse.json(
      { message: 'Failed to respond to access request' },
      { status: 500 }
    );
  }
}
