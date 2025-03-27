"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

async function fetchProduct(category: string) {
  try {
    const response = await fetch(
      `https://stage-api.backend-challenge.com/product?category=${encodeURIComponent(category)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched MAC Product:", data);

    return data;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

interface ProductOption {
  processor: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
}

interface ProductItem {
  name: string;
  generation: string;
  releasedDate: string;
  weight: string;
  options: ProductOption[];
}

export default function TestPage() {
  const [data, setData] = useState<ProductItem[] | null>(null);

  useEffect(() => {
    fetchProduct("Mac").then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div>
      <h1>데이터 불러오기 테스트</h1>
      {data ? (
        data.map((item, index) => (
          <div key={index}>
            <Image
              src="/assets/images/macbook01.png"
              alt={item.name}
              width={300}
              height={200}
            />
            <h6>
              {item.name} {item.generation}
            </h6>
            <p>{item.releasedDate}</p>
            <p>{item.weight}</p>
            {item.options.map((option, index) => (
              <div key={index}>
                <p>{option.processor}</p>
                <p>{option.cpu}</p>
                <p>{option.gpu}</p>
                <p>{option.ram}</p>
                <p>{option.storage}</p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div>데이터 없음</div>
      )}
    </div>
  );
}
