import { Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorModel, ErrorSchema } from './schema/incident.schema';
import { MongoIncidentRepository } from './persistence/mongo-incident.repository';
import { LaravelApiAdapter } from '../../common/infrastructure/services/laravel-adapter.service';
import { IncidentsController } from './incidents.controller';
import { AuthModule } from '../../auth/infrastructure/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ErrorModel.name, schema: ErrorSchema }]),
    AuthModule,
  ],
  controllers: [IncidentsController],
  providers: [MongoIncidentRepository, LaravelApiAdapter, IncidentsService],
  exports: [MongoIncidentRepository, IncidentsService],
})
export class IncidentsModule {}
