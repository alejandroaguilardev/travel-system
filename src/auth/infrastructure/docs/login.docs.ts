import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { LoginAuthDto } from '../dto/login-auth.dto';

export function DocsLogin() {
  return applyDecorators(
    ApiOperation({
      summary: 'Iniciar sesión',
      description: 'Endpoint para iniciar sesión en la aplicación.',
    }),
    ApiBody({
      type: LoginAuthDto,
      description: 'Credenciales de usuario para iniciar sesión.',
      examples: {
        data: {
          value: {
            document: 'C.E.',
            documentNumber: '987654321',
            password: '12345678',
          },
        },
      },
    }),
    ApiOkResponse({
      status: 200,
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            user: {
              _id: '664c4a735f6db11c4eb1a5c3',
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
              createdAt: '2024-05-21T07:17:07.804Z',
              updatedAt: '2024-05-21T07:17:07.804Z',
              __v: 0,
            },
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI1NTQ0Y2I5LTg3NGMtNGY4OC05YzU5LWQ0MTQ0ZjczM2QxMiIsImlhdCI6MTcxNjI4Mzc2NCwiZXhwIjoxNzE2MzI2OTY0fQ.e6ZhJX4SlOQIZu0KdFXSp6pXVXPX-Y15m7hybW5XbrE',
          },
        },
      },
    }),
  );
}
