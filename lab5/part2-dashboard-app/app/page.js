import Link from 'next/link';

export default function Home() {
  return <main className="landing">
    <header className="brand-banner">◉ Acme</header>
    <div className="welcome"><section><h1>Welcome to Acme.</h1><p>Manage customers and invoices with a full-stack Next.js dashboard.</p><Link className="button" href="/login">Log in →</Link></section>
    <aside aria-label="Dashboard illustration" className="illustration"><div className="mock-row"><span>Revenue</span><strong>$12,480</strong></div><div className="mock-row"><span>Invoices</span><strong>24</strong></div><div className="mock-chart">{[30,65,45,80,55,95,70].map((height,i)=><div key={i} style={{height:height+'%'}} />)}</div><small>Illustrative sample figures</small></aside></div>
  </main>;
}
