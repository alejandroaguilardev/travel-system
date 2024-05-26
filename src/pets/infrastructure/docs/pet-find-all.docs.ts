import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CriteriaDocs } from '../../../common/infrastructure/docs/criteria.docs';

export function DocsPetFindAll() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener todos las mascotas',
      description: 'Paginar las mascotas del sistema',
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
                name: 'Max',
                race: 'Bulldog',
                gender: 'male',
                birthDate: '2018-05-15T00:00:00.000Z',
                chip: '123456789012345',
                chipDate: '2018-05-16T00:00:00.000Z',
                color: 'white with black spots',
                image: 'max.jpg',
                country: 'USA',
                type: 'dog',
                sterilized: 'si',
                status: 'active',
                adopter: '09cccd46-e15e-4d06-8159-e1325cbd0c04',
                isBrachycephalic: true,
                isPotentiallyDangerous: false,
                topico: {
                  chip: {
                    hasIncluded: false,
                    executed: false,
                    date: null,
                    description: '',
                    observation: '',
                    user: '09cccd46-e15e-4d06-8159-e1325cbd0c04',
                  },
                  vaccination: {
                    hasIncluded: false,
                    executed: false,
                    date: null,
                    description: '',
                    observation: '',
                    user: '09cccd46-e15e-4d06-8159-e1325cbd0c04',
                  },
                  rabiesVaccination: {
                    hasIncluded: false,
                    executed: false,
                    date: null,
                    description: '',
                    observation: '',
                    user: '09cccd46-e15e-4d06-8159-e1325cbd0c04',
                  },
                  rabiesReVaccination: {
                    executed: false,
                    date: null,
                    description: '',
                    observation: '',
                    user: '09cccd46-e15e-4d06-8159-e1325cbd0c04',
                  },
                  takingSampleSerologicalTest: {
                    executed: false,
                    date: null,
                    description: '',
                    observation: '',
                    typeSample: '',
                    user: '09cccd46-e15e-4d06-8159-e1325cbd0c04',
                  },
                  _id: '6651a84f5b18dafb8849b5c3',
                },
                user: '09cccd46-e15e-4d06-8159-e1325cbd0c04',
                cageRecommendation: {
                  modelCage: '',
                  typeCage: '',
                  dimensionsCage: '',
                  _id: '6651a84f5b18dafb8849b5c4',
                },
                measurementsAndWeight: {
                  weight: 0,
                  height: 0,
                  width: 0,
                  length: 0,
                  _id: '6651a84f5b18dafb8849b5c5',
                },
              },
            ],
            count: 1,
          },
        },
      },
    }),
  );
}
