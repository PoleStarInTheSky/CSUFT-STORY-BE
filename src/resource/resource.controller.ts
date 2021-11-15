import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ResourceService } from './resource.service';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}
  @Get('headerimg/random')
  async getRandomHeader(@Res() res) {
    const result = await this.resourceService.getRandomHeader();
    return res.status(HttpStatus.OK).json(result);
  }
}
