import FadeIn from '../ui/FadeIn'

interface SectionTitleProps {
  eyebrow: string
  title: string
  description?: string
}

export default function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <FadeIn className="mb-12 max-w-2xl">
      <span className="font-display text-sm uppercase tracking-[0.2em] text-accent">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base text-white/60">{description}</p>}
    </FadeIn>
  )
}
