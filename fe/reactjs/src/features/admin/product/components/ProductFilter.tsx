import * as React from "react";
import { ListParams } from "../../../../models/common";
import { useAppSelector } from "../../../../app/hooks";
import { selectCategoryList } from "../../category/category.slice";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';

export interface ProductFilterProps {
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export function ProductFilter({
  filter,
  onChange,
  onSearchChange,
}: ProductFilterProps) {
  const categoryList = useAppSelector(selectCategoryList);
  const [category, setCategory] = React.useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter = {
      ...filter,
      searchKey: e.target.value,
      page: 1,
    };
    onSearchChange(newFilter);
  };

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setCategory(e.target.value as string);
    
    if (!onChange) return;

    const newFilter = {
      ...filter,
      page: 1,
      categoryType: e.target.value || undefined,
    };
    onChange(newFilter);
  }

  return (
    <div className="product__list-main-top flex gap-1">
      <div className="product__list-main-search border w-5/6 rounded-md py-1.5 px-3 flex gap-2 items-center">
        <span className="w-[1.5%] flex items-center">
          <i className="ri-search-line"></i>
        </span>

        <input
          type="text"
          className="outline-none font-normal w-[98.5%] flex items-center"
          placeholder="Nhập tên danh mục"
          onChange={handleSearchChange}
          defaultValue={filter.searchKey}
        />
      </div>
      <div className="w-1/6">
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
          <Select
            labelId="category"
            label="Category"
            value= { category || "" } 
            onChange= {handleCategoryChange}
          >
            <MenuItem value="">Tất cả</MenuItem>

            {categoryList.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
