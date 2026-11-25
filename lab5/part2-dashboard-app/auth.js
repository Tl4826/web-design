import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { db } from './app/lib/db';

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' },
  providers: [Credentials({
    credentials: { email: { type: 'email' }, password: { type: 'password' } },
    async authorize(credentials) {
      const parsed = z.object({ email: z.string().email(), password: z.string().min(8).max(72) }).safeParse(credentials);
      if (!parsed.success) return null;
      const { email, password } = parsed.data;
      const [user] = await db()`SELECT id,name,email,password_hash FROM users WHERE email=${email.toLowerCase()}`;
      if (!user || !await bcrypt.compare(password,user.password_hash)) return null;
      return { id: String(user.id), name: user.name, email: user.email };
    }
  })],
  callbacks: {
    authorized({ auth, request }) {
      return !request.nextUrl.pathname.startsWith('/dashboard') || !!auth?.user;
    }
  }
});
