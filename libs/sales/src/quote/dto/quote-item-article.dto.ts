import { IsNumber, IsString, Min } from 'class-validator';

export class QuoteItemArticleDto {
  @IsNumber()
  itemArticleId: number;

  @IsNumber()
  @Min(0)
  itemArticleQuantity: number;

  @IsString()
  itemArticleAssembly: string;

  @IsString()
  itemArticleDescription: string;

  @IsNumber()
  @Min(0)
  itemArticleUnitPrice: number;

  @IsNumber()
  @Min(0)
  itemArticleTotalPrice: number;
}
