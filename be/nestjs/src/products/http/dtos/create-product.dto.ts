import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  authId?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

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
