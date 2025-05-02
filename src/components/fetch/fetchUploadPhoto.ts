import { post } from "@/api/api";

export const fetchUploadPhoto = async (file: File) => {
  // 1. presigned URL 받아오기
  const extensionType = file.type.split("/")[1]; // 확장자명

  const { data } = await post<{ presignedUrl: string; url: string }>(
    "/aws/presigned-url",
    {
      extension: extensionType,
    }
  );

  // presignedUrl: 실제 S3로 PUT 요청을 보낼 URL (업로드용)
  // url : 업로드 완료 후, 브라우저에서 접근할 수 있는 public URL (보통 DB에 저장용)

  // // 2. S3로 직접 업로드
  const response = await fetch(data.presignedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type, // 반드시 필요! presigned URL 생성 시의 ContentType과 일치해야 함
    },
  });

  return data.url; // 미리보기 이미지 url
};
