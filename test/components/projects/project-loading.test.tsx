import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ProjectLoading } from '@/components/projects/project-loading';

describe('ProjectLoading', () => {
  test('tells assistive technology the content is still loading', () => {
    render(<ProjectLoading />);
    expect(screen.getByText('Loading project…')).toHaveAttribute(
      'aria-busy',
      'true',
    );
  });
});
