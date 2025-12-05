import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { CreateEntityDto, UpdateEntityDto } from './dto/entity.dto';
import { EntityFilterDto } from './dto/entity-filter.dto';
import { PageFilterDto } from '../shared/page-filter.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('entities')
@UseGuards(JwtAuthGuard)
export class EntitiesController {
  constructor(private entitiesService: EntitiesService) {}

  @Get()
  findAll(@Query() pageFilter: PageFilterDto, @Query() filters: EntityFilterDto) {    
    return this.entitiesService.findAll(filters, pageFilter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entitiesService.findOne(+id);
  }

  @Post()
  create(@Body() createEntityDto: CreateEntityDto) {    
    return this.entitiesService.create(createEntityDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntityDto: UpdateEntityDto) {
    return this.entitiesService.update(+id, updateEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entitiesService.remove(+id);
  }
}
