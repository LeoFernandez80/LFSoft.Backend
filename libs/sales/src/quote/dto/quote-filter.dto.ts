import { Type } from 'class-transformer';
import { IsNumber, IsString, IsDate, IsEnum, IsOptional } from 'class-validator';
import { EnumQuoteStates } from './enum-quote-states.dto';

export class QuoteFilterDto {
  @IsOptional()
  @IsNumber()
  customerId?: number;

  @IsOptional()
  @IsString()
  quoteDescription?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  quoteCreationDate?: Date;

  @IsOptional()
  @IsEnum(EnumQuoteStates)
  quoteStateId?: EnumQuoteStates;
}
