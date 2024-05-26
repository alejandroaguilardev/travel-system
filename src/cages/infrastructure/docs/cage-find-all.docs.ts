import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CriteriaDocs } from '../../../common/infrastructure/docs/criteria.docs';

export function DocsCageFindAll() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener todas las jaulas',
      description: 'Paginar las jaulas del sistema',
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
                id: '30e3d5b1-e032-40e5-9ced-9f0c0eefa7bb',
                typeCage: 'rígida',
                modelCage: 'ML45',
                dimensionsCage: '43*27*33',
              },
            ],
            count: 1,
          },
        },
      },
    }),
  );
}
