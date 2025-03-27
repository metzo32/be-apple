import React from "react";
import DetailCard from "./DetailCard";
import { macbookData } from "../../../public/fakeData/macbookData";

export default function DetailPage() {


  return (
    <div className="flex py-36">
      {/* {macbookData.map((item, index) => (
        <DetailCard key={index} title={item.title} image={item.image} />
      ))} */}

      <DetailCard title="제품상세 테스트" image="/assets/images/ipadAir601.png"/>
    </div>
  );
}
