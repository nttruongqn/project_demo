import * as React from 'react';
import { Link } from 'react-router-dom';

export interface IListBreadCrumbProps {
    categoryType: string;
}

export function ListBreadcrumb ({ categoryType }: IListBreadCrumbProps ) {
  return (
        <div className="max-md:p-2 bg-slate-100 md:py-2 cursor-pointer">
            <Link to = "/"><span className="span md:text-md">Trang chủ / </span></Link>
            <Link to = "/dien-thoai.html"><span className="span md:text-md text-red-700">{ categoryType }</span></Link>
        </div>
    );
}