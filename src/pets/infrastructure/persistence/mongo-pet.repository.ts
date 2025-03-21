import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PetRepository } from '../../domain/pet.repository';
import { Pet } from '../../domain/pet';
import { PetModel } from '../schema/pet.schema';
import { MongoRepository } from '../../../common/infrastructure/mongo/mongo.repository';
import { PetChip } from '../../domain/value-object/pet-chip';
import { PetResponse, PetsClientResponse } from '../../../pets/domain/interfaces/pet.response';
import { Uuid } from '../../../common/domain/value-object';
import { ContractTopico } from '../../../contract-detail/domain/value-object/contract-topico';

@Injectable()
export class MongoPetRepository
  extends MongoRepository<PetModel, Pet>
  implements PetRepository {
  private petModel: Model<PetModel>;

  constructor(@InjectModel(PetModel.name) model: Model<PetModel>) {
    super(model);
    this.petModel = model;
  }

  async searchByChip(chip: PetChip): Promise<PetResponse | null> {
    return await this.petModel
      .findOne({ chip: chip.value })
      .select(['-_id', '-__v', '-createdAt', '-updatedAt'])
      .lean();
  }

  async searchByClient(idClient: Uuid): Promise<PetsClientResponse[]> {
    return await this.petModel
      .find({ adopter: idClient })
      .select(["id", "name", "chip",])
      .lean();
  }

  async updateTopico(petId: Uuid, topico: ContractTopico): Promise<void> {
    return this.petModel.findOneAndUpdate(
      { id: petId.value },
      {
        topico: topico.toJson(),
      },
    );
  }
}
