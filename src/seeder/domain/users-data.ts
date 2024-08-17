import { UUID } from '../../common/application/services/uuid';
import { CreateUserRequest } from '../../users/application/create/create-user-request';

export const getUserData = (uuid: UUID): CreateUserRequest[] => [
  {
    id: uuid.generate(),
    email: 'test@prueba.com',
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
      phone: '',
      job: "Desarrollador"
    },
    status: '',
    auth: {
      admin: true,
      user: true,
      rememberToken: '',
      lastLogin: null,
    },
    isAdvisor: true,
    isDoctor: false,
  },
  {
    id: uuid.generate(),
    email: 'alex@gmail.com',
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
      job: ""
    },
    status: '',
    isDoctor: false,
    isAdvisor: false,
  },
];
