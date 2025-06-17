"use client";

import { useRouter } from "next/navigation";
import { ButtonBasic } from "./designs/ButtonBasic";

export default function ChangePassword() {
  const route = useRouter();

  const handleRoute = () => {
    route.push("/user/change_password");
  };

  return <ButtonBasic text="비밀번호 변경하기" onClick={handleRoute} />;
}
