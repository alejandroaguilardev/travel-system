import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

export function DocsNotificationSenasaIntroduce() {
  return applyDecorators(
    ApiOperation({
      summary: 'Notificación senasa ejecutado',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
    }),
  );
}
