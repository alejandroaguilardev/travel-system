import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { PetDetailDto } from '../dto';

export function DocsDetailPet() {
  return applyDecorators(
    ApiOperation({
      summary: 'Finalizar un contracto en la vista del cliente',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: PetDetailDto,
      examples: {
        data: {
          value: {
            id: '8fbaade4-d3fc-4a9d-a850-5a2c0d3de817',
            pet: '8fbaade4-d3fc-4a9d-a850-5a2c0d3de818',
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message:
              'Se registró Las mascotas fueron actualizadas exitosamente',
          },
        },
      },
    }),
  );
}
