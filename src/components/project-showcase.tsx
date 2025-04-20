
export function ProjectShowcase() {
  const projects = [
    {
      name: 'Project 1',
      description: 'Short description of project 1.',
      link: '#',
    },
    {
      name: 'Project 2',
      description: 'Short description of project 2.',
      link: '#',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project.name} className="border rounded-md p-4">
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
            <p className="text-sm">{project.description}</p>
            <a href={project.link} className="text-primary hover:text-primary/80 block mt-2">
              View Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
