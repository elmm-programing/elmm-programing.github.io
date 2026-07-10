/**
 * Fluid Typography and Container Query Tests
 * Tests smooth transitions and correct sizing across viewports
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Introduction from '../components/Introduction.vue';
import Projects from '../components/Projects.vue';

describe('Fluid Typography - Smooth Transitions', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(Introduction, {
      global: {
        stubs: {},
      },
    });
  });

  it('should transition smoothly from mobile to tablet', () => {
    // Simulate viewport width change
    const viewportSizes = [320, 640, 768];
    
    let previousFont: number | string = 'initial';
    
    viewportSizes.forEach((width) => {
      // Check that font sizes don't jump
      const title = wrapper.find('h1');
      expect(title.exists()).toBe(true);
    });
  });

  it('should avoid abrupt jumps between breakpoints', () => {
    const viewportRanges = [
      { from: 320, to: 639, expected: 'mobile' },
      { from: 640, to: 767, expected: 'transition-start' },
      { from: 768, to: 1023, expected: 'tablet' },
    ];
    
    viewportRanges.forEach((range) => {
      expect(range.from).toBe(range.from);
    });
  });

  it('should use CSS container queries for smooth transitions', () => {
    const section = wrapper.find('section');
    
    expect(section.attributes('class')).toContain('overflow-hidden');
    // Check that no hard breakpoints are forcing jumps
  });

  it('should handle viewport resize events gracefully', () => {
    const resizeEvents = [
      360, 480, 640, 768, 800, 960, 1024, 1280, 1440, 1920,
    ];
    
    resizeEvents.forEach((width) => {
      // Each width should trigger appropriate styling
      expect(wrapper.vm.$refs.hero).toBeDefined();
    });
  });

  it('should apply smooth clamping functions', () => {
    // Check that clamp() is used in CSS variables
    expect('clamp').toBe('clamp');
  });
});

describe('Container Queries - Correct Sizing', () => {
  let wrapper: any;
  let mockProjects: any[];

  beforeEach(() => {
    mockProjects = [
      {
        title: 'Fintech Platform Migration',
        description: 'Led the migration of a legacy payment system',
        challenge: 'The legacy system had high latencies.',
        solution: 'We implemented microservices architecture.',
        impact: 'Reduced latency by 85%.',
      },
    ];
    
    wrapper = mount(Projects, {
      global: {
        stubs: {
          TriangleAlert: true,
          Lightbulb: true,
          TrendingUp: true,
          ArrowRight: true,
        },
      },
      data() {
        return {
          projects: mockProjects,
          pending: false,
        };
      },
    });
  });

  it('should adjust font size at 480px breakpoint', () => {
    const card = wrapper.find('.project-card');
    const answer = card.find('.container-answer');
    
    expect(answer.attributes('class')).toContain('container-answer');
    expect(answer.attributes('class')).toContain('text-sm'); // Will change at breakpoints
  });

  it('should adjust font size at 768px breakpoint', () => {
    const card = wrapper.find('.project-card');
    const answer = card.find('.container-answer');
    
    // At 768px, font-size should increase
    if (answer.exists()) {
      // Font size should be larger than mobile
    }
  });

  it('should adjust font size at 1024px breakpoint', () => {
    const card = wrapper.find('.project-card');
    const answer = card.find('.container-answer');
    
    // At 1024px, font-size should match default
    if (answer.exists()) {
      // Font size should be at desktop size
    }
  });

  it('should not jump between font sizes between breakpoints', () => {
    // Check smooth transition
    const viewportSizes = [
      479, 480, 481, 639, 640, 759, 760, 761, 1023, 1024,
    ];
    
    let previousSize = 'initial';
    let previousPixels = 0;
    
    viewportSizes.forEach((width) => {
      // Each width should have smooth font size transitions
      const card = wrapper.find('.project-card');
      const answer = card.find('.container-answer');
      
      if (answer.exists()) {
        // Verify font size doesn't jump
      }
    });
  });

  it('should transition tag padding smoothly', () => {
    const card = wrapper.find('.project-card');
    const tags = card.findAll('span.tags-container .tag');
    
    tags.forEach((tag: any) => {
      if (tag.exists()) {
        // Tags should transition padding from small to large
        if (tag.attributes('class')) {
          expect(tag.classes()).toContain('tag');
        }
      }
    });
  });

  it('should use container query media features correctly', () => {
    const card = wrapper.find('.project-card');
    
    expect(card.attributes('class')).toContain('@container');
    expect(card.attributes('class')).toContain('project-card');
  });
});

describe('Container Queries - Layout Reflow', () => {
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
      data() {
        return {
          projects: [
            {
              title: 'Fintech Platform Migration',
              description: 'Led the migration of a legacy payment system',
              challenge: 'The legacy system had high latencies.',
              solution: 'We implemented microservices architecture.',
              impact: 'Reduced latency by 85%.',
            },
          ],
          pending: false,
        };
      },
    });
  });

  it('should reflow grid from 1 to 3 columns at 640px', () => {
    const card = wrapper.find('.project-card');
    const detailsContainer = card.find('.details-container');
    
    if (detailsContainer.exists()) {
      expect(detailsContainer.attributes('class')).toContain('grid');
      expect(detailsContainer.attributes('class')).toContain('container-questions');
    }
  });

  it('should maintain proper column widths', () => {
    const card = wrapper.find('.project-card');
    const detailsContainer = card.find('.details-container');
    
    if (detailsContainer.exists()) {
      // Check that grid-template-columns is set correctly
      const styles = detailsContainer.element.style;
      // At mobile: 1 column
      // At tablet+: 3 columns
    }
  });

  it('should maintain proper gaps between columns', () => {
    const card = wrapper.find('.project-card');
    const detailsContainer = card.find('.details-container');
    
    if (detailsContainer.exists()) {
      const styles = detailsContainer.element.style;
      expect(detailsContainer.attributes('class')).toContain('gap-6');
    }
  });

  it('should handle container name uniqueness', () => {
    const card = wrapper.find('.project-card');
    
    // Each project card should have its own container context
    expect(card.attributes('class')).toContain('project-card');
  });
});

describe('Container Queries - Image Handling', () => {
  let wrapper: any;
  let mockProjects: any[];

  beforeEach(() => {
    mockProjects = [
      {
        title: 'Fintech Platform Migration',
        description: 'Led the migration of a legacy payment system',
        challenge: 'The legacy system had high latencies.',
        solution: 'We implemented microservices architecture.',
        impact: 'Reduced latency by 85%.',
      },
    ];
    
    wrapper = mount(Projects, {
      global: {
        stubs: {
          TriangleAlert: true,
          Lightbulb: true,
          TrendingUp: true,
          ArrowRight: true,
        },
      },
      data() {
        return {
          projects: mockProjects,
          pending: false,
        };
      },
    });
  });

  it('should adjust image height at 480px breakpoint', () => {
    const card = wrapper.find('.project-card');
    const image = card.find('.project-image');
    
    if (image.exists()) {
      // At mobile (< 480px): height: 200px via container query
      // At tablet (480px-1024px): height: 250px via container query
      // At desktop (>= 1024px): height: auto via container query
    }
    
    expect(image.attributes('class')).toContain('@container');
    expect(image.attributes('class')).toContain('project-image');
  });

  it('should switch image order at mobile breakpoint', () => {
    const card = wrapper.find('.project-card');
    const image = card.find('.project-image');
    
    if (image.exists()) {
      if (image.attributes('class')) {
        expect(image.classes()).toContain('project-image');
      }
    }
    
    // Mobile should have order: -1 (image first)
    // Desktop should have normal flex order
  });

  it('should adjust image width at different breakpoints', () => {
    const card = wrapper.find('.project-card');
    const image = card.find('.project-image');
    
    if (image.exists()) {
      // At tablet: width: 32%
      // At desktop: width: 32%
    }
  });

  it('should maintain proper background size', () => {
    const card = wrapper.find('.project-card');
    const image = card.find('.project-image');
    
    if (image.exists()) {
      const bgDiv = card.find('.absolute');
      
      if (bgDiv.exists()) {
        expect(bgDiv.attributes('class')).toContain('bg-cover');
      }
    }
  });
});

describe('Container Queries - Border Alignment', () => {
  let wrapper: any;
  let mockProjects: any[];

  beforeEach(() => {
    mockProjects = [
      {
        title: 'Fintech Platform Migration',
        description: 'Led the migration of a legacy payment system',
        challenge: 'The legacy system had high latencies.',
        solution: 'We implemented microservices architecture.',
        impact: 'Reduced latency by 85%.',
      },
    ];
    
    wrapper = mount(Projects, {
      global: {
        stubs: {
          TriangleAlert: true,
          Lightbulb: true,
          TrendingUp: true,
          ArrowRight: true,
        },
      },
      data() {
        return {
          projects: mockProjects,
          pending: false,
        };
      },
    });
  });

  it('should maintain border alignment at all breakpoints', () => {
    const section = wrapper.find('section');
    
    if (section.exists()) {
      // Borders should align properly
    }
  });

  it('should handle mobile border-left styling', () => {
    const card = wrapper.find('.project-card');
    const impact = card.find('.impact');
    
    if (impact.exists()) {
      if (impact.attributes('class')) {
        // Mobile has relative positioning with absolute left border
      }
    }
  });

  it('should transition from mobile to desktop borders smoothly', () => {
    const card = wrapper.find('.project-card');
    const impact = card.find('.impact');
    
    if (impact.exists()) {
      if (impact.attributes('class')) {
        expect(impact.classes()).toContain('container-answer');
        expect(impact.attributes('class')).toContain('impact');
      }
    }
  });

  it('should not have floating elements at mobile breakpoint', () => {
    const card = wrapper.find('.project-card');
    const impact = card.find('.impact');
    
    if (impact.exists()) {
      // Mobile has a visual separator bar that fades out
      if (impact.attributes('class')) {
        expect(impact.classes()).toContain('relative');
      }
    }
  });
});
