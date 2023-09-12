import * as React from 'react';
import { ListParams } from '../../../../models/common';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

export interface ITransactionFilterProps {
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export function TransactionFilter({ filter, onChange, onSearchChange }: ITransactionFilterProps) {
  const [status, setStatus] = React.useState('')
  const statusList = ['Chưa xử lý', 'Đã xử lý', 'Đã hủy bỏ']


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter = {
      ...filter,
      searchKey: e.target.value,
      page: 1,
    }
    onSearchChange(newFilter)
  }


  const handleStatusChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value)
    if (!onChange) return;

    const newFilter = {
      ...filter,
      page: 1,
      transactionStatusType: e.target.value || undefined
    };
    onChange(newFilter);
  }

  return (
    <div className="flex gap-1">
      <div className="border w-5/6 rounded-md py-1.5 px-3 flex gap-2 items-center">
        <span className="w-[1.5%] flex items-center">
          <i className="ri-search-line"></i>
        </span>

        <input
          type="text"
          className="outline-none font-normal w-[98.5%] flex items-center"
          placeholder="Nhập tên người mua hàng"
          onChange={handleSearchChange}
          defaultValue={filter.searchKey}
        />
      </div>
      <div className="w-1/6">
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
          <Select
            labelId="status"
            label="Trạng thái"
            value={status || ""}
            onChange={handleStatusChange}
          >
            <MenuItem value="">Tất cả</MenuItem>

            {statusList.map((status, index) => (
              <MenuItem key={index} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

