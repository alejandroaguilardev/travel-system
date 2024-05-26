import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateCageDto } from '../dto/create-cage.dto';

export function DocsCageCreate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear un nueva jaula',
      description: 'Crear un nueva jaula en el sistema',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: CreateCageDto,
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
      status: 201,
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message: 'Se registró el permiso exitosamente',
          },
        },
      },
    }),
  );
}
