import { useState } from "react";

export const useUserProductModalPage = () => {
  // 전체 페이지
    const MAX_PAGE = 6;
  
  const [currentPageNumber, setCurrentPageNumber] = useState(0);

  // 이전 페이지
  const handlePrevPage = (cannotMove = false) => {
    if (currentPageNumber === 0) {
      return;
    }
    if (cannotMove) return;
    setCurrentPageNumber(currentPageNumber - 1);
  };

  // 다음 페이지
  // TODO 이미 추가한 아이템 선택 시 alert
  const handleNextPage = (cannotMove = false) => {
    if (currentPageNumber > MAX_PAGE) {
      return;
    }
    if (cannotMove) {
      return alert("등록할 제품과 옵션을 선택해주세요.");
    }

    setCurrentPageNumber(currentPageNumber + 1);
  };

  const initializePageNumber = () => {
    setCurrentPageNumber(0)
  }

  return {
    MAX_PAGE,
    currentPageNumber,
    handlePrevPage,
    handleNextPage,
    initializePageNumber,
  }
}