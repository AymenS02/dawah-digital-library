import { NextResponse } from 'next/server';
import Subscription from '@/lib/models/subscriptionSchema';
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
    const status = searchParams.get('status');

    // Build query
    const query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    // Fetch subscriptions with user details
    const subscriptions = await Subscription.find(query)
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      subscriptions
    });

  } catch (error) {
    console.error('Failed to fetch subscriptions:', error);
    return NextResponse.json(
      { message: 'Failed to fetch subscriptions' },
      { status: 500 }
    );
  }
}
