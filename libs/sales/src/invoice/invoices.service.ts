import { Injectable, NotFoundException } from '@nestjs/common';
import { PageFilterDto, PaginatedListDto, PrismaService } from '@libs/shared';
import { InvoiceDto } from './dto/invoice.dto';
import { InvoiceFilterDto } from './dto/invoice-filter';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter: InvoiceFilterDto, pageFilter: PageFilterDto): Promise<PaginatedListDto<any>> {
    const { page = 1, pageSize = 10, sortField = 'invoiceCreationDate', sortDirection = 'desc' } = pageFilter;

    const where: any = { isActive: true };

    const total = await this.prisma.invoice.count({ where });

    const data = await this.prisma.invoice.findMany({
      where,
      orderBy: { [sortField]: sortDirection },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        items: {
          include: {
            details: true,
          },
        },
      },
    });

    return new PaginatedListDto(data, total);
  }

  async findOne(id: number) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { invoiceId: id },
      include: {
        items: {
          include: {
            details: true,
          },
        },
      },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return invoice;
  }

  async create(createInvoiceDto: InvoiceDto) {
    const { items, ...invoiceData } = createInvoiceDto;

    return this.prisma.invoice.create({
      data: {
        ...invoiceData,
        items: {
          create: items.map(item => ({
            itemId: item.itemId,
            itemDescription: item.itemDescription,
            itemQuantity: item.itemQuantity,
            itemTotalPrice: item.itemTotalPrice,
            details: {
              create: item.details.map(detail => ({
                detailId: detail.detailId,
                detailCode: detail.detailCode,
                detailDescription: detail.detailDescription,
                detailQuantity: detail.detailQuantity,
                detailUnitPrice: detail.detailUnitPrice,
                detailTotalPrice: detail.detailTotalPrice,
              })),
            },
          })),
        },
      },
      include: {
        items: {
          include: {
            details: true,
          },
        },
      },
    });
  }

  async update(id: number, updateInvoiceDto: InvoiceDto) {
    await this.findOne(id);

    const { items, ...invoiceData } = updateInvoiceDto;

    return this.prisma.invoice.update({
      where: { invoiceId: id },
      data: {
        ...invoiceData,
        ...(items && {
          items: {
            deleteMany: {},
            create: items.map(item => ({
              itemId: item.itemId,
              itemDescription: item.itemDescription,
              itemQuantity: item.itemQuantity,
              itemTotalPrice: item.itemTotalPrice,
              details: {
                create: item.details.map(detail => ({
                  detailId: detail.detailId,
                  detailCode: detail.detailCode,
                  detailDescription: detail.detailDescription,
                  detailQuantity: detail.detailQuantity,
                  detailUnitPrice: detail.detailUnitPrice,
                  detailTotalPrice: detail.detailTotalPrice,
                })),
              },
            })),
          },
        }),
      },
      include: {
        items: {
          include: {
            details: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.invoice.update({
      where: { invoiceId: id },
      data: { isActive: false },
    });
  }
}
