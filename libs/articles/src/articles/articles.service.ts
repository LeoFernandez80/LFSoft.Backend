import { Injectable, NotFoundException } from '@nestjs/common';

import { ArticleFilterDto } from './dto/article-filter.dto';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { PrismaService, PageFilterDto, PaginatedListDto } from '@libs/shared';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: ArticleFilterDto, pageFilter: PageFilterDto): Promise<PaginatedListDto<any>> {
    const { page = 1, pageSize = 5, sortField = 'createdAt', sortDirection = 'desc' } = pageFilter;
    
    const where: any = { isActive: true };

    if (filters.id) {
      where.id = filters.id;
    }

    if (filters.codigoAsy) {
      where.codigoAsy = {
        contains: filters.codigoAsy,
        mode: 'insensitive',
      };
    }

    if (filters.description) {
      where.description = {
        contains: filters.description,
        mode: 'insensitive',
      };
    }

    if (filters.codigoProvider) {
      where.codigoProvider = {
        contains: filters.codigoProvider,
        mode: 'insensitive',
      };
    }

    if (filters.descriptionProvider) {
      where.descriptionProvider = {
        contains: filters.descriptionProvider,
        mode: 'insensitive',
      };
    }

    const total = await this.prisma.article.count({ where });

    const data = await this.prisma.article.findMany({
      where,
      orderBy: { [sortField]: sortDirection },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return new PaginatedListDto(data, total);
  }

  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    return article;
  }

  async create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({
      data: createArticleDto,
    });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    await this.findOne(id);

    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.article.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
