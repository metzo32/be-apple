export const baseURL = process.env.NEXT_PUBLIC_API_URL; // 기본 경로

export async function fetchSignUp(userData: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const response = await fetch(`${baseURL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

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

//TODO
export async function postChangePassword(changePasswordData: {
  password: string;
  newPassword: string;
}) {}
