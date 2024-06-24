import { applyDecorators } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger';

export function DocsRabiesSerology() {
    return applyDecorators(
        ApiOperation({
            summary: 'Descargar Pdf Rabies Serology',
        }),
        ApiBearerAuth(),
        ApiResponse({
            status: 200,
            description: 'Pdf file containing Rabies Serology',
        }),
    );
}
