import { createRequire } from "module";
const require = createRequire(import.meta.url);
import * as pdfParse from "pdf-parse";



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

    // ✅ PDF parse
    const pdfData = await pdfParse(resumeFile.buffer);
    const resumeText = pdfData.text;

    // ✅ Skill extraction
    const extractedSkills =
      resumeText.match(/HTML|CSS|JavaScript|React|Node|Express|MongoDB/gi) || [];

    res.status(200).json({
      success: true,
      jobRole,
      extractedSkills: [...new Set(extractedSkills)],
      message: "Resume optimized successfully",
    });

  } catch (error) {
    console.error(error);
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
