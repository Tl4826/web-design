import Link from 'next/link';
import { auth, signOut } from '../../auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({ children }) {
  const session = await auth();
  if (!session?.user) redirect('/login');
  return <div className="dashboard">
    <aside className="sidebar"><Link href="/" className="brand-banner">◉ Acme</Link>
      <nav aria-label="Dashboard navigation"><Link href="/dashboard">Overview</Link><Link href="/dashboard/invoices">Invoices</Link><Link href="/dashboard/customers">Customers</Link></nav>
      <form action={async () => { 'use server'; await signOut({ redirectTo: '/' }); }}><button className="secondary">Sign out</button></form>
    </aside>
    <main className="content">{children}</main>
  </div>;
}
