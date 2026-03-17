import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ClarityPath by DreamCatcher AI',
    short_name: 'ClarityPath',
    description:
      'Your Energy Elevation Partner. Discover your archetype, get daily energy guidance, and make better decisions.',
    start_url: '/',
    display: 'standalone',
    theme_color: '#059669',
    background_color: '#fffbeb',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
    ],
  }
}
