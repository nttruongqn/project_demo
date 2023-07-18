import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../../../../models";
import { productApi } from "../../../../api/productApi";
import { AddEditPageHeader } from "../../../../components/Admin/Common/AddEditPageHeader";
import { ProductForm } from "../components/ProductForm";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { productActions, selectProductFilter } from "../product.slice";
import { selectCurrentUser } from "../../auth/auth.slice";
import { ProductPayload } from "../../../../models/product-payload.model";
import { ProductDataPayload } from "../../../../models/product-data-payload.model";
import { Helmet } from "../../../../components/Helmet/Helmet";

export function AddEditPage() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const filter = useAppSelector(selectProductFilter);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser)
  const userId = currentUser?.id;
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

  const handlePayload = (formValues: ProductDataPayload): ProductPayload => {
    const { id, name, categoryId, brandId, price, filmRearCameraId, advancedShootingId,
      wideScreenId, resolutionId, technologyScreenId, resolutionRearCameraId, resolutionFrontCameraId, videoCallId, operationSystemId,
      cpuId, gpuId, ramId, romId, bluetoothId, mobileNetworkId,
      chargingPortId, networkConnectionId, simId, wifiId, gpsId,
      otherConnectId, batteryTypeId, batteryTechnologyId, batteryCapacityId,
      designId, weightName, materialName, sizeName, sdCardId, isFlashLight, contentHTML, file
    } = formValues;
    return {
      id,
      name,
      price,
      categoryId,
      brandId,
      contentHTML,
      file,
      mobileSystem: {
        screen: {
          wideScreenId,
          resolutionId,
          technologyScreenId,
        },
        rearCamera: {
          advancedShootingId,
          filmRearCameraId,
          resolutionRearCameraId,
          isFlashLight: isFlashLight ? isFlashLight : false,
        },
        frontCamera: {
          resolutionFrontCameraId,
          videoCallId
        },
        operationSystemCPUGPU: {
          operationSystemId,
          cpuId,
          gpuId,
        },
        ramRom: {
          ramId,
          romId,
          sdCardId
        },
        connect: {
          bluetoothId,
          mobileNetworkId,
          networkConnectionId,
          chargingPortId,
          simId,
          wifiId,
          gpsId,
          otherConnectId
        },
        battery: {
          batteryTypeId,
          batteryCapacityId,
          batteryTechnologyId
        },
        designInfo: {
          designId,
          weightName,
          sizeName,
          materialName
        },
      }
    } as ProductPayload;
  }

  const handleFormData = (formValues: ProductPayload) => {
    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("price", formValues.price.toString());
    // formData.append("keywordSeo", formValues.keywordSeo);
    // formData.append("descriptionSeo", formValues.descriptionSeo);
    formData.append("categoryId", formValues.categoryId);
    formData.append("brandId", formValues.brandId);
    formData.append("contentHTML", formValues.brandId);
    formData.append("mobileSystem", JSON.stringify(formValues.mobileSystem));

    if (userId) {
      formData.append("authId", userId);
    }

    if (formValues.file) {
      formData.append("file", formValues.file);
    }
    return formData;
  };

  const handleFormSubmit = async (datas: ProductDataPayload) => {
    const formValues: ProductPayload = handlePayload(datas);
    console.log('formV', formValues);
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
        }
        console.log('formValues', formValues)
        await productApi.addWithEmptyImage(formValues);
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
      <Helmet title="Sản phẩm">
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
      </Helmet>
    </>
  );
}
