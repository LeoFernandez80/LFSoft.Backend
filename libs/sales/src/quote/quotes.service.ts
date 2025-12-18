import { Injectable, NotFoundException } from '@nestjs/common';
import { PageFilterDto, PaginatedListDto, PrismaService } from '@libs/shared';
import { QuoteDto } from './dto/quote.dto';
import { QuoteFilterDto } from './dto/quote-filter.dto';

@Injectable()
export class QuotesService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter: QuoteFilterDto, pageFilter: PageFilterDto): Promise<PaginatedListDto<any>> {
    const { page = 1, pageSize = 10, sortField = 'quoteCreationDate', sortDirection = 'desc' } = pageFilter;

    const where: any = { isActive: true };

    // Aplicar filtros
    if (filter.customerId) {
      where.customerId = filter.customerId;
    }
    if (filter.quoteDescription) {
      where.quoteDescription = { contains: filter.quoteDescription, mode: 'insensitive' };
    }
    if (filter.quoteCreationDate) {
      where.quoteCreationDate = filter.quoteCreationDate;
    }
    if (filter.quoteStateId) {
      where.quoteStateId = filter.quoteStateId;
    }

    const total = await this.prisma.quote.count({ where });

    const data = await this.prisma.quote.findMany({
      where,
      orderBy: { [sortField]: sortDirection },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        items: {
          include: {
            articles: true,
          },
        },
      },
    });

    return new PaginatedListDto(data, total);
  }

  async findOne(id: number) {
    const quote = await this.prisma.quote.findUnique({
      where: { quoteId: id },
      include: {
        items: {
          include: {
            articles: true,
          },
        },
      },
    });

    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }

    return quote;
  }

  async create(createQuoteDto: QuoteDto) {
    const { items, ...quoteData } = createQuoteDto;

    return this.prisma.quote.create({
      data: {
        ...quoteData,
        items: {
          create: items.map(item => ({
            itemId: item.itemId,
            itemQuantity: item.itemQuantity,
            itemDescription: item.itemDescription,
            itemUnitPrice: item.itemUnitPrice,
            itemTotalPrice: item.itemTotalPrice,
            articles: {
              create: item.articles.map(article => ({
                itemArticleId: article.itemArticleId,
                itemArticleQuantity: article.itemArticleQuantity,
                itemArticleAssembly: article.itemArticleAssembly,
                itemArticleDescription: article.itemArticleDescription,
                itemArticleUnitPrice: article.itemArticleUnitPrice,
                itemArticleTotalPrice: article.itemArticleTotalPrice,
              })),
            },
          })),
        },
      },
      include: {
        items: {
          include: {
            articles: true,
          },
        },
      },
    });
  }

  async update(id: number, updateQuoteDto: QuoteDto) {
    await this.findOne(id);

    const { items, ...quoteData } = updateQuoteDto;

    return this.prisma.quote.update({
      where: { quoteId: id },
      data: {
        ...quoteData,
        ...(items && {
          items: {
            deleteMany: {},
            create: items.map(item => ({
              itemId: item.itemId,
              itemQuantity: item.itemQuantity,
              itemDescription: item.itemDescription,
              itemUnitPrice: item.itemUnitPrice,
              itemTotalPrice: item.itemTotalPrice,
              articles: {
                create: item.articles.map(article => ({
                  itemArticleId: article.itemArticleId,
                  itemArticleQuantity: article.itemArticleQuantity,
                  itemArticleAssembly: article.itemArticleAssembly,
                  itemArticleDescription: article.itemArticleDescription,
                  itemArticleUnitPrice: article.itemArticleUnitPrice,
                  itemArticleTotalPrice: article.itemArticleTotalPrice,
                })),
              },
            })),
          },
        }),
      },
      include: {
        items: {
          include: {
            articles: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.quote.update({
      where: { quoteId: id },
      data: { isActive: false },
    });
  }
}
