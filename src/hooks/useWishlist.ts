import { useState, useEffect } from "react";
import { fetchWishList } from "@/components/fetch/fetchWishList";

export function useWishlist() {
  const [wishData, setWishData] = useState([]);

  useEffect(() => {
    const loadWishList = async () => {
      const result = await fetchWishList();
      if (result?.data) {
        setWishData(result.data);
      }
    };
    loadWishList();
  }, []);

  return wishData;
}
