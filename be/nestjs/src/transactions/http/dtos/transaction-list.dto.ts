import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { SortDirectionEnum } from 'src/core/enums/sort-direction.enum';
import { TransactionSortEnum } from 'src/transactions/enums/transaction-sort.enum';
import { TransactionStatusEnum } from 'src/transactions/enums/transaction-status.enum';

export class TransactionListDto {
  @ApiProperty({ type: Number })
  @IsNumberString()
  @IsOptional()
  page?: number;

  @ApiProperty({ type: Number })
  @IsNumberString()
  @IsOptional()
  limit?: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  searchKey?: string;

  @ApiProperty({ type: String, enum: TransactionStatusEnum })
  @IsOptional()
  transactionStatusType?: TransactionStatusEnum;

  @ApiProperty({ type: String, enum: TransactionSortEnum })
  @IsOptional()
  sort?: TransactionSortEnum;

  @ApiProperty({ type: String, enum: SortDirectionEnum })
  @IsOptional()
  order?: SortDirectionEnum;
}
