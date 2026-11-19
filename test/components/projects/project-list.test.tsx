import { PROJECT } from '@test/fixtures/project';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ProjectList } from '@/components/projects/project-list';

describe('ProjectList', () => {
  test('renders one card per project, in the given order', () => {
    const projects = [
      { ...PROJECT, repo: 'b', title: 'Bee' },
      { ...PROJECT, repo: 'a', title: 'Ay' },
    ];
    render(<ProjectList projects={projects} />);
    const items = screen.getAllByRole('article');
    expect(items).toHaveLength(2);
    expect(within(items[0] as HTMLElement).getByText('Bee')).toBeVisible();
    expect(within(items[1] as HTMLElement).getByText('Ay')).toBeVisible();
  });

  test('renders an empty list without crashing', () => {
    render(<ProjectList projects={[]} />);
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });
});
