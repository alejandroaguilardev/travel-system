import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

export function DocsGetImage() {
  return applyDecorators(
    ApiOperation({
      summary: 'Obtener una imagen',
    }),
    ApiParam({
      name: 'name',
      description: 'nombre de la imagen',
      required: true,
    }),
    ApiParam({
      name: 'type',
      description: 'Tip ode respuesta arrayBuffer o un stream',
      required: true,
    }),
    ApiParam({
      name: 'routeType',
      description: 'Si es un imagen que es publica o privada',
      required: true,
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      status: 200,
    }),
  );
}
