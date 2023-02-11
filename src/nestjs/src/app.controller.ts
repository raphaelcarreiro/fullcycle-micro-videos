import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCategoryUseCase } from 'micro-videos-core/category/application';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
