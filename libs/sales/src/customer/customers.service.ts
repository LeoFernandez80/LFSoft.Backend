import { Injectable, NotFoundException } from '@nestjs/common';

import { CustomerFilterDto } from './dto/customer-filter.dto';
import { CustomerDto } from './dto/customer.dto';
import { PrismaService, PageFilterDto, PaginatedListDto } from '@libs/shared';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: CustomerFilterDto, pageFilter: PageFilterDto): Promise<PaginatedListDto<any>> {
    const { page = 1, pageSize = 5, sortField = 'createdAt', sortDirection = 'desc' } = pageFilter;
    
    const where: any = { activo: true };

    // Aplicar filtros
    if (filters.id) {
      where.id = filters.id;
    }

    if (filters.nombre) {
      where.nombre = {
        contains: filters.nombre,
        mode: 'insensitive',
      };
    }

    if (filters.apellido) {
      where.apellido = {
        contains: filters.apellido,
        mode: 'insensitive',
      };
    }

    if (filters.razonSocial) {
      where.razonSocial = {
        contains: filters.razonSocial,
        mode: 'insensitive',
      };
    }

    if (filters.documento) {
      where.documento = {
        contains: filters.documento,
        mode: 'insensitive',
      };
    }

    if (filters.tipoDocumento) {
      where.tipoDocumento = {
        contains: filters.tipoDocumento,
        mode: 'insensitive',
      };
    }

    if (filters.email) {
      where.email = {
        contains: filters.email,
        mode: 'insensitive',
      };
    }

    if (filters.ciudad) {
      where.ciudad = {
        contains: filters.ciudad,
        mode: 'insensitive',
      };
    }

    if (filters.provincia) {
      where.provincia = {
        contains: filters.provincia,
        mode: 'insensitive',
      };
    }

    const total = await this.prisma.customer.count({ where });

    const data = await this.prisma.customer.findMany({
      where,
      orderBy: { [sortField]: sortDirection },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return new PaginatedListDto(data, total);
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }

  async create(customerDto: CustomerDto) {
    const { id, ...data } = customerDto;
    return this.prisma.customer.create({
      data,
    });
  }

  async update(id: number, customerDto: CustomerDto) {
    await this.findOne(id);

    const { id: _, ...data } = customerDto;
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.customer.update({
      where: { id },
      data: { activo: false },
    });
  }
}
