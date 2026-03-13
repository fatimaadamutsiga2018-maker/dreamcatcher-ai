import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : undefined,
});

export const auth = betterAuth({
  appName: 'ClarityPath',
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXTAUTH_URL ||
    'https://www.dreamcatcherai.us',
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-build',
  database: pool,
  user: {
    modelName: 'cp_users',
    fields: {
      emailVerified: 'emailverified',
      createdAt: 'createdat',
      updatedAt: 'updatedat',
    },
  },
  session: {
    modelName: 'cp_sessions',
    fields: {
      userId: 'userid',
      expiresAt: 'expiresat',
      ipAddress: 'ipaddress',
      userAgent: 'useragent',
      createdAt: 'createdat',
      updatedAt: 'updatedat',
    },
  },
  account: {
    modelName: 'cp_accounts',
    fields: {
      accountId: 'accountid',
      providerId: 'providerid',
      userId: 'userid',
      accessToken: 'accesstoken',
      refreshToken: 'refreshtoken',
      idToken: 'idtoken',
      accessTokenExpiresAt: 'accesstokenexpiresat',
      refreshTokenExpiresAt: 'refreshtokenexpiresat',
      createdAt: 'createdat',
      updatedAt: 'updatedat',
    },
  },
  verification: {
    modelName: 'cp_verification_tokens',
    fields: {
      expiresAt: 'expiresat',
      createdAt: 'createdat',
      updatedAt: 'updatedat',
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  trustedOrigins: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3002',
    'http://127.0.0.1:3002',
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
