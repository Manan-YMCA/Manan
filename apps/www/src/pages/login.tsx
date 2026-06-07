import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";
import { useSendOtp, useVerifyOtp } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

const emailSchema = z.object({
  email: z.email("Enter a valid email address"),
});

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be at least 6 digits"),
});

export function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [sentEmail, setSentEmail] = useState("");

  const sendOtp = useSendOtp();
  const verifyOtp = useVerifyOtp(sentEmail);

  const emailForm = useForm({
    defaultValues: { email: "" },
    validators: { onChange: emailSchema },
    onSubmit: ({ value }) => {
      const email = value.email.trim();
      sendOtp.mutate(email, {
        onSuccess: (result) => {
          if (result.error) {
            toast.error(result.error.message || "Unable to send OTP.");
            return;
          }
          setSentEmail(email);
          setStep("otp");
          toast.success(`OTP sent to ${email}`);
        },
        onError: () => toast.error("Unable to send OTP."),
      });
    },
  });

  const otpForm = useForm({
    defaultValues: { otp: "" },
    validators: { onChange: otpSchema },
    onSubmit: ({ value }) => {
      verifyOtp.mutate(value.otp.trim(), {
        onSuccess: (result) => {
          if (result.error) {
            toast.error(result.error.message || "Invalid OTP.");
            return;
          }
          const role = (result.data as any)?.user?.role ?? null;
          navigate(role === "admin" ? "/admin" : "/", { replace: true });
        },
        onError: () => toast.error("Invalid OTP."),
      });
    },
  });

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#FB5343]">
              Club Access
            </p>
            <CardTitle className="mt-2 text-xl">Login With OTP</CardTitle>
            <CardDescription className="mt-1">
              {step === "email"
                ? "Enter your allowed email address to receive a one-time login code."
                : "Enter the OTP sent to your email to continue."}
            </CardDescription>
          </div>
          <CardAction>
            <span className="border border-[#FB5343]/30 bg-[#FB5343]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#FB5343]">
              {step === "email" ? "Step 1" : "Step 2"}
            </span>
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="border border-[#FB5343]/15 bg-[#FB5343]/5 px-3 py-2 text-xs text-muted-foreground">
            Only admin and allowed member emails can log in.
          </div>

          {step === "email" ? (
            <form
              id="email-form"
              onSubmit={(e) => { e.preventDefault(); emailForm.handleSubmit(); }}
            >
              <FieldGroup>
                <emailForm.Field name="email">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name} className="text-xs font-semibold uppercase tracking-wide">
                          Email
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="email"
                          autoFocus
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          aria-invalid={isInvalid}
                          className="h-9"
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    );
                  }}
                </emailForm.Field>
              </FieldGroup>
            </form>
          ) : (
            <form
              id="otp-form"
              onSubmit={(e) => { e.preventDefault(); otpForm.handleSubmit(); }}
            >
              <FieldGroup>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email</p>
                  <p className="text-xs">{sentEmail}</p>
                </div>
                <otpForm.Field name="otp">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name} className="text-xs font-semibold uppercase tracking-wide">
                          OTP
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          inputMode="numeric"
                          autoFocus
                          autoComplete="one-time-code"
                          placeholder="Enter OTP"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          aria-invalid={isInvalid}
                          className="h-9"
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    );
                  }}
                </otpForm.Field>
              </FieldGroup>
            </form>
          )}
        </CardContent>

        <CardFooter className="justify-between">
          {step === "email" ? (
            <>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Back
              </Button>
              <emailForm.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <Button form="email-form" type="submit" disabled={!canSubmit || isSubmitting || sendOtp.isPending}>
                    {sendOtp.isPending ? "Sending…" : "Send OTP"}
                  </Button>
                )}
              </emailForm.Subscribe>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => { setStep("email"); otpForm.reset(); }}
              >
                Change Email
              </Button>
              <otpForm.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <Button form="otp-form" type="submit" disabled={!canSubmit || isSubmitting || verifyOtp.isPending}>
                    {verifyOtp.isPending ? "Verifying…" : "Verify OTP"}
                  </Button>
                )}
              </otpForm.Subscribe>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
