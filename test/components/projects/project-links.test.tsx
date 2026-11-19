import { PROJECT } from '@test/fixtures/project';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ProjectLinks } from '@/components/projects/project-links';

describe('ProjectLinks', () => {
  test('links to the live site and the source', () => {
    render(<ProjectLinks project={PROJECT} />);
    expect(
      screen.getByRole('link', { name: 'Open Thing live site' }),
    ).toHaveAttribute('href', 'https://thing.example');
    expect(
      screen.getByRole('link', { name: 'Thing source on GitHub' }),
    ).toHaveAttribute('href', 'https://github.com/Adam-Robson/thing');
  });

  test('drops the live link when there is no live site', () => {
    render(<ProjectLinks project={{ ...PROJECT, liveUrl: null }} />);
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  test('opens in a new tab without giving the target page access', () => {
    render(<ProjectLinks project={PROJECT} />);
    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});
