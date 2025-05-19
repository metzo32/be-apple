"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchSignUp } from "@/components/fetch/fetchSignUp";
import ButtonBasic from "@/components/designs/ButtonBasic";
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
    <section className="py-18 md:py-32 flex flex-col items-center justify-center">
      <form
       className="w-[260px] h-[420px] md:w-[400px] md:h-[600px] py-10 px-10 md:py-12 md:px-16 shadow-strong flex flex-col gap-10 md:gap-16 items-center justify-center bg-white rounded-2xl"
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
