export type SupportedLanguage = 'ru' | 'uz' | 'kg' | 'tj' | 'kz' | 'az' | 'hy';

export type Citizenship = 'uzbekistan' | 'kyrgyzstan' | 'tajikistan' | 'kazakhstan' | 'azerbaijan' | 'armenia';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export interface LawCalcInput {
  citizenship: Citizenship;
  entryDate: string; // YYYY-MM-DD
  purposeOfEntry: 'work' | 'other';
  hasPatent: boolean;
}

export interface DeadlineRequirement {
  title: string;
  description: string;
  deadlineDate: string;
  daysRemaining: number;
  status: 'critical' | 'warning' | 'info' | 'success';
  completed: boolean;
}

export interface LawCalcResult {
  isEaeu: boolean;
  patentRequired: boolean;
  requirements: DeadlineRequirement[];
}

export interface MvdCheckInput {
  fullName: string;
  passportNumber: string; // Series + Number
  citizenship: Citizenship;
  patentNumber?: string;
  birthDate?: string; // Birth Date for FSSP
}

export interface MvdCheckResult {
  checkedAt: string;
  fullName: string;
  passportNumber: string;
  citizenshipName: string;
  status: 'valid' | 'restricted' | 'warning';
  patentStatus: {
    exists: boolean;
    statusText: string;
    details: string;
    paidUntil?: string;
  };
  mvdRegistry: {
    isControlled: boolean;
    details: string;
  };
  entryBan: {
    hasBan: boolean;
    details: string;
  };
  fsspStatus?: {
    hasDebts: boolean;
    details: string;
    debtAmount?: string;
    executiveProductionNumber?: string;
  };
}

export interface StateIdCheckResult {
  number: string;
  type: 'INN' | 'SNILS';
  isValid: boolean;
  details: string;
}
