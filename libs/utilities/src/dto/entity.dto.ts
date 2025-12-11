import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateEntityDto {
  @IsString()
  description: string;
}

export class UpdateEntityDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
