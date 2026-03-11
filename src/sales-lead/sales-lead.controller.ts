import { Controller, Post, Get, Param, Body, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { SalesLeadService } from './sales-lead.service';
import { CreateSalesLeadDto } from './dto/create-sales-lead.dto';

@Controller('api/sales-lead')
export class SalesLeadController {
  constructor(private readonly salesLeadService: SalesLeadService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async create(@Body() createSalesLeadDto: CreateSalesLeadDto) {
    return this.salesLeadService.create(createSalesLeadDto);
  }

  @Get()
  async findAll() {
    return this.salesLeadService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.salesLeadService.findOne(id);
  }
}
