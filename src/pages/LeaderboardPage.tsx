import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronLeft, ChevronRight, CalendarIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import RankingTable from '../components/ui/RankingTable';
import { formatMonth } from '../utils/helpers';

const LeaderboardPage: React.FC = () => {
  const { employees, votes, currentMonth, getMonthlyRankings } = useAppContext();
  
  // State for current displayed month
  const [displayMonth, setDisplayMonth] = useState(currentMonth);
  
  // Get all available months with votes
  const availableMonths = [...new Set(votes.map(vote => vote.date.slice(0, 7)))].sort();
  
  // If no votes, add current month to available months
  if (availableMonths.length === 0) {
    availableMonths.push(currentMonth);
  }
  
  // Find index of current display month
  const currentMonthIndex = availableMonths.indexOf(displayMonth);
  
  // Navigate to previous month
  const goToPrevMonth = () => {
    if (currentMonthIndex > 0) {
      setDisplayMonth(availableMonths[currentMonthIndex - 1]);
    }
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    if (currentMonthIndex < availableMonths.length - 1) {
      setDisplayMonth(availableMonths[currentMonthIndex + 1]);
    }
  };
  
  // Get rankings for the displayed month
  const rankings = getMonthlyRankings();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // Generate winner podium
  const getTopThree = () => {
    const topThree = rankings.slice(0, 3);
    while (topThree.length < 3) {
      topThree.push(null);
    }
    return topThree;
  };
  
  const topThree = getTopThree();

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center max-w-3xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            従業員ランキング
          </h1>
          <p className="text-xl text-gray-600">
            お客様からの評価に基づいた月間ランキングをご覧ください。<br />
            最高の評価を獲得した従業員を称えましょう。
          </p>
        </motion.div>
        
        {/* Month selector */}
        <div className="flex justify-center items-center mb-8">
          <button
            onClick={goToPrevMonth}
            disabled={currentMonthIndex <= 0}
            className={`p-2 rounded-full ${
              currentMonthIndex <= 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-primary-600 hover:bg-primary-50'
            }`}
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="mx-4 flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
            <CalendarIcon size={20} className="text-primary-600 mr-2" />
            <span className="text-lg font-medium">{formatMonth(displayMonth)}</span>
          </div>
          
          <button
            onClick={goToNextMonth}
            disabled={currentMonthIndex >= availableMonths.length - 1}
            className={`p-2 rounded-full ${
              currentMonthIndex >= availableMonths.length - 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-primary-600 hover:bg-primary-50'
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Top performers podium */}
        {rankings.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center">
              <Trophy className="text-accent-500 mr-2" size={24} />
              トップパフォーマー
            </h2>
            
            <div className="flex flex-col md:flex-row justify-center items-end gap-4 max-w-4xl mx-auto">
              {/* Second place */}
              <motion.div
                variants={itemVariants}
                className="order-2 md:order-1 flex-1"
              >
                {topThree[1] ? (
                  <div className="bg-gray-100 rounded-t-lg pt-4 px-4 flex flex-col items-center relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-400 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                      2
                    </div>
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-300 mb-2">
                      <img
                        src={employees.find(e => e.id === topThree[1]?.employeeId)?.photoUrl}
                        alt="2位"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-bold text-center mb-1">
                      {employees.find(e => e.id === topThree[1]?.employeeId)?.name}
                    </p>
                    <p className="text-sm text-gray-500 text-center mb-2">
                      {employees.find(e => e.id === topThree[1]?.employeeId)?.department}
                    </p>
                    <div className="bg-gray-300 w-full py-8 rounded-t-lg flex items-center justify-center">
                      <div className="flex items-center">
                        <Trophy size={18} className="text-gray-700 mr-1" />
                        <span className="font-bold">2位</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-t-lg pt-4 px-4 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-200 mb-2 flex items-center justify-center">
                      <Trophy size={24} className="text-gray-300" />
                    </div>
                    <p className="font-bold text-center mb-1 text-gray-400">未定</p>
                    <p className="text-sm text-gray-400 text-center mb-2">2位</p>
                    <div className="bg-gray-300 w-full py-8 rounded-t-lg"></div>
                  </div>
                )}
              </motion.div>
              
              {/* First place */}
              <motion.div
                variants={itemVariants}
                className="order-1 md:order-2 flex-1 transform scale-110"
              >
                {topThree[0] ? (
                  <div className="bg-accent-100 rounded-t-lg pt-4 px-4 flex flex-col items-center relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent-500 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                      1
                    </div>
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-accent-300 mb-2">
                      <img
                        src={employees.find(e => e.id === topThree[0]?.employeeId)?.photoUrl}
                        alt="1位"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-bold text-center mb-1">
                      {employees.find(e => e.id === topThree[0]?.employeeId)?.name}
                    </p>
                    <p className="text-sm text-gray-500 text-center mb-2">
                      {employees.find(e => e.id === topThree[0]?.employeeId)?.department}
                    </p>
                    <div className="bg-accent-300 w-full py-12 rounded-t-lg flex items-center justify-center">
                      <div className="flex items-center">
                        <Trophy size={20} className="text-accent-900 mr-1" />
                        <span className="font-bold">1位</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-accent-100 rounded-t-lg pt-4 px-4 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-accent-200 mb-2 flex items-center justify-center">
                      <Trophy size={32} className="text-accent-300" />
                    </div>
                    <p className="font-bold text-center mb-1 text-gray-400">未定</p>
                    <p className="text-sm text-gray-400 text-center mb-2">1位</p>
                    <div className="bg-accent-300 w-full py-12 rounded-t-lg"></div>
                  </div>
                )}
              </motion.div>
              
              {/* Third place */}
              <motion.div
                variants={itemVariants}
                className="order-3 flex-1"
              >
                {topThree[2] ? (
                  <div className="bg-gray-100 rounded-t-lg pt-4 px-4 flex flex-col items-center relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                      3
                    </div>
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-accent-600 mb-2">
                      <img
                        src={employees.find(e => e.id === topThree[2]?.employeeId)?.photoUrl}
                        alt="3位"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-bold text-center mb-1">
                      {employees.find(e => e.id === topThree[2]?.employeeId)?.name}
                    </p>
                    <p className="text-sm text-gray-500 text-center mb-2">
                      {employees.find(e => e.id === topThree[2]?.employeeId)?.department}
                    </p>
                    <div className="bg-accent-700 w-full py-6 rounded-t-lg flex items-center justify-center">
                      <div className="flex items-center">
                        <Trophy size={16} className="text-white mr-1" />
                        <span className="font-bold text-white">3位</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-t-lg pt-4 px-4 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-200 mb-2 flex items-center justify-center">
                      <Trophy size={24} className="text-gray-300" />
                    </div>
                    <p className="font-bold text-center mb-1 text-gray-400">未定</p>
                    <p className="text-sm text-gray-400 text-center mb-2">3位</p>
                    <div className="bg-accent-700 w-full py-6 rounded-t-lg"></div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {/* Full rankings table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <RankingTable
            rankings={rankings}
            employees={employees}
            month={displayMonth}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LeaderboardPage;