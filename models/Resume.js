import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    roleType: {
      type: String,
      enum: ["frontend", "backend", "fullstack"],
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    projects: {
      type: [String],
      default: [],
    },

    experience: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);