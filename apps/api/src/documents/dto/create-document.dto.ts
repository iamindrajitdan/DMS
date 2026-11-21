import { IsNotEmpty, IsString, IsOptional, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class DocumentFileDto {
  @IsNotEmpty()
  @IsString()
  storageKey: string;

  @IsNotEmpty()
  @IsString()
  mimeType: string;

  @IsNotEmpty()
  @IsNumber()
  size: number;

  @IsNotEmpty()
  @IsString()
  checksum: string;
}

export class DocumentMetadataDto {
  @IsNotEmpty()
  @IsString()
  definitionId: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}

export class CreateDocumentDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  documentTypeId: string;

  @IsOptional()
  @IsString()
  folderId?: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DocumentFileDto)
  file: DocumentFileDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentMetadataDto)
  metadata?: DocumentMetadataDto[];
}
