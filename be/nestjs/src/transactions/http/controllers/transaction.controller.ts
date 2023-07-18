import { Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TransactionEntity } from 'src/transactions/entities/transaction.entity';
import { TransactionService } from 'src/transactions/services/transaction.service';
import { TransactionListDto } from '../dtos/transaction-list.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiPaginatedResponse } from 'src/core/repositories/api-pagination.response';

@ApiTags('Transaction')
@Controller('transactions')
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

  @Put(':id/status')
  @ApiOperation({
    summary: 'Change status transaction',
    description: 'Change status transaction',
  })
  @ApiParam({
    name: 'id',
    description: 'Id of Transaction',
  })
  changeStatusTransaction(@Param('id') id: string) {
    this.transactionService.changeStatusTransaction(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Revoke transactions',
    description: 'Revole transactions',
  })
  @ApiParam({
    name: 'id',
    description: 'Id of Transaction',
  })
  async revokeTransaction(@Param('id') id: string): Promise<void> {
    return this.transactionService.revokeTransaction(id);
  }
}
