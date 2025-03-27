"use client";

import Image from "next/image";

export default function KakaoButton() {
  const handleKakao = () => { //리다이렉션
    window.location.href = "https://stage-api.backend-challenge.com/auth/signin/kakao";
  };

  return (
    <button onClick={handleKakao} type="button">
      <Image
        src={"/assets/icons/kakao.svg"}
        alt="카카오"
        width={50}
        height={50}
      />
    </button>
  );
}
