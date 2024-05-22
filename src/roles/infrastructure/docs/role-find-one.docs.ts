import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function DocsRoleFindAOne() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener un solo rol',
      description: 'obtener los datos del rol',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            id: '8a6ea78b-190f-4f84-8bee-9d6ffdc4b210',
            name: 'admin',
            description: '',
            permissions: [
              {
                id: '1cd9670f-00e0-4e18-86e9-f8662c15d3e4',
                name: 'crear',
                group: 'jaulas',
                description: 'Crear nuevos elementos',
              },
            ],
          },
        },
      },
    }),
  );
}
