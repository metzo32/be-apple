import React from "react";

export default function SearchCardSkeleton() {
  return (
    <>
      <div className="w-full h-[30px] bg-gray-400 rounded-md" />
      <div className="w-full h-[300px] bg-gray-400 rounded-md" />
      <div className="w-full flex flex-col gap-2 mt-auto">
        <div className="h-5 bg-gray-400 rounded" />
        <div className="h-4 bg-gray-400 rounded w-1/2" />
        <div className="h-4 bg-gray-400 rounded w-1/3" />
      </div>
    </>
  );
}
