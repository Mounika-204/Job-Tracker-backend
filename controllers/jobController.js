import Job from "../models/Job.js";

/* ===============================
   CREATE JOB
================================ */
export const createJob = async (req, res) => {
  try {
    const { company, role } = req.body;

    if (!company || !role) {
      return res.status(400).json({
        message: "Company and role are required"
      });
    }

    const job = await Job.create({
      user: req.user._id,
      company,
      role,
      status: "Applied",
      statusHistory: [{ status: "Applied" }]
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET JOBS
================================ */
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id }).sort({
      createdAt: -1
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   UPDATE JOB (company / role)
================================ */
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job)
      return res.status(404).json({ message: "Job not found" });

    if (job.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    job.company = req.body.company ?? job.company;
    job.role = req.body.role ?? job.role;

    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   UPDATE JOB STATUS (FIXED)
================================ */
export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Applied",
      "Interview",
      "Offer",
      "Rejected"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    const job = await Job.findById(req.params.id);

    if (!job)
      return res.status(404).json({ message: "Job not found" });

    if (job.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    job.status = status;
    job.statusHistory.push({ status });

    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.json({ message: "Job removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};