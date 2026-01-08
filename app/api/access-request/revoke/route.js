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

    if (!['suspended', 'denied'].includes(action)) {
      return NextResponse.json(
        { message: 'Action must be either "suspended" or "denied"' },
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

    if (accessRequest.status !== 'approved') {
      return NextResponse.json(
        { message: 'Only approved requests can be revoked or suspended' },
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

    // Revoke access from the user
    await User.findByIdAndUpdate(accessRequest.user, {
      hasStudentKnowledgeAccess: false
    });

    const actionMessage = action === 'suspended' ? 'suspended' : 'deleted';
    return NextResponse.json({
      message: `Access request ${actionMessage} and user access revoked successfully`,
      request: accessRequest
    });

  } catch (error) {
    console.error('Failed to revoke access request:', error);
    return NextResponse.json(
      { message: 'Failed to revoke access request' },
      { status: 500 }
    );
  }
}
