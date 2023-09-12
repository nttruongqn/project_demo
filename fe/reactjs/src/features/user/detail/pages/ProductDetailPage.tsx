import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../../../models';
import { productApi } from '../../../../api/productApi';
import { Detail } from '../components/Detail';
import { RelatedProduct } from '../components/RelatedProduct';
import { DetailBreadCrumb } from '../../../../components/User/Common/DetailBreadcrumb';
import { MobileSystemComponent } from '../components/MobileSystem';
import { ProductMain } from '../components/ProductMain';
import { Helmet } from '../../../../components/Helmet/Helmet';
import { BackdropComponet } from '../../../../components/Backdrop/Backdrop';
import { Rating } from '../../../../models/rating.model';
import { ratingApi } from '../../../../api/ratingApi';

export function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = React.useState<Product>();
  const [relatedProducts, setRelatedProducts] = React.useState<Product[]>();
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [ratings, setRatings] = React.useState<Rating[]>([]);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setOpenBackdrop(true);
  //   }, 2000)
  //     setOpenBackdrop(false);
  // }, [])


  React.useEffect(() => {
    setTimeout(() => {
      ( async () => {
        const data = await productApi.findBySlug(slug as string);
        const productDetail = await productApi.findById(data.id as string);
        setProduct(productDetail)
        const dataRelatedProducts = await productApi.findRelatedProducts(data.id as string, data.categoryId);
        const ratings = await ratingApi.getById(data.id as string);
        setRatings(ratings);
        setRelatedProducts(dataRelatedProducts)
        window.scrollTo(0, 0);
      })()
    }, 0)
  }, [slug])



  return (
    <div>
      {product && (<Helmet title={product?.name as string}>
      <main className="bg-slate-100 min-h-[600px] pb-2">
        <div className="container">
          {product?.category.name && (<DetailBreadCrumb categoryType={product?.category.name as string} name={product?.name as string} categoryTypeLink='/dien-thoai.html' />)}
          {product && (<Detail id={product?.id as string} imageUrl={product?.imageUrl as string} name={product?.name as string} price={product?.price as number} percentDiscount={product?.sale as number} isSale={product?.isSale as boolean} number={product?.number as number} totalNumber={product?.totalNumber} totalRating={product?.totalRating}/>)}
          {relatedProducts && (<RelatedProduct relatedProducts={relatedProducts} />)}
          {/* <!-- main detail --> */}
          <div className="max-md:flex max-md:flex-col md:grid md:grid-cols-3 md:gap-2">
            {product?.mobileSystem && (<MobileSystemComponent mobileSystemData={product.mobileSystem} />)}
            {product?.contentHTML && <ProductMain contentHTML={product?.contentHTML} productId={product.id as string} ratings={ratings} totalNumber={product?.totalNumber} totalRating={product?.totalRating}/>}
          </div>
        </div>
      </main>
      <BackdropComponet isOpenBackdrop={openBackdrop}/>
      </Helmet>)}
    </div>
  );
}
