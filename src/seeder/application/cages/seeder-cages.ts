import { UUID } from '../../../common/application/services/uuid';
import { CageRepository } from '../../../cages/domain/cage.repository';
import { getCageData } from '../../domain/cage-data';
import { CommandCageCreator } from '../../../cages/application/create/command-cage-creator';

export class CagesSeeder {
  constructor(
    private readonly cageRepository: CageRepository,
    private readonly uuid: UUID,
  ) {}

  async execute(): Promise<void> {
    const cages = getCageData(this.uuid);

    await Promise.all(
      cages.map((_) =>
        this.cageRepository.save(CommandCageCreator.execute(_, '')),
      ),
    );
  }
}
