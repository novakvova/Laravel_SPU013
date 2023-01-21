import classNames from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";

interface PageItemProps {
  page: number;
  isActive?: boolean;
  text?: string;
  isDisabled?: boolean;
  onClickLink: (page: number) => void;
}

const PageItem: FC<PageItemProps> = ({ page, isActive=false, text=page, isDisabled=false,
    onClickLink }) => {
  return (
    <li className={classNames("page-item", {active: isActive}, {disabled: isDisabled})}>
      <Link to={"?page=" + page} className="page-link" onClick={(e)=>{
            e.preventDefault();
            onClickLink(page);
            }}>
        {text}
      </Link>
    </li>
  );
};

export default PageItem;
