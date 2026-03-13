-- NextAuth.js required tables for Supabase adapter
-- WITH cp_ PREFIX for ClarityPath project
-- Run this in Supabase SQL Editor

-- Create accounts table for OAuth providers
CREATE TABLE IF NOT EXISTS cp_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(provider, provider_account_id)
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS cp_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_token TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL,
  expires TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create users table (if not exists)
CREATE TABLE IF NOT EXISTS cp_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  email TEXT UNIQUE,
  email_verified TIMESTAMP,
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create verification_tokens table
CREATE TABLE IF NOT EXISTS cp_verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires TIMESTAMP NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- Add foreign key constraints
ALTER TABLE cp_accounts
  ADD CONSTRAINT fk_cp_accounts_user
  FOREIGN KEY (user_id)
  REFERENCES cp_users(id)
  ON DELETE CASCADE;

ALTER TABLE cp_sessions
  ADD CONSTRAINT fk_cp_sessions_user
  FOREIGN KEY (user_id)
  REFERENCES cp_users(id)
  ON DELETE CASCADE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cp_accounts_user_id ON cp_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_cp_sessions_user_id ON cp_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_cp_sessions_token ON cp_sessions(session_token);

-- Enable Row Level Security (RLS)
ALTER TABLE cp_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cp_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cp_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cp_verification_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own data" ON cp_users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own data" ON cp_users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- RLS Policies for accounts table
CREATE POLICY "Users can view their own accounts" ON cp_accounts
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- RLS Policies for sessions table
CREATE POLICY "Users can view their own sessions" ON cp_sessions
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- Allow service role to manage all tables
CREATE POLICY "Service role can manage accounts" ON cp_accounts
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage sessions" ON cp_sessions
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage users" ON cp_users
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage verification_tokens" ON cp_verification_tokens
  FOR ALL USING (auth.role() = 'service_role');
