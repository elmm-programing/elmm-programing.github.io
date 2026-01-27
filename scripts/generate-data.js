
import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Load environment variables
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, "../public/data");

async function fetchDatabase(databaseId) {
  if (!databaseId) throw new Error("Database ID is missing");
  
  console.log(`Fetching database: ${databaseId}`);
  
  const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.VITE_NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page_size: 100,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Notion API Error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return await response.json();
}

async function generateData() {
  console.log("Starting static data generation (Native Fetch)...");

  try {
    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Fetch and save Skills
    const skillsId = process.env.VITE_NOTION_DB_SKILLS_ID;
    if (skillsId) {
        const skillsData = await fetchDatabase(skillsId);
        await fs.writeFile(
            path.join(OUTPUT_DIR, "skills.json"),
            JSON.stringify(skillsData, null, 2)
        );
        console.log("✓ Saved skills.json");
    } else {
        console.warn("⚠ Skipping Skills: VITE_NOTION_DB_SKILLS_ID not found");
    }

    // Fetch and save Projects
    const projectsId = process.env.VITE_NOTION_DB_PROJECTS_ID;
    if (projectsId) {
        const projectsData = await fetchDatabase(projectsId);
        await fs.writeFile(
            path.join(OUTPUT_DIR, "projects.json"),
            JSON.stringify(projectsData, null, 2)
        );
        console.log("✓ Saved projects.json");
    } else {
         console.warn("⚠ Skipping Projects: VITE_NOTION_DB_PROJECTS_ID not found");
    }

    // Fetch and save Certifications
    const certsId = process.env.VITE_NOTION_DB_CERTS_ID;
    if (certsId) {
        const certsData = await fetchDatabase(certsId);
        await fs.writeFile(
            path.join(OUTPUT_DIR, "certs.json"),
            JSON.stringify(certsData, null, 2)
        );
        console.log("✓ Saved certs.json");
    } else {
         console.warn("⚠ Skipping Certs: VITE_NOTION_DB_CERTS_ID not found");
    }

    console.log("Static data generation complete.");
  } catch (error) {
    console.error("Error generating data:", error);
    process.exit(1);
  }
}

generateData();
