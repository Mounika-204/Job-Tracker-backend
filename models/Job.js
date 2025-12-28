import mongoose from "mongoose";

const statusHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // ✅ AUTO DATE FIX
  },
});

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Applied",
    },
    statusHistory: [statusHistorySchema],
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
