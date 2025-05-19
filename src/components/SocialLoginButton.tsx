"use client";

import Image from "next/image";

export const baseURL = process.env.NEXT_PUBLIC_API_URL; //기본 경로

export function GoogleButton() {
  const handleGoogle = () => {
    window.location.href = `${baseURL}/auth/signin/google`; //리다이렉션
  };

  return (
    <button
      onClick={handleGoogle}
      type="button"
      className="relative w-[20px] md:w-[30px] aspect-square"
    >
      <Image src={"/assets/icons/google.svg"} alt="구글" fill />
    </button>
  );
}

export function KakaoButton() {
  const handleKakao = () => {
    //리다이렉션
    window.location.href = `${baseURL}/auth/signin/kakao`;
  };

  return (
    <button
      onClick={handleKakao}
      type="button"
      className="relative w-[20px] md:w-[30px] aspect-square"
    >
      <Image src={"/assets/icons/kakao.svg"} alt="카카오" fill />
    </button>
  );
}
