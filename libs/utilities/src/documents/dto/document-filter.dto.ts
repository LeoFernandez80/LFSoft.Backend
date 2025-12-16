import { EnumDocumentStatus } from './enum-document-status.dto';

export class DocumentFilterDto {
  documentId?: number;
  personName?: string;
  personId?: number;
  documentStatus?: EnumDocumentStatus;
}
