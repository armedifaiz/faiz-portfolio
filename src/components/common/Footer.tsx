import socials from '../../data/socials.json'
import { footer } from '../../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 bg-base-950 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-white/40 sm:flex-row">
        <p>&copy; {year} Faiz. {footer.credit}</p>
        <div className="flex gap-5">
          {(socials as { platform: string; url: string }[]).map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-accent"
            >
              {social.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
