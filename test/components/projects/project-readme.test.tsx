import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ProjectReadme } from '@/components/projects/project-readme';

describe('ProjectReadme', () => {
  test('renders GitHub-rendered HTML as markup, not as text', () => {
    render(<ProjectReadme html="<h2>Install</h2><p>Run it.</p>" />);
    const readme = screen.getByRole('region', { name: 'README' });
    expect(readme.querySelector('h2')).toHaveTextContent('Install');
    expect(readme).toHaveClass('prose');
  });

  test('renders nothing when the repo has no README', () => {
    const { container } = render(<ProjectReadme html={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
