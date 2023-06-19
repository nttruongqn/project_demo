import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { SortDirectionEnum } from 'src/core/enums/sort-direction.enum';
import { ProductTypeEnum } from '../../enums/product-list-type.enum';
import { CategoryTypeSearchEnum } from 'src/products/enums/category-type-search.enum';

export class ProductListDto {
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

  @ApiProperty({ type: String, enum: CategoryTypeSearchEnum })
  @IsNotEmpty()
  @IsEnum(CategoryTypeSearchEnum)
  categoryType?: CategoryTypeSearchEnum;

  @ApiProperty({ type: String, enum: ProductTypeEnum })
  @IsNotEmpty()
  @IsEnum(ProductTypeEnum)
  sort?: ProductTypeEnum;

  @ApiProperty({ type: String, enum: SortDirectionEnum })
  @IsEnum(SortDirectionEnum)
  order?: SortDirectionEnum;
}
