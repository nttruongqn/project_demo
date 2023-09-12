import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DashboardService } from 'src/dashboards/services/dashboard.service';
import { CountStatusTransactionsByMonthDto } from '../dtos/count-status-transactions-by-month.dto';

@ApiTags('Dashboard')
@Controller('api/dashboards')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('total-sections')
  @ApiOperation({
    summary: 'Get total section for dashboard',
    description: 'Get total section for dashboard',
  })
  getTotalSectionForDashboard() {
    return this.dashboardService.getTotalSectionForDashboard();
  }

  @Get('transactions/success/month/count')
  @ApiOperation({
    summary: 'Get transactions success by month',
    description: 'Get transactions success by month',
  })
  getTransactionListSuccess(@Query() data: CountStatusTransactionsByMonthDto) {
    return this.dashboardService.getTransactionListSuccess(data);
  }

  @Get('transactions/cancellation/month/count')
  @ApiOperation({
    summary: 'Get transactions success by month',
    description: 'Get transactions success by month',
  })
  getTransactionListCancellation(
    @Query() data: CountStatusTransactionsByMonthDto,
  ) {
    return this.dashboardService.getTransactionListCancellation(data);
  }
}
