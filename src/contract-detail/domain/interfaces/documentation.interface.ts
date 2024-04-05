import { StatusInterface } from './status.interface';

export interface DocumentationCertificateInterface {
  hasServiceIncluded: boolean;
  isRequired: boolean;
  isApplied: boolean;
  expectedDate: Date;
  executionDate: Date | null;
  resultDate: Date | null;
  user?: string;
}
export interface DocumentationInterface {
  status: StatusInterface;
  vaccinationCertificate: DocumentationCertificateInterface;
  healthCertificate: DocumentationCertificateInterface;
  chipCertificate: DocumentationCertificateInterface;
  senasaDocuments: DocumentationCertificateInterface;
  rabiesSeroLogicalTest: DocumentationCertificateInterface;
  importLicense: DocumentationCertificateInterface;
  emotionalSupportCertificate: DocumentationCertificateInterface;
}
