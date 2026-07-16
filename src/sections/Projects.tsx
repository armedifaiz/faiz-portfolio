import { motion } from 'framer-motion'
import SectionTitle from '../components/common/SectionTitle'
import ProjectCard from '../components/cards/ProjectCard'
import projects from '../data/projects.json'
import type { Project } from '../types/project'
import { projects as pj } from '../data/site'

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Projects() {
  const list = projects as Project[]

  return (
    <section id="projects" className="bg-base-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow={pj.eyebrow}
          title={pj.title}
          description={pj.description}
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {list.map((project) => (
            <motion.div key={project.id} variants={item}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}