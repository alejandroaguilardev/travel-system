import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CriteriaDocs } from '../../../common/infrastructure/docs/criteria.docs';

export function DocsContractClientAll() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Obtener los contractos del cliente que esten en status pendiente',
      description: 'Paginar los contractos del sistema',
    }),
    ApiBearerAuth(),
    CriteriaDocs(),
    ApiOkResponse({
      content: {
        'application/json': {
          schema: {
            type: 'array',
          },
          example: {
            id: '575be9b1-8654-478c-9a5d-7a312515e17e',
            folder: '',
            number: '',
            correlative: 2,
            client: {
              id: '9b548ef0-809f-4e8a-8565-3c9242a2c400',
              email: 'crichrissuarez82@gmail.com',
              roles: [],
              profile: {
                document: 'D.N.I.',
                documentNumber: '41233194',
                name: 'Christian',
                secondName: '',
                lastName: 'Suarez',
                secondLastName: '',
                phone: '51994748870',
                gender: 'male',
                birthDate: '2024-05-23T07:21:24.988Z',
                department: '',
                province: '',
                district: '',
                direction: '',
                _id: '664eee75ff216f66b38533bc',
              },
              user: '',
              status: 'active',
              auth: {
                admin: true,
                rememberToken: '',
                lastLogin: null,
                _id: '664eee75ff216f66b38533bd',
              },
              linkWhatsApp: '',
              isAdvisor: true,
              isDoctor: false,
            },
            details: [
              {
                id: '8fbaade4-d3fc-4a9d-a850-5a2c0d3de817',
                documentation: {
                  status: 'pending',
                  clientStatus: 'pending',
                  vaccinationCertificate: {
                    isApplied: false,
                    hasServiceIncluded: true,
                    expectedDate: '2024-05-23T07:29:55.799Z',
                    executionDate: null,
                    resultDate: null,
                    isRequired: true,
                    observation: '',
                    isPrint: false,
                    user: '',
                  },
                  healthCertificate: {
                    isApplied: false,
                    hasServiceIncluded: false,
                    expectedDate: '2024-05-23T07:29:55.799Z',
                    executionDate: null,
                    resultDate: null,
                    isRequired: true,
                    observation: '',
                    isPrint: false,
                    user: '',
                  },
                  chipCertificate: {
                    isApplied: false,
                    hasServiceIncluded: true,
                    expectedDate: '2024-05-23T07:29:55.799Z',
                    executionDate: null,
                    resultDate: null,
                    isRequired: true,
                    observation: '',
                    isPrint: false,
                    user: '',
                  },
                  senasaDocuments: {
                    isApplied: false,
                    hasServiceIncluded: false,
                    expectedDate: '2024-05-23T07:29:55.800Z',
                    executionDate: null,
                    resultDate: null,
                    isRequired: true,
                    observation: '',
                    isPrint: false,
                    user: '',
                  },
                  rabiesSeroLogicalTest: {
                    isApplied: false,
                    hasServiceIncluded: true,
                    expectedDate: '2024-05-23T07:29:55.799Z',
                    executionDate: null,
                    resultDate: null,
                    isRequired: true,
                    observation: '',
                    isPrint: false,
                    user: '',
                  },
                  importLicense: {
                    isApplied: false,
                    hasServiceIncluded: false,
                    expectedDate: '2024-05-23T07:29:55.799Z',
                    executionDate: null,
                    resultDate: null,
                    isRequired: true,
                    observation: '',
                    isPrint: false,
                    user: '',
                  },
                  emotionalSupportCertificate: {
                    isApplied: false,
                    hasServiceIncluded: false,
                    expectedDate: '2024-05-23T07:29:55.800Z',
                    executionDate: null,
                    resultDate: null,
                    isRequired: false,
                    observation: '',
                    isPrint: false,
                    user: '',
                  },
                },
                cage: {
                  status: 'pending',
                  hasServiceIncluded: false,
                  chosen: {
                    modelCage: '',
                    typeCage: '',
                    dimensionsCage: '',
                    user: '',
                  },
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
                    itinerary: '',
                    arrivalDate: null,
                    archive: '',
                    user: '',
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
                user: '09cccd46-e15e-4d06-8159-e1325cbd0c04',
                topico: {
                  chip: {
                    hasIncluded: false,
                    executed: false,
                    date: null,
                    description: '',
                    observation: '',
                    user: '',
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
                  chipReview: {
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
                },
              },
            ],
            status: {
              petTravel: 'pending',
              client: 'pending',
              _id: '664ef106c76176a5a8d56051',
            },
            startDate: '2024-05-23T07:29:16.430Z',
            estimatedDate: '2024-11-19T08:29:16.430Z',
            endDate: null,
            adviser: {
              id: '09cccd46-e15e-4d06-8159-e1325cbd0c04',
              email: 'alexaguilar281@gmail.com',
              roles: [],
              profile: {
                document: 'C.E.',
                documentNumber: '987654321',
                name: 'Alejandro',
                secondName: '',
                lastName: 'Aguilar',
                secondLastName: '',
                phone: '51939130496',
                gender: 'male',
                birthDate: '2024-05-23T07:21:24.988Z',
                department: '',
                province: '',
                district: '',
                direction: '',
                _id: '664eee75ff216f66b38533b9',
              },
              user: '',
              status: 'active',
              auth: {
                admin: true,
                rememberToken: '',
                lastLogin: null,
                _id: '664eee75ff216f66b38533ba',
              },
              linkWhatsApp: '',
              isAdvisor: true,
              isDoctor: false,
            },
            price: 400,
            payInInstallments: [
              {
                price: 400,
                percentage: 100,
                date: '2024-05-23T07:29:16.430Z',
                isPay: true,
                customerPayments: [
                  {
                    price: 400,
                    date: '2024-05-23T07:29:16.430Z',
                    method: '',
                    _id: '664ef106c76176a5a8d56053',
                  },
                ],
                _id: '664ef106c76176a5a8d56052',
              },
            ],
            finishClient: false,
            reasonForCancellation: '',
            format: 'Europa',
            user: '09cccd46-e15e-4d06-8159-e1325cbd0c04',
          },
        },
      },
    }),
  );
}
