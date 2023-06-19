import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../../../../models";
import { productApi } from "../../../../api/productApi";
import { AddEditPageHeader } from "../../../../components/Admin/Common/AddEditPageHeader";
import { ProductForm } from "../components/ProductForm";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { productActions, selectProductFilter } from "../product.slice";
import { selectCurrentUser } from "../../auth/auth.slice";

export function AddEditPage() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const filter = useAppSelector(selectProductFilter);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser)
  const userId = currentUser?.id;
  console.log('user', userId)

  const selectIsLoggedIn = useAppSelector(selectCurrentUser)
  console.log('selectIsLoggedIn', selectIsLoggedIn);


  const [product, setProduct] = React.useState<Product>();
  const isEdit = Boolean(productId);
  const add = "Tạo sản phẩm";
  const edit = "Sửa sản phẩm";
  const breadcrumb = "Sản phẩm";

  React.useEffect(() => {
    if (!productId) return;

    (async () => {
      try {
        const data: Product = await productApi.findById(productId);
        setProduct(data);
      } catch (error) {
        console.log("Failed api get product by id", error);
      }
    })();
  }, [productId]);

  const initialValues: Product = {
    name: "",
    price: "",
    descriptionSeo: "",
    keywordSeo: "",
    categoryId: "",
    ...product,
  } as Product;

  const handleFormData = (formValues: Product) => {
    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("price", formValues.price.toString());
    formData.append("keywordSeo", formValues.keywordSeo);
    formData.append("descriptionSeo", formValues.descriptionSeo);
    formData.append("categoryId", formValues.categoryId);
    if (userId) {
      formData.append("authId", userId);
    }

    if (formValues.file) {
      formData.append("file", formValues.file);
    }

    return formData;
  };

  const handleFormSubmit = async (formValues: Product) => {
    if (isEdit && productId) {
      if (!formValues.file) {
        if (userId) {
          formValues.authId = userId
        }
        await productApi.updateWithEmptyImage(formValues);
      } else {
        await productApi.update(handleFormData(formValues), productId);
      }
    } else {
      if (!formValues.file) {
        if (userId) {
          formValues.authId = userId
        } await productApi.addWithEmptyImage(formValues);
      } else {
        await productApi.add(handleFormData(formValues));
      }
    }

    const newFilter = { ...filter };
    dispatch(productActions.setFilter(newFilter));
    navigate("/admin/products/");
  };

  return (
    <>
      <div className="product__add-edit-wrapper w-full h-full flex flex-col">
        {isEdit ? (
          <AddEditPageHeader edit={edit} breadcrumb={breadcrumb} />
        ) : (
          <AddEditPageHeader add={add} breadcrumb={breadcrumb} />
        )}

        <div className="product__form p-5">
          {(!isEdit || Boolean(product)) && (
            <ProductForm
              initialValues={initialValues}
              onSubmit={handleFormSubmit}
            />
          )}
        </div>
      </div>
    </>
  );
}
