import * as React from 'react';

export interface DashboardProps {
}

export function Dashboard (props: DashboardProps) {
  return (
    <div className='p-5 flex border-b justify-between h-[10%] w-full items-center'>
      <span className='font-bold text-2xl '>Dashboard</span>
    </div>
  );
}
