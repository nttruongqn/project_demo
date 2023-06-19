import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CartDto } from 'src/carts/http/dtos/cart.dto';
import { TransactionDto } from 'src/transactions/http/dtos/transaction.dto';

export class PlaceOrderDto {
  @ApiProperty({ type: CartDto, isArray: true })
  @ValidateNested({ each: true })
  @IsNotEmpty()
  cartItems: CartDto[];

  @ApiProperty({ type: TransactionDto })
  @ValidateNested()
  @IsNotEmpty()
  transaction: TransactionDto;

  // @ApiProperty({ type: String })
  // @IsUUID()
  // @IsNotEmpty()
  // transactionId: string;

  // @ApiProperty({ type: String })
  // @IsUUID()
  // @IsNotEmpty()
  // productId: string;

  // @ApiProperty({ type: Number })
  // @IsNumber()
  // @IsNotEmpty()
  // quantity: number;

  // @ApiProperty({ type: Number })
  // @IsNumber()
  // @IsNotEmpty()
  // price: number;

  // @ApiProperty({ type: Boolean })
  // @IsBoolean()
  // @IsNotEmpty()
  // isSale: boolean;
}
