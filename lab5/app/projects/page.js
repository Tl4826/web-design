import ProjectCard from '../../components/ProjectCard';

const projects = [
  { title: 'Lab 1', description: 'Practice GitHub Flow with a static website.', technology: 'HTML / Git', href: 'https://github.com/Tl4826/Tl4826.github.io' },
  { title: 'Lab 4', description: 'A responsive personal portfolio.', technology: 'Tailwind CSS / Vite', href: 'https://github.com/Tl4826/web-design/pull/2' },
  { title: 'Lab 5', description: 'A Next.js practice website. Assignment-specific requirements still need to be checked.', technology: 'React / Next.js' },
];

export default function Projects() {
  return (
    <section>
      <h1>My projects</h1>
      <div className="grid">
        {projects.map(project => <ProjectCard key={project.title} {...project} />)}
      </div>
    </section>
  );
}
