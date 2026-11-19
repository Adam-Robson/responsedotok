import { PROJECT } from '@test/fixtures/project';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ProjectTags } from '@/components/projects/project-tags';

describe('ProjectTags', () => {
  test('labels the kind in words and shows the language', () => {
    render(<ProjectTags project={PROJECT} />);
    expect(screen.getByText('Site')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  test('omits the language when GitHub reports none', () => {
    render(<ProjectTags project={{ ...PROJECT, language: null }} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  test('flags archived repos so visitors know they are not maintained', () => {
    render(<ProjectTags project={{ ...PROJECT, archived: true }} />);
    expect(screen.getByText('Archived')).toBeInTheDocument();
  });
});
