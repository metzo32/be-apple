"use client";

import { useState } from "react";
import ButtonBasic from "@/components/designs/ButtonBasic";
import ButtonStrong from "@/components/designs/ButtonStrong";
import { useRouter } from "next/navigation";
import { fetchSignUp } from "@/components/fetch/fetchSignUp";
import { GoogleButton, KakaoButton } from "@/components/SocialLoginButton";
import { TextField } from "@mui/material";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    <section className="py-32 flex flex-col items-center justify-center">
      <form
        className="w-[400px] h-[600px] pt-36 pb-12 px-16 shadow-strong flex flex-col gap-14 items-center justify-center bg-white rounded-2xl"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col gap-5">
          <TextField
            required
            id="email"
            name="email"
            label="이메일"
            size="small"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            required
            id="name"
            name="name"
            label="이름"
            size="small"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            required
            id="password"
            name="password"
            label="비밀번호"
            type="password"
            size="small"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            required
            id="passwordConfirm"
            name="passwordConfirm"
            label="비밀번호"
            type="password"
            size="small"
            value={formData.passwordConfirm}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-7">
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
    // <section className="py-24 flex flex-col items-center justify-center">
    //   <h1>회원가입</h1>
    //   <form
    //     className="pt-20 lg:pt-30 flex flex-col gap-20 items-center justify-center"
    //     onSubmit={handleSubmit}
    //   >
    //     <div className="flex flex-col gap-5 lg:gap-10">
    //       <div className="register-label-box">
    //         <label htmlFor="email">이메일</label>
    //         <input
    //           id="email"
    //           name="email"
    //           type="text"
    //           onChange={handleChange}
    //           required
    //           className="w-45 lg:w-60 border-b-2 border-text"
    //         />
    //       </div>
    //       <div className="register-label-box">
    //         <label htmlFor="name">이름</label>
    //         <input
    //           id="name"
    //           name="name"
    //           type="text"
    //           onChange={handleChange}
    //           required
    //           className="w-45 lg:w-60 border-b-2 border-text"
    //         />
    //       </div>
    //       <div className="register-label-box">
    //         <label htmlFor="password">비밀번호</label>
    //         <input
    //           id="password"
    //           name="password"
    //           type="password"
    //           onChange={handleChange}
    //           required
    //           className="w-45 lg:w-60 border-b-2 border-text"
    //         />
    //       </div>
    //       <div className="register-label-box">
    //         <label htmlFor="password">비밀번호 확인</label>
    //         <input
    //           id="passwordConfirm"
    //           name="passwordConfirm"
    //           type="password"
    //           onChange={handleChange}
    //           required
    //           className="w-45 lg:w-60 border-b-2 border-text"
    //         />
    //       </div>
    //     </div>
    //     <div className="flex gap-10">
    //       <GoogleButton />
    //       <KakaoButton />
    //     </div>
    //     <div className="flex flex-col gap-10">
    //       <ButtonStrong type="submit" text="가입하기" />
    //       <ButtonBasic
    //         type="button"
    //         text="로그인"
    //         onClick={() => router.push("/login")}
    //       />
    //     </div>
    //   </form>
    // </section>
  );
}
