import { PROJECT } from '@test/fixtures/project';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ProjectCard } from '@/components/projects/project-card';

describe('ProjectCard', () => {
  test('links the title to the project page', () => {
    render(<ProjectCard project={PROJECT} />);
    expect(screen.getByRole('link', { name: 'Thing' })).toHaveAttribute(
      'href',
      '/p/thing',
    );
  });

  test('shows the screenshot when one is configured', () => {
    render(<ProjectCard project={PROJECT} />);
    expect(screen.getByAltText('Screenshot of Thing')).toBeInTheDocument();
  });

  test('renders without a screenshot, since most projects have none', () => {
    render(<ProjectCard project={{ ...PROJECT, image: null }} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('A thing')).toBeInTheDocument();
  });

  test('offers only the source link without a live site', () => {
    render(<ProjectCard project={{ ...PROJECT, liveUrl: null }} />);
    expect(screen.queryByText('Open live')).not.toBeInTheDocument();
    expect(screen.getByText('Source')).toBeInTheDocument();
  });

  test('omits the blurb paragraph when there is no blurb', () => {
    render(<ProjectCard project={{ ...PROJECT, blurb: null }} />);
    expect(screen.queryByText('A thing')).not.toBeInTheDocument();
  });
});
