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
            id: '8a6ea78b-190f-4f84-8bee-9d6ffdc4b210',
            name: 'Max 1',
            race: 'Bulldog',
            gender: 'male',
            birthDate: '2018-05-15',
            chip: '123456789012345',
            chipDate: '2018-05-16',
            color: 'white with black spots',
            image: 'max.jpg',
            country: 'USA',
            type: 'dog',
            sterilized: 'si',
            adopter: '09cccd46-e15e-4d06-8159-e1325cbd0c04',
            isBrachycephalic: true,
            isPotentiallyDangerous: false,
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
