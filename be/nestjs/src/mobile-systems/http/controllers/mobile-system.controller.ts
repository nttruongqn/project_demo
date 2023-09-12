import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MobileSystemService } from 'src/mobile-systems/services/mobile-system.service';

@ApiTags('MobileSystem')
@Controller('api/mobile-systems')
export class MobileSystemController {
  constructor(private mobileSystemService: MobileSystemService) {}

  @Get('get-child-elements')
  @ApiOperation({
    summary: 'Get child elements',
    description: 'Get child elements',
  })
  getChildElements() {
    return this.mobileSystemService.getChildElements();
  }
}
