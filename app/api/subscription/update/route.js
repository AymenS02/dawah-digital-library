import { NextResponse } from 'next/server';
import Subscription from '@/lib/models/subscriptionSchema';
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

    const { subscriptionId, status, startDate, endDate, notes } = await request.json();

    if (!subscriptionId) {
      return NextResponse.json(
        { message: 'Subscription ID is required' },
        { status: 400 }
      );
    }

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return NextResponse.json(
        { message: 'Subscription not found' },
        { status: 404 }
      );
    }

    // Update subscription fields
    if (status) subscription.status = status;
    if (startDate) subscription.startDate = new Date(startDate);
    if (endDate) subscription.endDate = new Date(endDate);
    if (notes !== undefined) subscription.notes = notes;

    // If activating subscription, update user's activeSubscription
    if (status === 'active') {
      await User.findByIdAndUpdate(subscription.user, {
        activeSubscription: subscription._id
      });
    } else if (status === 'expired' || status === 'cancelled') {
      // Remove active subscription from user if this was their active subscription
      await User.findOneAndUpdate(
        { _id: subscription.user, activeSubscription: subscriptionId },
        { activeSubscription: null }
      );
    }

    await subscription.save();

    return NextResponse.json({
      message: 'Subscription updated successfully',
      subscription
    });

  } catch (error) {
    console.error('Failed to update subscription:', error);
    return NextResponse.json(
      { message: 'Failed to update subscription' },
      { status: 500 }
    );
  }
}
