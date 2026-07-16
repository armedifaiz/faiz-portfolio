export interface Project {
  id: string
  name: string
  description: string
  githubUrl: string
  demoUrl: string | null
  language: string | null
  topics: string[]
  stars: number
  updatedAt: string
  thumbnail: string | null
}