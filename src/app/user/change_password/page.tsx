"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postChangePassword } from "@/components/fetch/fetchSignUp";
import ButtonStrong from "@/components/designs/ButtonStrong";
import CustomTextField from "@/components/designs/CustomTextField";

export default function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  const router = useRouter();

  const NO_WHITESPACE_FIELDS = [
    "currentPassword",
    "newPassword",
    "newPasswordConfirm",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (NO_WHITESPACE_FIELDS.includes(name) && /\s/.test(value)) return;
    if (value.length > 100) return;
    if (name === "currentPassword" || name === "newPassword") {
      if (value.length > 64) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.newPassword !== formData.newPasswordConfirm) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    //TODO
    const response = await postChangePassword({
      password: formData.currentPassword,
      newPassword: formData.newPassword,
    });
  };

  return (
    <section className="py-12 md:py-20 flex flex-col items-center justify-center">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-3 md:gap-5">
          <CustomTextField
            id="currentPassword"
            name="currentPassword"
            label="기존 비밀번호"
            type="password"
            value={formData.currentPassword}
            handleChange={handleChange}
            required={true}
          />

          <CustomTextField
            id="newPassword"
            name="newPassword"
            label="새 비밀번호"
            type="password"
            value={formData.newPassword}
            handleChange={handleChange}
            required={true}
          />

          <CustomTextField
            id="newPasswordConfirm"
            name="newPasswordConfirm"
            label="새 비밀번호 확인"
            type="password"
            value={formData.newPasswordConfirm}
            handleChange={handleChange}
            required={true}
          />
        </div>

        <ButtonStrong type="submit" text="비밀번호 변경하기" />
      </form>
    </section>
  );
}
