import { DocumentItemDetailDto } from './document-item-detail.dto';

export class DocumentItemDto {
  documentId: number;
  itemId: number;
  itemDescription: string;
  details: DocumentItemDetailDto[];
}
