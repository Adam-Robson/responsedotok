export { proxy } from '@/api/routing/proxy';

/** Must be a literal: Next.js reads the matcher statically at build. */
export const config = { matcher: '/p/:repo' };
