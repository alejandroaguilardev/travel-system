import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

export function DocsGetFile() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener un archivo',
    }),
    ApiParam({
      name: 'name',
      description: 'nombre de la imagen',
      required: true,
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      status: 200,
    }),
  );
}
