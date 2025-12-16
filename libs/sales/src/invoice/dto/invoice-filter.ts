import { Type } from "class-transformer";
import { IsString, IsNumber, IsDate, Min, IsArray, ValidateNested, IsOptional } from "class-validator";
import { InvoiceItemDto } from "./invoice.dto";


export class InvoiceFilterDto { 
  @IsOptional()  
  @IsString()
  personName: string;

  @IsOptional()  
  @IsNumber()
  personId: number;

  @IsOptional()  
  @IsString()
  personDocumentType: string;

  @IsOptional()  
  @IsString()
  personDocumentNumber: string;

  @IsOptional()  
  @IsString()
  invoiceDescription: string;

  @IsOptional()  
  @IsDate()
  @Type(() => Date)
  invoiceCreationDate: Date;
  
  @IsOptional()
  @IsNumber()
  creationUserId: number;


}
