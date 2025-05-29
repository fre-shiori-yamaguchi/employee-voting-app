export interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  photoUrl: string;
  skills: string[];
  joinDate: string;
  bio: string;
}

export type VotingReason = 
  | 'service_quality'
  | 'communication'
  | 'problem_solving'
  | 'professionalism'
  | 'knowledge'
  | 'other';

export interface Vote {
  id: string;
  employeeId: string;
  customerId: string;
  rating: number; // 1-5
  comment: string;
  votingReason: VotingReason; // 投票理由を追加
  date: string; // ISO format
}

export interface Customer {
  id: string;
  name: string;
  email: string;
}

export interface MonthlyRanking {
  employeeId: string;
  totalVotes: number;
  averageRating: number;
  rank: number;
  month: string; // Format: YYYY-MM
}