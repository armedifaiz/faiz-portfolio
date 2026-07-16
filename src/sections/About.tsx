import SectionTitle from '../components/common/SectionTitle'
import FadeIn from '../components/ui/FadeIn'
import experience from '../data/experience.json'
import { about } from '../data/site'

interface Experience {
  role: string
  organization: string
  period: string
  duration: string
  type: string
  description: string
}

export default function About() {
  const list = experience as Experience[]

  return (
    <section id="about" className="bg-base-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          eyebrow={about.eyebrow}
          title={about.title}
          description={about.description}
        />
        <div className="space-y-4">
          {list.map((item, index) => (
            <FadeIn key={item.role + item.period} delay={index * 0.1}>
              <div className="glass flex flex-col gap-2 rounded-xl2 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{item.role}</h3>
                  <p className="text-sm text-white/50">{item.organization}</p>
                  <p className="mt-1 text-xs text-white/30">{item.type} &middot; {item.duration}</p>
                </div>
                <span className="text-xs uppercase tracking-wide text-accent">{item.period}</span>
              </div>
              {item.description && <p className="mt-3 text-sm text-white/50" dangerouslySetInnerHTML={{ __html: item.description }} />}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
