"use client";

import { useState } from "react";
import useOpenSelect from "@/stores/useOpenSelect";
import ButtonStrong from "@/components/designs/ButtonStrong";
import { basicDeviceData } from "../../../public/fakeData/basicDeviceData";

export default function SelectComp() {
  const { isClicked, setIsClicked } = useOpenSelect();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSubmit = () => {
    setIsClicked(false);
  };

  return (
    <>
      {isClicked ? (
        <div className="w-screen h-screen p-64 bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-10">
          <div className="bg-custombg p-4 rounded">
            <form onSubmit={handleSubmit}>
              {basicDeviceData.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2 cursor-pointer mb-2"
                >
                  <input
                    type="radio"
                    name="custom-radio"
                    value={item.title}
                    checked={selectedOption === item.title}
                    onChange={() => setSelectedOption(item.title)}
                    className="accent-blue-600 w-4 h-4"
                  />
                  <span className="text-gray-800">{item.title}</span>
                </label>
              ))}
              <ButtonStrong text="등록하기" type="submit" />
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
