import { Type } from 'class-transformer';
import { IsString, IsNumber, IsDate, IsArray, ValidateNested, IsEnum, Min } from 'class-validator';
import { EnumQuoteStates } from './enum-quote-states.dto';
import { QuoteItemDto } from './quote-item.dto';

export class QuoteDto {
  @IsNumber()
  customerId: number;

  @IsString()
  quoteDescription: string;

  @IsDate()
  @Type(() => Date)
  quoteCreationDate: Date;

  @IsEnum(EnumQuoteStates)
  quoteStateId: EnumQuoteStates;

  @IsNumber()
  @Min(0)
  quoteTotalPrice: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuoteItemDto)
  items: QuoteItemDto[];
}
