import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import QuizResponse from "@/lib/models/quizResponseSchema";
import User from "@/lib/models/userSchema";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    await connectDB();

    // Verify admin authentication
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let decoded;
    
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    // Check if user is admin
    const user = await User.findById(decoded.userId);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    // Fetch anonymous quiz responses
    const anonymousResponses = await QuizResponse.find({ 
      isAnonymous: true 
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      { 
        responses: anonymousResponses,
        count: anonymousResponses.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching anonymous quiz responses:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
