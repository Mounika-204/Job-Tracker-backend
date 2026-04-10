import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },

    // ✅ FIXED STATUS ENUM
    status: {
      type: String,
      enum: [
        "Applied",
        "Screening",
        "Technical",
        "HR",
        "Offer",
        "Rejected",
      ],
      default: "Applied",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ✅ ADD THIS (VERY IMPORTANT)
    statusHistory: {
      type: [
        {
          status: String,
          date: Date,
        },
      ],
      default: [], // 🔥 THIS FIXES 500 ERROR
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;