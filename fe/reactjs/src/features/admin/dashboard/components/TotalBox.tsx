import * as React from 'react';

export interface ITotalBoxProps {
    title: string;
    total: number;
}

export function TotalBox({ title, total }: ITotalBoxProps) {
    return (
        <>
            <div className="col-span-1 box-total h-[120px] border p-4 flex flex-col justify-center items-center shadow-md">
                <h2 className='uppercase '>{ title }</h2>
                <p className='font-bold'>{ total }</p>
            </div>
        </>
    );
}
