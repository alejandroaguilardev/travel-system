import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CriteriaDocs } from '../../../common/infrastructure/docs/criteria.docs';

export function DocsPermissionFindAll() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener los permisos',
      description: 'Paginar los permisos del sistema',
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
                id: '1cd9670f-00e0-4e18-86e9-f8662c15d3e4',
                name: 'crear',
                group: 'jaulas',
                description: 'Crear nuevos elementos',
              },
            ],
            count: 1,
          },
        },
      },
    }),
  );
}
