import InvoiceForm from '../../../ui/InvoiceForm';
import { getCustomers } from '../../../lib/data';
import { createInvoice } from '../../../lib/actions';
export const metadata = { title: 'Create invoice' };
export default async function Create() {
  const customers = await getCustomers();
  return <><h1>Create invoice</h1><InvoiceForm customers={customers} action={createInvoice} /></>;
}
