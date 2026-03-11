import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';

export const auth = betterAuth({
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'ClarityPath',
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'https://www.dreamcatcherai.us',
  secret: process.env.AUTH_SECRET!,

  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema,
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
