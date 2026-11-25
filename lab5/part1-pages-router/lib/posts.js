import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const directory = path.join(process.cwd(), 'posts');

export function getSortedPosts() {
  return fs.readdirSync(directory).filter(file => file.endsWith('.md')).map(file => {
    const id = file.slice(0, -3);
    const { data } = matter(fs.readFileSync(path.join(directory, file), 'utf8'));
    return { id, title: String(data.title), date: String(data.date) };
  }).sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostPaths() {
  return getSortedPosts().map(({ id }) => ({ params: { id } }));
}

export async function getPost(id) {
  const { data, content } = matter(fs.readFileSync(path.join(directory, id + '.md'), 'utf8'));
  const rendered = await remark().use(html).process(content);
  return { id, title: String(data.title), date: String(data.date), contentHtml: String(rendered) };
}
