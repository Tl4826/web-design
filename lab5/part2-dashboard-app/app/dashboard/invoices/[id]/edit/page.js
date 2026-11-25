import { notFound } from 'next/navigation';
import InvoiceForm from '../../../../ui/InvoiceForm';
import { getCustomers, getInvoice } from '../../../../lib/data';
import { updateInvoice } from '../../../../lib/actions';
export const metadata = { title: 'Edit invoice' };
export default async function Edit({ params }) {
  const { id } = await params;
  const [customers,invoice] = await Promise.all([getCustomers(),getInvoice(id)]);
  if (!invoice) notFound();
  return <><h1>Edit invoice</h1><InvoiceForm customers={customers} invoice={invoice} action={updateInvoice.bind(null,id)} /></>;
}
