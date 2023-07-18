import * as React from 'react';
import { ListParams } from '../../../../models/common';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Role } from '../../../../models';
import { roleApi } from '../../../../api/roleApi';

export interface IUserFilterProps {
    filter: ListParams;
    onChange?: (newFilter: ListParams) => void;
    onSearchChange?: (newFilter: ListParams) => void;
}

export function UserFilter({ filter, onChange, onSearchChange }: IUserFilterProps) {
    const [role, setRole] = React.useState('');
    const [roleList, setRoleList] = React.useState<Role[]>([]);

    React.useEffect(() => {
        (async () => {
            const roleListData = await roleApi.getAll();
            setRoleList(roleListData)
        })()
    }, [])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return;
        const newFilter = {
            ...filter,
            searchKey: e.target.value,
            page: 1,
        }
        onSearchChange(newFilter)
    }

    const handleRoleChange = (e: SelectChangeEvent) => {
        setRole(e.target.value)
        if (!onChange) return;

        const newFilter = {
            ...filter,
            page: 1,
            roleType: e.target.value || undefined
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
                    placeholder="Nhập tên hoặc email người dùng"
                    onChange={handleSearchChange}
                    defaultValue={filter.searchKey}
                />
            </div>
            <div className="w-1/6">
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Vai trò</InputLabel>
                    <Select
                        labelId="role"
                        label="Role"
                        value={role || ""}
                        onChange={handleRoleChange}
                    >
                        <MenuItem value="">Tất cả</MenuItem>

                        {roleList.map((role) => (
                            <MenuItem key={role.id} value={role.name}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}
