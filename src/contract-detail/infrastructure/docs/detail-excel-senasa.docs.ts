import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

export function DocsExcelSenasaCertificate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Descargar Excel Certificado',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      description: 'Excel file containing Senasa certificate data',
    }),
  );
}
