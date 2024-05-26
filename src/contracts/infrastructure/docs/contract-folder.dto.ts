import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { FolderContractDto } from '../dto/folder-contract-dto';

export function DocsContractFolder() {
  return applyDecorators(
    ApiOperation({
      summary: 'Actualizar el folder de los contratos',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: FolderContractDto,
      examples: {
        data: {
          value: {
            folder: 'Folder1',
            number: '1',
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
