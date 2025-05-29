import React from 'react';
import { Award } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <Award className="text-primary-400 mr-2" size={24} />
              <span className="text-xl font-bold">従業員評価アプリ</span>
            </div>
            <p className="text-gray-400 mt-2 text-center md:text-left">
              顧客の声を反映した公正な評価システム
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-6 md:mb-0">
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                サイトマップ
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-gray-400 hover:text-primary-300 transition-colors">
                    ホーム
                  </a>
                </li>
                <li>
                  <a href="/vote" className="text-gray-400 hover:text-primary-300 transition-colors">
                    投票
                  </a>
                </li>
                <li>
                  <a href="/leaderboard" className="text-gray-400 hover:text-primary-300 transition-colors">
                    ランキング
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                ヘルプ
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary-300 transition-colors">
                    ご利用ガイド
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary-300 transition-colors">
                    よくある質問
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary-300 transition-colors">
                    お問い合わせ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} 従業員評価アプリ. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-primary-300 transition-colors">
              プライバシーポリシー
            </a>
            <a href="#" className="text-gray-500 hover:text-primary-300 transition-colors">
              利用規約
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;