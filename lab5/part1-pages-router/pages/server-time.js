import Layout from '../components/Layout';
export async function getServerSideProps() {
  return { props: { time: new Date().toISOString() } };
}
export default function ServerTime({ time }) {
  return <Layout title="Server-side rendering"><h1>Server-side rendering</h1><p>Generated at request time: <time>{time}</time></p></Layout>;
}
