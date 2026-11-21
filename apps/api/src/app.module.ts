import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StorageModule } from './storage/storage.module';
import { MetadataModule } from './metadata/metadata.module';
import { DocumentsModule } from './documents/documents.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, StorageModule, MetadataModule, DocumentsModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
