import { Controller, Get } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { DocsSeederCreate } from './docs/seeder.docs';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Get()
  @DocsSeederCreate()
  seeder() {
    if (process.env.PRODUCTION === 'false') {
      return this.seederService.seeder();
    } else {
      return {
        message: 'seeder ejecutado',
      };
    }
  }
}
