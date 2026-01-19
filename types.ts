export interface Player {
  id: string;
  name: string;
  position: 'C' | 'LW' | 'RW' | 'D' | 'G';
  age: number;
  capHit: number;
  aav: number;
  contractLength: number;
  contractYear: number;
  expiryStatus: 'UFA' | 'RFA';
  clause?: 'NMC' | 'NTC' | 'M-NTC' | null;
  team: string;
  headshot?: string;
  number?: number;
}

export interface Team {
  id: string;
  name: string;
  city: string;
  logoCode: string; // e.g. 'TOR' for Toronto
  logoUrl?: string; // URL from API
  roster: Player[];
  capSpace: number;
  projectedCapSpace: number;
  ltirUsed: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  isThinking?: boolean;
}

export enum AppView {
  HOME = 'HOME',
  TEAM = 'TEAM',
  PLAYER = 'PLAYER',
  GM_TOOL = 'GM_TOOL',
  CBA_EXPERT = 'CBA_EXPERT'
}
