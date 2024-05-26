import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function DocsPetFindOne() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener una mascota',
      description: 'obtener los datos de la mascota',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            id: 'eacec100-1552-4712-841c-eb1f68cc13d6',
            name: 'Terminal 01',
            race: 'Mestizo',
            gender: 'male',
            birthDate: '2024-05-24T11:55:09.571Z',
            chip: '',
            chipDate: null,
            color: 'Blanco',
            image: '',
            country: 'Perú',
            type: 'Canino',
            sterilized: 'No',
            status: 'active',
            adopter: '09cccd46-e15e-4d06-8159-e1325cbd0c04',
            isBrachycephalic: false,
            isPotentiallyDangerous: false,
            topico: {
              chip: {
                hasIncluded: true,
                executed: true,
                date: '2022-01-01T00:00:00.000Z',
                description: 'Chip contract description',
                observation: 'Chip contract observation',
                user: '09cccd46-e15e-4d06-8159-e1325cbd0c04',
              },
              vaccination: {
                hasIncluded: false,
                executed: false,
                date: null,
                description: '',
                observation: '',
                user: '',
              },
              rabiesVaccination: {
                hasIncluded: false,
                executed: false,
                date: null,
                description: '',
                observation: '',
                user: '',
              },
              rabiesReVaccination: {
                executed: false,
                date: null,
                description: '',
                observation: '',
                user: '',
              },
              takingSampleSerologicalTest: {
                executed: false,
                date: null,
                description: '',
                observation: '',
                typeSample: '',
                user: '',
              },
              _id: '665080a0e0dfe31074a2e5d9',
            },
            user: '09cccd46-e15e-4d06-8159-e1325cbd0c04',
            cageRecommendation: {
              modelCage: '',
              typeCage: '',
              dimensionsCage: '',
              _id: '66508031d086871037003833',
            },
            measurementsAndWeight: {
              weight: 0,
              height: 0,
              width: 0,
              length: 0,
              _id: '66508031d086871037003834',
            },
          },
        },
      },
    }),
  );
}
