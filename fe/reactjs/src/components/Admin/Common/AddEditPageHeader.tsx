import * as React from "react";

export interface AddEditPageHeaderProps {
    add?: string;
    edit?: string;
    breadcrumb: string;
}

export function AddEditPageHeader({add, edit, breadcrumb}: AddEditPageHeaderProps) {
  return (
    <div className="category__add-edit-top flex flex-col border-b p-5 w-full gap-2">
      <h1 className="font-bold text-2xl">{add ? add : edit}</h1>
      <ul className="breadcrumb-list flex gap-1 font-medium">
        <li className="text-slate-500">{ breadcrumb } /</li>
        <li>{ add ? add : edit }</li>
      </ul>
    </div>
  );
}
