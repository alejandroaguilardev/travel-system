import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  DocumentationInterface,
  DocumentationCertificateInterface,
} from '../../domain/interfaces/documentation.interface';
import { StatusInterface } from '../../domain/interfaces/status.interface';

class CertificateDto implements DocumentationCertificateInterface {
  @IsBoolean()
  hasServiceIncluded: boolean;
  @IsBoolean()
  isApplied: boolean;
  @IsDate()
  expectedDate: Date;
  @IsOptional()
  @IsDate()
  executionDate: Date | null;
  @IsOptional()
  @IsString()
  user?: string;
}

export class DocumentationDto implements DocumentationInterface {
  @IsString()
  status: StatusInterface;
  @Type(() => CertificateDto)
  @ValidateNested()
  vaccinationCertificate: DocumentationCertificateInterface;
  @Type(() => CertificateDto)
  @ValidateNested()
  healthCertificate: DocumentationCertificateInterface;
  @Type(() => CertificateDto)
  @ValidateNested()
  chipCertificate: DocumentationCertificateInterface;
  @ValidateNested()
  @Type(() => CertificateDto)
  @ValidateNested()
  senasaDocuments: DocumentationCertificateInterface;
  @Type(() => CertificateDto)
  @ValidateNested()
  rabiesSeroLogicalTest: DocumentationCertificateInterface;
  @Type(() => CertificateDto)
  @ValidateNested()
  importLicense: DocumentationCertificateInterface;
  @Type(() => CertificateDto)
  @ValidateNested()
  emotionalSupportCertificate: DocumentationCertificateInterface;
}
