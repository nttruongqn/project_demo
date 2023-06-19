import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionService } from 'src/transactions/services/transaction.service';

@ApiTags('Transactions')
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}
}
