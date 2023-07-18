import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { UpdateMobileSystemDto } from 'src/mobile-systems/http/dtos/update-mobile-system.dto';

export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  mobileSystemId: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
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
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @ApiProperty({ type: String })
  @IsUUID()
  @IsOptional()
  brandId?: string;

  @ApiProperty()
  @IsOptional()
  mobileSystem?: UpdateMobileSystemDto;
}
