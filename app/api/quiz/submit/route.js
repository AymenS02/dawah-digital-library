import { NextResponse } from "next/server";
import connectDB from "@/lib/config/db";
import QuizResponse from "@/lib/models/quizResponseSchema";
import User from "@/lib/models/userSchema";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { answers, score, category, isAnonymous } = body;

    // Validate required fields
    if (!answers || score === undefined || !category) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user is authenticated
    const authHeader = request.headers.get("authorization");
    let userId = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (error) {
        console.log("Invalid token, treating as anonymous");
      }
    }

    // Create quiz response
    const quizResponse = new QuizResponse({
      user: userId,
      answers,
      score,
      category,
      isAnonymous: !userId || isAnonymous
    });

    await quizResponse.save();

    // If user is authenticated, update their user record
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        quizResults: {
          score,
          category,
          completedAt: new Date()
        }
      });
    }

    return NextResponse.json(
      {
        message: "Quiz results saved successfully",
        quizResponseId: quizResponse._id
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving quiz results:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
