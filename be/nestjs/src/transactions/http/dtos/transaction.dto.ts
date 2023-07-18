import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { TransactionStatusEnum } from 'src/transactions/enums/transaction-status.enum';

export class TransactionDto {
  @ApiProperty({ type: String })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  note: string;

  @ApiProperty({
    type: String,
    enum: TransactionStatusEnum,
    default: TransactionStatusEnum.INCOMPLETE,
  })
  @IsNotEmpty()
  @IsEnum(TransactionStatusEnum)
  status: TransactionStatusEnum;
}
