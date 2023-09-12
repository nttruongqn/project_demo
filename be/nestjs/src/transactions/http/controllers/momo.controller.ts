import { Controller, Get } from '@nestjs/common';
import { MomoService } from 'src/transactions/services/momo.service';

@Controller('api/momo')
export class MomoController {
  constructor(private readonly momoService: MomoService) {}

  @Get('create-payment')
  async createPayment(): Promise<any> {
    try {
      const paymentResponse = await this.momoService.createPayment();
      return paymentResponse;
    } catch (error) {
      // Xử lý lỗi
      console.error(error);
      throw error;
    }
  }
}
