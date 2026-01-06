import jwt from 'jsonwebtoken';
import User from '@/lib/models/userSchema';
import connectDB from '@/lib/config/db';

export async function verifyToken(request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return { error: 'No token provided', status: 401 };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    await connectDB();
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return { error: 'User not found', status: 404 };
    }

    return { user };
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return { error: 'Invalid token', status: 401 };
    }
    if (error.name === 'TokenExpiredError') {
      return { error: 'Token expired', status: 401 };
    }
    return { error: 'Authentication failed', status: 500 };
  }
}

export function requireAuth(request) {
  return verifyToken(request);
}

export async function requireAdmin(request) {
  const result = await verifyToken(request);
  
  if (result.error) {
    return result;
  }
  
  if (result.user.role !== 'ADMIN') {
    return { error: 'Admin access required', status: 403 };
  }
  
  return result;
}
