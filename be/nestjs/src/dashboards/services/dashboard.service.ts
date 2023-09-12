import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/categories/services/category.service';
import { ProductService } from 'src/products/services/product.service';
import { TransactionService } from 'src/transactions/services/transaction.service';
import { UserService } from 'src/users/services/user.service';
import { CountStatusTransactionsByMonthDto } from '../http/dtos/count-status-transactions-by-month.dto';

@Injectable()
export class DashboardService {
  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private transactionService: TransactionService,
  ) {}

  async getTotalSectionForDashboard() {
    const [
      totalNumberUsers,
      totalNumberCategories,
      totalNumberProducts,
      totalNumberTransactions,
    ] = await Promise.all([
      this.userService.getTotalNumberUsers(),
      this.categoryService.getTotalNumberCategories(),
      this.productService.getTotalNumberProducts(),
      this.transactionService.getTotalNumberTransactions(),
    ]);
    return {
      totalNumberCategories,
      totalNumberProducts,
      totalNumberUsers,
      totalNumberTransactions,
    };
  }

  async getTransactionListSuccess({ data }: CountStatusTransactionsByMonthDto) {
    const parsedData = data.map((item) => this.splitDate(item));
    return await Promise.all(
      parsedData.map(async (item) => {
        return await this.transactionService.getTransactionListSuccessByMonth(
          item.month,
          item.year,
        );
      }),
    );
  }

  async getTransactionListCancellation({
    data,
  }: CountStatusTransactionsByMonthDto) {
    const parsedData = data.map((item) => this.splitDate(item));
    return await Promise.all(
      parsedData.map(async (item) => {
        return await this.transactionService.getTransactionListCancellationByMonth(
          item.month,
          item.year,
        );
      }),
    );
  }

  private splitDate(dateString) {
    const [year, month] = dateString.split('-');
    return { year, month };
  }
}
