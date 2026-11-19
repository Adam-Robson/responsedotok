import { describe, expect, test } from 'vitest';
import { rewriteReadmeLinks } from '@/services/readme/rewrite-readme-links';

const ref = { owner: 'Adam-Robson', repo: 'thing', branch: 'main' };
const raw = 'https://raw.githubusercontent.com/Adam-Robson/thing/main/';
const blob = 'https://github.com/Adam-Robson/thing/blob/main/';

describe('rewriteReadmeLinks', () => {
  test('points relative images at raw files, which browsers can load', () => {
    expect(rewriteReadmeLinks('<img src="docs/a.png">', ref)).toBe(
      `<img src="${raw}docs/a.png">`,
    );
  });

  test('points relative links at the GitHub file view', () => {
    expect(rewriteReadmeLinks('<a href="CONTRIBUTING.md">c</a>', ref)).toBe(
      `<a href="${blob}CONTRIBUTING.md">c</a>`,
    );
  });

  test('keeps the original quote style', () => {
    expect(rewriteReadmeLinks("<img src='a.png'>", ref)).toBe(
      `<img src='${raw}a.png'>`,
    );
  });

  test('leaves absolute, //, mailto and # URLs alone', () => {
    const html = [
      '<a href="https://example.com/x">x</a>',
      '<img src="//cdn.example/z.png">',
      '<a href="mailto:a@b.c">m</a>',
      '<a href="#install">i</a>',
    ].join('');
    expect(rewriteReadmeLinks(html, ref)).toBe(html);
  });

  test('leaves empty URLs alone (no repo-root link)', () => {
    expect(rewriteReadmeLinks('<a href="">x</a>', ref)).toBe(
      '<a href="">x</a>',
    );
  });
});
