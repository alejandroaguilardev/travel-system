import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ChangePasswordDto } from '../dto/change-password.dto';

export function DocsUserUpdatePassword() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar el password del usuario',
      description: 'actualiza el password del usuario',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: ChangePasswordDto,
      examples: {
        data: {
          value: {
            password: '12345678',
            newPassword: '123456789',
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
            message: 'Se actualizó la contraseña exitosamente',
          },
        },
      },
    }),
  );
}
