import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { PayInInstallmentArrayDto } from '../dto/pay-installment.dto';

export function DocsContractPayment() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar pagos del cliente',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: PayInInstallmentArrayDto,
      examples: {
        data: {
          value: {
            payInInstallments: [
              {
                price: 100,
                percentage: 100,
                date: '2024-05-23T07:29:16.430Z',
                isPay: true,
                customerPayments: [
                  {
                    price: 100,
                    date: '2024-05-23T07:29:16.430Z',
                    method: '',
                  },
                ],
              },
            ],
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
            message: 'Se actualizó el contrato exitosamente',
          },
        },
      },
    }),
  );
}
