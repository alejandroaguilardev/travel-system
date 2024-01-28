import { IsBoolean, IsString, ValidateNested } from 'class-validator';
import { DocumentationDefinition } from '../../domain/interfaces/documentation';
import { StatusDefinition } from '../../domain/interfaces/status';
import { Type } from 'class-transformer';

class CertificateDto {
  @IsBoolean()
  hasServiceIncluded: boolean;
  @IsBoolean()
  isApplied: boolean;
}

interface Certificate {
  hasServiceIncluded: boolean;
  isApplied: boolean;
}

export class DocumentationDto implements DocumentationDefinition {
  @IsString()
  status: StatusDefinition;
  @Type(() => CertificateDto)
  @ValidateNested()
  vaccinationCertificate: Certificate;
  @Type(() => CertificateDto)
  @ValidateNested()
  healthCertificate: Certificate;
  @Type(() => CertificateDto)
  @ValidateNested()
  chipCertificate: Certificate;
  @Type(() => CertificateDto)
  @ValidateNested()
  senasaDocuments: Certificate;
  @Type(() => CertificateDto)
  @ValidateNested()
  rabiesSeroLogicalTest: Certificate;
  @Type(() => CertificateDto)
  @ValidateNested()
  importLicense: Certificate;
  @Type(() => CertificateDto)
  @ValidateNested()
  emotionalSupportCertificate: Certificate;
}
