import { PROJECT } from '@test/fixtures/project';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { loadProjects } from '@/api/projects/load-projects';
import Home from '@/app/page';

vi.mock('@/api/projects/load-projects', () => ({ loadProjects: vi.fn() }));

describe('Home page', () => {
  test('introduces the site, then lists the projects', async () => {
    vi.mocked(loadProjects).mockResolvedValue([PROJECT]);
    render(await Home());
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'responsedotok',
    );
    expect(screen.getByRole('link', { name: 'Thing' })).toBeInTheDocument();
  });

  test('is the skip link target', async () => {
    vi.mocked(loadProjects).mockResolvedValue([]);
    render(await Home());
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main');
  });
});
