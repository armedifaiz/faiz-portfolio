import type { CredlyBadge } from '../../types/credly-badge'

interface BadgeCardProps {
  badge: CredlyBadge
}

export default function BadgeCard({ badge }: BadgeCardProps) {
  const isCert = badge.badge_url?.includes('certification') ?? false
  const rounded = isCert ? 'rounded-full' : 'rounded-xl2'

  return (
    <a
      href={badge.badge_url}
      target="_blank"
      rel="noreferrer"
      className={`relative flex w-40 shrink-0 flex-col overflow-hidden border border-card-border bg-card-bg transition-all duration-500 ${rounded}`}
    >
      <div className={`relative flex aspect-square items-center justify-center bg-card-bg p-5 ${rounded}`}>
        <img
          src={badge.image_url}
          alt={badge.name}
          className="max-h-full max-w-full object-contain transition-all duration-500 hover:scale-110 hover:blur-md"
          loading="lazy"
        />
        {/* Overlay — subtle, no pill */}
        <div className="absolute inset-0 flex items-end justify-center pb-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-all duration-500 hover:opacity-100">
          <span className="text-xs font-medium tracking-wide text-white/90">
            hit me up
          </span>
        </div>
      </div>
    </a>
  )
}
