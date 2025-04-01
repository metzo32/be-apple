interface CommentArrProps {
    id: number;
    userName: string;
    date: string;
    img01: string | null;
    img02: string | null;
    product?: string[];
    comment: string;
  }

export const commentArr: CommentArrProps[] = [
    {
      id: 1,
      userName: "불닭유입자",
      date: "2025.04.01",
      img01: null,
      img02: null,
      comment:
        "후기후기후기 와 이거 참 잘샀다 후기후기후기 와 이거 참 잘샀다 세상에 이런 물건이 있나 안써본 사람 없게 해주세요",
    },
    {
      id: 2,
      userName: "내가짱이야",
      date: "2025.04.01",
      img01: "/assets/images/fallback.png",
      img02: "/assets/images/fallback.png",
      comment:
        "후기후기후기 와 이거 참 잘샀다 후기후기후기 와 이거 참 잘샀다 세상에 이런 물건이 있나 안써본 사람 없게 해주세요",
    },
    {
      id: 3,
      userName: "이웅모",
      date: "2025.04.01",
      img01: "/assets/images/fallback.png",
      img02: null,
      comment:
        "후기후기후기 와 이거 참 잘샀다 후기후기후기 와 이거 참 잘샀다 세상에 이런 물건이 있나 안써본 사람 없게 해주세요",
    },
  ];