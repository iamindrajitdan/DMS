import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsEnum } from 'class-validator';

enum MetadataType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  SELECT = 'SELECT',
  USER = 'USER'
}

export class CreateMetadataDefinitionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsEnum(MetadataType)
  type: string;

  @IsOptional()
  @IsBoolean()
  required?: boolean;

  @IsOptional()
  @IsString()
  options?: string;

  @IsNotEmpty()
  @IsString()
  documentTypeId: string;
}
