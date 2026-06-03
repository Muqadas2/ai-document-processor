export interface Document {
  id: string;
  userId: string;
  title: string;
  filename: string;
  fileUrl: string;
  extractedText: string;
  summary: string;
  tags: Tag[];
  createdAt: Date;
}

export interface Tag {
  id: string;
  documentId: string;
  name: string;
  category: 'auto' | 'manual';
}

export interface AnalysisResult {
  summary: string;
  tags: string[];
  documentType: string;
  keyPoints: string[];
}

export interface SearchQuery {
  query: string;
  limit?: number;
  tags?: string[];
}