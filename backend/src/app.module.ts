import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { AbcModule } from './abc/abc.module';


// PrismaSer...
@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, AbcModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
