import React, { useMemo, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import MastTitle from "../../Shared/MastTitle";
import CustomButton from "../../Shared/CustomButton";
import ErrorModal from "../../Shared/ErrorModal";
import LoadingScreen from "../../Shared/LoadingScreen";
import {
  authEnabled,
  sendLoginOtp,
  useSession,
  verifyLoginOtp,
} from "../../../lib/auth-client";

const initialState = {
  email: "",
  otp: "",
};

const MemberLogin = () => {
  const navigate = useNavigate();
  const { refetch } = useSession();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [formState, setFormState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const canSubmitEmail = useMemo(
    () => formState.email.trim().length > 4,
    [formState.email]
  );

  const canSubmitOtp = useMemo(
    () => formState.email.trim().length > 4 && formState.otp.trim().length >= 4,
    [formState.email, formState.otp]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const sendOtp = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage("");

      const { error: authError } = await sendLoginOtp(formState.email.trim());

      if (authError) {
        throw new Error(authError.message || "Unable to send OTP.");
      }

      setStep("otp");
      setSuccessMessage(
        `OTP sent to ${formState.email.trim()}. Check inbox and spam folder too.`
      );
    } catch (requestError: any) {
      setError(requestError?.message || "Unable to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage("");

      const { error: authError } = await verifyLoginOtp({
        email: formState.email.trim(),
        otp: formState.otp.trim(),
      });

      if (authError) {
        throw new Error(authError.message || "Invalid OTP.");
      }

      const refreshedSession: any = await refetch();
      const nextRole =
        refreshedSession?.data?.user?.role ||
        refreshedSession?.data?.data?.user?.role ||
        null;

      navigate(nextRole === "admin" ? "/add-events" : "/complete-profile", {
        replace: true,
      });
    } catch (requestError: any) {
      setError(requestError?.message || "Unable to verify OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      {loading && <LoadingScreen />}
      {error && <ErrorModal errorText={error} clicked={() => setError(null)} />}

      <MastTitle title="Member Login" />

      <div className="px-[1rem] py-[2rem] md:px-[5rem]">
        <div className="mx-auto max-w-[34rem] rounded border shadow-lg BackgroundBlurForm p-4 md:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#FB5343]">
                Club Access
              </p>
              <h2 className="mt-2 text-[28px] font-bold text-gray-900">
                Login With OTP
              </h2>
              <p className="mt-3 text-sm leading-7 text-gray-700">
                {!authEnabled
                  ? "Backend preview mode is active. Enable backend auth to continue."
                  : step === "email"
                    ? "Enter your allowed email address to receive a one-time login code."
                    : "Enter the OTP sent to your email to continue."}
              </p>
            </div>

            <div className="rounded-full border border-[#FB5343]/20 bg-[#fff2ee] px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#FB5343]">
              {step === "email" ? "Step 1" : "Step 2"}
            </div>
          </div>

          {successMessage && (
            <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {successMessage}
            </div>
          )}

          <div className="rounded-xl border border-[#FB5343]/15 bg-[#fff6f4] px-4 py-3 text-sm text-gray-700">
            Only admin email and allowed member emails can log in.
          </div>

          {authEnabled ? (
            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="member-login-email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email
                </label>
                <input
                  id="member-login-email"
                  name="email"
                  type="email"
                  autoFocus
                  value={formState.email}
                  onChange={handleChange}
                  disabled={loading || step === "otp"}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[18px] text-gray-900 outline-none transition focus:border-[#FB5343] focus:ring-2 focus:ring-[#FB5343]/20 disabled:bg-gray-100"
                />
              </div>

              {step === "otp" && (
                <div>
                  <label
                    htmlFor="member-login-otp"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    OTP
                  </label>
                  <input
                    id="member-login-otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    value={formState.otp}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Enter OTP"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[18px] text-gray-900 outline-none transition focus:border-[#FB5343] focus:ring-2 focus:ring-[#FB5343]/20 disabled:bg-gray-100"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900">
              Authentication is not enabled right now because backend auth is not active.
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <CustomButton onClick={() => navigate("/")}>
                <span className="px-2 py-1 font-bold text-black">Back</span>
              </CustomButton>

              {step === "otp" && (
                <CustomButton
                  onClick={() => {
                    setStep("email");
                    setFormState((prev) => ({ ...prev, otp: "" }));
                    setSuccessMessage("");
                  }}
                >
                  <span className="px-2 py-1 font-bold text-black">
                    Change Email
                  </span>
                </CustomButton>
              )}
            </div>

            <div className="flex items-center gap-3">
              {loading && <CircularProgress size={22} />}

              {authEnabled &&
                (step === "email" ? (
                  <CustomButton
                    onClick={canSubmitEmail ? sendOtp : undefined}
                    disabled={!canSubmitEmail || loading}
                  >
                    <span className="px-2 py-1 font-bold text-black">
                      Send OTP
                    </span>
                  </CustomButton>
                ) : (
                  <CustomButton
                    onClick={canSubmitOtp ? verifyOtp : undefined}
                    disabled={!canSubmitOtp || loading}
                  >
                    <span className="px-2 py-1 font-bold text-black">
                      Verify OTP
                    </span>
                  </CustomButton>
                ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MemberLogin;
