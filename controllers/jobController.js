import Job from "../models/Job.js";

/* ===============================
   CREATE JOB
================================ */
export const createJob = async (req, res) => {
  try {
    const { company, role } = req.body;

    const job = await Job.create({
      user: req.user._id,
      company,
      role,
      status: "Applied",
      statusHistory: [{ status: "Applied" }], // ✅ date auto-added
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
      createdAt: -1,
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

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    job.company = req.body.company || job.company;
    job.role = req.body.role || job.role;

    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   UPDATE JOB STATUS (🔥 MAIN FIX)
================================ */
export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    // ✅ update current status
    job.status = status;

    // ✅ ALWAYS push status with date
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

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    await job.deleteOne();
    res.json({ message: "Job removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
