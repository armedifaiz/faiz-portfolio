import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  href: string
  children: ReactNode
  variant?: 'solid' | 'outline'
}

export default function Button({ href, children, variant = 'solid' }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors'
  const styles =
    variant === 'solid'
      ? 'bg-accent text-white hover:bg-accent-soft'
      : 'border border-white/20 text-white hover:border-accent hover:text-accent'

  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles}`}
    >
      {children}
    </motion.a>
  )
}
