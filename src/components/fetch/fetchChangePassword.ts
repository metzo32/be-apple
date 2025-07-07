import { post } from "@/api/api";

export async function postResetPasswordRequest(changePasswordData: {
  email: string;
  currentPassword: string;
}) {
  try {
    const response = await post(
      `/auth/password/reset-request`,
      changePasswordData
    );
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error };
  }
}

export async function postVerifyCodeRequest(verifyCodeData: {
  email: string;
  code: string;
}) {
  try {
    const response = await post(`/auth/password/verify-code`, verifyCodeData);
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error };
  }
}

export async function postResetPasswordFinalRequest(verifyCodeData: {
  email: string;
  code: string;
}) {
  try {
    const response = await post(`/auth/password/reset`, verifyCodeData);
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error };
  }
}