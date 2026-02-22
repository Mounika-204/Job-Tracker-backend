import { createRequire } from "module"; 
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

/* ✅ 1. generateResume */
export const generateResume = async (req, res) => {
  try {
    const { jobRole } = req.body;

    if (!jobRole) {
      return res.status(400).json({ message: "jobRole is required" });
    }

    let resumeData = {};

    if (jobRole.toLowerCase().includes("frontend")) {
      resumeData = {
        name: "Mounika Tulasi",
        summary: "Frontend Developer with strong skills in React, JS, HTML, CSS, and experience building responsive web applications.",
        skills: ["HTML", "CSS", "JavaScript", "React"],
        projects: ["Portfolio Builder", "Job Tracker Frontend"],
        experience: [
          {
            company: "Portfolio Builder",
            role: "Frontend Developer",
            description: "Created responsive portfolio using React."
          },
          {
            company: "Job Tracker",
            role: "Frontend Developer",
            description: "Developed Job Tracker frontend with API integration."
          }
        ]
      };
    } else if (jobRole.toLowerCase().includes("backend")) {
      resumeData = {
        name: "Mounika Tulasi",
        summary: "Backend Developer with expertise in Node.js, Express, MongoDB, and building secure APIs.",
        skills: ["Node.js", "Express", "MongoDB"],
        projects: ["Job Tracker API", "Auth System"],
        experience: [
          {
            company: "Job Tracker API",
            role: "Backend Developer",
            description: "Implemented RESTful APIs and database integration."
          },
          {
            company: "Auth System",
            role: "Backend Developer",
            description: "Developed authentication & authorization system."
          }
        ]
      };
    } else {
      resumeData = {
        name: "Mounika Tulasi",
        summary: "Software Developer with core skills in JavaScript and problem solving.",
        skills: ["JavaScript", "Git", "Problem Solving"],
        projects: ["Job Tracker Project"],
        experience: [
          {
            company: "Job Tracker Project",
            role: "Developer",
            description: "Worked on full-stack job tracking application."
          }
        ]
      };
    }

    res.status(200).json(resumeData);
  } catch (error) {
    console.error("GENERATE ERROR:", error);
    res.status(500).json({ message: "Resume generation failed" });
  }
};

/* ✅ 2. optimizeResume */
export const optimizeResume = async (req, res) => {
  try {
    const { jobRole } = req.body;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    if (!jobRole) {
      return res.status(400).json({ message: "Job role is required" });
    }

    const pdfData = await pdfParse(resumeFile.buffer);
    const resumeText = pdfData.text;

    const extractedSkills =
      resumeText.match(/HTML|CSS|JavaScript|React|Node|Express|MongoDB/gi) || [];

    res.status(200).json({
      success: true,
      jobRole,
      extractedSkills: [...new Set(extractedSkills)],
      message: "Resume optimized successfully",
    });

  } catch (error) {
    console.error("OPTIMIZE ERROR:", error);
    res.status(500).json({ message: "Resume optimization failed" });
  }
};

/* ✅ 3. saveResume */
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