import Job from "../models/Job.js";

/* ===============================
   CREATE JOB
================================ */
export const createJob = async (req, res) => {
  try {
    const { company, role, status } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    if (!company || !role) {
      return res.status(400).json({
        message: "Company and role are required",
      });
    }

    // ✅ ALLOWED STATUSES (IMPORTANT)
    const allowedStatuses = [
      "Applied",
      "Screening",
      "Technical",
      "HR",
      "Offer",
      "Rejected",
    ];

    const finalStatus = allowedStatuses.includes(status)
      ? status
      : "Applied";

    const job = await Job.create({
      company,
      role,
      status: finalStatus,
      user: req.user._id,

      // ✅ STATUS HISTORY SAFE
      statusHistory: [
        {
          status: finalStatus,
          date: new Date(),
        },
      ],
    });

    res.status(201).json(job);

  } catch (error) {
    console.error("CREATE JOB ERROR:", error);
    res.status(500).json({
      message: error.message || "Failed to create job",
    });
  }
};