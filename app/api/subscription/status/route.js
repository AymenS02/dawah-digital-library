import { NextResponse } from 'next/server';
import Subscription from '@/lib/models/subscriptionSchema';
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

    // Fetch user's subscription
    const subscription = await Subscription.findOne({
      user: authResult.user._id,
      status: { $in: ['pending', 'active'] }
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      subscription
    });

  } catch (error) {
    console.error('Failed to fetch subscription status:', error);
    return NextResponse.json(
      { message: 'Failed to fetch subscription status' },
      { status: 500 }
    );
  }
}
