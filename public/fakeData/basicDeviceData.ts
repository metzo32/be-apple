import { ProductCategoryEnum } from "@/types/productCategory";

type DeviceData = {
  id: number;
  category: ProductCategoryEnum;
  title: string;
  details: string[];
  image: string;
  alt: string;
};

export const basicDeviceData: DeviceData[] = [
  {
    id: 1,
    category: ProductCategoryEnum.MAC,
    title: "맥북",
    details: ["M1", "256GB"],
    image: "/assets/images/searchbar_macbook.png",
    alt: "Mac",
  },
  {
    id: 2,
    category: ProductCategoryEnum.IPHONE,
    title: "아이폰",
    details: ["512GB"],
    image: "/assets/images/searchbar_iphone.png",
    alt: "iPhone",
  },
  {
    id: 3,
    category: ProductCategoryEnum.IPAD,
    title: "아이패드",
    details: ["M3", "1TB"],
    image: "/assets/images/searchbar_ipad.png",
    alt: "iPad",
  },
  // {
  //     id: 4,
  //     title: "애플워치",
  //     details: ["49mm", "S9 SiP"],
  //     image: "/assets/images/watchUltra201.png",
  //     alt: "애플워치울트라2",
  // },
  // {
  //     id: 5,
  //     title: "전체",
  //     details: [],
  //     image: "/assets/images/airtag01.png",
  //     alt: "에어태그",
  // },
];
