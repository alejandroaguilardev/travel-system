import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

export function DocsNotificationReVaccinationDetail() {
  return applyDecorators(
    ApiOperation({
      summary: 'Notificación re vacunación de rabia mail',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
    }),
  );
}
