import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateFolderDto } from '../dto/create-folder.dto';

export function DocsFolderCreate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Crear un nuevo folder',
      description: 'Crear un nuevo folder en el sistema',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: CreateFolderDto,
      examples: {
        data: {
          value: {
            id: '8a6ea78b-190f-4f84-8bee-9d6ffdc4b210',
            name: 'Folder-1',
            quantity: 300,
          },
        },
      },
    }),
    ApiOkResponse({
      status: 201,
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message: 'Se registró el expediente exitosamente',
          },
        },
      },
    }),
  );
}
