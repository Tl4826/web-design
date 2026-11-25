import 'server-only';
import postgres from 'postgres';

let client;
export function db() {
  if (!process.env.POSTGRES_URL) throw new Error('Set POSTGRES_URL in .env.local before running the dashboard.');
  client ??= postgres(process.env.POSTGRES_URL, { max: 5, prepare: false });
  return client;
}
