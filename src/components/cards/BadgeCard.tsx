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
      className={`relative flex w-40 shrink-0 flex-col overflow-hidden border border-card-border bg-card-bg transition-all duration-300 hover:shadow-lg ${rounded}`}
    >
      <div className={`relative flex aspect-square items-center justify-center bg-card-bg p-5 ${rounded}`}>
        <img
          src={badge.image_url}
          alt={badge.name}
          className="max-h-full max-w-full object-contain transition-all duration-300 hover:scale-110 hover:blur-sm"
          loading="lazy"
        />
        {/* Overlay text centered */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 hover:opacity-100">
          <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
            Tap to Verify
          </span>
        </div>
      </div>
    </a>
  )
}
