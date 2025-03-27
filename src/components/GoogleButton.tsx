"use client";

import Image from "next/image";

export default function GoogleButton() {


  const handleGoogle = () => {
    window.location.href =
      "https://stage-api.backend-challenge.com/auth/signin/google"; //리다이렉션
  };

  return (
    <button onClick={handleGoogle} type="button">
      <Image
        src={"/assets/icons/google.svg"}
        alt="구글"
        width={50}
        height={50}
      />
    </button>
  );
}
