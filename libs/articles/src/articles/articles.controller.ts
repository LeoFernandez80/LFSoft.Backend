import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@libs/security';
import { ArticleFilterDto } from './dto/article-filter.dto';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { PageFilterDto } from '@libs/shared';
import { ArticlesService } from './articles.service';

@Controller('articles')
@UseGuards(JwtAuthGuard)
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  findAll(@Query() pageFilter: PageFilterDto, @Query() filters: ArticleFilterDto) {
    return this.articlesService.findAll(filters, pageFilter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
