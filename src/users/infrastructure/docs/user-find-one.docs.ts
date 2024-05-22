import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function DocsUserFindAOne() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener un solo usuario',
      description: 'obtener los datos del usuario',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            id: 'f8805d2b-3f99-46bb-bb3e-5e15f8b973ca',
            email: 'alex@gmail.com',
            roles: [
              {
                permissions: [],
              },
            ],
            profile: {
              document: 'D.N.I.',
              documentNumber: '12345678',
              name: 'Edit',
              secondName: '',
              lastName: 'Aguilar',
              secondLastName: '',
              phone: '',
              gender: 'male',
              birthDate: '2024-02-06T19:48:12.744Z',
              department: '',
              province: '',
              district: '',
              direction: '',
            },
            user: '45fbea9d-6882-4a86-a6ed-7f0cd00f61b0',
            status: 'active',
            auth: {
              admin: false,
              rememberToken: '',
              lastLogin: null,
            },
            linkWhatsApp: '',
            isAdvisor: false,
            isDoctor: false,
          },
        },
      },
    }),
  );
}
