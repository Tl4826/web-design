import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Layout.module.css';

export default function Layout({ children, title = 'Thanh’s learning blog', home = false }) {
  return <div className={styles.container}>
    <Head><title>{title}</title><meta name="description" content="Notes from learning web development" /><meta property="og:title" content={title} /></Head>
    <header className={styles.header}>
      <Link href="/"><Image src="/profile.svg" width={home ? 112 : 64} height={home ? 112 : 64} alt="Blog logo" priority /></Link>
      <p className={styles.name}>Thanh’s learning blog</p>
    </header>
    <main>{children}</main>
    {!home && <p><Link href="/">← Back to home</Link></p>}
    <footer><Link href="/server-time">SSR example</Link> · <a href="/api/hello">API example</a></footer>
  </div>;
}
