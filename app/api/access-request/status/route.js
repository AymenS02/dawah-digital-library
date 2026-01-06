import { NextResponse } from 'next/server';
import AccessRequest from '@/lib/models/accessRequestSchema';
import { requireAuth } from '@/lib/auth';
import connectDB from '@/lib/config/db';

export async function GET(request) {
  try {
    await connectDB();
    
    // Verify user is authenticated
    const authResult = await requireAuth(request);
    if (authResult.error) {
      return NextResponse.json(
        { message: authResult.error },
        { status: authResult.status }
      );
    }

    const { user } = authResult;

    // Check if user has access
    const hasAccess = user.hasStudentKnowledgeAccess;

    // Find any pending request
    const pendingRequest = await AccessRequest.findOne({
      user: user._id,
      status: 'pending'
    });

    // Find most recent request (any status)
    const latestRequest = await AccessRequest.findOne({
      user: user._id
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      hasAccess,
      hasPendingRequest: !!pendingRequest,
      latestRequest: latestRequest ? {
        id: latestRequest._id,
        status: latestRequest.status,
        subject: latestRequest.subject,
        createdAt: latestRequest.createdAt,
        reviewedAt: latestRequest.reviewedAt
      } : null
    });

  } catch (error) {
    console.error('Failed to check access status:', error);
    return NextResponse.json(
      { message: 'Failed to check access status' },
      { status: 500 }
    );
  }
}
