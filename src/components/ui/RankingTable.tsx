import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, TrendingDown, Star } from 'lucide-react';
import { Employee, MonthlyRanking } from '../../types';
import { formatMonth } from '../../utils/helpers';

interface RankingTableProps {
  rankings: MonthlyRanking[];
  employees: Employee[];
  month: string;
}

const RankingTable: React.FC<RankingTableProps> = ({ rankings, employees, month }) => {
  // Find employee by ID
  const findEmployee = (id: string) => {
    return employees.find(employee => employee.id === id);
  };
  
  // Get rank badge
  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center">
          <Trophy size={18} className="text-accent-500 mr-1" />
          <span className="font-bold text-accent-500">1位</span>
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex items-center">
          <Trophy size={18} className="text-gray-400 mr-1" />
          <span className="font-bold text-gray-600">2位</span>
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="flex items-center">
          <Trophy size={18} className="text-accent-600 mr-1" />
          <span className="font-bold text-gray-600">3位</span>
        </div>
      );
    }
    return <span className="font-medium text-gray-600">{rank}位</span>;
  };
  
  // Container animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Item animation
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-primary-600 text-white p-4">
        <h2 className="text-xl font-bold flex items-center">
          <Trophy size={22} className="mr-2" />
          {formatMonth(month)}のランキング
        </h2>
      </div>
      
      {rankings.length > 0 ? (
        <motion.div 
          className="overflow-x-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  順位
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  従業員
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  部署
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  評価
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  投票数
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rankings.map((ranking) => {
                const employee = findEmployee(ranking.employeeId);
                
                if (!employee) return null;
                
                return (
                  <motion.tr 
                    key={ranking.employeeId}
                    variants={item}
                    className={ranking.rank <= 3 ? "bg-primary-50" : ""}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRankBadge(ranking.rank)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={employee.photoUrl}
                            alt={employee.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {employee.position}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee.department}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star 
                          size={16} 
                          className="text-accent-500 mr-1 fill-accent-500" 
                        />
                        <span className="font-medium">
                          {ranking.averageRating.toFixed(1)}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">/ 5.0</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="font-medium text-gray-900">
                        {ranking.totalVotes}
                      </span> 票
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          <p>データがありません。投票を待っています。</p>
        </div>
      )}
    </div>
  );
};

export default RankingTable;