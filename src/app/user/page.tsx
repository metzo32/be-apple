"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import SelectComp from "./SelectComp";
import LoadingScreen from "@/components/LoadingScreen";
import WishCard from "@/components/Wish/WishCard";
import AddButton from "@/components/AddButton";
import { macbookData } from "../../../public/fakeData/macbookData";
import SignOut from "@/components/SignOut";
import { useUserStore } from "@/stores/useUserStore";
import WishDetails from "@/components/Wish/WishDetails";

export default function UserPage() {
  const { user } = useUserStore();
  const [checking, setChecking] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || !user) {
      router.replace("/login");
    } else {
      setChecking(false);
    }
  }, [user]);

  if (checking || isSigningOut) return <LoadingScreen />;;

  return (
    <div className="relative">
      <WishDetails />
      <section className="userSection flex flex-col items-center gap-10">
        <h1 className="text-4xl font-bold">안녕하세요, {user?.name} 님.</h1>
        <SignOut setIsSigningOut={setIsSigningOut}/>
      </section>

      <section className="userSection">
        <h1 className="text-4xl font-bold mb-10">내 제품 목록</h1>
        <div className="w-full h-[400px] pr-5 flex items-center gap-5 lg:gap-20 overflow-x-scroll">
          <AddButton />
          {macbookData.map((item, index) => (
            <ProductCard
              key={index}
              name={item.name}
              image={item.image}
              details={item.details}
              month={item.month}
            />
          ))}
        </div>
      </section>

      <section className="userSection">
        <h1 className="text-4xl font-bold mb-10">내 위시리스트</h1>
        <div className="w-full h-[400px] flex items-center gap-5 lg:gap-20 overflow-x-scroll">
          <WishCard />
        </div>
      </section>

      <SelectComp />
    </div>
  );
}
