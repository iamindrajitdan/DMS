import { Controller, Get, Post, Body, UseGuards, Request, Query } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateMetadataDefinitionDto } from './dto/create-metadata-definition.dto';

@Controller('metadata')
@UseGuards(JwtAuthGuard)
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Post()
  createDefinition(@Request() req: any, @Body() dto: CreateMetadataDefinitionDto) {
    return this.metadataService.createDefinition(req.user.organizationId, dto);
  }

  @Get()
  getDefinitions(@Request() req: any, @Query('documentTypeId') documentTypeId?: string) {
    return this.metadataService.getDefinitions(req.user.organizationId, documentTypeId);
  }
}
