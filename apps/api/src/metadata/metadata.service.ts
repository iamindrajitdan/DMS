import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMetadataDefinitionDto } from './dto/create-metadata-definition.dto';

@Injectable()
export class MetadataService {
  constructor(private prisma: PrismaService) {}

  async createDefinition(organizationId: string, dto: CreateMetadataDefinitionDto) {
    return this.prisma.metadataDefinition.create({
      data: {
        organizationId,
        ...dto,
      },
    });
  }

  async getDefinitions(organizationId: string, documentTypeId?: string) {
    return this.prisma.metadataDefinition.findMany({
      where: {
        organizationId,
        ...(documentTypeId && { documentTypeId }),
      },
    });
  }
}
