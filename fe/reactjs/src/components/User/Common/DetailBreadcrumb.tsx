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
        <div className="items-center gap-1 flex max-md:overflow-x-auto flex-nowrap max-md:p-2 bg-slate-100 md:py-2 cursor-pointer">
            <div className="max-md:min-w-[700px] gap-1 flex">
                <Link to="/"><span className="span md:text-md max-md:text-sm block">Trang chủ / </span></Link>
                <div><span className="span md:text-md max-md:text-sm block" onClick={() => redirectToCategoryType(categoryTypeLink)}>{categoryType} / </span></div>
                <span className="span md:text-md text-red-600 max-md:text-sm block"> {name} </span>
            </div>
        </div>

    );
}
