import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

export interface SendLeadNotificationDto {
  name: string;
  phone: string;
  message?: string;
  privacyPolicyAccepted: boolean;
}

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: true,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  async sendLeadNotification(data: SendLeadNotificationDto): Promise<void> {
    const mailFrom = this.configService.get('MAIL_FROM');

    const mailOptions = {
      from: mailFrom,
      to: mailFrom,
      subject: `sales.master-sip.ru`,
      html: `
        <h2>Новая заявка с сайта <a href="https://sales.master-sip.ru/" target="_blank">sales.master-sip.ru</a></h2>
        <p><strong>Имя:</strong> ${data.name}</p>
        <p><strong>Телефон:</strong> ${data.phone}</p>
        ${data.message ? `<p><strong>Сообщение:</strong> ${data.message}</p>` : ''}
        <p><strong>Согласие с политикой:</strong> ${data.privacyPolicyAccepted ? '✓ Принято' : '✗ Не принято'}</p>
        <p><em>Дата: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}</em></p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Письмо отправлено на ${mailFrom}`);
    } catch (error) {
      this.logger.error(`Ошибка отправки письма: ${error.message}`);
      throw error;
    }
  }
}
