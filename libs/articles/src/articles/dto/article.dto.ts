import { IsString, IsNumber, IsBoolean, IsOptional, Min } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  codigoAsy: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  listprice?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  revendedorsPrice?: number;

  @IsString()
  @IsOptional()
  codigoProvider?: string;

  @IsString()
  @IsOptional()
  descriptionProvider?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  codigoAsy?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  listprice?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  revendedorsPrice?: number;

  @IsString()
  @IsOptional()
  codigoProvider?: string;

  @IsString()
  @IsOptional()
  descriptionProvider?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
