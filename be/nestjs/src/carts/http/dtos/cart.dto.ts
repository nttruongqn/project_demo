import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CartDto {
  @ApiProperty({ type: String })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  productImageUrl: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  totalQuantity: number;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  isSale?: boolean;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  sale?: number;
}
