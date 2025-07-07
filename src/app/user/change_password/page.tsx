"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ButtonStrong, {
  ButtonDisabled,
} from "@/components/designs/ButtonStrong";
import CustomTextField from "@/components/designs/CustomTextField";
import { useUserStore } from "@/stores/useUserStore";
import LoadingScreen from "@/components/LoadingScreen";
import {
  postResetPasswordFinalRequest,
  postResetPasswordRequest,
  postVerifyCodeRequest,
} from "@/components/fetch/fetchChangePassword";

export default function ChangePasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  // 1단계
  const [emailAndCurPassword, setEmailAndCurPassword] = useState({
    email: "",
    currentPassword: "",
  });
  // 2단계
  const [emailAndCode, setEmailAndCode] = useState({
    email: emailAndCurPassword.email,
    code: "",
  });
  // 3단계
  const [finalAndNewPassword, setFinalAndNewPassword] = useState({
    email: emailAndCurPassword.email,
    code: emailAndCode.code,
    newPassword: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { user } = useUserStore();
  const router = useRouter();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || !user) {
      router.replace("/login");
    } else {
      setChecking(false);
    }
  }, []);

  const NO_WHITESPACE_FIELDS = ["email", "currentPassword"];

  const handleChangeEmailAndCurPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (NO_WHITESPACE_FIELDS.includes(name) && /\s/.test(value)) return;
    if (value.length > 100) return;
    if (name === "currentPassword" || name === "newPassword") {
      if (value.length > 64) return;
    }

    setEmailAndCurPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSendCode = async () => {
    setIsLoading(true);
    const result = await postResetPasswordRequest(emailAndCurPassword);
    setIsLoading(false);
    if (result.success) {
      setStep(1);
    } else {
      const errorResponse = (result.error as any)?.response?.data;
      const errorMessage =
        errorResponse?.message || "오류가 발생했습니다. 다시 시도해주세요.";
      alert(errorMessage);
    }
  };

  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userCode = e.target.value;

    setEmailAndCode({ email: emailAndCurPassword.email, code: userCode });
  };

  const handleVerifyCode = async () => {
    setIsLoading(true);
    const result = await postVerifyCodeRequest(emailAndCode);
    setIsLoading(false);
    if (result.success) {
      setStep(2);
    } else {
      const errorResponse = (result.error as any)?.response?.data;
      const errorMessage =
        errorResponse?.message || "오류가 발생했습니다. 다시 시도해주세요.";
      alert(errorMessage);
    }
  };

  const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userNewPassword = e.target.value;
    setFinalAndNewPassword({
      email: emailAndCode.email,
      code: emailAndCode.code,
      newPassword: userNewPassword,
    });
  };

  // 비밀번호 확인
  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmitNewPassword = async () => {
    setIsLoading(true);
    const result = await postResetPasswordFinalRequest(finalAndNewPassword);
    setIsLoading(false);
    if (finalAndNewPassword.newPassword === passwordConfirm && result.success) {
      alert("비밀번호를 성공적으로 변경했습니다.");
      router.push("/user");
    } else {
      const errorResponse = (result.error as any)?.response?.data;
      const errorMessage =
        errorResponse?.message || "오류가 발생했습니다. 다시 시도해주세요.";
      alert(errorMessage);
    }
  };

  return checking ? (
    <LoadingScreen />
  ) : (
    <section className="py-12 md:py-20 flex flex-col items-center justify-center">
      {step === 0 && (
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col gap-3 md:gap-5">
            <CustomTextField
              id="email"
              name="email"
              label="이메일"
              type="text"
              value={emailAndCurPassword.email}
              handleChange={handleChangeEmailAndCurPassword}
              required={true}
            />

            <CustomTextField
              id="currentPassword"
              name="currentPassword"
              label="기존 비밀번호"
              type="password"
              value={emailAndCurPassword.currentPassword}
              handleChange={handleChangeEmailAndCurPassword}
              required={true}
            />
          </div>

          {isLoading ? (
            <ButtonDisabled text="인증번호 전송 중..." />
          ) : (
            <ButtonStrong
              type="submit"
              text="이메일로 인증번호 받기"
              onClick={handleSendCode}
            />
          )}
        </form>
      )}

      {step === 1 && (
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col gap-3 md:gap-5">
            <CustomTextField
              id="code"
              name="code"
              label="인증코드"
              type="text"
              value={emailAndCode.code}
              handleChange={handleChangeCode}
              required={true}
            />
          </div>

          {isLoading ? (
            <ButtonDisabled text="인증번호 확인 중..." />
          ) : (
            <ButtonStrong
              type="submit"
              text="인증하기"
              onClick={handleVerifyCode}
            />
          )}
        </form>
      )}

      {step === 2 && (
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col gap-3 md:gap-5">
            <CustomTextField
              id="newPassword"
              name="newPassword"
              label="새 비밀번호"
              type="password"
              value={finalAndNewPassword.newPassword}
              handleChange={handleChangeNewPassword}
              required={true}
            />

            <CustomTextField
              id="newPasswordConfirm"
              name="newPasswordConfirm"
              label="새 비밀번호 확인"
              type="password"
              value={passwordConfirm}
              handleChange={handlePasswordConfirmChange}
              required={true}
            />
          </div>

          {isLoading ? (
            <ButtonDisabled text="로딩 중..." />
          ) : (
            <ButtonStrong
              type="submit"
              text="비밀번호 변경하기"
              onClick={handleSubmitNewPassword}
            />
          )}
        </form>
      )}
    </section>
  );
}
