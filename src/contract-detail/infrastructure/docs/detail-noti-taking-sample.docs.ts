import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

export function DocsNotificationTakingSample() {
  return applyDecorators(
    ApiOperation({
      summary: 'Notificación toma de muestra',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
    }),
  );
}
