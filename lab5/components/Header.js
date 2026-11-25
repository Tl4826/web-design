import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <nav className="nav" aria-label="Main navigation">
        <Link href="/" className="brand">Web Design</Link>
        <div className="links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
        </div>
      </nav>
    </header>
  );
}
