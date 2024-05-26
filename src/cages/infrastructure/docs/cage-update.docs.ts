import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UpdateCageDto } from '../dto/update-cage.dto';

export function DocsCageUpdate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar una jaula',
      description: 'Actualizar una jaula en el sistema',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: UpdateCageDto,
      examples: {
        data: {
          value: {
            id: '8a6ea78b-190f-4f84-8bee-9d6ffdc4b210',
            modelCage: 'Deluxe Pet Carrier',
            dimensionsCage: '18 x 12 x 12 inches',
            typeCage: 'Soft-sided',
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
            message: 'Se actualizó la jaula exitosamente',
          },
        },
      },
    }),
  );
}
