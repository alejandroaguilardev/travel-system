import { UUID } from '../../common/application/services/uuid';
import { CreateUserRequest } from '../../users/application/create/create-user-request';

export const getUserData = (uuid: UUID): CreateUserRequest[] => [
  {
    id: uuid.generate(),
    email: 'alex@gmail.com',
    roles: [],
    profile: {
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
      phone: '',
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
      phone: '',
    },
    status: '',
  },
];
