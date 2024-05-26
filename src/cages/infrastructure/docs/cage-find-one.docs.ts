import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function DocsCageFindOne() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener un sola jaula',
      description: 'obtener los datos del jaula',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            id: '1cd9670f-00e0-4e18-86e9-f8662c15d3e4',
            name: 'crear',
            group: 'jaulas',
            description: 'Crear nuevos elementos',
          },
        },
      },
    }),
  );
}
