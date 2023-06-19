import * as React from "react";
import { Link } from "react-router-dom";

export interface ListPageHeaderProps {
  title: string;
  btnContent: string;
  linkButton: string;
}

export function ListPageHeader({
  title,
  btnContent,
  linkButton,
}: ListPageHeaderProps) {
  return (
    <div className="category__list-top flex  border-b justify-between w-full p-5 items-center h-[10%]">
      <h1 className="font-bold text-2xl">{title}</h1>
      <button className="p-2 bg-blue-600 text-white rounded-sm">
        <Link to={linkButton}>{btnContent}</Link>
      </button>
    </div>
  );
}
