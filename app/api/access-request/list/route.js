import { NextResponse } from 'next/server';
import AccessRequest from '@/lib/models/accessRequestSchema';
import { requireAdmin } from '@/lib/auth';
import connectDB from '@/lib/config/db';

export async function GET(request) {
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

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';

    // Fetch access requests with user details
    const accessRequests = await AccessRequest.find({ status })
      .populate('user', 'firstName lastName email')
      .populate('reviewedBy', 'firstName lastName')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      requests: accessRequests
    });

  } catch (error) {
    console.error('Failed to fetch access requests:', error);
    return NextResponse.json(
      { message: 'Failed to fetch access requests' },
      { status: 500 }
    );
  }
}
