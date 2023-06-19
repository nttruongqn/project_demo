import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../entities/transaction.entity';
import { TransactionDto } from '../http/dtos/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
  ) {}

  handleTransaction(
    transaction: TransactionDto,
    totalAmount: number,
  ): Promise<TransactionEntity> {
    return this.transactionRepo.save({
      ...transaction,
      totalAmount,
    });
  }
}
