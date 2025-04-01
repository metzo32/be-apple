"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserEquipCard from "@/components/UserEquip/UserEquipCard";
import SelectComp from "../../components/UserEquip/SelectComp";
import LoadingScreen from "@/components/LoadingScreen";
import WishList from "@/components/UserWishList/WishList";
// import WishDetails from "@/components/UserWishList/WishDetails";
import AddButton from "@/components/UserEquip/AddButton";
import { macbookData } from "../../../public/fakeData/macbookData";
import SignOut from "@/components/SignOut";
import { useUserStore } from "@/stores/useUserStore";

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

  if (checking || isSigningOut) return <LoadingScreen />;

  return (
    <div className="relative">
      {/* 위시리스트의 제품 정보 */}
      {/* <WishDetails />  */}
      <section className="userSection flex flex-col items-center gap-10">
        <h1 className="text-4xl font-bold">안녕하세요, {user?.name} 님.</h1>
        <SignOut setIsSigningOut={setIsSigningOut} />
      </section>

      <section className="userSection">
        <h1 className="text-4xl font-bold mb-10">내 제품 목록</h1>
        <div className="w-full h-[400px] pr-5 flex items-center gap-5 lg:gap-20 overflow-x-scroll">
          <AddButton />
          {macbookData.map((item, index) => (
            <UserEquipCard
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
          <WishList />
        </div>
      </section>

      <SelectComp />
    </div>
  );
}
