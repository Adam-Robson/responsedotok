import { PROJECT } from '@test/fixtures/project';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ProjectHeader } from '@/components/projects/project-header';

describe('ProjectHeader', () => {
  test('names the project as the page heading', () => {
    render(<ProjectHeader project={PROJECT} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Thing',
    );
  });

  test('shows the last push as a machine-readable time', () => {
    render(<ProjectHeader project={PROJECT} />);
    const time = screen.getByText('Oct 1, 2026');
    expect(time.tagName).toBe('TIME');
    expect(time).toHaveAttribute('datetime', '2026-10-01T12:00:00Z');
  });

  test('omits the update line when GitHub data is unavailable', () => {
    render(<ProjectHeader project={{ ...PROJECT, pushedAt: null }} />);
    expect(screen.queryByText(/Updated/)).not.toBeInTheDocument();
  });
});
