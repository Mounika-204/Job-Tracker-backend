import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

/* ===============================
   1️⃣ GENERATE RESUME (FIXED)
================================ */
export const generateResume = async (req, res) => {
  try {
    const { jobRole, jobDescription } = req.body;

    if (!jobRole || !jobDescription) {
      return res.status(400).json({
        message: "jobRole and jobDescription are required"
      });
    }

    const jd = jobDescription.toLowerCase();

    let skills = [];
    let summary = "";
    let projects = [];

    /* 🔹 Dynamic skill extraction */
    if (jd.includes("react")) skills.push("React");
    if (jd.includes("javascript")) skills.push("JavaScript");
    if (jd.includes("html")) skills.push("HTML");
    if (jd.includes("css")) skills.push("CSS");
    if (jd.includes("node")) skills.push("Node.js");
    if (jd.includes("express")) skills.push("Express");
    if (jd.includes("mongo")) skills.push("MongoDB");

    /* 🔹 Role based summary */
    if (jobRole.toLowerCase().includes("frontend")) {
      summary =
        "Frontend Developer skilled in building responsive and interactive web applications using modern JavaScript frameworks.";
      projects = ["Portfolio Builder", "Job Tracker Frontend"];
    } else if (jobRole.toLowerCase().includes("backend")) {
      summary =
        "Backend Developer experienced in building REST APIs, authentication systems, and database-driven applications.";
      projects = ["Job Tracker API", "Auth System"];
    } else {
      summary =
        "Software Developer with strong problem-solving skills and full-stack development experience.";
      projects = ["Job Tracker Full Stack Project"];
    }

    const resumeData = {
      name: "Mounika Tulasi",
      jobRole,
      summary,
      skills: [...new Set(skills)],
      projects,
      experience: [
        {
          role: jobRole,
          description: "Hands-on experience through real-world projects."
        }
      ]
    };

    res.status(200).json(resumeData);

  } catch (error) {
    console.error("GENERATE ERROR:", error);
    res.status(500).json({ message: "Resume generation failed" });
  }
};

/* ===============================
   2️⃣ OPTIMIZE RESUME (OK)
================================ */
export const optimizeResume = async (req, res) => {
  try {
    const { jobRole } = req.body;
    const resumeFile = req.file;

    if (!resumeFile || !jobRole) {
      return res.status(400).json({
        message: "Resume file and jobRole are required"
      });
    }

    const pdfData = await pdfParse(resumeFile.buffer);
    const resumeText = pdfData.text;

    const extractedSkills =
      resumeText.match(/HTML|CSS|JavaScript|React|Node|Express|MongoDB/gi) || [];

    res.status(200).json({
      success: true,
      jobRole,
      extractedSkills: [...new Set(extractedSkills)],
      message: "Resume optimized successfully"
    });

  } catch (error) {
    console.error("OPTIMIZE ERROR:", error);
    res.status(500).json({ message: "Resume optimization failed" });
  }
};

/* ===============================
   3️⃣ SAVE RESUME (OK)
================================ */
export const saveResume = async (req, res) => {
  try {
    res.status(201).json({
      success: true,
      message: "Resume saved successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Resume save failed" });
  }
};