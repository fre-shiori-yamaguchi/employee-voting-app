import React from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, Award } from 'lucide-react';
import { Employee, MonthlyRanking } from '../../types';
import { formatDate } from '../../utils/helpers';

interface EmployeeCardProps {
  employee: Employee;
  ranking?: MonthlyRanking;
  onClick?: () => void;
  showVoteButton?: boolean;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ 
  employee, 
  ranking, 
  onClick, 
  showVoteButton = false 
}) => {
  const { name, department, position, photoUrl, skills, joinDate, bio } = employee;
  
  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }
  };

  // Generate badge color based on rank
  const getBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-accent-500';
    if (rank === 2) return 'bg-gray-400';
    if (rank === 3) return 'bg-accent-600';
    return 'bg-gray-200 text-gray-700';
  };

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={onClick}
    >
      <div className="relative">
        {/* Employee photo */}
        <div className="h-48 w-full overflow-hidden">
          <img 
            src={photoUrl} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          />
        </div>
        
        {/* Ranking badge if available */}
        {ranking && (
          <div 
            className={`absolute top-3 right-3 ${getBadgeColor(ranking.rank)} text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg`}
          >
            {ranking.rank}
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
          <p className="text-sm text-gray-600">{department} • {position}</p>
        </div>
        
        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.slice(0, 3).map((skill, index) => (
            <span 
              key={index} 
              className="inline-block bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
        
        {/* Join date */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar size={16} className="mr-1" />
          <span>入社: {formatDate(joinDate)}</span>
        </div>
        
        {/* Bio truncated */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{bio}</p>
        
        {/* Rating if available */}
        {ranking && (
          <div className="flex justify-between items-center border-t border-gray-100 pt-3 mb-3">
            <div className="flex items-center">
              <Star className="text-accent-500 mr-1" size={16} />
              <span className="font-medium">{ranking.averageRating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm ml-1">/ 5.0</span>
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">{ranking.totalVotes}</span> 票
            </div>
          </div>
        )}
        
        {/* Vote button */}
        {showVoteButton && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onClick && onClick();
            }}
          >
            <Award size={18} className="mr-2" />
            この従業員に投票する
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default EmployeeCard;