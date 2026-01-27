
import { Client } from "@notionhq/client";
import fs from "fs";
import path from "path";

// Manually read .env file
const envPath = path.resolve(process.cwd(), ".env");
const envContent = fs.readFileSync(envPath, "utf-8");
const env: Record<string, string> = {};
envContent.split("\n").forEach(line => {
    const [key, value] = line.split("=");
    if (key && value) {
        env[key.trim()] = value.trim();
    }
});

const token = env.VITE_NOTION_TOKEN;
const pageId = env.VITE_PORTFOLIO_PAGE_ID;

if (!token || !pageId) {
  console.error("Missing VITE_NOTION_TOKEN or VITE_PORTFOLIO_PAGE_ID in .env");
  process.exit(1);
}


const notion = new Client({ auth: token });

async function main() {
  console.log(`Inspecting Page ID: ${pageId}`);

  try {
    // 1. Get Page Children (Find Databases)
    const children: any = await notion.blocks.children.list({ block_id: pageId });
    
    console.log("--- Encapsulated Items ---");
    const databases = [];
    
    for (const block of children.results) {
        if (block.type === "child_database") {
            const name = block.child_database.title;
            const id = block.id;
            console.log(`[DATABASE] Found: "${name}" (ID: ${id})`);
            databases.push({ name, id });
        } else if (block.type === "child_page") {
            console.log(`[PAGE] Found: "${block.child_page.title}" (ID: ${block.id})`);
        }
    }

    // 2. Inspect each database schema
    for (const db of databases) {
        console.log(`\n--- Inspecting Schema for: ${db.name} ---`);
        try {
            console.log(`fetching definition for ${db.name}...`);
            const dbDef: any = await notion.databases.retrieve({ database_id: db.id });
            console.log("Full DB definition:", JSON.stringify(dbDef, null, 2));
            break; // Stop after first one to avoid spam

            if (dbDef.properties) {
                Object.keys(dbDef.properties).forEach(key => {
                    const prop = dbDef.properties[key];
                    console.log(` - "${key}": ${prop.type}`);
                    // if (prop.type === 'select' || prop.type === 'multi_select') {
                    //    console.log(`   Options: ${prop[prop.type].options.map((o:any) => o.name).join(", ")}`);
                    // }
                });
            } else {
                 console.log("No properties field found in response.");
            }

        } catch (err: any) {
            console.error(`Error retrieving database ${db.name}:`, err.message);
        }
    }

  } catch (error: any) {
    console.error("Error inspecting Notion:", error.message);
  }
}

main();
