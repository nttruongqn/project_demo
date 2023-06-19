import * as React from "react";
import { Product } from "../../../../models";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box, Grid, Button, CircularProgress, TextField } from "@mui/material";
import {
  InputField,
  SelectGroupField,
} from "../../../../components/FormFields";
import { useAppSelector } from "../../../../app/hooks";
import { selectCategoryOptions } from "../../category/category.slice";

export interface ProductFormProps {
  initialValues?: Product;
  onSubmit?: (formValues: Product) => void;
}

export function ProductForm({ initialValues, onSubmit }: ProductFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Product>({
    defaultValues: initialValues,
  });
  const [imagePreview, setImagePreview] = React.useState<any>();
  const categoryOptions = useAppSelector(selectCategoryOptions);

  React.useEffect(() => {
    return () => {
      imagePreview && URL.revokeObjectURL(imagePreview.preview);
    };
  }, [imagePreview]);

  const handleImageChange = (event: any) => {
    // setSelectedFile(event.target.files[0]);
    const file = event.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImagePreview(file);
  };

  const handleFormSubmit = async (formValues: Product) => {
    if (imagePreview) {
      formValues.file = imagePreview;
    }
    try {
      await onSubmit?.(formValues);
    } catch (error) {
      console.log("Failed submit", error);
    }
  };

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <InputField name="name" control={control} label="Tên sản phẩm" />
            </Grid>
            <Grid item xs={6}>
              <InputField name="price" control={control} label="Giá" />
            </Grid>

            <Grid item xs={6}>
              <InputField
                name="descriptionSeo"
                control={control}
                label="Description Seo"
              />
            </Grid>
            <Grid item xs={6}>
              <InputField
                name="keywordSeo"
                control={control}
                label="KeywordSeo"
              />
            </Grid>

            <Grid item xs={6}>
              <SelectGroupField
                name="categoryId"
                control={control}
                label="Danh mục"
                options={categoryOptions}
              />
            </Grid>
            <Grid item xs={6}> </Grid>
            <Grid item xs={6} >
              <label className="flex flex-col">
                Ảnh:
                <input type="file" onChange={handleImageChange} />
              </label>
              {imagePreview && (
                <img className="my-4 w-[200px] h-[200px]" src={imagePreview.preview} alt="" />
              )}
               {!imagePreview && (
                <img className="my-4 w-[200px] h-[200px]" src={initialValues?.imageUrl} alt="" />
              )}
            </Grid>
          </Grid>

          <Box mt="20px">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting && <CircularProgress size={16} />} &nbsp;Lưu
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
