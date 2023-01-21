import { FC } from "react";
import { Link } from "react-router-dom";
import PageItem from "./PageItem";

interface PaginationProps {
  count_page: number;
  current_page: number;
  onHandleClick: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  count_page,
  current_page,
  onHandleClick,
}) => {
  const buttons: Array<number> = [];

  for (let i = 1; i <= count_page; i++) {
    buttons.push(i);
  }

  const pagination = buttons.map((page) => {
    if (current_page <= 5) {
      if (page <= 7 || page == count_page) {
        return (
          <PageItem
            onClickLink={onHandleClick}
            key={page}
            page={page}
            isActive={page === current_page}
          />
        );
      }
      if (page === 8 && count_page != page) {
        return (
          <PageItem
            onClickLink={onHandleClick}
            key={page}
            page={page}
            text="..."
          />
        );
      }
    } else if (current_page > 5) {
      if (page === 1) {
        return (
          <PageItem
            onClickLink={onHandleClick}
            key={page}
            page={page}
            isActive={page === current_page}
          />
        );
      }
      const range = count_page - current_page; //10 - 6 = 4, 10-7=3
      if (range <= 4) {
        const dot = current_page - (7 - range);
        if (page === dot) {
          return (
            <PageItem
              onClickLink={onHandleClick}
              key={page}
              page={page}
              text="..."
            />
          );
        } else if (current_page >= count_page - 5 && page > dot) {
          return (
            <PageItem
              onClickLink={onHandleClick}
              key={page}
              page={page}
              isActive={page === current_page}
            />
          );
        }
      } else if (range >= 5) {
        const dotleft = current_page - 3;
        const dotright = current_page + 3;
        if (page === dotleft || page === dotright) {
          return (
            <PageItem
              onClickLink={onHandleClick}
              key={page}
              page={page}
              text="..."
            />
          );
        }
        if (page > dotleft && page < dotright) {
          return (
            <PageItem
              onClickLink={onHandleClick}
              key={page}
              page={page}
              isActive={page === current_page}
            />
          );
        }
        if (page === count_page) {
          return (
            <PageItem
              onClickLink={onHandleClick}
              key={page}
              page={page}
              isActive={page === current_page}
            />
          );
        }
      }
    }
  });

  return (
    <nav>
      <ul className="pagination">
        <PageItem
          onClickLink={onHandleClick}
          page={current_page - 1}
          text="<"
          isDisabled={current_page === 1}
        />
        {pagination}
        <PageItem
          onClickLink={onHandleClick}
          page={current_page + 1}
          text=">"
          isDisabled={current_page === count_page}
        />
      </ul>
    </nav>
  );
};

export default Pagination;
