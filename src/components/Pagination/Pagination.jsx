import classNames from "classnames/bind";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import styles from "./Pagination.module.scss";
const cx = classNames.bind(styles);

function Pagination({ currentPage, totalPages, onPageChange }) {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={cx("page-number", { active: currentPage === i })}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={cx("pagination")}>
      <button
        className={cx("page-btn", "prev-btn")}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FiChevronLeft />
      </button>
      {renderPageNumbers()}
      <button
        className={cx("page-btn", "next-btn")}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FiChevronRight />
      </button>
    </div>
  );
}

export default Pagination; 