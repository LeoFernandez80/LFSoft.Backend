import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { JwtAuthGuard } from '@libs/security';
import { PageFilterDto } from '@libs/shared';
import { QuoteFilterDto } from './dto/quote-filter.dto';
import { QuoteDto } from './dto/quote.dto';

@Controller('quotes')
@UseGuards(JwtAuthGuard)
export class QuotesController {
  constructor(private quotesService: QuotesService) {}

  @Get()
  findAll(@Query() pageFilter: PageFilterDto, @Query() filters: QuoteFilterDto) {
    return this.quotesService.findAll(filters, pageFilter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quotesService.findOne(+id);
  }

  @Post()
  create(@Body() createQuoteDto: QuoteDto) {
    return this.quotesService.create(createQuoteDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuoteDto: QuoteDto) {
    return this.quotesService.update(+id, updateQuoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quotesService.remove(+id);
  }
}
