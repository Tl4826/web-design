'use server';
import { auth } from '../../auth';
import { db } from './db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect, notFound } from 'next/navigation';

const schema = z.object({
  customerId: z.string().uuid(),
  amount: z.coerce.number().finite().positive().max(1000000),
  status: z.enum(['pending','paid'])
});
async function requireUser() {
  if (!(await auth())?.user) redirect('/login');
}
function parse(formData) {
  return schema.safeParse({ customerId: formData.get('customerId'), amount: formData.get('amount'), status: formData.get('status') });
}
function refresh() {
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/invoices');
  revalidatePath('/dashboard/customers');
}
export async function createInvoice(previous, formData) {
  await requireUser();
  const parsed = parse(formData);
  if (!parsed.success) return { message: 'Select a customer, enter a valid positive amount and choose a status.' };
  const { customerId, amount, status } = parsed.data;
  try {
    await db()`INSERT INTO invoices(customer_id,amount,status,date) VALUES(${customerId},${Math.round(amount*100)},${status},CURRENT_DATE)`;
  } catch { return { message: 'Invoice could not be saved. Check the customer and database.' }; }
  refresh();
  redirect('/dashboard/invoices');
}
export async function updateInvoice(id, previous, formData) {
  await requireUser();
  const parsed = parse(formData);
  if (!parsed.success) return { message: 'Select a customer, enter a valid positive amount and choose a status.' };
  const { customerId, amount, status } = parsed.data;
  let rows;
  try {
    rows = await db()`UPDATE invoices SET customer_id=${customerId},amount=${Math.round(amount*100)},status=${status} WHERE id::text=${id} RETURNING id`;
  } catch { return { message: 'Invoice could not be updated.' }; }
  if (!rows.length) notFound();
  refresh();
  redirect('/dashboard/invoices');
}
export async function deleteInvoice(id) {
  await requireUser();
  await db()`DELETE FROM invoices WHERE id::text=${id}`;
  refresh();
  redirect('/dashboard/invoices');
}
