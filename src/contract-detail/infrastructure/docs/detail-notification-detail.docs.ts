import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { NotificationDetailDto } from '../dto/notification-detail.dto';

export function DocsNotificationDetail() {
  return applyDecorators(
    ApiOperation({
      summary: 'Notificación topico mail',
    }),
    ApiBearerAuth(),
    ApiBody({
      type: NotificationDetailDto,
      examples: {
        data: {
          value: {
            message: 'mensaje para el mail',
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
    }),
  );
}
