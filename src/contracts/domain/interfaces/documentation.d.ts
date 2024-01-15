import { StatusDefinition } from './status';

export interface DocumentationDefinition {
  status: StatusDefinition;
  hasServiceIncluded: boolean;
  vaccinationCertificate: {
    isApplied: boolean;
  };
  healthCertificate: {
    isApplied: boolean;
  };
  chipCertificate: {
    isApplied: boolean;
  };
  senasaDocuments: {
    isApplied: boolean;
  };
  rabiesSeroLogicalTest: {
    isApplied: boolean;
  };
  importLicense: {
    isApplied: boolean;
  };
  emotionalSupportCertificate: {
    isApplied: boolean;
  };
}
