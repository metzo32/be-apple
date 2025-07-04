import { Suspense } from "react";
import CallbackKakaoInner from "./kakaoInner";
import LoadingScreen from "@/components/LoadingScreen";

export default function page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CallbackKakaoInner />
    </Suspense>
  );
}
