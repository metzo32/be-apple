"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetchSignIn } from "@/components/fetch/fetchSignIn";
import ButtonBasic from "@/components/designs/ButtonMild";
import ButtonStrong from "@/components/designs/ButtonStrong";
import LoadingScreen from "@/components/LoadingScreen";
import GoogleButton from "@/components/GoogleButton";
import KakaoButton from "@/components/KakaoButton";
import { useUserStore } from "@/stores/useUserStore";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const { setUserInfo } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      router.push("/user");
    } else {
      setCheckingToken(false);
    }

    const savedEmail = localStorage.getItem("savedUserEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRemember(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    const response = await fetchSignIn({ email, password });

    if (response && response.accessToken) {
      alert("로그인 성공!");

      localStorage.setItem("accessToken", response.accessToken);
      setUserInfo(response.user);

      if (remember) {
        localStorage.setItem("savedUserEmail", email);
      } else {
        localStorage.removeItem("savedUserEmail");
      }

      router.push("/user");
    } else {
      alert("로그인 실패");
    }
  };

  const rememberMe = () => setRemember((prev) => !prev);

  return checkingToken ? (
    <LoadingScreen />
  ) : (
    <section className="py-32 flex flex-col items-center justify-center">
      <h1>로그인</h1>
      <form
        className="pt-24 flex flex-col gap-24 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-5 lg:gap-10">
            <label htmlFor="email">아이디</label>
            <input
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              autoComplete="username"
              required
              className="w-40 lg:w-60 border-b-2 border-text"
            />
          </div>
          <div className="flex items-center gap-5 lg:gap-10">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              autoComplete="current-password"
              required
              className="w-40 lg:w-60 border-b-2 border-text"
            />
          </div>

          <div className="flex gap-5 items-center justify-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={remember}
              onChange={rememberMe}
              className="hidden"
            />
            <span onClick={rememberMe} className="cursor-pointer">
              <Image
                src={
                  remember
                    ? "/assets/icons/check_active.svg"
                    : "/assets/icons/check_passive.svg"
                }
                alt="체크"
                width={20}
                height={20}
              />
            </span>
            <label
              htmlFor="rememberMe"
              className="cursor-pointer select-none w-35"
            >
              내 정보 기억하기
            </label>
          </div>
        </div>

        <div className="flex gap-10">
          <GoogleButton />
          <KakaoButton />
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
