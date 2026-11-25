import postgres from 'postgres';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'node:crypto';

const { POSTGRES_URL, DEMO_EMAIL, DEMO_PASSWORD } = process.env;
if (!POSTGRES_URL || !DEMO_EMAIL || !DEMO_PASSWORD || DEMO_PASSWORD.length < 8 || DEMO_PASSWORD.length > 72) throw new Error('Set POSTGRES_URL, DEMO_EMAIL and DEMO_PASSWORD (8–72 characters) in .env.local.');
const sql = postgres(POSTGRES_URL,{max:1,prepare:false});
try {
  await sql.begin(async tx=>{
    await tx`CREATE TABLE IF NOT EXISTS users (id uuid PRIMARY KEY, name text NOT NULL, email text UNIQUE NOT NULL, password_hash text NOT NULL)`;
    await tx`CREATE TABLE IF NOT EXISTS customers (id uuid PRIMARY KEY, name text NOT NULL, email text UNIQUE NOT NULL)`;
    await tx`CREATE TABLE IF NOT EXISTS invoices (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), customer_id uuid NOT NULL REFERENCES customers(id), amount integer NOT NULL CHECK(amount>0), status text NOT NULL CHECK(status IN ('paid','pending')), date date NOT NULL)`;
    const hash = await bcrypt.hash(DEMO_PASSWORD,12);
    await tx`INSERT INTO users(id,name,email,password_hash) VALUES(${randomUUID()},'Demo User',${DEMO_EMAIL.toLowerCase()},${hash}) ON CONFLICT(email) DO UPDATE SET password_hash=EXCLUDED.password_hash`;
    for (const [name,email] of [['Alex Morgan','alex@example.test'],['Sam Taylor','sam@example.test'],['Jordan Lee','jordan@example.test']]) {
      await tx`INSERT INTO customers(id,name,email) VALUES(${randomUUID()},${name},${email}) ON CONFLICT(email) DO NOTHING`;
    }
    const customers=await tx`SELECT id FROM customers ORDER BY name`;
    const [count]=await tx`SELECT count(*)::int AS total FROM invoices`;
    if (!count.total) {
      for (let i=0;i<9;i++) {
        const date=new Date(Date.UTC(2026,i,10)).toISOString().slice(0,10);
        await tx`INSERT INTO invoices(customer_id,amount,status,date) VALUES(${customers[i%customers.length].id},${(i+1)*18500},${i%3===0?'pending':'paid'},${date})`;
      }
    }
  });
  console.log('Database initialized. Use the email and password from .env.local.');
} finally { await sql.end(); }
