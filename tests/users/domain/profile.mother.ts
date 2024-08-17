import { faker } from '@faker-js/faker';
import { ProfileInterface } from '../../../src/users/domain/interfaces/profile.interface';
import { FirstNameMother } from './first-name-mother';
import { LastNameMother } from './last-name-mother';
import { PhoneMother } from '../../common/domain/phone.mother';
import { DateMother } from '../../common/domain/date.mother';
import { UserDocument } from '../../../src/users/domain/value-object/profile/user-document';

export class ProfileMother {
  static create(profile?: Partial<ProfileInterface>): ProfileInterface {
    return {
      document: profile?.document ?? UserDocument.types[0],
      documentNumber:
        profile?.documentNumber ??
        faker.number.int({ min: 100000000, max: 1000000000 }).toString(),
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
      job: profile?.job ?? faker.person.jobTitle(),
    };
  }
}
