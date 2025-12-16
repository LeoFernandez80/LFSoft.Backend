import { EnumDocumentStatus } from './enum-document-status.dto';
import { DocumentItemDto } from './document-item.dto';

export class DocumentDto {
  documentId: number;
  personName: string;
  personId: number;
  personDocumentType: string;
  personDocumentNumber: string;
  documentDescription: string;
  documentCreationDate: Date;
  documentStatus: EnumDocumentStatus;
  creationUserId: number;
  items: DocumentItemDto[];
}
