import { Suspense } from 'react';
import { getOverview, money } from '../lib/data';

export const metadata = { title: 'Overview' };

async function Overview() {
  const { summary, revenue, latest } = await getOverview();
  const max = Math.max(1,...revenue.map(row => row.amount));
  return <>
    <div className="cards">{[['Collected',money(summary.paid)],['Pending',money(summary.pending)],['Invoices',summary.invoices],['Customers',summary.customers]].map(([label,value])=><section className="panel" key={label}><p>{label}</p><strong className="metric">{value}</strong></section>)}</div>
    <div className="overview-grid"><section className="panel"><h2>Revenue by month</h2>{revenue.length ? revenue.map(row=><div className="revenue-row" key={row.month}><span>{row.month}</span><div className="bar-track"><div className="bar" style={{width:100*row.amount/max+'%'}} /></div><span>{money(row.amount)}</span></div>) : <p>No paid invoices yet.</p>}</section>
    <section className="panel"><h2>Latest invoices</h2>{latest.length ? latest.map(row=><div className="latest" key={row.id}><span>{row.name}<small>{row.status}</small></span><strong>{money(row.amount)}</strong></div>) : <p>No invoices yet.</p>}</section></div>
  </>;
}

export default function Page() {
  return <><h1>Dashboard</h1><Suspense fallback={<p role="status">Loading financial summary…</p>}><Overview /></Suspense></>;
}
