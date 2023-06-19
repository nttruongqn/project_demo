import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  avatar?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  titleSeo?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  descriptionSeo?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  keywordSeo?: string;
}
