export default function Home() {
  return (
    <main
      id="main"
      className="mx-auto w-full max-w-[var(--page)] px-[var(--gutter)] py-16"
    >
      <h1>responsedotok</h1>
      <p className="max-w-[var(--measure)] text-fg-alt">
        A presentation layer for displaying and sharing development projects.
        The project list is coming soon.
      </p>
      <p className="text-fg-muted">
        Placeholder page. See{' '}
        <a href="https://github.com/Adam-Robson">GitHub</a> in the meantime.
      </p>
    </main>
  );
}
