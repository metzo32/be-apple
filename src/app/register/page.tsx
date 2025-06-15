"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchSignUp } from "@/components/fetch/fetchSignUp";
import { ButtonBasic } from "@/components/designs/ButtonBasic";
import ButtonStrong from "@/components/designs/ButtonStrong";
import { GoogleButton, KakaoButton } from "@/components/SocialLoginButton";
import CustomTextField from "@/components/designs/CustomTextField";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const router = useRouter();

  const NO_WHITESPACE_FIELDS = ["name", "email", "password", "passwordConfirm"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 공백문자 입력 무시
    if (NO_WHITESPACE_FIELDS.includes(name) && /\s/.test(value)) return;

    if (name === "email") {
      if (value.length > 100) return; // 100자 넘어가면 무시
    }

    if (name === "name") {
      if (value.length > 20) return;
    }

    if (name === "password" || name === "passwordConfirm") {
      if (value.length > 64) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.name.trim();

    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const { name, email, password } = formData;
    const response = await fetchSignUp({ name, email, password });

    if (response) {
      alert("회원가입이 완료되었습니다!");
      router.push("/login");
    } else {
      alert("회원가입 실패. 다시 시도해주세요.");
    }
  };

  return (
    <section className="py-12 md:py-20 flex flex-col items-center justify-center">
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col gap-3 md:gap-5">
          <CustomTextField
            id="email"
            name="email"
            label="이메일"
            type="text"
            value={formData.email}
            handleChange={handleChange}
            required={true}
          />

          <CustomTextField
            id="name"
            name="name"
            label="이름"
            type="text"
            value={formData.name}
            handleChange={handleChange}
            required={true}
          />

          <CustomTextField
            id="password"
            name="password"
            label="비밀번호"
            type="password"
            value={formData.password}
            handleChange={handleChange}
            required={true}
          />

          <CustomTextField
            id="passwordConfirm"
            name="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            value={formData.passwordConfirm}
            handleChange={handleChange}
            required={true}
          />
        </div>

        <div className="flex flex-col gap-5 md:gap-7">
          <div className="flex gap-10">
            <GoogleButton />
            <KakaoButton />
          </div>

          <ButtonStrong type="submit" text="가입하기" />
          <ButtonBasic
            type="button"
            text="로그인"
            onClick={() => router.push("/login")}
          />
        </div>
      </form>
    </section>
  );
}
