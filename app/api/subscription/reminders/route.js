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

    const now = new Date();
    const reminderThreshold = new Date();
    reminderThreshold.setDate(now.getDate() + 7); // 7 days before expiration

    // Find active subscriptions that are expiring soon or already expired
    const dueSubscriptions = await Subscription.find({
      status: 'active',
      endDate: { $lte: reminderThreshold }
    })
      .populate('user', 'firstName lastName email')
      .sort({ endDate: 1 });

    // Count urgent reminders (already expired or expiring within 3 days)
    const urgentThreshold = new Date();
    urgentThreshold.setDate(now.getDate() + 3);
    
    const urgentCount = dueSubscriptions.filter(sub => 
      sub.endDate <= urgentThreshold
    ).length;

    return NextResponse.json({
      subscriptions: dueSubscriptions,
      urgentCount,
      totalCount: dueSubscriptions.length
    });

  } catch (error) {
    console.error('Failed to fetch subscription reminders:', error);
    return NextResponse.json(
      { message: 'Failed to fetch subscription reminders' },
      { status: 500 }
    );
  }
}

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

    const { subscriptionId } = await request.json();

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

    subscription.reminderSent = true;
    await subscription.save();

    return NextResponse.json({
      message: 'Reminder marked as sent',
      subscription
    });

  } catch (error) {
    console.error('Failed to mark reminder as sent:', error);
    return NextResponse.json(
      { message: 'Failed to mark reminder as sent' },
      { status: 500 }
    );
  }
}
