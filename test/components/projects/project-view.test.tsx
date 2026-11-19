import { PROJECT } from '@test/fixtures/project';
import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';
import { describe, expect, test, vi } from 'vitest';
import { loadProjectDetail } from '@/api/projects/load-project-detail';
import { ProjectView } from '@/components/projects/project-view';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));
vi.mock('@/api/projects/load-project-detail', () => ({
  loadProjectDetail: vi.fn(),
}));

const params = (repo: string) => Promise.resolve({ repo });

describe('ProjectView', () => {
  test('renders the header, preview and README for a listed repo', async () => {
    vi.mocked(loadProjectDetail).mockResolvedValue({
      ...PROJECT,
      readmeHtml: '<p>Read me</p>',
    });
    render(await ProjectView({ params: params('id') }));
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByAltText('Screenshot of Thing')).toBeInTheDocument();
    expect(screen.getByText('Read me')).toBeInTheDocument();
  });

  test('404s for an unlisted repo without calling GitHub', async () => {
    vi.mocked(loadProjectDetail).mockClear();
    await expect(ProjectView({ params: params('nope') })).rejects.toThrow(
      'NEXT_NOT_FOUND',
    );
    expect(notFound).toHaveBeenCalled();
    expect(loadProjectDetail).not.toHaveBeenCalled();
  });
});
