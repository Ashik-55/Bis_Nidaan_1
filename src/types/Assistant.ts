export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  evidence?: EvidenceItem[];
  isLoading?: boolean;
}

export interface EvidenceItem {
  id: string;
  standardCode: string;
  title: string;
  source: string;
  clause?: string;
  confidence: number;
  verified: boolean;
  description: string;
}

export interface MockResponse {
  triggers: string[];
  response: string;
  evidence: EvidenceItem[];
}
