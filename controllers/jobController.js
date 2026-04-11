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

/* ===============================
   GET JOBS
================================ */
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(jobs);
  } catch (error) {
    console.error("GET JOBS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

/* ===============================
   UPDATE JOB
================================ */
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job)
      return res.status(404).json({ message: "Job not found" });

    if (job.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    job.company = req.body.company || job.company;
    job.role = req.body.role || job.role;

    await job.save();
    res.json(job);
  } catch (error) {
    console.error("UPDATE JOB ERROR:", error);
    res.status(500).json({ message: "Failed to update job" });
  }
};

/* ===============================
   UPDATE JOB STATUS
================================ */
export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Applied",
      "Screening",
      "Technical",
      "HR",
      "Offer",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const job = await Job.findById(req.params.id);

    if (!job)
      return res.status(404).json({ message: "Job not found" });

    if (job.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    job.status = status;

    // ✅ FIX: ensure array exists
    if (!job.statusHistory) {
       job.statusHistory = [];
    }

    job.statusHistory.push({
      status,
      date: new Date(),
   });

    await job.save();

    res.json(job);
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.status(500).json({ message: "Failed to update job status" });
  }
};

/* ===============================
   DELETE JOB
================================ */
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job)
      return res.status(404).json({ message: "Job not found" });

    if (job.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    await job.deleteOne();

    res.json({ message: "Job removed successfully" });
  } catch (error) {
    console.error("DELETE JOB ERROR:", error);
    res.status(500).json({ message: "Failed to delete job" });
  }
};