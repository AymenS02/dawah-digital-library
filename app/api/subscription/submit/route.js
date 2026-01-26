import { NextResponse } from 'next/server';
import Subscription from '@/lib/models/subscriptionSchema';
import User from '@/lib/models/userSchema';
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

    const { amount, notes } = await request.json();

    // Validate amount
    if (!amount || amount < 1) {
      return NextResponse.json(
        { message: 'Please provide a valid subscription amount (minimum $1)' },
        { status: 400 }
      );
    }

    // Check for existing pending or active subscription
    const existingSubscription = await Subscription.findOne({
      user: authResult.user._id,
      status: { $in: ['pending', 'active'] }
    });

    if (existingSubscription) {
      return NextResponse.json(
        { message: 'You already have an active or pending subscription' },
        { status: 400 }
      );
    }

    // Create new subscription
    const subscription = new Subscription({
      user: authResult.user._id,
      amount,
      status: 'pending',
      notes: notes || ''
    });

    await subscription.save();

    return NextResponse.json({
      message: 'Subscription request submitted successfully. An admin will review it shortly.',
      subscription: {
        _id: subscription._id,
        amount: subscription.amount,
        status: subscription.status,
        createdAt: subscription.createdAt
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Failed to submit subscription:', error);
    return NextResponse.json(
      { message: 'Failed to submit subscription request' },
      { status: 500 }
    );
  }
}
