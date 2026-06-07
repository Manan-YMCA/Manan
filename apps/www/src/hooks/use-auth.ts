import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export function useSendOtp() {
  return useMutation({
    mutationFn: (email: string) =>
      authClient.emailOtp.sendVerificationOtp({ email, type: "sign-in" }),
  });
}

export function useVerifyOtp(email: string) {
  return useMutation({
    mutationFn: (otp: string) =>
      authClient.signIn.emailOtp({ email, otp }),
  });
}
