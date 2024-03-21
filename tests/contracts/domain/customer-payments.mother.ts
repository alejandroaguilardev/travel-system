import { faker } from '@faker-js/faker';
import { CustomerPaymentInterface } from '../../../src/contracts/domain/interfaces/customer-payment.interface';
import { ContractPriceMother } from './contract-price.mother';

export class CustomerPaymentsMother {
  static create(quantity: number = 1): CustomerPaymentInterface[] {
    return Array.from({ length: quantity }).map(() => ({
      date: faker.date.recent(),
      method: faker.string.sample(),
      price: ContractPriceMother.create(),
    }));
  }
}
