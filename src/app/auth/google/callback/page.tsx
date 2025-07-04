import LoadingScreen from "@/components/LoadingScreen";
import { Suspense } from "react";
import CallbackGoogleInner from "./googleInner";

export default function page() {
  return (
    <Suspense fallback={<LoadingScreen/>}>
      <CallbackGoogleInner/>
    </Suspense>
  )
}
