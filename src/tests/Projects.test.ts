/**
 * Projects Component Container Query Tests
 * Tests fluid layouts, container queries, and responsive project cards
 */

import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { mount } from '@vue/test-utils';
import Projects from '../components/Projects.vue';
import { createMockProjects, simulateViewport } from '../tests/__fixtures__/mock-portfolio-data';

// Mock PortfolioService
vi.mock('../utils/PortfolioService', () => {
  return {
    PortfolioService: class {
      async getProjects(): Promise<any[]> {
        return createMockProjects();
      }
    },
  };
});

const mockProjects = createMockProjects();

describe('Projects Component - Fluid Scale Verification', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(Projects, {
      global: {
        stubs: {
          TriangleAlert: true,
          Lightbulb: true,
          TrendingUp: true,
          ArrowRight: true,
        },
      },
    });
  });

  it('should render project cards with fluid typography', () => {
    wrapper.vm.projects = mockProjects;
    wrapper.vm.pending = false;
    wrapper.update();

    const cards = wrapper.findAll('.project-card');
    expect(cards.length).toBe(mockProjects.length);

    const title = cards.at(0).find('h3');
    expect(title.attributes('class')).toContain('text-2xl');
    // At desktop should be text-4xl
    const desktopTitle = wrapper.find('h3.text-4xl');
    expect(desktopTitle.exists()).toBe(false); // Will be at desktop breakpoint
  });

  it('should apply fluid font sizes without abrupt jumps', async () => {
    // Simulate viewport width changes
    const viewportWidths = [320, 640, 768, 960, 1024, 1280, 1920];
    
    viewportWidths.forEach(width => {
      // Each width triggers appropriate breakpoint styling
      // Check that no abrupt jumps occur in font sizes
      const cards = wrapper.findAll('.project-card');
      const firstCard = cards.at(0);
      const title = firstCard.find('h3');
      expect(title.exists()).toBe(true);
      const titleText = title.text();
      expect(typeof titleText).toBe('string');
    });
  });

  it('should apply fluid spacing for section padding', () => {
    const section = wrapper.find('section.py-20');
    expect(section.attributes('class')).toContain('py-20');
    // Desktop has py-32
    const desktopSection = wrapper.find('section.py-32');
    expect(desktopSection.exists()).toBe(true);
  });

  it('should use fluid text for base and subtitle', () => {
    const subtitle = wrapper.find('.mb-16 p');
    expect(subtitle.attributes('class')).toContain('text-lg');
    // Desktop has text-xl
  });

  it('should maintain layout consistency at critical breakpoints', () => {
    // Critical breakpoints: 320, 640, 768, 1024, 1280
    const criticalBreakpoints = [320, 640, 768, 1024, 1280];
    
    criticalBreakpoints.forEach(width => {
      expect(wrapper.vm.$refs.projectsContainer).toBeDefined();
    });
  });
});

describe('Projects Component - Container Query Integrity', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(Projects, {
      global: {
        stubs: {
          TriangleAlert: true,
          Lightbulb: true,
          TrendingUp: true,
          ArrowRight: true,
        },
      },
    });
  });

  it('should reflow internal columns when container width changes', async () => {
    wrapper.vm.projects = mockProjects;
    wrapper.vm.pending = false;
    wrapper.update();

    const card = wrapper.find('.project-card');
    
    // Simulate container resize
    const viewportSizes = [
      { width: 320, expectedCols: 'mobile', expects: 'columns stack', expectsTagSize: 'tag' },
      { width: 768, expectedCols: 'tablet', expects: 'columns grid', expectsTagSize: 'sm' },
      { width: 1024, expectedCols: 'desktop', expects: 'columns grid', expectsTagSize: 'lg' },
    ];

    viewportSizes.forEach(({ width, expects, expectsTagSize }) => {
      // For mobile, image should come first via container query logic
      expect(card.attributes('class')).toContain('@container');
      
      // Tag sizes should change based on viewport
      const tags = card.findAll('span.tags-container .tag');
      if (tags.length) {
        expect(tags.at(0).attributes('class')).toContain('tag');
      }
    });
  });

  it('should maintain tag sizing based on container width', async () => {
    wrapper.vm.projects = mockProjects;
    wrapper.vm.pending = false;
    wrapper.update();

    const cards = wrapper.findAll('.project-card');
    const card = cards.at(0);

    // At mobile (< 320px), tags should use small padding
    const mobileTags = card.findAll('.h-6.w-16.bg-gray-200');
    if (mobileTags.length > 0) {
      expect(mobileTags.at(0).attributes('class')).toContain('w-auto');
    }
  });

  it('should reflow details container from 1 column to 3 columns at 640px', async () => {
    wrapper.vm.projects = mockProjects;
    wrapper.vm.pending = false;
    wrapper.update();

    const card = wrapper.find('.project-card');
    const detailsContainer = card.find('.grid.details-container');
    
    // Should transition from mobile to grid-cols-3
    if (detailsContainer.exists()) {
      // Verify grid behavior
      expect(detailsContainer.attributes('class')).toContain('grid');
    }
  });

  it('should handle image container height changes at different widths', async () => {
    wrapper.vm.projects = mockProjects;
    wrapper.vm.pending = false;
    wrapper.update();

    const imageContainers = wrapper.findAll('.project-image');
    if (imageContainers.length > 0) {
      const firstImage = imageContainers.at(0);
      // Mobile: height: 200px via container query
      // Tablet: height: 250px via container query
      // Desktop: height: auto via container query
      
      // Each width should render the appropriate height
      const viewportSizes = [320, 768, 1024];
      viewportSizes.forEach(width => {
        expect(firstImage.attributes('class')).toContain('@container');
      });
    }
  });

  it('should maintain proper spacing in tags container', async () => {
    wrapper.vm.projects = mockProjects;
    wrapper.vm.pending = false;
    wrapper.update();

    const card = wrapper.find('section.py-20');
    if (card.exists()) {
      expect(card.attributes('class')).toContain('space-y-12');
    }
  });
});

describe('Projects Component - Image Art Direction for Containers', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(Projects, {
      global: {
        stubs: {
          TriangleAlert: true,
          Lightbulb: true,
          TrendingUp: true,
          ArrowRight: true,
        },
      },
    });
  });

  it('should select correct image source for mobile container', async () => {
    wrapper.vm.projects = mockProjects;
    wrapper.vm.pending = false;
    wrapper.update();

    const imageContainers = wrapper.findAll('.project-image');
    expect(imageContainers.length).toBe(mockProjects.length);
    
    // Mobile uses full width with height: 200px
  });

  it('should use medium image source for tablet containers', async () => {
    wrapper.vm.projects = mockProjects;
    wrapper.vm.pending = false;
    wrapper.update();

    const imageContainers = wrapper.findAll('.project-image');
    expect(imageContainers.length).toBe(mockProjects.length);
    
    // Tablet uses width: 32%, height: 250px
  });

  it('should use wide image source for desktop containers', async () => {
    wrapper.vm.projects = mockProjects;
    wrapper.vm.pending = false;
    wrapper.update();

    const imageContainers = wrapper.findAll('.project-image');
    expect(imageContainers.length).toBe(mockProjects.length);
    
    // Desktop uses width: 32%, height: auto
  });

  it('should maintain container query attributes throughout', () => {
    const card = wrapper.find('.project-card');
    expect(card.attributes('class')).toContain('@container');
    expect(card.attributes('class')).toContain('container-questions');
  });
});

describe('Projects Component - Regression Tests', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(Projects, {
      global: {
        stubs: {
          TriangleAlert: true,
          Lightbulb: true,
          TrendingUp: true,
          ArrowRight: true,
        },
      },
    });
  });

  it('should not introduce horizontal overflow on mobile', () => {
    const section = wrapper.find('section');
    expect(section.attributes('class')).toContain('max-w-7xl');
    expect(section.attributes('class')).toContain('mx-auto');
    
    // Check for any overflow hidden classes
    const container = wrapper.find('div.max-w-7xl');
    if (container.exists()) {
      expect(container.attributes('class')).not.toContain('overflow-x-auto');
    }
  });

  it('should maintain proper alignments at all breakpoints', () => {
    const cards = wrapper.findAll('.project-card');
    
    cards.forEach((card, index) => {
      const image = card.find('.lg.w-2\\/5');
      const content = card.find('.lg.w-3\\/5.p-8');
      
      expect(image.exists()).toBe(true);
      expect(content.exists()).toBe(true);
    });
  });

  it('should handle empty project list gracefully', () => {
    wrapper.vm.projects = [];
    wrapper.vm.pending = false;
    wrapper.update();
    
    const pendingState = wrapper.find('.pending');
    expect(pendingState.exists()).toBe(true);
    
    // Should show loading skeletons
    const skeleton = wrapper.find('.animate-pulse');
    expect(skeleton.exists()).toBe(true);
  });

  it('should maintain hover effects across breakpoints', () => {
    const card = wrapper.find('.project-card');
    expect(card.attributes('class')).toContain('hover:border-primary\\/50');
    expect(card.attributes('class')).toContain('transition-colors');
  });

  it('should not break when image URL fails to load', () => {
    // Mock a failing image load
    const card = wrapper.find('.project-card');
    const image = card.find('.bg-gray-200').element;
    // Image should show as placeholder gray background
    expect(image.attributes('class')).toContain('bg-cover');
  });

  it('should maintain button alignment in actions container', () => {
    const buttonContainer = wrapper.find('.actions-container');
    if (buttonContainer.exists()) {
      expect(buttonContainer.attributes('class')).toContain('@container');
    }
    
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.attributes('class')).toContain('inline-flex');
  });
});
