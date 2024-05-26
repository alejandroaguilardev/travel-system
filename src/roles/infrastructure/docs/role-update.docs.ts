import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UpdateRoleDto } from '../dto/update-role.dto';

export function DocsRoleUpdate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar un rol',
      description: 'Actualizar un  rol en el sistema',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: UpdateRoleDto,
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
            message: 'Se actualizó el rol exitosamente',
          },
        },
      },
    }),
  );
}
