"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ButtonBasic from "@/components/designs/ButtonMild";
import ButtonStrong from "@/components/designs/ButtonStrong";
import { fetchSignIn } from "@/components/fetch/fetchSignIn";
import LoadingScreen from "@/components/LoadingScreen";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formData;
    const response = await fetchSignIn({ email, password });

    if (response) {
      alert("로그인 성공!");

      if (remember) {
        localStorage.setItem("savedUserEmail", email);
      } else {
        localStorage.removeItem("savedUserEmail");
      }

      router.push("/");
    } else {
      alert("로그인 실패");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.replace("/user");
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedUserEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRemember(true);
    }
    console.log("로컬 아이디:", savedEmail);
  }, []);

  return isLoading ? (
   <LoadingScreen/>
  ) : (
    <section className="py-48 flex flex-col items-center justify-center">
      <h1>로그인</h1>
      <form
        className="pt-24 flex flex-col gap-30 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-10">
          <div className="flex items-center  gap-5 lg:gap-10">
            <label htmlFor="username">아이디</label>
            <input
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-40 lg:w-60 border-b-2 border-text"
            />
          </div>
          <div className="flex items-center  gap-5 lg:gap-10">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              required
              className="w-40 lg:w-60 border-b-2 border-text"
            />
          </div>

          <div className="flex gap-5 items-center justify-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={remember}
              onChange={() => setRemember(!remember)}
              // className="hidden"
            />
            <span className="text-2xl text-primary">
              {/* {remember ? <AiFillFire /> : <AiOutlineFire />} */}
            </span>
            <label
              htmlFor="rememberMe"
              className="cursor-pointer select-none w-35"
            >
              내 정보 기억하기
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <ButtonStrong type="submit" text="로그인" />
          <ButtonBasic
            type="button"
            text="가입하기"
            onClick={() => router.push("/register")}
          />
        </div>
      </form>
    </section>
  );
}
