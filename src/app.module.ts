import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@libs/users';
import { SecurityModule } from '@libs/security';
import { EntitiesModule, UtilitiesModule } from '@libs/utilities';
import { ArticlesModule } from '@libs/articles';

import { PrismaModule } from '@libs/shared';
import { InvoiceModule } from '@libs/sales';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    EntitiesModule,        
    UsersModule,
    SecurityModule,
    ArticlesModule,
    InvoiceModule,
    UtilitiesModule
  ],
})
export class AppModule {}
