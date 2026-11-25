import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Log in' };
export const dynamic = 'force-dynamic';

async function login(formData) {
  'use server';
  try {
    await signIn('credentials', { email: formData.get('email'), password: formData.get('password'), redirectTo: '/dashboard' });
  } catch (error) {
    if (error instanceof AuthError) redirect('/login?error=1');
    throw error;
  }
}

export default async function Login({ searchParams }) {
  const params = await searchParams;
  return <main className="login"><section className="panel"><h1>Log in to Acme</h1><form action={login}>
    <label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required />
    <label htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="current-password" required minLength={8} />
    {params.error && <p role="alert" className="error">Unable to sign in. Check your credentials and database setup.</p>}
    <button className="button">Log in</button>
  </form></section></main>;
}
