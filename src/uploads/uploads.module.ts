import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { LaravelApiAdapter } from '../common/infrastructure/services/mail-api-adapter.service';
import { UploadsService } from './uploads.service';

@Module({
  controllers: [UploadsController],
  providers: [LaravelApiAdapter, UploadsService],
})
export class UploadsModule {}
