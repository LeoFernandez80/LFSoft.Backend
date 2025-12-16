import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from '@libs/security';
import { PageFilterDto } from '@libs/shared';
import { InvoiceFilterDto } from './dto/invoice-filter';
import { InvoiceDto } from './dto/invoice.dto';

@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Get()
  findAll(@Query() pageFilter: PageFilterDto, @Query() filters: InvoiceFilterDto) {
    return this.invoicesService.findAll(filters,pageFilter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(+id);
  }

  @Post()
  create(@Body() createInvoiceDto: InvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: InvoiceDto) {
    return this.invoicesService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(+id);
  }
}
