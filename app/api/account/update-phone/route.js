import { NextResponse } from 'next/server';
import User from '@/lib/models/userSchema';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/config/db';

export async function PUT(request) {
  try {
    await connectDB();
    
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    const { newPhone } = await request.json();

    if (!newPhone) {
      return NextResponse.json(
        { message: 'New phone number is required' },
        { status: 400 }
      );
    }

    // Update phone
    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { phone: newPhone },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Phone number updated successfully',
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        gender: user.gender
      }
    });

  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
