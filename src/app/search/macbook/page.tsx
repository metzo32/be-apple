"use client";

import { useState } from "react";

export default function MacbookPage() {
  const [selected, setSelected] = useState("");
  const options = [
    { value: "웹개발", label: "웹개발" },
    { value: "서버개발", label: "서버개발" },
    { value: "2D디자인", label: "2D디자인" },
    { value: "3D디자인", label: "3D디자인" },
    { value: "영상편집", label: "영상편집" },
    { value: "문서작업", label: "문서작업" },
    { value: "게임", label: "게임" },
  ];

  return (
    <div className="py-36">
      <div className="flex items-center justify-center gap-3">
        <h2 className="text-3xl font-bold text-light">저는</h2>

        <select
          id="work"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="p-2 rounded font-bold text-3xl text-center"
        >
          <option value="" disabled>
            ......
          </option>

          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <h2 className="text-3xl font-bold text-light">
          에 적합한 모델을 찾고 있어요.
        </h2>
      </div>
    </div>
  );
}
