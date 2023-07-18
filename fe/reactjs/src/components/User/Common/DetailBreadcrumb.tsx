import * as React from 'react';
import { Link } from 'react-router-dom';

export interface IBreadCrumbProps {
    categoryType: string;
    name: string;
    categoryTypeLink: string;
}

export function DetailBreadCrumb({ categoryType, name, categoryTypeLink }: IBreadCrumbProps) {
    const redirectToCategoryType = (link: string) => {
        window.location.href = link;
      };

    return (
        // <!-- breadcrumb -->
        <div className="w-full flex max-md:p-2 bg-slate-100 md:py-2 cursor-pointer">
            <Link to = "/"><span className="span md:text-md">Trang chủ / </span></Link>
            <div><span className="span md:text-md" onClick={() => redirectToCategoryType(categoryTypeLink)}>{ categoryType } / </span></div>
            <span className="span md:text-md text-red-600"> { name } </span>
        </div>
    );
}
