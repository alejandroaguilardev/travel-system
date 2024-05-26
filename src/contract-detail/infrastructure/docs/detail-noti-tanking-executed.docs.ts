import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

export function DocsNotificationTakingExecuted() {
  return applyDecorators(
    ApiOperation({
      summary: 'Notificación toma de muestra ejecutado',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
    }),
  );
}
