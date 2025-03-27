"use client";

import { useState } from "react";

export default function Test() {
  const [input, setInput] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  return <input value={input} onChange={handleChange} />;
}
