import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { SortDirectionEnum } from 'src/core/enums/sort-direction.enum';
import { RoleTypeSearchEnum } from 'src/users/enums/role-type-search.enum';
import { UserSortEnum } from 'src/users/enums/user-sort.enum';

export class UserListDto {
  @ApiProperty({ type: Number })
  @IsNumberString()
  @IsOptional()
  page?: number;

  @ApiProperty({ type: Number })
  @IsNumberString()
  @IsOptional()
  limit?: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  searchKey?: string;

  @ApiProperty({ type: String, enum: RoleTypeSearchEnum })
  @IsOptional()
  roleType?: RoleTypeSearchEnum;

  @ApiProperty({ type: String, enum: UserSortEnum })
  @IsOptional()
  sort?: UserSortEnum;

  @ApiProperty({ type: String, enum: SortDirectionEnum })
  @IsOptional()
  order?: SortDirectionEnum;
}
