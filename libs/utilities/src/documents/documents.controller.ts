import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { DocumentDto } from './dto/document.dto';
import { DocumentsService } from './documents.service';
import { PageFilterDto } from '@libs/shared';
import { DocumentFilterDto } from './dto/document-filter.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  create(@Body() documentDto: DocumentDto) {
    return this.documentsService.create(documentDto);
  }

  @Get()
  findAll(@Query() pageFilter: PageFilterDto, @Query() filters: DocumentFilterDto) {
    return this.documentsService.findAll(filters, pageFilter);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.documentsService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() documentDto: Partial<DocumentDto>) {
    return this.documentsService.update(Number(id), documentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.documentsService.remove(Number(id));
  }
}
