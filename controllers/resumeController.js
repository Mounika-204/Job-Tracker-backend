import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

/* ===============================
   1️⃣ GENERATE RESUME
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

    // 🔹 Skill extraction
    if (jd.includes("react")) skills.push("React");
    if (jd.includes("javascript")) skills.push("JavaScript");
    if (jd.includes("html")) skills.push("HTML");
    if (jd.includes("css")) skills.push("CSS");
    if (jd.includes("node")) skills.push("Node.js");
    if (jd.includes("express")) skills.push("Express");
    if (jd.includes("mongo")) skills.push("MongoDB");
    if (jd.includes("python")) skills.push("Python");
    if (jd.includes("sql")) skills.push("SQL");

    // 🔹 Role based summary
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
        "Full Stack Developer with strong problem-solving skills and experience in building scalable applications.";
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
   2️⃣ OPTIMIZE RESUME
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
      resumeText.match(/HTML|CSS|JavaScript|React|Node|Express|MongoDB|Python|SQL/gi) || [];

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
   3️⃣ MATCH RESUME WITH JD 🔥 (NEW)
================================ */
export const matchResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const resumeFile = req.file;

    if (!resumeFile || !jobDescription) {
      return res.status(400).json({
        message: "Resume file and jobDescription are required"
      });
    }

    const pdfData = await pdfParse(resumeFile.buffer);
    const resumeText = pdfData.text.toLowerCase();
    const jdText = jobDescription.toLowerCase();

    // 🔹 remove useless words
    const stopWords = ["the", "and", "or", "is", "a", "to", "of", "in"];

    const resumeWords = resumeText
      .split(/\W+/)
      .filter(word => !stopWords.includes(word));

    const jobWords = jdText
      .split(/\W+/)
      .filter(word => !stopWords.includes(word));

    const matched = jobWords.filter(word =>
      resumeWords.includes(word)
    );

    const missing = jobWords.filter(word =>
      !resumeWords.includes(word)
    );

    const score = Math.round((matched.length / jobWords.length) * 100);

    res.status(200).json({
      score,
      matched: [...new Set(matched)].slice(0, 20),
      missing: [...new Set(missing)].slice(0, 20),
    });

  } catch (error) {
    console.error("MATCH ERROR:", error);
    res.status(500).json({ message: "Matching failed" });
  }
};

/* ===============================
   4️⃣ SAVE RESUME
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