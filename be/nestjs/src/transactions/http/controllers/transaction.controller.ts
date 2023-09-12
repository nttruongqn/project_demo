import { Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransactionEntity } from 'src/transactions/entities/transaction.entity';
import { TransactionService } from 'src/transactions/services/transaction.service';
import { TransactionListDto } from '../dtos/transaction-list.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiPaginatedResponse } from 'src/core/repositories/api-pagination.response';

@ApiTags('Transaction')
@Controller('api/transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  @ApiOperation({
    summary: 'Get list transactions',
    description: 'Get list transactions',
  })
  @ApiPaginatedResponse({
    model: TransactionEntity,
    description: 'List of Transactions',
  })
  async getPaginateProduct(
    @Query() query: TransactionListDto,
  ): Promise<Pagination<TransactionEntity>> {
    return this.transactionService.paginate(query);
  }

  @Put(':id/status/success')
  @ApiOperation({
    summary: 'Change status transaction success',
    description: 'Change status transaction success',
  })
  @ApiParam({
    name: 'id',
    description: 'Id of Transaction',
  })
  changeTransactionSuccessStatus(@Param('id') id: string) {
    this.transactionService.changeTransactionSuccessStatus(id);
  }

  @Put(':id/status/cancellation')
  @ApiOperation({
    summary: 'Change status transaction cancellation',
    description: 'Change status transaction cancellation',
  })
  @ApiParam({
    name: 'id',
    description: 'Id of Transaction',
  })
  changeTransactionCancellationStatus(@Param('id') id: string) {
    this.transactionService.changeTransactionCancellationStatus(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Revoke transactions',
    description: 'Revoke transactions',
  })
  @ApiParam({
    name: 'id',
    description: 'Id of Transaction',
  })
  async revokeTransaction(@Param('id') id: string): Promise<void> {
    return this.transactionService.revokeTransaction(id);
  }
}
