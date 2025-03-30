import { post, get } from "@/api/api";

export async function fetchSignIn(userData: {
  email: string;
  password: string;
}) {
  try {
    const response = await post("/auth/signin", userData);
    console.log("로그인 성공:", response.data);

    const token = response.data?.accessToken; //해당 유저 토큰 추출
    if (token) {
      localStorage.setItem("accessToken", token); //로컬 스토리지에 저장

      const userResponse = await get("/user/me"); //
      const userInfo = userResponse.data;

      return {
        accessToken: token,
        user: userInfo,
      };
    }
    return null;

  } catch (error: any) {
    console.error("로그인 실패:", error.response?.data || error.message);
    return null;
  }
}
