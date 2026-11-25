import 'server-only';
import { db } from './db';

export const PAGE_SIZE = 6;
export const money = cents => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(cents) / 100);

export async function getOverview() {
  const sql = db();
  const [summary, revenue, latest] = await Promise.all([
    sql`SELECT count(*)::int AS invoices, coalesce(sum(amount) FILTER (WHERE status='paid'),0)::int AS paid, coalesce(sum(amount) FILTER (WHERE status='pending'),0)::int AS pending, (SELECT count(*)::int FROM customers) AS customers FROM invoices`,
    sql`SELECT to_char(date_trunc('month',date),'YYYY-MM') AS month, sum(amount)::int AS amount FROM invoices WHERE status='paid' GROUP BY 1 ORDER BY 1`,
    sql`SELECT i.id, c.name, i.amount, i.status FROM invoices i JOIN customers c ON c.id=i.customer_id ORDER BY i.date DESC,i.id LIMIT 5`
  ]);
  return { summary: summary[0], revenue, latest };
}

export async function getInvoices(query, requestedPage) {
  const sql = db();
  const pattern = '%' + query + '%';
  const [count] = await sql`SELECT count(*)::int AS total FROM invoices i JOIN customers c ON c.id=i.customer_id WHERE c.name ILIKE ${pattern} OR c.email ILIKE ${pattern} OR i.status ILIKE ${pattern} OR cast(i.amount AS text) ILIKE ${pattern}`;
  const pages = Math.max(1, Math.ceil(count.total / PAGE_SIZE));
  const page = Math.min(pages, Math.max(1, requestedPage));
  const invoices = await sql`SELECT i.id,c.name,c.email,i.amount,i.status,to_char(i.date,'YYYY-MM-DD') AS date FROM invoices i JOIN customers c ON c.id=i.customer_id WHERE c.name ILIKE ${pattern} OR c.email ILIKE ${pattern} OR i.status ILIKE ${pattern} OR cast(i.amount AS text) ILIKE ${pattern} ORDER BY i.date DESC,i.id LIMIT ${PAGE_SIZE} OFFSET ${(page-1)*PAGE_SIZE}`;
  return { invoices, pages, page };
}

export async function getCustomers() {
  return db()`SELECT c.id,c.name,c.email,count(i.id)::int AS invoices,coalesce(sum(i.amount) FILTER (WHERE i.status='paid'),0)::int AS paid,coalesce(sum(i.amount) FILTER (WHERE i.status='pending'),0)::int AS pending FROM customers c LEFT JOIN invoices i ON i.customer_id=c.id GROUP BY c.id,c.name,c.email ORDER BY c.name`;
}

export async function getInvoice(id) {
  const [invoice] = await db()`SELECT id,customer_id,amount,status FROM invoices WHERE id::text=${id}`;
  return invoice || null;
}
