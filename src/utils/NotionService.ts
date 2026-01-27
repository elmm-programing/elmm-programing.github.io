export class NotionService {
  private readonly SKILLS_DB_ID: string;
  private readonly PROJECTS_DB_ID: string;
  private readonly CERTS_DB_ID: string;
  private readonly TOKEN: string;

  constructor() {
    this.TOKEN = import.meta.env.VITE_NOTION_TOKEN;
    this.SKILLS_DB_ID = import.meta.env.VITE_NOTION_DB_SKILLS_ID;
    this.PROJECTS_DB_ID = import.meta.env.VITE_NOTION_DB_PROJECTS_ID;
    this.CERTS_DB_ID = import.meta.env.VITE_NOTION_DB_CERTS_ID;

    if (!this.TOKEN) console.error("Missing VITE_NOTION_TOKEN");
    if (!this.SKILLS_DB_ID) console.error("Missing VITE_NOTION_DB_SKILLS_ID");
    if (!this.PROJECTS_DB_ID) console.error("Missing VITE_NOTION_DB_PROJECTS_ID");
    if (!this.CERTS_DB_ID) console.error("Missing VITE_NOTION_DB_CERTS_ID");
  }

  private async queryNotionDatabase(databaseId: string, staticFileName?: string) {
    try {
      // In Production (SSG), fetch from static JSON file
      if (import.meta.env.PROD && staticFileName) {
        console.log(`Fetching static data: /data/${staticFileName}.json`);
        const response = await fetch(`/data/${staticFileName}.json`);
        if (!response.ok) throw new Error(`Failed to load static data: ${staticFileName}`);
        return await response.json();
      }

      // In Development, use the proxy
      if (!databaseId) {
        throw new Error("Database ID is missing");
      }
      
      console.log(`Querying database via proxy: ${databaseId}`);
      
      const response = await fetch(`/notion-api/v1/databases/${databaseId}/query`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.TOKEN}`,
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
    } catch (error) {
      console.error(`Error querying database ${databaseId || staticFileName}:`, error);
      throw error;
    }
  }

  public async getCertifications() {
    const response = await this.queryNotionDatabase(this.CERTS_DB_ID, "certs");

    return response.results.map((page: any) => {
      const props = page.properties;
      return {
        name: props.Name?.title[0]?.plain_text || "",
        provider: props.Provider?.rich_text[0]?.plain_text || "",
        achievement: props.Achievement?.rich_text[0]?.plain_text || "",
        url: props.URL?.url || "",
      };
    });
  }

  public async getProjects() {
    const response = await this.queryNotionDatabase(this.PROJECTS_DB_ID, "projects");

    return response.results.map((page: any) => {
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
  }

  public async getSkills() {
    const response = await this.queryNotionDatabase(this.SKILLS_DB_ID, "skills");

    const skills = response.results.map((page: any) => {
      return {
        name: page.properties.Name?.title[0]?.plain_text || "Unknown",
        category: page.properties.Category?.select?.name || "Other",
      };
    });

    // Group by category
    const grouped = skills.reduce((acc: any, skill: any) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill.name);
      return acc;
    }, {});

    // Format for component
    return Object.entries(grouped).map(([category, items]) => ({
      name: category,
      items,
    }));
  }
}
