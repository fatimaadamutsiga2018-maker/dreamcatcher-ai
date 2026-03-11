import { betterAuth } from 'better-auth';

export const auth = betterAuth({
  appName: 'ClarityPath',
  baseURL: process.env.NEXTAUTH_URL || 'https://www.dreamcatcherai.us',
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-build',
  trustedOrigins: [
    'https://www.dreamcatcherai.us',
    'https://dreamcatcherai.us',
    'https://dreamcatcher-ai-nine.vercel.app',
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    },
  },
});
