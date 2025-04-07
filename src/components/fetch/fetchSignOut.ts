import { post } from "@/api/api";

export async function fetchSignOut() {
    try {
      await post("/auth/logout", {}); 
      localStorage.removeItem("accessToken"); 
  
      return true;
    } catch (error: any) {
      console.error("로그아웃 실패:", error.response?.data || error.message);
      return false;
    }
  }
  