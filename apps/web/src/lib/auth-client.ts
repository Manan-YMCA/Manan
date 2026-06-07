import { createAuthClient } from "better-auth/react";
import { adminClient, emailOTPClient } from "better-auth/client/plugins";
import { backendEnabled } from "./runtime";

export const authEnabled = backendEnabled;

const client = backendEnabled
  ? createAuthClient({
      baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:4000",
      plugins: [adminClient(), emailOTPClient()],
      fetchOptions: {
        credentials: "include",
      },
    })
  : null;

export const authClient = client;

export const useSession = client
  ? client.useSession
  : () => ({
      data: null,
      isPending: false,
      refetch: async () => ({ data: null }),
    });

export const signOut = client
  ? client.signOut
  : async () => ({ data: null, error: null });

export async function sendLoginOtp(email: string) {
  if (!client) {
    return {
      error: {
        message:
          "Frontend preview mode is active. Authentication will work after backend setup.",
      },
    };
  }

  return client.emailOtp.sendVerificationOtp({
    email,
    type: "sign-in",
  });
}

export async function verifyLoginOtp(params: {
  email: string;
  otp: string;
  name?: string;
}) {
  if (!client) {
    return {
      error: {
        message:
          "Frontend preview mode is active. Authentication will work after backend setup.",
      },
    };
  }

  return client.signIn.emailOtp(params);
}
