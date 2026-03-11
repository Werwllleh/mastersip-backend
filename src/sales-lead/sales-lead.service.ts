import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateSalesLeadDto } from './dto/create-sales-lead.dto';

@Injectable()
export class SalesLeadService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async create(data: CreateSalesLeadDto) {
    const lead = await this.prisma.salesLead.create({
      data,
    });

    // Отправляем уведомление на почту
    await this.mailService.sendLeadNotification(data);

    return lead;
  }

  async findAll() {
    return this.prisma.salesLead.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.salesLead.findUnique({
      where: { id },
    });
  }
}
