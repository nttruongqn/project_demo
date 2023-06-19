import {
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { CategoryTypeEnum } from '../../enums/category-list-type.enum';
import { SortDirectionEnum } from 'src/core/enums/sort-direction.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryListDto {
  @ApiProperty({ type: Number })
  @IsNumberString()
  @IsOptional()
  page?: number;

  @ApiProperty({ type: Number })
  @IsNumberString()
  @IsOptional()
  limit?: number;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  searchKey?: string;

  @ApiProperty({ type: String, enum: CategoryTypeEnum })
  @IsNotEmpty()
  @IsEnum(CategoryTypeEnum)
  sort?: CategoryTypeEnum;

  @ApiProperty({ type: String, enum: SortDirectionEnum })
  @IsEnum(SortDirectionEnum)
  order?: SortDirectionEnum;
}
