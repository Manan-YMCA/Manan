import { useMemo, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import {
  authEnabled,
  sendLoginOtp,
  verifyLoginOtp,
} from "../../../lib/auth-client";
import CustomButton from "../CustomButton";

const initialState = {
  email: "",
  otp: "",
  name: "",
};

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => Promise<void> | void;
}

const AuthModal = ({ open, onClose, onSuccess }: AuthModalProps) => {
  const [step, setStep] = useState("email");
  const [formState, setFormState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const canSubmitEmail = useMemo(
    () => formState.email.trim().length > 4,
    [formState.email]
  );
  const canSubmitOtp = useMemo(
    () => formState.email.trim() && formState.otp.trim().length >= 4,
    [formState.email, formState.otp]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (feedback?.type === "error") {
      setFeedback(null);
    }
  };

  const resetModal = () => {
    setStep("email");
    setFormState(initialState);
    setLoading(false);
    setFeedback(null);
    onClose();
  };

  const handleModalClose = (
    _event: object,
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick") {
      return;
    }

    resetModal();
  };

  const sendOtp = async () => {
    try {
      setLoading(true);
      setFeedback(null);
      const { error } = await sendLoginOtp(formState.email.trim());

      if (error) {
        throw new Error(error.message || "Unable to send OTP");
      }

      setStep("otp");
      setFeedback({
        type: "success",
        message: `OTP sent to ${formState.email.trim()}. Check inbox and spam folder too.`,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send OTP";
      setFeedback({
        type: "error",
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      setFeedback(null);
      const { error } = await verifyLoginOtp({
        email: formState.email.trim(),
        otp: formState.otp.trim(),
        name: formState.name.trim() || undefined,
      });

      if (error) {
        throw new Error(error.message || "Invalid OTP");
      }

      await onSuccess?.();
      resetModal();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to verify OTP";
      setFeedback({
        type: "error",
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      className="flex items-center justify-center"
      open={open}
      onClose={handleModalClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 350,
        sx: {
          backgroundColor: "rgba(255, 255, 255, 0.22)",
          backdropFilter: "blur(5px)",
        },
      }}
    >
      <div className="w-[92%] max-w-[28rem] rounded-[22px] border border-white/40 bg-white/[0.94] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.16)] outline-none">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#FB5343]">
              Club Access
            </p>
            <h2 className="mt-2 text-[26px] font-bold text-gray-900">
              Member Login
            </h2>
          </div>
          <div className="rounded-full bg-[#fff2ee] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FB5343]">
            {step === "email" ? "Step 1" : "Step 2"}
          </div>
        </div>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          {!authEnabled
            ? "Frontend preview mode is active. Login will be enabled after backend setup."
            : step === "email"
              ? "Enter your allowed email address and we will send a one-time code."
              : "Enter the OTP sent to your email. First-time members can also set a display name."}
        </p>

        {feedback && (
          <div
            className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
              feedback.type === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {feedback.message}
          </div>
        )}

        <div className="mt-4 rounded-2xl border border-[#FB5343]/15 bg-[#fff6f4] px-4 py-3 text-sm text-gray-700">
          Login sirf admin email aur allowed member emails ke liye open hai.
        </div>

        {authEnabled ? (
          <div className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="member-login-email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                id="member-login-email"
                autoFocus={step === "email"}
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                disabled={loading || step === "otp"}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 outline-none transition focus:border-[#FB5343] focus:ring-2 focus:ring-[#FB5343]/20 disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>

            {step === "otp" && (
              <>
                <div>
                  <label
                    htmlFor="member-login-otp"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    OTP
                  </label>
                  <input
                    id="member-login-otp"
                    autoFocus
                    name="otp"
                    value={formState.otp}
                    onChange={handleChange}
                    disabled={loading}
                    inputMode="numeric"
                    placeholder="Enter 6-digit code"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 outline-none transition focus:border-[#FB5343] focus:ring-2 focus:ring-[#FB5343]/20 disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="member-login-name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Name (first login only)
                  </label>
                  <input
                    id="member-login-name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Your full name"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 outline-none transition focus:border-[#FB5343] focus:ring-2 focus:ring-[#FB5343]/20 disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl bg-orange-50 p-4 text-sm text-orange-900">
            Public pages are fully available. Authentication, profile editing,
            and admin actions need the backend to be enabled later.
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <CustomButton onClick={resetModal}>
              <span className="px-2 py-1 font-bold text-black">Close</span>
            </CustomButton>

            {authEnabled && step === "otp" && (
              <CustomButton
                onClick={() => {
                  setStep("email");
                  setFormState((prev) => ({ ...prev, otp: "", name: "" }));
                  setFeedback(null);
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
    </Modal>
  );
};

export default AuthModal;
