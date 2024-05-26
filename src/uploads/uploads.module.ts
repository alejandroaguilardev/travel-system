import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { LaravelApiAdapter } from '../common/infrastructure/services/laravel-adapter.service';
import { UploadsService } from './uploads.service';
import { AuthModule } from '../auth/infrastructure/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UploadsController],
  providers: [LaravelApiAdapter, UploadsService],
})
export class UploadsModule {}
