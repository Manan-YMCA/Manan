import { useMemo, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Zoom } from "@mui/material";
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

const AuthModal = ({ open, onClose, onError }) => {
  const [step, setStep] = useState("email");
  const [formState, setFormState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const canSubmitEmail = useMemo(() => formState.email.trim().length > 4, [formState.email]);
  const canSubmitOtp = useMemo(
    () => formState.email.trim() && formState.otp.trim().length >= 4,
    [formState.email, formState.otp]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const resetModal = () => {
    setStep("email");
    setFormState(initialState);
    setLoading(false);
    onClose();
  };

  const sendOtp = async () => {
    try {
      setLoading(true);
      const { error } = await sendLoginOtp(formState.email.trim());

      if (error) {
        throw new Error(error.message || "Unable to send OTP");
      }

      setStep("otp");
    } catch (error) {
      onError?.(error.message || "Unable to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const { error } = await verifyLoginOtp({
        email: formState.email.trim(),
        otp: formState.otp.trim(),
        name: formState.name.trim() || undefined,
      });

      if (error) {
        throw new Error(error.message || "Invalid OTP");
      }

      resetModal();
      window.location.reload();
    } catch (error) {
      onError?.(error.message || "Unable to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      className="flex items-center justify-center"
      open={open}
      onClose={resetModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Zoom in={open}>
        <div className="w-[92%] max-w-[30rem] rounded-lg bg-white p-5 shadow-2xl">
          <h2 className="text-[22px] font-bold text-gray-900">Member Login</h2>
          <p className="mt-1 text-sm text-gray-600">
            {!authEnabled
              ? "Frontend preview mode is active. Login will be enabled after backend setup."
              : step === "email"
                ? "Enter your allowed email. We will send a one-time code."
                : "Enter the OTP sent to your email. If this is your first login, you can also add your name."}
          </p>

          {authEnabled ? (
            <div className="mt-5 space-y-4">
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                disabled={loading || step === "otp"}
              />

              {step === "otp" && (
                <>
                  <TextField
                    fullWidth
                    label="OTP"
                    name="otp"
                    value={formState.otp}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <TextField
                    fullWidth
                    label="Name (first login only)"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </>
              )}
            </div>
          ) : (
            <div className="mt-5 rounded-md bg-orange-50 p-4 text-sm text-orange-900">
              Public pages are fully available. Authentication, profile editing,
              and admin actions need the backend to be enabled later.
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-3">
            <CustomButton onClick={resetModal}>
              <p className="px-2 py-1 font-bold text-black">Close</p>
            </CustomButton>

            <div className="flex items-center gap-3">
              {loading && <CircularProgress size={24} />}
              {authEnabled &&
                (step === "email" ? (
                  <CustomButton onClick={canSubmitEmail ? sendOtp : undefined}>
                    <p className="px-2 py-1 font-bold text-black">Send OTP</p>
                  </CustomButton>
                ) : (
                  <CustomButton onClick={canSubmitOtp ? verifyOtp : undefined}>
                    <p className="px-2 py-1 font-bold text-black">Verify OTP</p>
                  </CustomButton>
                ))}
            </div>
          </div>
        </div>
      </Zoom>
    </Modal>
  );
};

export default AuthModal;
