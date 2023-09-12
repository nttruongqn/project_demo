import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class MomoService {
  constructor(private readonly httpService: HttpService) {}

  async createPayment(): Promise<AxiosResponse<any>> {
    const partnerCode = 'MOMO';
    const accessKey = 'F8BBA842ECF85';
    const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    const requestId = partnerCode + new Date().getTime();
    const orderId = requestId;
    const orderInfo = 'pay with MoMo';
    const redirectUrl = 'https://momo.vn/return';
    const ipnUrl = 'https://callback.url/notify';
    const amount = '50000';
    const requestType = 'captureWallet';
    const extraData = '';

    // Create raw signature
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    // Calculate signature
    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = {
      partnerCode,
      accessKey,
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      extraData,
      requestType,
      signature,
      lang: 'en',
    };

    const apiUrl = 'https://test-payment.momo.vn/v2/gateway/api/create';

    try {
      const response = await this.httpService
        .post(apiUrl, JSON.stringify(requestBody), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .toPromise();

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
