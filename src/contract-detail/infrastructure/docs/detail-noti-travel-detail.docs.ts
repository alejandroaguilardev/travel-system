import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

export function DocsNotificationTravelDetail() {
  return applyDecorators(
    ApiOperation({
      summary: 'Notificación de viaje mail',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
    }),
  );
}
