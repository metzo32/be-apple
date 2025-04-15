"use client";

import { useState } from "react";
import useOpenSelect from "@/stores/useOpenSelect";
import ButtonStrong from "@/components/designs/ButtonStrong";
import { basicDeviceData } from "../../../public/fakeData/basicDeviceData";
import {
  UserProductCondition,
  UserProductStatus,
  CreateUserProductReqDto,
} from "@/types/userProduct";
import { IoCloseOutline } from "react-icons/io5";

export default function SelectComp() {
  const { isClicked, setIsClicked } = useOpenSelect();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [formData, setFormData] = useState<CreateUserProductReqDto>({
    productId: 0,
    productOptionId: 0,
    purchasedAt: "",
    purchasePrice: 0,
    soldAt: "",
    status: UserProductStatus.ACTIVE,
    repurchasedCount: 0,
    condition: UserProductCondition.NEW,
    memo: "",
  });

  const handleClose = () => {
    setIsClicked(false);
  };

  const handleSubmit = () => {
    setIsClicked(false);
  };

  const MAX_LENGTH = 200;

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      memo: value,
    }));
  };
  


  return (
    <>
      {isClicked ? (
        <div className="overlay flex justify-center items-center">
          <div className="w-[500px] bg-custombg p-4 rounded relative">
            <button
              onClick={handleClose}
              className="w-8 h-8 text-4xl flex items-center justify-center absolute top-0 right-0 bg-bglight text-custombg hover:bg-light"
            >
              <IoCloseOutline />
            </button>
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

              <textarea
                id="memo"
                value={formData.memo}
                onChange={handleMemoChange}
                maxLength={MAX_LENGTH}
                placeholder="메모 남기기"
                className="w-full h-[150px] p-5 border-3 border-bglight text-base resize-none"
              />
              <p className="text-sm text-gray-500 text-right mt-1">
                {formData.memo.length} / {MAX_LENGTH}자
              </p>

              <ButtonStrong text="등록하기" type="submit" />
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
