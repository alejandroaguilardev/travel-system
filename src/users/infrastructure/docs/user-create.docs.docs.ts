import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserCreatorDto } from '../dto/create-user.dto';

export function DocsUserCreate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear un nuevo usuario',
      description: 'Crear un nuevo usuario en el sistema',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: UserCreatorDto,
      examples: {
        data: {
          value: {
            id: 'f8805d2b-3f99-46bb-bb3e-5e15f8b973ca',
            email: 'alexaguilar281@gmail.com',
            roles: ['6c58eeff-89ee-4f39-a432-97a1b096ee4c'],
            profile: {
              document: 'D.N.I.',
              documentNumber: '12345678',
              name: 'Alejandro',
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
            status: 'active',
            user: '',
          },
        },
      },
    }),
    ApiOkResponse({
      status: 201,
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message: 'Se registró el usuario exitosamente',
          },
        },
      },
    }),
  );
}
