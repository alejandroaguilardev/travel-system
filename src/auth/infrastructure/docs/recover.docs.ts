import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { RecoverDto } from '../dto/recover-auth.dto';

export function DocsRecover() {
  return applyDecorators(
    ApiOperation({
      summary: 'Solicitar recuperación de contraseña',
      description: 'Recuperación de contraseña solicitada.',
    }),
    ApiBody({
      type: RecoverDto,
      examples: {
        data: {
          value: {
            email: 'alexaguilar281@gmail.com',
          },
        },
      },
    }),
    ApiOkResponse({
      status: 200,
      description: 'Correo enviado',
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message: 'Revisa tu correo electrónico',
          },
        },
      },
    }),
  );
}
