import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService, PageFilterDto, PaginatedListDto } from '@libs/shared';
import { DocumentDto } from './dto/document.dto';
import { EnumDocumentStatus } from './dto/enum-document-status.dto';
import { DocumentFilterDto } from './dto/document-filter.dto';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: DocumentFilterDto, pageFilter: PageFilterDto): Promise<PaginatedListDto<any>> {
    const { page = 1, pageSize = 5, sortField = 'documentCreationDate', sortDirection = 'desc' } = pageFilter;
    const where: any = { documentStatus: { not: EnumDocumentStatus.cancelled } };

    if (filters.documentId) {
      where.documentId = filters.documentId;
    }
    if (filters.personName) {
      where.personName = { contains: filters.personName, mode: 'insensitive' };
    }
    if (filters.personId) {
      where.personId = filters.personId;
    }
    if (filters.documentStatus) {
      where.documentStatus = filters.documentStatus;
    }

    const total = await this.prisma.document.count({ where });
    const data = await this.prisma.document.findMany({
      where,
      orderBy: { [sortField]: sortDirection },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { items: { include: { details: true } } },
    });
    return new PaginatedListDto(data, total);
  }

  async findOne(documentId: number) {
    const document = await this.prisma.document.findUnique({
      where: { documentId },
      include: { items: { include: { details: true } } },
    });
    if (!document) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }
    return document;
  }

  async create(createDocumentDto: DocumentDto) {
    return this.prisma.document.create({
      data: {
        personName: createDocumentDto.personName,
        personId: createDocumentDto.personId,
        personDocumentType: createDocumentDto.personDocumentType,
        personDocumentNumber: createDocumentDto.personDocumentNumber,
        documentDescription: createDocumentDto.documentDescription,
        documentStatus: createDocumentDto.documentStatus,
        creationUserId: createDocumentDto.creationUserId,
        items: {
          create: createDocumentDto.items?.map(item => ({
            itemId: item.itemId,
            itemDescription: item.itemDescription,
            details: {
              create: item.details?.map(detail => ({
                detailId: detail.detailId,
                detailDescription: detail.detailDescription,
              })) || [],
            },
          })) || [],
        },
      },
      include: { items: { include: { details: true } } },
    });
  }

  async update(documentId: number, updateDocumentDto: Partial<DocumentDto>) {
    await this.findOne(documentId);
    const { documentId: _, items, ...updateData } = updateDocumentDto;
    return this.prisma.document.update({
      where: { documentId },
      data: updateData,
      include: { items: { include: { details: true } } },
    });
  }

  async remove(documentId: number) {
    await this.findOne(documentId);
    return this.prisma.document.update({
      where: { documentId },
      data: { documentStatus: EnumDocumentStatus.cancelled },
    });
  }

  // Método para obtener todos los documentos activos sin paginación
  async listAll() {
    return this.prisma.document.findMany({
      where: { documentStatus: { not: EnumDocumentStatus.cancelled } },
      include: { items: { include: { details: true } } },
    });
  }
}
