import { UUID } from '../../common/application/services/uuid';
import { CreateUserRequest } from '../../users/application/create/create-user-request';

export const getUserData = (uuid: UUID): CreateUserRequest[] => [
  {
    id: uuid.generate(),
    email: 'alexaguilar281@gmail.com',
    roles: [],
    profile: {
      document: 'C.E.',
      documentNumber: '987654321',
      name: 'Alejandro',
      secondName: '',
      lastName: 'Aguilar',
      secondLastName: '',
      birthDate: new Date(),
      province: '',
      department: '',
      direction: '',
      district: '',
      gender: 'male',
      phone: '51939130496',
    },
    status: '',
    auth: {
      admin: true,
      rememberToken: '',
      lastLogin: null,
    },
  },
  {
    id: uuid.generate(),
    email: 'crichrissuarez82@gmail.com',
    roles: [],
    profile: {
      document: 'D.N.I.',
      documentNumber: '41233194',
      name: 'Christian',
      secondName: '',
      lastName: 'Suarez',
      secondLastName: '',
      birthDate: new Date(),
      province: '',
      department: '',
      direction: '',
      district: '',
      gender: 'male',
      phone: '51994748870',
    },
    status: '',
    auth: {
      admin: true,
      rememberToken: '',
      lastLogin: null,
    },
  },

  {
    id: uuid.generate(),
    email: 'pedro@gmail.com',
    roles: [],
    profile: {
      document: 'D.N.I.',
      documentNumber: '987654321',
      name: 'Pedro',
      secondName: '',
      lastName: 'Jimenez',
      secondLastName: '',
      birthDate: new Date(),
      province: '',
      department: '',
      direction: '',
      district: '',
      gender: 'male',
      phone: '51939130496',
    },
    status: '',
  },
];
