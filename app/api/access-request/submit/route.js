import { NextResponse } from 'next/server';
import AccessRequest from '@/lib/models/accessRequestSchema';
import { requireAuth } from '@/lib/auth';
import connectDB from '@/lib/config/db';

export async function POST(request) {
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
    const { subject, reason } = await request.json();

    // Validate input
    if (!subject || !reason) {
      return NextResponse.json(
        { message: 'Subject and reason are required' },
        { status: 400 }
      );
    }

    if (subject.length > 200) {
      return NextResponse.json(
        { message: 'Subject must be 200 characters or less' },
        { status: 400 }
      );
    }

    if (reason.length > 1000) {
      return NextResponse.json(
        { message: 'Reason must be 1000 characters or less' },
        { status: 400 }
      );
    }

    // Check if user already has access
    if (user.hasStudentKnowledgeAccess) {
      return NextResponse.json(
        { message: 'You already have access to Students of Knowledge resources' },
        { status: 400 }
      );
    }

    // Check if user already has a pending request
    const existingRequest = await AccessRequest.findOne({
      user: user._id,
      status: 'pending'
    });

    if (existingRequest) {
      return NextResponse.json(
        { message: 'You already have a pending access request' },
        { status: 400 }
      );
    }

    // Create new access request
    const accessRequest = new AccessRequest({
      user: user._id,
      subject: subject.trim(),
      reason: reason.trim(),
      status: 'pending'
    });

    await accessRequest.save();

    return NextResponse.json({
      message: 'Access request submitted successfully',
      requestId: accessRequest._id
    }, { status: 201 });

  } catch (error) {
    console.error('Access request submission error:', error);
    return NextResponse.json(
      { message: 'Failed to submit access request' },
      { status: 500 }
    );
  }
}
