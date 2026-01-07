import mongoose from "mongoose";

const resumeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skills: [String],
  projects: [String],
  experience: String,
  roleType: String, // frontend / backend / fullstack
});

export default mongoose.model("Resume", resumeSchema);
