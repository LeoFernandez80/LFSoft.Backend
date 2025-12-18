import { Type } from 'class-transformer';
import { IsNumber, IsString, IsArray, ValidateNested, Min } from 'class-validator';
import { QuoteItemArticleDto } from './quote-item-article.dto';

export class QuoteItemDto {
  @IsNumber()
  itemId: number;

  @IsNumber()
  @Min(0)
  itemQuantity: number;

  @IsString()
  itemDescription: string;

  @IsNumber()
  @Min(0)
  itemUnitPrice: number;

  @IsNumber()
  @Min(0)
  itemTotalPrice: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuoteItemArticleDto)
  articles: QuoteItemArticleDto[];
}
