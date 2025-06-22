import { useEffect, useState } from "react";

export const useUserProductModalPage = (isEditMode = false) => {
  // 전체 페이지
  const MAX_PAGE = 6;

  const [currentPageNumber, setCurrentPageNumber] = useState(
    isEditMode ? 1 : 0
  );

  useEffect(() => {
    if (isEditMode) {
      setCurrentPageNumber(1);
    }
  }, [isEditMode]);

  // 이전 페이지
  const handlePrevPage = (cannotMove = false) => {
    if (currentPageNumber === 0) {
      return;
    }
    if (currentPageNumber <= (isEditMode ? 1 : 0)) return;
    if (cannotMove) return;
    setCurrentPageNumber(currentPageNumber - 1);
  };

  // 다음 페이지
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
    setCurrentPageNumber(isEditMode ? 1 : 0);
  };

  return {
    MAX_PAGE,
    currentPageNumber,
    handlePrevPage,
    handleNextPage,
    initializePageNumber,
  };
};
