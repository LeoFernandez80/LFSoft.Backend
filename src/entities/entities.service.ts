import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEntityDto, UpdateEntityDto } from './dto/entity.dto';
import { EntityFilterDto } from './dto/entity-filter.dto';
import { PageFilterDto } from '../shared/page-filter.dto';
import { PaginatedListDto } from '../shared/paginated-list.dto';

@Injectable()
export class EntitiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: EntityFilterDto, pageFilter: PageFilterDto): Promise<PaginatedListDto<any>> {
    const { page = 1, pageSize = 5, sortField = 'createdAt', sortDirection = 'desc' } = pageFilter;
    
    // Construir el objeto where dinámicamente
    const where: any = { isActive: true };
    
    if (filters.id) {
      where.id = filters.id;
    }
    
    if (filters.description) {
      where.description = {
        contains: filters.description,
        mode: 'insensitive',
      };
    }
    
    // Obtener el total de registros
    const total = await this.prisma.entity.count({ where });
    
    // Obtener los datos paginados
    const data = await this.prisma.entity.findMany({
      where,
      orderBy: { [sortField]: sortDirection },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    
    return new PaginatedListDto(data, total);
  }

  async findOne(id: number) {
    console.log('Finding entity with ID:', id);
    const entity = await this.prisma.entity.findUnique({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    return entity;
  }

  async create(createEntityDto: CreateEntityDto) {
    return this.prisma.entity.create({
      data: createEntityDto,
    });
  }

  async update(id: number, updateEntityDto: UpdateEntityDto) {
    await this.findOne(id);

    return this.prisma.entity.update({
      where: { id },
      data: updateEntityDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.entity.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
