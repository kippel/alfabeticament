import { Module } from '@nestjs/common';
import { AbcService } from './abc.service';
import { AbcController } from './abc.controller';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  providers: [AbcService, PrismaService],
  controllers: [AbcController]
})
export class AbcModule {}
