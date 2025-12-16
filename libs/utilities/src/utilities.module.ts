import { Module } from '@nestjs/common';
import { DocumentsModule } from './documents/documents.module';
import { EntitiesModule } from './entities/entities.module';

@Module({
  imports: [DocumentsModule, EntitiesModule],
  exports: [DocumentsModule, EntitiesModule],
})
export class UtilitiesModule {}
