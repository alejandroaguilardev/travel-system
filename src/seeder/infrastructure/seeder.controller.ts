import { Controller, Get } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Get()
  seeder() {
    if (process.env.PRODUCTION === 'false') {
      return this.seederService.seeder();
    } else {
      return {
        message: 'Esta ruta solo está disponible en entorno de desarrollo.',
      };
    }
  }
}
