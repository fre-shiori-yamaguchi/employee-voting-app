import { Employee, Vote } from '../types';

export const initialEmployees: Employee[] = [
  {
    id: '1',
    name: '佐藤 健太',
    department: '営業部',
    position: '主任',
    photoUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800',
    skills: ['プレゼンテーション', '交渉', 'マーケティング'],
    joinDate: '2018-04-01',
    bio: '営業部で5年以上の経験を持ち、大手企業を中心に新規顧客開拓を担当しています。'
  },
  {
    id: '2',
    name: '鈴木 美咲',
    department: 'カスタマーサポート',
    position: 'マネージャー',
    photoUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
    skills: ['問題解決', 'コミュニケーション', '顧客管理'],
    joinDate: '2016-07-15',
    bio: 'カスタマーサポート部門で7年の経験を持ち、チームをリードしています。顧客満足度向上を常に意識しています。'
  },
  {
    id: '3',
    name: '田中 大輔',
    department: '技術開発',
    position: 'シニアエンジニア',
    photoUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800',
    skills: ['プログラミング', 'システム設計', 'プロジェクト管理'],
    joinDate: '2017-03-22',
    bio: '10年以上のソフトウェア開発経験を持ち、現在は主要プロジェクトのリードエンジニアを務めています。'
  },
  {
    id: '4',
    name: '山田 優子',
    department: '人事部',
    position: '採用担当',
    photoUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
    skills: ['人材評価', '面接', 'キャリアコンサルティング'],
    joinDate: '2019-09-01',
    bio: '人事部で優秀な人材の採用を担当。社内研修プログラムの企画も行っています。'
  },
  {
    id: '5',
    name: '高橋 誠',
    department: '経理部',
    position: '主任',
    photoUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800',
    skills: ['会計', '予算管理', '財務分析'],
    joinDate: '2017-11-15',
    bio: '経理部で財務報告や予算管理を担当。正確かつ効率的な業務遂行に定評があります。'
  },
  {
    id: '6',
    name: '渡辺 亮',
    department: 'マーケティング',
    position: 'デジタルマーケター',
    photoUrl: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=800',
    skills: ['SNS運用', 'コンテンツ制作', 'データ分析'],
    joinDate: '2020-01-10',
    bio: 'デジタルマーケティングを専門とし、オンラインでの企業ブランディングに注力しています。'
  }
];

// Initial votes (typically empty in a real app)
export const initialVotes: Vote[] = [];