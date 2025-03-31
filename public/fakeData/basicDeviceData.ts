type DeviceData = {
    id: number;
    title: string;
    details: string[]; 
    image: string;
    alt: string;
  };

export const basicDeviceData: DeviceData[] = [
    {
        id: 1,
        title: "맥북",
        details: ["M1", "256GB"],
        image: "/assets/images/macbook01.png",
        alt: "맥북",
    },
    {
        id: 2,
        title: "아이폰",
        details: ["512GB"],
        image: "/assets/images/iphone16Pro01.png",
        alt: "아이폰16프로",
    },
    {
        id: 3,
        title: "아이패드",
        details: ["M3", "1TB"],
        image: "/assets/images/ipadAir601.png",
        alt: "아이패드에어6세대",
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
]