"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import Image from "next/image";
import { fetchSignIn } from "@/components/fetch/fetchSignIn";
import { ButtonBasic } from "@/components/designs/ButtonBasic";
import ButtonStrong from "@/components/designs/ButtonStrong";
import LoadingScreen from "@/components/LoadingScreen";
import { GoogleButton, KakaoButton } from "@/components/SocialLoginButton";
import { TextField } from "@mui/material";
import CustomTextField from "@/components/designs/CustomTextField";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState<boolean>(false);
  const [checkingToken, setCheckingToken] = useState<boolean>(true);
  const { setUserInfo } = useUserStore();
  const router = useRouter();

  //TODO MUI Backdrop 으로 로그인 로딩 구현

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
    <section className="py-18 md:py-32 flex flex-col items-center justify-center">
      <form
        className="py-5 md:py-10 flex flex-col gap-3 md:gap-16 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col gap-5">
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
            id="password"
            name="password"
            label="비밀번호"
            type="password"
            value={formData.password}
            required={true}
            handleChange={handleChange}
          />

          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 md:gap-1">
              <input
                type="checkbox"
                id="rememberMe"
                checked={remember}
                onChange={rememberMe}
                className="hidden"
              />
              <span
                onClick={rememberMe}
                className="cursor-pointer relative w-[12px] md:w-[15px] aspect-square"
              >
                <Image
                  src={
                    remember
                      ? "/assets/icons/check_active.svg"
                      : "/assets/icons/check_passive.svg"
                  }
                  alt="체크"
                  fill
                />
              </span>
              <label
                htmlFor="rememberMe"
                className="w-[80px] md:w-[100px] cursor-pointer select-none text-xs md:text-sm text-mid"
              >
                내 정보 기억하기
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:gap-7 mt-3 md:mt-0">
          <div className="flex gap-5 md:gap-10">
            <GoogleButton />
            <KakaoButton />
          </div>

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
