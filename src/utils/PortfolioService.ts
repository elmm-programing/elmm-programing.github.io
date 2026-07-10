export interface Project {
  title: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  image: string;
  tags: string[];
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface Certification {
  name: string;
  provider: string;
  achievement: string;
  url: string;
}

export class PortfolioService {
  private readonly locale: string;

  constructor(locale: string = "en") {
    this.locale = locale;
  }

  public async getProjects(): Promise<Project[]> {
    const response = await fetch(`/data/${this.locale}/projects.json`);
    if (!response.ok) throw new Error(`Failed to load projects: ${response.status}`);
    return await response.json();
  }

  public async getSkills(): Promise<SkillCategory[]> {
    const response = await fetch(`/data/${this.locale}/skills.json`);
    if (!response.ok) throw new Error(`Failed to load skills: ${response.status}`);
    return await response.json();
  }

  public async getCertifications(): Promise<Certification[]> {
    const response = await fetch(`/data/${this.locale}/certs.json`);
    if (!response.ok) throw new Error(`Failed to load certifications: ${response.status}`);
    return await response.json();
  }
}