export default function ProjectCard({ title, description, technology, href }) {
  return (
    <article className="card">
      <p className="tag">{technology}</p>
      <h2>{title}</h2>
      <p>{description}</p>
      {href && <a href={href}>View repository</a>}
    </article>
  );
}
