import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionTitle from '../components/common/SectionTitle'
import CertificateCard from '../components/cards/CertificateCard'
import certificates from '../data/certificates.json'
import type { Certificate } from '../types/certificate'
import { certificates as cert } from '../data/site'

export default function Certificates() {
  const list = certificates as Certificate[]
  const [selected, setSelected] = useState<Certificate | null>(null)

  return (
    <section id="certificates" className="bg-base-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow={cert.eyebrow} title={cert.title} />
        {list.length === 0 ? (
          <p className="text-sm text-white/40">
            No certificates yet. Add via
            {' '}
            the CLI tool.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
            {list.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} onSelect={setSelected} />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="glass max-w-2xl overflow-hidden rounded-xl2"
            >
              <div className="max-h-[70vh] w-full overflow-hidden bg-base-700">
                <img
                  src={selected.imageUrl}
                  alt={selected.title}
                  className="w-full object-contain object-top"
                />
              </div>
              <div className="p-5">
                <p className="text-sm font-medium text-white">{selected.title}</p>
                {selected.issuer && (
                  <p className="mt-1 text-xs text-white/40">{selected.issuer}</p>
                )}
                {selected.description && (
                  <p className="mt-2 text-sm text-white/60">{selected.description}</p>
                )}
                <div className="mt-3 flex gap-3">
                  {selected.date && (
                    <span className="text-xs text-white/30">{selected.date}</span>
                  )}
                  {selected.category && (
                    <span className="rounded-full border border-accent/30 px-2.5 py-0.5 text-xs text-accent">
                      {selected.category}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
