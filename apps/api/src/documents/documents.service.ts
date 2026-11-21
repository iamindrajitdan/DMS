import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    private prisma: PrismaService,
    private storageService: StorageService,
  ) {}

  async create(organizationId: string, ownerId: string, dto: CreateDocumentDto) {
    // Basic implementation of document creation
    // 1. Validate Document Type
    const documentType = await this.prisma.documentType.findFirst({
      where: { id: dto.documentTypeId, organizationId },
      include: { metadataDefinitions: true }
    });

    if (!documentType) {
      throw new NotFoundException('Document type not found');
    }

    // 2. Create Document and first Version transactionally
    const document = await this.prisma.$transaction(async (prisma: any) => {
      const doc = await prisma.document.create({
        data: {
          title: dto.title,
          description: dto.description,
          organizationId,
          ownerId,
          documentTypeId: dto.documentTypeId,
          folderId: dto.folderId,
        },
      });

      const version = await prisma.documentVersion.create({
        data: {
          documentId: doc.id,
          versionNumber: 1,
          storageKey: dto.file.storageKey,
          mimeType: dto.file.mimeType,
          fileSize: dto.file.size,
          checksum: dto.file.checksum,
          createdById: ownerId,
        },
      });

      // Update document to point to current version
      const updatedDoc = await prisma.document.update({
        where: { id: doc.id },
        data: { currentVersionId: version.id },
      });

      // 3. Save Metadata
      if (dto.metadata && dto.metadata.length > 0) {
        const metadataRecords = dto.metadata.map(m => ({
          documentId: doc.id,
          metadataDefinitionId: m.definitionId,
          value: m.value,
        }));
        await prisma.documentMetadata.createMany({
          data: metadataRecords,
        });
      }

      return updatedDoc;
    });

    return document;
  }

  async findAll(organizationId: string) {
    return this.prisma.document.findMany({
      where: { organizationId, isDeleted: false },
      include: {
        documentType: true,
        currentVersion: true,
      },
      orderBy: { updatedAt: 'desc' }
    });
  }

  async findOne(id: string, organizationId: string) {
    const doc = await this.prisma.document.findFirst({
      where: { id, organizationId, isDeleted: false },
      include: {
        documentType: true,
        currentVersion: true,
        metadata: {
          include: { metadataDefinition: true }
        }
      }
    });
    if (!doc) throw new NotFoundException('Document not found');
    return doc;
  }

  async getDownloadUrl(id: string, organizationId: string) {
    const doc = await this.findOne(id, organizationId);
    if (!doc.currentVersion) {
      throw new BadRequestException('Document has no valid physical file attached');
    }
    return {
      url: await this.storageService.generateDownloadPresignedUrl(doc.currentVersion.storageKey),
    };
  }

  async getUploadUrl(organizationId: string, filename: string, contentType: string) {
    const storageKey = `${organizationId}/${Date.now()}-${filename}`;
    const url = await this.storageService.generateUploadPresignedUrl(storageKey, contentType);
    return { url, storageKey };
  }
}
