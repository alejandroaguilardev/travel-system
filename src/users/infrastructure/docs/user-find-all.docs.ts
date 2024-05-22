import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CriteriaDocs } from '../../../common/infrastructure/docs/criteria.docs';

export function DocsUserFindAll() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener los usuarios',
      description: 'Paginar los usuarios del sistema',
    }),
    ApiBearerAuth(),
    CriteriaDocs(),
    ApiOkResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            rows: [
              {
                id: 'b5544cb9-874c-4f88-9c59-d4144f733d12',
                email: 'alexaguilar281@gmail.com',
                roles: [],
                profile: {
                  document: 'C.E.',
                  documentNumber: '987654321',
                  name: 'Alejandro',
                  secondName: '',
                  lastName: 'Aguilar',
                  secondLastName: '',
                  phone: '51939130496',
                  gender: 'male',
                  birthDate: '2024-05-21T07:17:07.743Z',
                  department: '',
                  province: '',
                  district: '',
                  direction: '',
                  _id: '664c4a735f6db11c4eb1a5c4',
                },
                user: '',
                status: 'active',
                auth: {
                  admin: true,
                  rememberToken: '',
                  lastLogin: null,
                  _id: '664c4a735f6db11c4eb1a5c5',
                },
                linkWhatsApp: '',
                isAdvisor: true,
                isDoctor: false,
              },
            ],
            count: 1,
          },
        },
      },
    }),
  );
}
