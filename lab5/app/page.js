import Link from 'next/link';

export default function Home() {
  return (
    <section className="hero">
      <p className="tag">NEXT.JS PRACTICE</p>
      <h1>Welcome to my website</h1>
      <p>A small practice website using the Next.js App Router, reusable React components and responsive CSS.</p>
      <Link href="/projects" className="button">Explore projects</Link>
    </section>
  );
}
