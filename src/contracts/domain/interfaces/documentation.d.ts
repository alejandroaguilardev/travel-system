import { StatusDefinition } from './status';

export interface DocumentationDefinition {
  status: StatusDefinition;
  vaccinationCertificate: {
    hasServiceIncluded: boolean;
    isApplied: boolean;
  };
  healthCertificate: {
    hasServiceIncluded: boolean;
    isApplied: boolean;
  };
  chipCertificate: {
    hasServiceIncluded: boolean;
    isApplied: boolean;
  };
  senasaDocuments: {
    hasServiceIncluded: boolean;
    isApplied: boolean;
  };
  rabiesSeroLogicalTest: {
    hasServiceIncluded: boolean;
    isApplied: boolean;
  };
  importLicense: {
    hasServiceIncluded: boolean;
    isApplied: boolean;
  };
  emotionalSupportCertificate: {
    hasServiceIncluded: boolean;
    isApplied: boolean;
  };
}
