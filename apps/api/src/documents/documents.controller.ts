import { Controller, Get, Post, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateDocumentDto } from './dto/create-document.dto';

@Controller('documents')
@UseGuards(JwtAuthGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload-url')
  getUploadUrl(
    @Request() req: any,
    @Body('filename') filename: string,
    @Body('contentType') contentType: string,
  ) {
    return this.documentsService.getUploadUrl(req.user.organizationId, filename, contentType);
  }

  @Post()
  create(@Request() req: any, @Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.create(req.user.organizationId, req.user.sub, createDocumentDto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.documentsService.findAll(req.user.organizationId);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.documentsService.findOne(id, req.user.organizationId);
  }

  @Get(':id/download')
  getDownloadUrl(@Request() req: any, @Param('id') id: string) {
    return this.documentsService.getDownloadUrl(id, req.user.organizationId);
  }
}
