import Link from 'next/link';
export default function NotFound() {
  return <section className="panel"><h1>Invoice not found</h1><p>The invoice may have been removed.</p><Link href="/dashboard/invoices">Return to invoices</Link></section>;
}
