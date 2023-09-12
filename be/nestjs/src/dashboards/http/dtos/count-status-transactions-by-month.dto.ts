import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class CountStatusTransactionsByMonthDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsOptional()
  data: string[];
}
