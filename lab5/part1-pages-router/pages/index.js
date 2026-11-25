import Link from 'next/link';
import Layout from '../components/Layout';
import { getSortedPosts } from '../lib/posts';

export function getStaticProps() {
  return { props: { posts: getSortedPosts() } };
}

export default function Home({ posts }) {
  return <Layout home>
    <p>A small blog about what I am learning in web design and development.</p>
    <h1>Blog</h1>
    <ul>{posts.map(post => <li key={post.id}>
      <Link href={'/posts/' + post.id}>{post.title}</Link><br />
      <time dateTime={post.date}>{post.date}</time>
    </li>)}</ul>
  </Layout>;
}
