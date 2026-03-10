import { Adapter } from "next-auth/adapters";
import { createClient } from "@supabase/supabase-js";

export function CustomSupabaseAdapter(
  url: string,
  secret: string
): Adapter {
  const supabase = createClient(url, secret, {
    auth: {
      persistSession: false,
    },
  });

  return {
    async createUser(user) {
      const { data, error } = await supabase
        .from("cp_users")
        .insert({
          name: user.name,
          email: user.email,
          email_verified: user.emailVerified,
          image: user.image,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async getUser(id) {
      const { data, error } = await supabase
        .from("cp_users")
        .select()
        .eq("id", id)
        .single();

      if (error) return null;
      return data;
    },

    async getUserByEmail(email) {
      const { data, error } = await supabase
        .from("cp_users")
        .select()
        .eq("email", email)
        .single();

      if (error) return null;
      return data;
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const { data, error } = await supabase
        .from("cp_accounts")
        .select("*, cp_users(*)")
        .eq("provider", provider)
        .eq("provider_account_id", providerAccountId)
        .single();

      if (error) return null;
      return data.cp_users;
    },

    async updateUser(user) {
      const { data, error } = await supabase
        .from("cp_users")
        .update({
          name: user.name,
          email: user.email,
          email_verified: user.emailVerified,
          image: user.image,
        })
        .eq("id", user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    async deleteUser(userId) {
      await supabase.from("cp_users").delete().eq("id", userId);
    },

    async linkAccount(account) {
      const { error } = await supabase.from("cp_accounts").insert({
        user_id: account.userId,
        type: account.type,
        provider: account.provider,
        provider_account_id: account.providerAccountId,
        refresh_token: account.refresh_token,
        access_token: account.access_token,
        expires_at: account.expires_at,
        token_type: account.token_type,
        scope: account.scope,
        id_token: account.id_token,
        session_state: account.session_state,
      });

      if (error) throw error;
    },

    async unlinkAccount({ providerAccountId, provider }) {
      await supabase
        .from("cp_accounts")
        .delete()
        .eq("provider", provider)
        .eq("provider_account_id", providerAccountId);
    },

    async createSession({ sessionToken, userId, expires }) {
      const { data, error } = await supabase
        .from("cp_sessions")
        .insert({
          session_token: sessionToken,
          user_id: userId,
          expires: expires,
        })
        .select()
        .single();

      if (error) throw error;

      return {
        sessionToken: data.session_token,
        userId: data.user_id,
        expires: new Date(data.expires),
      };
    },

    async getSessionAndUser(sessionToken) {
      const { data, error } = await supabase
        .from("cp_sessions")
        .select("*, cp_users(*)")
        .eq("session_token", sessionToken)
        .single();

      if (error) return null;
      if (!data) return null;

      return {
        session: {
          sessionToken: data.session_token,
          userId: data.user_id,
          expires: new Date(data.expires),
        },
        user: data.cp_users,
      };
    },

    async updateSession({ sessionToken, expires, userId }) {
      const updateData: any = {
        session_token: sessionToken,
      };

      if (expires) {
        updateData.expires = expires;
      }
      if (userId) {
        updateData.user_id = userId;
      }

      const { data, error } = await supabase
        .from("cp_sessions")
        .update(updateData)
        .eq("session_token", sessionToken)
        .select()
        .single();

      if (error) throw error;

      return {
        sessionToken: data.session_token,
        userId: data.user_id,
        expires: new Date(data.expires),
      };
    },

    async deleteSession(sessionToken) {
      await supabase
        .from("cp_sessions")
        .delete()
        .eq("session_token", sessionToken);
    },

    async createVerificationToken({ identifier, expires, token }) {
      const { data, error } = await supabase
        .from("cp_verification_tokens")
        .insert({
          identifier,
          token,
          expires: expires,
        })
        .select()
        .single();

      if (error) throw error;

      return {
        identifier: data.identifier,
        token: data.token,
        expires: new Date(data.expires),
      };
    },

    async useVerificationToken({ identifier, token }) {
      const { data, error } = await supabase
        .from("cp_verification_tokens")
        .delete()
        .eq("identifier", identifier)
        .eq("token", token)
        .select()
        .single();

      if (error) return null;

      return {
        identifier: data.identifier,
        token: data.token,
        expires: new Date(data.expires),
      };
    },
  };
}
