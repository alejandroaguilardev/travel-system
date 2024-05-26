import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export function DocsSeederCreate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Ejecutar seeder',
      description: 'Solo de pueden ejecutar en modo de desarrollo',
    }),
    ApiOkResponse({
      status: 201,
      content: {
        'application/json': {
          schema: {
            type: 'object',
          },
          example: {
            message: 'Se registró el rol exitosamente',
          },
        },
      },
    }),
  );
}
