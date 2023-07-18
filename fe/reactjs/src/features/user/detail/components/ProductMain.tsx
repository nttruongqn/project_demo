import * as React from 'react';
import { ProductArticle } from './ProductArticle';
import { ProductComment } from './ProductComment';

export interface IProductMainProps {
  contentHTML: string;
}

export function ProductMain({ contentHTML }: IProductMainProps) {
  return (
    <div className="md:col-span-2">
      <div className="md:flex md:flex-col md:gap-2">
        <ProductArticle contentHTML={contentHTML} />
        <ProductComment />
      </div>
    </div>
  );
}
