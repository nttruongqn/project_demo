import * as React from 'react';
import { RatingNumber } from './RatingNumber';
import { RatingComment } from './RatingComment';
import { RatingForm } from './RatingForm';
import { Rating } from '../../../../models/rating.model';
import { ratingApi } from '../../../../api/ratingApi';
import { toast } from 'react-toastify';
import { number } from 'yup';

export interface IProductRatingProps {
  productId: string;
  ratings: Rating[];
  totalRating: number;
  totalNumber: number;
}

export function ProductRating({ productId, ratings, totalRating, totalNumber }: IProductRatingProps) {
  const [ratingNumber, setRatingNumber] = React.useState(0);

  const handleSetNumberRating = (numberRating: number) => {
    setRatingNumber(numberRating);
  }

  const initialValues: Rating = {
    ratingContent: "",
    ratingNumber: 0,
    fullName: "",
    phoneNumber: ""
  } as Rating;

    const handleRating = async (formValues: Rating) => {
    try {
      if(!ratingNumber) {
        toast.error('Vui lòng vote sao', {
          position: "bottom-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      formValues.ratingNumber = ratingNumber;
      formValues.productId = productId;
      await ratingApi.create(formValues)
      window.location.reload();

    } catch (error) {
      toast.error('Không thể gởi đánh giá', {
        position: "bottom-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    // <!-- rating product -->
    <section className="max-md:my-2 max-md:px-2 max-md:py-4 bg-white md:p-4 md:rounded-sm">
      <RatingNumber setRatingNumber={handleSetNumberRating} totalNumber={totalNumber} totalRating={totalRating} productId={productId} />
      <RatingComment ratingComments={ratings}/>
      <RatingForm initialValues={initialValues} onSubmit={handleRating} />
    </section>

  );
}
