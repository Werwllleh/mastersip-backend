import { Module } from '@nestjs/common';
import { SalesLeadController } from './sales-lead.controller';
import { SalesLeadService } from './sales-lead.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [PrismaModule, MailModule],
  controllers: [SalesLeadController],
  providers: [SalesLeadService],
  exports: [SalesLeadService],
})
export class SalesLeadModule {}
