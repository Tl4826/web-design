import Link from 'next/link';
import { getInvoices, money } from '../../lib/data';
import { deleteInvoice } from '../../lib/actions';

export const metadata = { title: 'Invoices' };
function pageUrl(query,page) {
  return '/dashboard/invoices?' + new URLSearchParams({ query, page: String(page) });
}
export default async function Invoices({ searchParams }) {
  const params = await searchParams;
  const query = typeof params.query === 'string' ? params.query.slice(0,120) : '';
  const requested = Number.parseInt(params.page,10);
  const { invoices, page, pages } = await getInvoices(query,Number.isFinite(requested)?requested:1);
  return <><h1>Invoices</h1><div className="toolbar"><form method="get" action="/dashboard/invoices" className="search"><label className="sr-only" htmlFor="query">Search invoices</label><input id="query" name="query" placeholder="Search invoices…" defaultValue={query} /><button className="secondary">Search</button></form><Link className="button" href="/dashboard/invoices/create">+ Create invoice</Link></div>
    <div className="table-wrap"><table><thead><tr><th>Customer</th><th>Email</th><th>Amount</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>{invoices.map(row=><tr key={row.id}><td>{row.name}</td><td>{row.email}</td><td>{money(row.amount)}</td><td>{row.date}</td><td><span className={'status '+row.status}>{row.status}</span></td><td><div className="actions"><Link href={'/dashboard/invoices/'+row.id+'/edit'}>Edit</Link><form action={deleteInvoice.bind(null,row.id)}><button className="danger" aria-label={'Delete invoice for '+row.name}>Delete</button></form></div></td></tr>)}</tbody></table>{!invoices.length&&<p className="empty">No invoices match your search.</p>}</div>
    <nav className="pagination" aria-label="Invoice pages">{page>1&&<Link className="secondary" href={pageUrl(query,page-1)}>Previous</Link>}<span>Page {page} of {pages}</span>{page<pages&&<Link className="secondary" href={pageUrl(query,page+1)}>Next</Link>}</nav>
  </>;
}
