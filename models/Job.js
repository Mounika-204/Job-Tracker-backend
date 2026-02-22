import mongoose from "mongoose";

const statusHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
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
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },
    statusHistory: [statusHistorySchema],
  },
  { timestamps: true }
);

// auto add history on creation
jobSchema.pre("save", function (next) {
  if (this.isNew) {
    this.statusHistory.push({ status: this.status });
  }
  next();
});

export default mongoose.model("Job", jobSchema);