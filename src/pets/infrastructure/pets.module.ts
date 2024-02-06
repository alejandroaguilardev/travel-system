import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { MongoPetRepository } from './persistence/mongo-pet.repository';
import { PetModel, PetSchema } from './schema/pet.schema';
import { AuthModule } from '../../auth/infrastructure/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PetModel.name,
        schema: PetSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [PetsController],
  providers: [PetsService, MongoPetRepository],
})
export class PetsModule {}
