import { PROJECT } from '@test/fixtures/project';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ProjectPreview } from '@/components/projects/project-preview';

describe('ProjectPreview', () => {
  test('embeds the live site when framing is allowed', () => {
    render(<ProjectPreview project={{ ...PROJECT, embed: true }} />);
    const frame = screen.getByTitle('Thing live preview');
    expect(frame.tagName).toBe('IFRAME');
    expect(frame).toHaveAttribute('src', 'https://thing.example');
  });

  test('sandboxes and lazy-loads the iframe to limit it', () => {
    render(<ProjectPreview project={{ ...PROJECT, embed: true }} />);
    const frame = screen.getByTitle('Thing live preview');
    expect(frame).toHaveAttribute(
      'sandbox',
      'allow-scripts allow-same-origin allow-forms',
    );
    expect(frame).toHaveAttribute('loading', 'lazy');
  });

  test('falls back to the screenshot, linked to the live site', () => {
    render(<ProjectPreview project={PROJECT} />);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://thing.example',
    );
    expect(screen.getByAltText('Screenshot of Thing')).toBeInTheDocument();
  });

  test('shows an unlinked screenshot when there is no live site', () => {
    render(<ProjectPreview project={{ ...PROJECT, liveUrl: null }} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByAltText('Screenshot of Thing')).toBeInTheDocument();
  });

  test('renders nothing without an embed or a screenshot', () => {
    const { container } = render(
      <ProjectPreview project={{ ...PROJECT, image: null }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
