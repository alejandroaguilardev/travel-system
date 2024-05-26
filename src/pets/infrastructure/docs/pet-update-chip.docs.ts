import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UpdatePetDto } from '../dto/update-pet.dto';

export function DocsPetUpdate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar una mascota',
      description: 'Actualizar una mascota en el sistema',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: UpdatePetDto,
      examples: {
        data: {
          value: {
            chip: '123456789012345',
            chipDate: '2018-05-16',
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
            message: 'Se actualizó la mascota exitosamente',
          },
        },
      },
    }),
  );
}
