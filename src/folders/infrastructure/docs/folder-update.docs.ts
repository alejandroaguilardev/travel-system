import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UpdateFolderDto } from '../dto/update-folder.dto';

export function DocsFolderUpdate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar un folder',
      description: 'Actualizar un folder en el sistema',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: UpdateFolderDto,
      examples: {
        data: {
          value: {
            id: '8a6ea78b-190f-4f84-8bee-9d6ffdc4b210',
            name: 'Folder-2',
            quantity: 300,
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
            message: 'Se actualizó el expediente exitosamente',
          },
        },
      },
    }),
  );
}
