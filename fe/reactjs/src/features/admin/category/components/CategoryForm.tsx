import { Box, Button, CircularProgress, Grid } from "@mui/material";
import * as React from "react";
import { Category } from "../../../../models";
import { useForm } from "react-hook-form";
import { InputField } from "../../../../components/FormFields";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export interface CategoryFormProps {
  initialValues?: Category;
  onSubmit?: (formValues: Category) => void;
}

const schema = yup
  .object({
    name: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    titleSeo: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    descriptionSeo: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
    keywordSeo: yup.string().required("Vui lòng nhập đầy đủ thông tin"),
  })
  .required();

export function CategoryForm({ initialValues, onSubmit }: CategoryFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Category>({
    defaultValues: initialValues
  })

  const handleFormSubmit = async(formValues: Category) => {
    try {
      await onSubmit?.(formValues)
    } catch (error) {
      console.log('Failed submit', error)
    }
  }

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing = {1}>
            <Grid item xs={6}>
            <InputField name="name" control={control} label="Tên danh mục" />
            </Grid>
            <Grid item xs={6}>
            <InputField name="titleSeo" control={control} label="Title Seo" />
            </Grid>
            <Grid item xs={6}>
            <InputField name="descriptionSeo" control={control} label="Description Seo" />
            </Grid>
            <Grid item xs={6}>
            <InputField name="keywordSeo" control={control} label="KeywordSeo" />
            </Grid>
          </Grid>

          <Box mt="20px" >
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
