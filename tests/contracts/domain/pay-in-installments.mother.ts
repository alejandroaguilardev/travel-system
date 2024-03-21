import { faker } from '@faker-js/faker';
import { ContractPriceMother } from './contract-price.mother';
import { PayInInstallmentInterface } from '../../../src/contracts/domain/interfaces/pay-in-installment.interface';

export class PayInInstallmentMother {
  static create(quantity: number = 1): PayInInstallmentInterface[] {
    return Array.from({ length: quantity }).map(() => ({
      date: faker.date.recent(),
      percentage: faker.number.int({ min: 1, max: 100 }),
      price: ContractPriceMother.create(),
    }));
  }
}
