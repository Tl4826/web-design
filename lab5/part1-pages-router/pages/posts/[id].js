import Layout from '../../components/Layout';
import { getPostPaths, getPost } from '../../lib/posts';

export function getStaticPaths() {
  return { paths: getPostPaths(), fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: { post: await getPost(params.id) } };
}

export default function Post({ post }) {
  return <Layout title={post.title}>
    <article><h1>{post.title}</h1><time dateTime={post.date}>{post.date}</time>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  </Layout>;
}
