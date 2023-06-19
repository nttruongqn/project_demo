import * as React from "react";
import { ListParams } from "../../../../models/common";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export interface CategoryFilterProps {
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export function CategoryFilter({ filter, onChange, onSearchChange }: CategoryFilterProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter = {
      ...filter,
      searchKey: e.target.value,
      page: 1
    }
    onSearchChange(newFilter)
  }

  return (
    <div className="category__list-main-top flex gap-1">
      <div className="category__list-main-search border w-5/6 rounded-md py-1.5 px-3 flex gap-2 items-center">
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
          >
            <MenuItem value="">Tất cả</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
