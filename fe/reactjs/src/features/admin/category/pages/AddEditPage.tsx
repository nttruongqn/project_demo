import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AddEditPageHeader } from "../../../../components/Admin/Common/AddEditPageHeader";
import { CategoryForm } from "../components/CategoryForm";
import { Category } from "../../../../models";
import { categoryApi } from "../../../../api/categoryApi";
export interface AddEditPageProps {}

export function AddEditPage(props: AddEditPageProps) {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = React.useState<Category>();
  const isEdit = Boolean(categoryId);
  const add = "Tạo danh mục";
  const edit = "Sửa danh mục";
  const breadcrumb = "Danh mục";

  React.useEffect(() => {
    if (!categoryId) return;

    (async () => {
      try {
        const data: Category = await categoryApi.findById(categoryId);
        setCategory(data);
      } catch (error) {
        console.log("Failed api get category by id", error);
      }
    })();
  }, [categoryId]);

  const initialValues: Category = {
    name: "",
    titleSeo: "",
    descriptionSeo: "",
    keywordSeo: "",
    ...category,
  } as Category;

  const handleFormSubmit = async (formValues: Category) => {
    if (isEdit) {
      await categoryApi.update(formValues);
    } else {
      await categoryApi.add(formValues);
    }

    navigate("/admin/categories/");
  };
  return (
    <>
      <div className="category__add-edit-wrapper w-full h-full flex flex-col">
        {isEdit ? (
          <AddEditPageHeader edit={edit} breadcrumb={breadcrumb} />
        ) : (
          <AddEditPageHeader add={add} breadcrumb={breadcrumb} />
        )}

        <div className="category__form p-5">
          {(!isEdit || Boolean(category)) && (
            <CategoryForm
              initialValues={initialValues}
              onSubmit={handleFormSubmit}
            />
          )}
        </div>
      </div>
    </>
  );
}
