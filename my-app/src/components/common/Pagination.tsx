import { FC } from "react";
import { Link } from "react-router-dom";
import PageItem from "./PageItem";

interface PaginationProps {
  count_page: number;
  current_page: number;
}

const Pagination: FC<PaginationProps> = ({ count_page, current_page }) => {
  const buttons: Array<number> = [];

  for (let i = 0; i <= count_page; i++) {
    buttons.push(i);
  }

  const pagination = buttons.map((page) => {
    if(page===0)
    {
        return (
            <PageItem key={page} page={current_page-1} text="<" isDisabled={current_page===1} />
        );
    }
    else if (current_page <= 5) {
        if(page<=7 || page==count_page) {
            return <PageItem key={page} page={page} isActive={page === current_page} />;
        }
        if(page===8 && count_page!=page) {
            return <PageItem key={page} page={page} isActive={page === current_page} text="..." />;
        }
    }
  });

  return (
    <nav>
      <ul className="pagination">{pagination}</ul>
    </nav>
  );
};

export default Pagination;
