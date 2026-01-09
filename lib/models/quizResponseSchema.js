import mongoose from "mongoose";

const quizResponseSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    default: null // null for anonymous responses
  },
  answers: {
    q1: { type: String, required: true },
    q2: { type: String, required: true },
    q3: { type: String, required: true },
    q4: { type: String, required: true },
    q5: { type: String, required: true },
    q6: { type: [String], required: true },
    q7: { type: String, required: true },
    q8: { type: String, required: true },
    q9: { type: String, required: true },
    q10: { type: String, default: '' }
  },
  score: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['muslim', 'revert', 'non-muslim']
  },
  isAnonymous: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.models.QuizResponse || mongoose.model("QuizResponse", quizResponseSchema);
