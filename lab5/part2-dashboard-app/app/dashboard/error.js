'use client';
export default function Error({ reset }) {
  return <section className="panel"><h1>Something went wrong</h1><p>Check the database configuration and try again.</p><button className="button" onClick={reset}>Try again</button></section>;
}
