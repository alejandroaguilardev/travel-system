import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UpdateContractDto } from '../dto/update-contract.dto';

export function DocsContractUpdate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar un contracto',
      description: 'Actualizar un contracto en el sistema',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: UpdateContractDto,
      examples: {
        data: {
          value: {
            id: '575be9b1-8654-478c-9a5d-7a312515e17e',
            client: '9b548ef0-809f-4e8a-8565-3c9242a2c400',
            folder: '',
            number: '',
            startDate: '2024-05-23T07:29:16.430Z',
            estimatedDate: '2024-11-19T08:29:16.430Z',
            details: [
              {
                id: '8fbaade4-d3fc-4a9d-a850-5a2c0d3de817',
                cage: {
                  chosen: {
                    modelCage: '',
                    dimensionsCage: '',
                    typeCage: '',
                    user: '',
                  },
                  hasServiceIncluded: false,
                  status: 'pending',
                  confirmation: false,
                  petTravelAcquisition: false,
                  isCabinTransporting: false,
                },
                travel: {
                  status: 'pending',
                  hasServiceIncluded: true,
                  hasServiceAccompanied: false,
                  typeTraveling: 'charge',
                  airlineReservation: {
                    code: '',
                    flightNumber: '',
                    departureAirport: '',
                    destinationAirport: '',
                    departureDate: null,
                    arrivalDate: null,
                    itinerary: '',
                    archive: '',
                  },
                  petPerCharge: {
                    name: '',
                    document: '',
                    documentNumber: '',
                    phone: '',
                    email: '',
                  },
                  accompaniedPet: {
                    name: '',
                    document: '',
                    documentNumber: '',
                    phone: '',
                    email: '',
                    direction: '',
                    district: '',
                    province: '',
                    department: '',
                    image: '',
                  },
                  destination: {
                    countryDestination: 'España',
                    cityDestination: '',
                    directionDestination: '',
                  },
                  guideNumber: '',
                  observation: '',
                },
                documentation: {
                  status: 'none',
                  clientStatus: 'none',
                  vaccinationCertificate: {
                    hasServiceIncluded: true,
                    isRequired: true,
                    isApplied: false,
                    expectedDate: '2024-05-23T07:29:55.799Z',
                    executionDate: null,
                    resultDate: null,
                    isPrint: false,
                    observation: '',
                    user: '',
                  },
                  healthCertificate: {
                    hasServiceIncluded: false,
                    isRequired: true,
                    isApplied: false,
                    expectedDate: '2024-05-23T07:29:55.799Z',
                    executionDate: null,
                    resultDate: null,
                    isPrint: false,
                    observation: '',
                    user: '',
                  },
                  chipCertificate: {
                    hasServiceIncluded: true,
                    isRequired: true,
                    isApplied: false,
                    expectedDate: '2024-05-23T07:29:55.799Z',
                    executionDate: null,
                    resultDate: null,
                    isPrint: false,
                    observation: '',
                    user: '',
                  },
                  senasaDocuments: {
                    hasServiceIncluded: false,
                    isRequired: true,
                    isApplied: false,
                    expectedDate: '2024-05-23T07:29:55.800Z',
                    executionDate: null,
                    resultDate: null,
                    isPrint: false,
                    observation: '',
                    user: '',
                  },
                  rabiesSeroLogicalTest: {
                    hasServiceIncluded: true,
                    isRequired: true,
                    isApplied: false,
                    expectedDate: '2024-05-23T07:29:55.799Z',
                    executionDate: null,
                    resultDate: null,
                    isPrint: false,
                    observation: '',
                    user: '',
                  },
                  importLicense: {
                    hasServiceIncluded: false,
                    isRequired: true,
                    isApplied: false,
                    expectedDate: '2024-05-23T07:29:55.799Z',
                    executionDate: null,
                    resultDate: null,
                    isPrint: false,
                    observation: '',
                    user: '',
                  },
                  emotionalSupportCertificate: {
                    hasServiceIncluded: false,
                    isRequired: false,
                    isApplied: false,
                    expectedDate: '2024-05-23T07:29:55.800Z',
                    executionDate: null,
                    resultDate: null,
                    isPrint: false,
                    observation: '',
                    user: '',
                  },
                },
              },
            ],
            adviser: '09cccd46-e15e-4d06-8159-e1325cbd0c04',
            price: 400,
            payInInstallments: [
              {
                date: '2024-05-23T07:29:16.430Z',
                isPay: true,
                percentage: 100,
                price: 400,
                customerPayments: [
                  {
                    date: '2024-05-23T07:29:16.430Z',
                    price: 400,
                    method: '',
                  },
                ],
              },
            ],
            reasonForCancellation: '',
            format: 'Europa',
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
            message: 'Se actualizó el contrato exitosamente',
          },
        },
      },
    }),
  );
}
