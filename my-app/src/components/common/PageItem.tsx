import classNames from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";

interface PageItemProps {
  page: number;
  isActive?: boolean;
  text?: string;
  isDisabled?: boolean;
}

const PageItem: FC<PageItemProps> = ({ page, isActive=false, text=page, isDisabled=false }) => {
  return (
    <li className={classNames("page-item", {active: isActive}, {disabled: isDisabled})}>
      <Link to={"?page=" + page} className="page-link">
        {text}
      </Link>
    </li>
  );
};

export default PageItem;
