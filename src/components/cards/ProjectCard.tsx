import { motion } from 'framer-motion'

interface Project {
  id: string
  name: string
  description: string
  githubUrl: string
  demoUrl: string | null
  language: string | null
  topics: string[]
  stars: number
  updatedAt: string
  thumbnail: string | null
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noreferrer"
      className="block"
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="glass flex h-full flex-col justify-between rounded-xl2 p-6"
      >
        <div>
          {project.thumbnail && (
            <img
              src={project.thumbnail}
              alt={project.name}
              className="mb-4 h-36 w-full rounded-lg object-cover"
            />
          )}
          <h3 className="font-display text-lg font-semibold text-white">{project.name}</h3>
          <p className="mt-2 text-sm text-white/60">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.language && (
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
                {project.language}
              </span>
            )}
            {project.topics.map((topic) => (
              <span key={topic} className="rounded-full border border-accent/30 px-3 py-1 text-xs text-accent">
                {topic}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center gap-4 text-sm">
          <span className="text-white/70 hover:text-white">
            GitHub
          </span>
          {project.demoUrl && (
            <span className="text-accent hover:text-accent-soft">
              Demo
            </span>
          )}
          <span className="ml-auto text-white/30">★ {project.stars}</span>
        </div>
      </motion.div>
    </a>
  )
}
