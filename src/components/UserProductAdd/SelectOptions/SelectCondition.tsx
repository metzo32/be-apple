import {
  UserProductCondition,
  UserProductConditionLables,
} from "@/types/userProduct";
import { FaCheck } from "react-icons/fa6";
import OptionTitle from "./OptionTitleForm";

interface SelectConditionProps {
  selectedCondition: string;
  onChangeCondition: (value: UserProductCondition) => void;
}

export default function SelectCondition({
  selectedCondition,
  onChangeCondition,
}: SelectConditionProps) {
  const conditions = Object.values(UserProductCondition);

  return (
    <OptionTitle title="제품 상태는...">
      <ul className="select-ul">
        {conditions.map((condition) => (
          <li
            key={condition}
            onClick={() => onChangeCondition(condition)}
            className={`text-sm md:text-base cursor-pointer select-none flex items-center gap-3 hover:text-mid ${
              selectedCondition === condition ? "text-green-600" : ""
            }`}
          >
            <span className="w-[20px] aspect-square">
              {selectedCondition === condition && (
                <FaCheck className="text-green-500" />
              )}
            </span>
            {UserProductConditionLables[condition]}
          </li>
        ))}
      </ul>
    </OptionTitle>
  );
}
