import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async searchDocuments(organizationId: string, query: string) {
    if (!query || query.trim() === '') {
      return this.prisma.document.findMany({
        where: { organizationId, isDeleted: false },
        take: 50,
        orderBy: { updatedAt: 'desc' },
      });
    }

    // A basic text search across title and description using Prisma's 'contains'
    // For more advanced FTS, we would use raw queries with to_tsvector, but Prisma's `search` 
    // operator requires preview features or specific indexes. Using contains for MVP.
    return this.prisma.document.findMany({
      where: {
        organizationId,
        isDeleted: false,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          {
            metadata: {
              some: {
                value: { contains: query, mode: 'insensitive' },
              },
            },
          },
        ],
      },
      include: {
        documentType: true,
      },
      take: 50,
    });
  }
}
