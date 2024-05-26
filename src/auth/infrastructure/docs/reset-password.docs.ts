import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ResetPasswordDto } from '../dto/reset-password.dto';

export function DocsResetPassword() {
  return applyDecorators(
    ApiOperation({
      summary: 'Restablecer la contraseña del usuario',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: ResetPasswordDto,
      examples: {
        data: {
          value: {
            password: '12345678',
          },
        },
      },
    }),
    ApiOkResponse({
      status: 200,
      description: 'Contraseña restablecida con éxito.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            user: {
              id: '45fbea9d-6882-4a86-a6ed-7f0cd00f61b0',
              email: 'alexaguilar281@gmail.com',
              roles: [
                {
                  permissions: [],
                },
              ],
              profile: {
                document: 'C.E.',
                documentNumber: '987654321',
                name: 'Alejandro',
                secondName: '',
                lastName: 'Aguilar',
                secondLastName: '',
                phone: '51939130496',
                gender: 'male',
                birthDate: '2024-05-22T08:01:05.997Z',
                department: '',
                province: '',
                district: '',
                direction: '',
              },
              user: '',
              status: 'active',
              auth: {
                admin: true,
                rememberToken: '',
                lastLogin: null,
              },
              linkWhatsApp: '',
              isAdvisor: true,
              isDoctor: false,
              password:
                '$2b$10$P6XID635J5jXqPYsWa/zw.s5F1MroTAY0IL4wA8aWFKLDjoXRoUr6',
            },
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1ZmJlYTlkLTY4ODItNGE4Ni1hNmVkLTdmMGNkMDBmNjFiMCIsImlhdCI6MTcxNjM2ODM1NCwiZXhwIjoxNzE2NDExNTU0fQ.x4mocHw0FgPMY8K8y-8w9Q7pl4YXudEQ0OFnBAczDMA',
          },
        },
      },
    }),
  );
}
