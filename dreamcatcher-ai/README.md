# Dreamcatcher AI

This is a [Next.js](https://nextjs.org) project built with authentication and database support.

## Tech Stack

- **Framework**: Next.js 16.1.1
- **UI**: React 19.2.3, Tailwind CSS 4
- **Auth**: NextAuth 5.0.0-beta.30 (GitHub, Google, Credentials)
- **Database**: Prisma ORM + PostgreSQL

## Getting Started

### Prerequisites

- Node.js 20 or higher
- PostgreSQL database (local or cloud)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fatimaadamutsiga2018-maker/dreamcatcher-ai.git
cd dreamcatcher-ai
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
- `DATABASE_URL` - Your PostgreSQL connection string
- `DIRECT_URL` - Direct connection URL for Prisma
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` - GitHub OAuth (optional)
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - Google OAuth (optional)

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com/new).

### Environment Variables for Vercel

Add these in your Vercel project settings:

```
DATABASE_URL=your-production-database-url
DIRECT_URL=your-production-direct-url
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=https://your-app.vercel.app
```

### Database Setup for Production

For PostgreSQL on Vercel, use [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) or [Supabase](https://supabase.com).

After setting up your database, run migrations:

```bash
npx prisma migrate deploy
```

## Authentication

This app supports three authentication methods:

1. **GitHub OAuth** - Sign in with GitHub
2. **Google OAuth** - Sign in with Google
3. **Email/Password** - Traditional credentials

To enable OAuth providers, register your app:
- GitHub: https://github.com/settings/developers
- Google: https://console.cloud.google.com/apis/credentials

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── api/         # API routes
│   └── ...
├── components/      # React components
├── lib/            # Utility functions
└── shared/         # Shared code
    └── lib/        # Auth, Prisma, etc.
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://authjs.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
