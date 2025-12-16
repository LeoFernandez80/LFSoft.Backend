import { Type } from 'class-transformer';
import { IsString, IsNumber, IsDate, IsArray, ValidateNested, IsOptional, Min } from 'class-validator';

export class InvoiceItemDetailDto {
  @IsNumber()
  detailId: number;

  @IsOptional()
  @IsString()
  detailCode?: string;

  @IsString()
  detailDescription: string;

  @IsNumber()
  @Min(0)
  detailQuantity: number;

  @IsNumber()
  @Min(0)
  detailUnitPrice: number;

  @IsNumber()
  @Min(0)
  detailTotalPrice: number;
}

export class InvoiceItemDto {
  @IsNumber()
  itemId: number;

  @IsString()
  itemDescription: string;

  @IsNumber()
  @Min(0)
  itemQuantity: number;

  @IsNumber()
  @Min(0)
  itemTotalPrice: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDetailDto)
  details: InvoiceItemDetailDto[];
}

export class InvoiceDto { 
  @IsString()
  personName: string;

  @IsNumber()
  personId: number;

  @IsString()
  personDocumentType: string;

  @IsString()
  personDocumentNumber: string;

  @IsString()
  invoiceDescription: string;

  @IsDate()
  @Type(() => Date)
  invoiceCreationDate: Date;

  @IsDate()
  @Type(() => Date)
  invoiceSentDate: Date;

  @IsNumber()
  creationUserId: number;

  @IsNumber()
  @Min(0)
  invoiceTotalPrice: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];
}
