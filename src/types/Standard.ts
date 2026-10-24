export interface Standard {
  id: string;
  code: string;
  title: string;
  fullTitle: string;
  category: string;
  description: string;
  certificationRequired: boolean;
  testingRequired: boolean;
  testingLabs: string[];
  documents: string[];
  matchKeywords: string[];
  year: number;
  status: 'Active' | 'Withdrawn' | 'Under Revision';
  scope: string;
  certificationBody: string;
}

export interface StandardMatch {
  standard: Standard;
  matchPercentage: number;
  matchReasons: string[];
}
