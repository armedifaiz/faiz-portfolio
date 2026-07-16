import SectionTitle from '../components/common/SectionTitle'
import FadeIn from '../components/ui/FadeIn'
import skills from '../data/skills.json'
import { skills as sk } from '../data/site'

interface Skill {
  name: string
  slug: string
  icon: string
}

export default function Skills() {
  const list = skills as Skill[]

  return (
    <section id="skills" className="bg-base-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow={sk.eyebrow} title={sk.title} />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {list.map((skill, index) => (
            <FadeIn key={skill.slug} delay={index * 0.05}>
              <div className="glass flex flex-col items-center gap-3 rounded-xl2 p-6 text-center transition-colors hover:border-accent/40">
                <img src={skill.icon} alt={skill.name} className="h-8 w-8" loading="lazy" />
                <span className="text-sm text-white/70">{skill.name}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
