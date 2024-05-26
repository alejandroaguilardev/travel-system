import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UploadImageDto } from '../dto/upload-image.dto';

export function DocsUploadFile() {
  return applyDecorators(
    ApiOperation({
      summary: 'Subir un archivo',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: UploadImageDto,
      examples: {
        data: {
          value: {
            name: 'admin.pdf',
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
