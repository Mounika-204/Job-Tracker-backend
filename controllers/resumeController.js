export const generateResume = async (req, res) => {
  try {
    const { jobRole } = req.body;

    if (!jobRole) {
      return res.status(400).json({ message: "jobRole is required" });
    }

    let resumeData = {};

    if (jobRole.toLowerCase().includes("frontend")) {
      resumeData = {
        skills: ["HTML", "CSS", "JavaScript", "React"],
        projects: ["Portfolio Builder", "Job Tracker Frontend"],
      };
    } else if (jobRole.toLowerCase().includes("backend")) {
      resumeData = {
        skills: ["Node.js", "Express", "MongoDB"],
        projects: ["Job Tracker API", "Auth System"],
      };
    } else {
      resumeData = {
        skills: ["JavaScript", "Git", "Problem Solving"],
        projects: ["Job Tracker Project"],
      };
    }

    res.status(200).json(resumeData);
  } catch (error) {
    res.status(500).json({ message: "Resume generation failed" });
  }
};

export const saveResume = async (req, res) => {
  try {
    res.status(201).json({
      success: true,
      message: "Resume saved successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Resume save failed" });
  }
};
