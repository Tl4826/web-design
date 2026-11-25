'use client';
import { useActionState } from 'react';
import Link from 'next/link';

export default function InvoiceForm({ customers, invoice, action }) {
  const [state, formAction, pending] = useActionState(action, { message: '' });
  return <form action={formAction} className="panel">
    <label htmlFor="customer">Customer</label>
    <select id="customer" name="customerId" required defaultValue={invoice?.customer_id || ''}><option value="" disabled>Select a customer</option>{customers.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select>
    <label htmlFor="amount">Amount (USD)</label><input id="amount" name="amount" type="number" min=".01" max="1000000" step=".01" required defaultValue={invoice ? invoice.amount/100 : ''} />
    <fieldset><legend>Status</legend><label className="radio"><input type="radio" name="status" value="pending" defaultChecked={!invoice || invoice.status==='pending'} required /> Pending</label><label className="radio"><input type="radio" name="status" value="paid" defaultChecked={invoice?.status==='paid'} /> Paid</label></fieldset>
    {state.message && <p role="alert" className="error">{state.message}</p>}
    <div className="actions"><Link className="secondary" href="/dashboard/invoices">Cancel</Link><button className="button" disabled={pending}>{pending?'Saving…':'Save invoice'}</button></div>
  </form>;
}
