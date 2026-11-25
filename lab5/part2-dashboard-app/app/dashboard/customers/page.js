import { getCustomers, money } from '../../lib/data';

export const metadata = { title: 'Customers' };

export default async function Customers() {
  const customers = await getCustomers();
  return <><h1>Customers</h1><div className="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Invoices</th><th>Paid</th><th>Pending</th></tr></thead><tbody>{customers.map(c=><tr key={c.id}><td>{c.name}</td><td>{c.email}</td><td>{c.invoices}</td><td>{money(c.paid)}</td><td>{money(c.pending)}</td></tr>)}</tbody></table></div></>;
}
