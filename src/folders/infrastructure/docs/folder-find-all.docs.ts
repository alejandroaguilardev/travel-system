import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CriteriaDocs } from '../../../common/infrastructure/docs/criteria.docs';

export function DocsFolderFindAll() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener todos los folders',
      description: 'Paginar los folders del sistema',
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
                name: 'Folder-1',
                quantity: 300,
                user: '09cccd46-e15e-4d06-8159-e1325cbd0c04',
              },
            ],
            count: 1,
          },
        },
      },
    }),
  );
}
