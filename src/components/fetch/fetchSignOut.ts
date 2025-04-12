export async function fetchSignOut() {
    try {
      localStorage.removeItem("accessToken"); 
      return true;
    } catch (error: any) {
      console.error("로그아웃 실패:", error.response?.data || error.message);
      return false;
    }
  }
  