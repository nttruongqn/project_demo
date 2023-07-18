import * as React from 'react';

export interface IProductArticleProps {
  contentHTML: string;
}

export function ProductArticle({ contentHTML }: IProductArticleProps) {
  const [isShowMoreArticle, setIsShowMoreArticle] = React.useState(false);

  const handleChangeShowMoreArticle = () => {
    setIsShowMoreArticle(!isShowMoreArticle)
  }

  return (
    <div>
      <section className={!isShowMoreArticle ? "max-md:my-2 max-md:px-2 max-md:py-6 bg-white md:p-4 md:rounded-lg max-h-[850px] overflow-hidden relative" : "max-md:my-2 max-md:px-2 max-md:py-6 bg-white md:p-4 md:rounded-lg relative"} >
        <div dangerouslySetInnerHTML={{ __html: contentHTML }}></div>
        {!isShowMoreArticle && (<div className="more-content absolute w-full bottom-0 left-0 flex items-center justify-center cursor-pointer">
          <p className='text-center text-red-700 font-bold text-xl' onClick={handleChangeShowMoreArticle}>Xem thêm</p>
        </div>)}
        {isShowMoreArticle && (<div className="collapse-content md:absolute w-full bottom-0 left-0 flex items-center justify-center cursor-pointer max-md:border">
          <p className='text-center text-red-700 font-bold text-xl' onClick={handleChangeShowMoreArticle}>Thu gọn</p>
        </div>)}
      </section>
    </div>
  );
}
