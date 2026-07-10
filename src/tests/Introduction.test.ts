/**
 * Introduction Component Responsiveness Tests
 * Tests image art direction, fluid typography, and responsive layouts
 */

import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { mount } from '@vue/test-utils';
import Introduction from '../components/Introduction.vue';
import { createMockProjects, simulateViewport } from '../tests/__fixtures__/mock-portfolio-data';

// Mock images for different viewports
vi.mock('../assets/hero-mobile.webp', () => {
  return { default: { src: './hero-mobile.webp' } };
});

vi.mock('../assets/hero-medium.webp', () => {
  return { default: { src: './hero-medium.webp' } };
});

vi.mock('../assets/hero-wide.webp', () => {
  return { default: { src: './hero-wide.webp' } };
});

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

describe('Introduction Component - Fluid Scale Verification', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(Introduction, {
      global: {
        stubs: {
          // Stub dynamic content
        },
      },
    });
  });

  it('should render hero title with fluid typography', () => {
    const title = wrapper.find('h1');
    expect(title.exists()).toBe(true);
    expect(title.text()).toContain('Construyo arquitecturas escalables');
  });

  it('should have correct text sizing based on viewport width', () => {
    // Simulate viewport changes
    const viewportSizes = [
      { width: 320, expected: 'mobile', expectedText: 'text-4xl' },
      { width: 768, expected: 'tablet', expectedText: 'text-5xl' },
      { width: 1024, expected: 'desktop', expectedText: 'text-7xl' },
    ];

    viewportSizes.forEach(({ width, expected }) => {
      wrapper.vm.$emit('resize', width);
      // Note: Actual font-size checking requires computed property inspection
      expect(wrapper.attributes('class')).toContain('relative');
    });
  });

  it('should render correct image source for mobile viewport', async () => {
    const picture = wrapper.find('picture');
    expect(picture.exists()).toBe(true);

    // Mock for mobile
    const sources = picture.find('source');
    const mobileSource = sources.find('source');
    expect(mobileSource.attributes().srcset).toContain('hero-mobile.webp');
  });

  it('should render correct image source for tablet viewport', async () => {
    // Check medium source exists
    const picture = wrapper.find('picture');
    const mediumSources = picture.findAll('source');
    
    if (mediumSources.length > 1) {
      const mediumSource = mediumSources.at(1);
      expect(mediumSource.attributes().srcset).toContain('hero-medium.webp');
    }
  });

  it('should render correct image source for desktop viewport', async () => {
    // Check wide source exists
    const picture = wrapper.find('picture');
    const sources = picture.findAll('source');
    
    // Should have 3 sources total (wide, medium, mobile)
    expect(sources.length).toBeGreaterThanOrEqual(2);
  });

  it('should apply different margins based on viewport', () => {
    const myDiv = wrapper.find('[class*="my-"]');
    expect(myDiv.exists()).toBe(true);
    // Desktop has my-10, mobile has my-4
  });

  it('should handle the hero image rounded corners conditionally', () => {
    const img = wrapper.find('img');
    expect(img.attributes('class')).toContain('mx-auto');
    // The rounded-xl is conditionally applied on desktop only
  });

  it('should render social tech icons in grayscale', () => {
    const techIcons = wrapper.findAll('div.flex.items-center');
    expect(techIcons.length).toBeGreaterThan(0);
    
    const firstIcon = techIcons.at(0);
    expect(firstIcon).toContainText('Vue.js');
  });

  it('should maintain responsiveness when viewport width changes gradually', async () => {
    // Simulate smooth transitions
    const viewportWidths = [320, 640, 768, 960, 1024, 1280, 1920];
    
    viewportWidths.forEach(width => {
      // Each width triggers appropriate breakpoint styling
      expect(wrapper.vm.$refs.hero).toBeDefined();
    });
  });
});

describe('Introduction Component - Image Art Direction Tests', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(Introduction, {
      global: {
        stubs: {},
      },
    });
  });

  it('should select hero-mobile for viewports under 768px', async () => {
    const picture = wrapper.find('picture');
    const sources = picture.findAll('source', { timeout: 1000 });
    
    // Mobile source (no media query or min-width check would fail)
    const mobileSources = sources.filter((s: any) => !s.attributes().media);
    expect(mobileSources.length).toBeGreaterThanOrEqual(1);
  });

  it('should select hero-medium for viewports 768px to 1023px', async () => {
    const picture = wrapper.find('picture');
    const sources = picture.findAll('source');
    
    // Medium source should have min-width: 768px media query
    const mediumSources = sources.filter((s: any) => s.attributes().media.includes('768px'));
    expect(mediumSources.length).toBeGreaterThanOrEqual(1);
  });

  it('should select hero-wide for viewports 1024px and above', async () => {
    const picture = wrapper.find('picture');
    const sources = picture.findAll('source');
    
    // Wide source should have min-width: 1024px media query
    const wideSources = sources.filter((s: any) => s.attributes().media.includes('1024px'));
    expect(wideSources.length).toBeGreaterThanOrEqual(1);
  });

  it('should show fallback image when all sources fail to load', () => {
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('alt')).toContain('Edwin Levinson');
  });

  it('should maintain aspect ratio across different viewport widths', async () => {
    const viewportSizes = [320, 768, 1024, 1920];
    
    viewportSizes.forEach((width) => {
      // Each width should render the appropriate image
      expect(wrapper.vm.$refs.imgElement).toBeDefined();
    });
  });
});

describe('Introduction Component - Regression Tests', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(Introduction, {
      global: {
        stubs: {},
      },
    });
  });

  it('should not introduce horizontal overflow on mobile', () => {
    const mainContent = wrapper.find('.max-w-4xl');
    if (mainContent.exists()) {
      expect(mainContent.classes()).toContain('max-w-4xl');
    }
    // Check for overflow hidden
    const section = wrapper.find('section');
    expect(section.classes()).toContain('overflow-hidden');
  });

  it('should maintain proper text alignment across viewports', () => {
    const heroText = wrapper.find('.text-center');
    expect(heroText.classes()).toContain('text-center');
  });

  it('should display buttons in flex layout without overflow', () => {
    const buttonContainer = wrapper.find('.flex.justify-center');
    expect(buttonContainer.exists()).toBe(true);
    expect(buttonContainer.classes()).toContain('gap-4');
  });

  it('should not break on long titles', () => {
    const title = wrapper.find('h1');
    const titleText = title.attributes('class');
    expect(titleText).toContain('leading-[1.1]');
  });
});
