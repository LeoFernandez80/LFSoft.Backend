import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@libs/users';
import { SecurityModule } from '@libs/security';
import { EntitiesModule } from '@libs/utilities';
import { ArticlesModule } from '@libs/articles';
import { PrismaModule } from '@libs/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    EntitiesModule,        
    UsersModule,
    SecurityModule,
    ArticlesModule
  ],
})
export class AppModule {}
