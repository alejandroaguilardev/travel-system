import { Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly cagesService: MailService) {}

  @Post()
  create() {
    return this.cagesService.sendEmail(
      'alexaguilar281@gmail.com',
      'Prueba',
      'texto de prueba',
      '',
    );
  }
}
