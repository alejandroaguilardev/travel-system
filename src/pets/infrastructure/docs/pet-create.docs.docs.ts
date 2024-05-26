import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreatePetDto } from '../dto/create-pet.dto';

export function DocsPetCreate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear una nueva mascota',
      description: 'Crear una nueva mascota en el sistema',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: CreatePetDto,
      examples: {
        data: {
          value: {
            id: '8a6ea78b-190f-4f84-8bee-9d6ffdc4b210',
            name: 'Max',
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
      status: 201,
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message: 'Se registró la mascota exitosamente',
          },
        },
      },
    }),
  );
}
