"use client";

import Image from "next/image";

export function GoogleButton() {
  const handleGoogle = () => {
    window.location.href =
      "https://stage-api.backend-challenge.com/auth/signin/google"; //리다이렉션
  };

  return (
    <button onClick={handleGoogle} type="button">
      <Image
        src={"/assets/icons/google.svg"}
        alt="구글"
        width={30}
        height={30}
      />
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
    <button onClick={handleKakao} type="button">
      <Image
        src={"/assets/icons/kakao.svg"}
        alt="카카오"
        width={30}
        height={30}
      />
    </button>
  );
}
