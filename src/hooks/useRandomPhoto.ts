import { useEffect, useState } from 'react'
import photos from '../data/photos.json'
import type { Photo } from '../types/photo'

const INTERVAL_MS = 8_000

export function useRandomPhoto(): Photo | null {
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    const list = photos as Photo[]
    if (list.length === 0) return

    // Start at a random position
    setIndex(Math.floor(Math.random() * list.length))

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % list.length)
    }, INTERVAL_MS)

    return () => clearInterval(id)
  }, [])

  const list = photos as Photo[]
  if (list.length === 0) return null

  return list[index] ?? list[0] ?? null
}
