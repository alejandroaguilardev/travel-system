import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateRoleDto } from '../dto/create-role.dto';

export function DocsRoleCreate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear un nuevo rol',
      description: 'Crear un nuevo rol en el sistema',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: CreateRoleDto,
      examples: {
        data: {
          value: {
            id: '8a6ea78b-190f-4f84-8bee-9d6ffdc4b210',
            name: 'admin',
            description: '',
            permissions: ['1cd9670f-00e0-4e18-86e9-f8662c15d3e4'],
          },
        },
      },
    }),
    ApiOkResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message: 'Se registró el rol exitosamente',
          },
        },
      },
    }),
  );
}
