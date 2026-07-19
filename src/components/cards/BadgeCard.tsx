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
      className={`group relative flex w-40 shrink-0 flex-col overflow-hidden border border-card-border bg-card-bg transition-shadow hover:shadow-lg ${rounded}`}
    >
      <div className={`flex aspect-square items-center justify-center bg-card-bg p-5 ${rounded}`}>
        <img
          src={badge.image_url}
          alt={badge.name}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-t from-card-bg to-transparent pb-3 pt-8 opacity-0 transition-opacity group-hover:opacity-100">
        <span className="rounded-full bg-[#ef4444] px-4 py-1.5 text-xs font-medium text-white shadow-md shadow-[#ef4444]/30 transition-transform hover:scale-105">
          Verify Credential
        </span>
      </div>
    </a>
  )
}
