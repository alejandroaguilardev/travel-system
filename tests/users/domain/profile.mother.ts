import { faker } from '@faker-js/faker';
import { ProfileInterface } from '../../../src/users/domain/interfaces/profile.interface';
import { FirstNameMother } from './first-name-mother';
import { LastNameMother } from './last-name-mother';
import { PhoneMother } from '../../common/domain/phone.mother';
import { DateMother } from '../../contracts/domain/date.mother';

export class ProfileMother {
  static create(profile?: Partial<ProfileInterface>): ProfileInterface {
    return {
      name: profile?.name ?? FirstNameMother.create(),
      secondName: profile?.secondName ?? FirstNameMother.create(),
      lastName: profile?.lastName ?? LastNameMother.create(),
      secondLastName: profile?.secondLastName ?? LastNameMother.create(),
      phone: profile?.phone ?? PhoneMother.create(),
      gender: profile?.gender ?? faker.person.sexType(),
      birthDate: profile?.birthDate ?? DateMother.recent(),
      department:
        profile?.department ??
        faker.number.int({ min: 10, max: 99 }).toString(),
      province:
        profile?.province ??
        faker.number.int({ min: 1000, max: 9999 }).toString(),
      district:
        profile?.district ??
        faker.number.int({ min: 100000, max: 999999 }).toString(),
      direction: profile?.direction ?? faker.location.direction(),
    };
  }
}
