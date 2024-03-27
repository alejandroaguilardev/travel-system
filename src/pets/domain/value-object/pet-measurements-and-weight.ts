import { MeasurementsAndWeightInterface } from '../interfaces/pet-measurements-and-weight';
import { PetWeight } from './pet-weight';
import { PetMeasurement } from './pet-measurement';

export class PetMeasurementsAndWeight {
  constructor(
    readonly weight: PetWeight,
    readonly height: PetMeasurement,
    readonly length: PetMeasurement,
    readonly width: PetMeasurement,
  ) {}

  toJson(): MeasurementsAndWeightInterface {
    return {
      height: this.height.value,
      length: this.length.value,
      weight: this.weight.value,
      width: this.width.value,
    };
  }
}
