import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ClientProfileDto } from '../dto/client-profile.dto';

export function DocsUserUpdateProfile() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar el perfil usuario',
      description: 'actualiza datos del perfil del usuario',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: ClientProfileDto,
      examples: {
        data: {
          value: {
            phone: '51939130496',
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
            message: 'Se actualizó el perfil exitosamente',
          },
        },
      },
    }),
  );
}
