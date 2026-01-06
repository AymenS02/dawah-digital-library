import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /.+\@.+\..+/ 
  },
  phone: { type: String },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String },
  role: { 
    type: String, 
    required: true, 
    enum: ['USER', 'ADMIN', 'STUDENT'], 
    default: 'USER' 
  },
  hasStudentKnowledgeAccess: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

// Add virtual for enrollments
userSchema.virtual('enrollments', {
  ref: 'Enrollment',
  localField: '_id',
  foreignField: 'user'
});

// Enable virtuals in JSON output
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

export default mongoose.models.User || mongoose.model("User", userSchema);