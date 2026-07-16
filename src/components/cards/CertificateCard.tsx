import { motion } from 'framer-motion'
import type { Certificate } from '../../types/certificate'

interface CertificateCardProps {
  certificate: Certificate
  onSelect: (certificate: Certificate) => void
}

export default function CertificateCard({ certificate, onSelect }: CertificateCardProps) {
  return (
    <motion.button
      onClick={() => onSelect(certificate)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col text-left"
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={certificate.imageUrl}
          alt={certificate.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="line-clamp-2 text-sm font-medium text-white">{certificate.title}</p>
        {certificate.issuer && (
          <p className="mt-1 line-clamp-1 text-xs text-white/40">{certificate.issuer}</p>
        )}
      </div>
    </motion.button>
  )
}