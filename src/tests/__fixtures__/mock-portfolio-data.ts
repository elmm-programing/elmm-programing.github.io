export interface MockProject {
  id: string;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  image: string;
  tags: string[];
}

export interface MockSkillCategory {
  name: string;
  items: string[];
}

export interface MockCertification {
  name: string;
  provider: string;
  achievement: string;
  url: string;
}

export function createMockProjects(): MockProject[] {
  return [
    {
      id: "1",
      title: "Fintech Platform Migration",
      description: "Led the migration of a legacy payment system to a cloud-native architecture handling $2B+ in annual transactions",
      challenge: "El sistema legacy tenía latencias de 2s y no soportaba picos masivos de transacciones.",
      solution: "Implementamos una nueva arquitectura microservicios con Kafka para asincronía y Spring Cloud Gateway.",
      impact: "Reducción del 85% en latencia y capacidad para manejar 100,000+ transacciones/segundo.",
      image: "/assets/projects/1.jpg",
      tags: ["Spring Boot", "Kafka", "AWS"],
    },
    {
      id: "2",
      title: "E-Banking Security Upgrade",
      description: "Modernized security protocols for enterprise banking application serving 5M+ customers",
      challenge: "El sistema de autenticación era vulnerable a ataques de force-breach y no cumplía con PCI-DSS 4.0.",
      solution: "Implementamos implementamos OAuth2/OIDC con Keycloak y PAM por tokens.",
      impact: "Eliminación de vulnerabilidades críticas y certificación PCI-DSS 4.0 completa.",
      image: "/assets/projects/2.jpg",
      tags: ["OAuth2", "Keycloak", "Java"],
    },
  ];
}

export function createMockSkills(): MockSkillCategory[] {
  return [
    {
      name: "Frontend",
      items: ["Vue.js", "TypeScript", "Tailwind CSS", "Nuxt 3", "Vitest", "Testing Library"],
    },
    {
      name: "Backend",
      items: ["Spring Boot", "Java", "Kafka", "Microservices", "REST APIs", "GraphQL"],
    },
    {
      name: "Databases / DevOps",
      items: ["RabbitMQ", "PostgreSQL", "MySQL", "Docker", "Kubernetes", "AWS"],
    },
  ];
}

export function createMockCertifications(): MockCertification[] {
  return [
    {
      name: "Google Project Management Certificate",
      provider: "Google",
      achievement: "Curso de certificación en gestión de proyectos.",
      url: "https://www.coursera.org/account/settings",
    },
    {
      name: "AWS Certified Solutions Architect",
      provider: "Amazon",
      achievement: "Certificación en arquitectura en la nube.",
      url: "https://aws.amazon.com/marketplace",
    },
  ];
}

// Helper to simulate different viewport sizes
export function simulateViewport(width: number) {
  return {
    isMobile: width <= 767,
    isTablet: width >= 768 && width <= 1023,
    isDesktop: width >= 1024,
    breakpoint: width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop',
  };
}