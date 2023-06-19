import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  slug: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isSale?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  isActive?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isHot?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  contentHTML?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  contentMarkdown?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  descriptionSeo?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  keywordSeo?: string;

  @IsString()
  image: string;

  @IsString()
  imageUrl: string;
}
