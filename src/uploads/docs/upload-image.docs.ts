import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UploadImageDto } from '../dto/upload-image.dto';

export function DocsUploadImage() {
  return applyDecorators(
    ApiOperation({
      summary: 'Subir una nueva imagen',
    }),
    ApiParam({
      name: 'routeType',
      description: 'Si es un imagen que será publica o privada',
      required: true,
    }),
    ApiBearerAuth(),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      type: UploadImageDto,
      examples: {
        data: {
          value: {
            name: 'image',
            file: {
              filename: 'example.jpg',
              mimetype: 'image/jpeg',
              size: 12345,
            },
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
            url: 'imagen.png',
          },
        },
      },
    }),
  );
}
