
import { Client } from "@notionhq/client";
import fs from "fs";
import path from "path";

// 1. Setup Env (Polyfill for Node)
const envPath = path.resolve(process.cwd(), ".env");
const envContent = fs.readFileSync(envPath, "utf-8");
const env: Record<string, string> = {};
envContent.split("\n").forEach(line => {
    const [key, value] = line.split("=");
    if (key && value) {
        env[key.trim()] = value.trim();
    }
});

const PORTFOLIO_PAGE_ID = env.VITE_PORTFOLIO_PAGE_ID;
const NOTION_TOKEN = env.VITE_NOTION_TOKEN;

if (!PORTFOLIO_PAGE_ID || !NOTION_TOKEN) {
    console.error("Missing env vars");
    process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

// 2. Replica of NotionService Logic for Verification
async function findDatabaseByName(name: string): Promise<string> {
    const response: any = await notion.blocks.children.list({
        block_id: PORTFOLIO_PAGE_ID!,
    });

    const database = response.results.find(
        (block: any) =>
            block.type === "child_database" &&
            block.child_database.title === name
    );

    if (!database) {
        throw new Error(`Database "${name}" not found in portfolio page.`);
    }
    return database.id;
}

async function queryNotionDatabase(databaseId: string) {
    // Using request directly as per the fix we deployed to NotionService
    const response = await notion.request({
        path: `databases/${databaseId}/query`,
        method: "post",
    });
    return response as any;
}

async function verifyCertifications() {
    console.log("\n--- Verifying Certifications ---");
    const dbId = await findDatabaseByName("Certifications");
    const response = await queryNotionDatabase(dbId);
    
    const items = response.results.map((page: any) => {
      const props = page.properties;
      return {
        name: props.Name?.title[0]?.plain_text || "",
        provider: props.Provider?.rich_text[0]?.plain_text || "",
        achievement: props.Achievement?.rich_text[0]?.plain_text || "",
        url: props.URL?.url || "",
      };
    });
    console.log(`Found ${items.length} certifications. Sample:`, items.slice(0, 1));
}

async function verifyProjects() {
    console.log("\n--- Verifying Projects (Use Cases) ---");
    const dbId = await findDatabaseByName("Use Cases");
    const response = await queryNotionDatabase(dbId);

    const items = response.results.map((page: any) => {
      const props = page.properties;
      return {
        title: props.Title?.title[0]?.plain_text || "",
        description: props.Description?.rich_text[0]?.plain_text || "",
        challenge: props.Challenge?.rich_text[0]?.plain_text || "",
        solution: props.Solution?.rich_text[0]?.plain_text || "",
        impact: props.Impact?.rich_text[0]?.plain_text || "",
        image: props.Image?.url || "",
        tags: props.Tags?.multi_select.map((tag: any) => tag.name) || [],
      };
    });
    console.log(`Found ${items.length} projects. Sample:`, items.slice(0, 1));
}

async function verifySkills() {
    console.log("\n--- Verifying Skills ---");
    const dbId = await findDatabaseByName("Skills");
    const response = await queryNotionDatabase(dbId);

    const skills = response.results.map((page: any) => {
      return {
        name: page.properties.Name?.title[0]?.plain_text || "Unknown",
        category: page.properties.Category?.select?.name || "Other",
      };
    });
    console.log(`Found ${skills.length} skills. Sample:`, skills.slice(0, 3));
}

async function main() {
    try {
        await verifyCertifications();
        await verifyProjects();
        await verifySkills();
        console.log("\n✅ Verification Successful!");
    } catch (e: any) {
        console.error("\n❌ Verification Failed:", e.message);
        process.exit(1);
    }
}

main();
