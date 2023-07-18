import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { MobileSystemDto } from 'src/mobile-systems/http/dtos/mobile-system.dto';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  mobileSystemId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  authId?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
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
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @ApiProperty({ type: String })
  @IsUUID()
  @IsNotEmpty()
  brandId: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MobileSystemDto)
  mobileSystem: MobileSystemDto;
}
