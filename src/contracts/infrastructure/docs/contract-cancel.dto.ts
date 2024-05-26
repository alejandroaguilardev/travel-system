import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ContractCancelDto } from '../dto/contract-cancel.dto';

export function DocsContractCancel() {
  return applyDecorators(
    ApiOperation({
      summary: 'Finalizar un contracto en la vista del cliente',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: ContractCancelDto,
      examples: {
        data: {
          value: {
            reasonForCancellation: 'Es una prueba de postman',
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
            message: 'El contrato se cancelo con éxito',
          },
        },
      },
    }),
    ApiBadRequestResponse({
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            status: 400,
            timestamp: '2024-05-23T08:18:32.236Z',
            path: '/api/contracts/575be9b1-8654-478c-9a5d-7a312515e17e/finish',
            message:
              'El contrato no puede cancelarse por que ya esta completado',
            error: 'invalid_argument',
          },
        },
      },
    }),
  );
}
