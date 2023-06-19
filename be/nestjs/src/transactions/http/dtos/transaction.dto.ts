import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class TransactionDto {
  @ApiProperty({ type: String })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  note: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  phone: string;
}
