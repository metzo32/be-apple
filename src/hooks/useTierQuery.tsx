import { getMyTier } from "@/components/fetch/fetchSignIn";
import { useQuery } from "@tanstack/react-query";

export const useUserTierQuery = () =>
  useQuery({
    queryKey: ["myTier"],
    queryFn: getMyTier,
  });
