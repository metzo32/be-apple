export async function fetchSignUp(userData: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      const response = await fetch(
        "https://stage-api.backend-challenge.com/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("회원가입 실패:", error);
      return null;
    }
  }
  