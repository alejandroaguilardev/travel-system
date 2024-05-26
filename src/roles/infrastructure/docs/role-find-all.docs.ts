import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CriteriaDocs } from '../../../common/infrastructure/docs/criteria.docs';

export function DocsRoleFindAll() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener los roles',
      description: 'Paginar los roles del sistema',
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
            ],
            count: 1,
          },
        },
      },
    }),
  );
}
