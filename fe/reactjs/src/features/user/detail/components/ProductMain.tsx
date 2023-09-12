import * as React from 'react';
import { ProductArticle } from './ProductArticle';
import { ProductRating } from './ProductRating';
import { Rating } from '../../../../models/rating.model';

export interface IProductMainProps {
  contentHTML: string;
  productId: string;
  ratings: Rating[];
  totalRating: number;
  totalNumber: number;
}

export function ProductMain({ contentHTML, productId, ratings, totalNumber, totalRating }: IProductMainProps) {
  return (
    <div className="md:col-span-2">
      <div className="md:flex md:flex-col md:gap-2">
        <ProductArticle contentHTML={contentHTML} />
        <ProductRating productId={productId} ratings={ratings} totalNumber={totalNumber} totalRating={totalRating}/>
      </div>
    </div>
  );
}
