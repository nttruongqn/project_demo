import * as React from 'react';

export interface IHelmetProps {
    title: string;
    children: any;
}

export function Helmet({title, children}: IHelmetProps) {
    document.title = title;
    return (
       <>{children}</>
    );
}
