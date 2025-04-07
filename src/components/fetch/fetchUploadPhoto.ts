export const fetchUploadPhoto = async (file: File) => {
  // 1. presigned URL 받아오기
  const response = await fetch("/api/upload/presigned-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      extension: "jpg",
    }),
  });

  const { presignedUrl, url } = await response.json();
  //presignedUrl: 실제 S3로 PUT 요청을 보낼 URL (업로드용)
  //url : 업로드 완료 후, 브라우저에서 접근할 수 있는 public URL (보통 DB에 저장용)

  // 2. S3로 직접 업로드
  await fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": "image/jpeg", // 반드시 필요! presigned URL 생성 시의 ContentType과 일치해야 함
    },
  });
};
