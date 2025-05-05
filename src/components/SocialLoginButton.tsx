"use client";

import Image from "next/image";

export function GoogleButton() {
  const handleGoogle = () => {
    window.location.href =
      "https://stage-api.backend-challenge.com/auth/signin/google"; //리다이렉션
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
    window.location.href =
      "https://stage-api.backend-challenge.com/auth/signin/kakao";
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
