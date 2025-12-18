import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@libs/security';
import { CustomerFilterDto } from './dto/customer-filter.dto';
import { CustomerDto } from './dto/customer.dto';
import { PageFilterDto } from '@libs/shared';
import { CustomersService } from './customers.service';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  findAll(@Query() pageFilter: PageFilterDto, @Query() filters: CustomerFilterDto) {
    return this.customersService.findAll(filters, pageFilter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Post()
  create(@Body() customerDto: CustomerDto) {
    return this.customersService.create(customerDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() customerDto: CustomerDto) {
    return this.customersService.update(+id, customerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
