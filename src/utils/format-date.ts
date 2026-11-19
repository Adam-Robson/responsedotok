/**
 * Formats an ISO timestamp as a short date, e.g. "Oct 1, 2026". Always UTC,
 * so a build renders the same text regardless of the server's time zone.
 */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(new Date(iso));
}
