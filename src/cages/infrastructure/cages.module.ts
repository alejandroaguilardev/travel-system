import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CagesService } from './cages.service';
import { CagesController } from './cages.controller';
import { AuthModule } from '../../auth/infrastructure/auth.module';
import { MongoCageRepository } from './persistence/mongo-cage.repository';
import { CageModel, CageSchema } from './schema/cage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CageModel.name, schema: CageSchema }]),
    AuthModule,
  ],
  controllers: [CagesController],
  providers: [CagesService, MongoCageRepository],
  exports: [MongoCageRepository],
})
export class CagesModule {}
