import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Provider')
@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  create(@Body() dto: CreateProviderDto) {
    return this.providerService.create(dto);
  }

  @Get()
  findAll() {
    return this.providerService.findAll();
  }
}
