import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Award, Filter } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import EmployeeCard from '../components/ui/EmployeeCard';
import VoteForm from '../components/ui/VoteForm';
import SuccessModal from '../components/ui/SuccessModal';
import FaceVerification from '../components/ui/FaceVerification';
import { Employee } from '../types';

const VotePage: React.FC = () => {
  const { employees, getMonthlyRankings } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showVoteForm, setShowVoteForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [showFaceVerification, setShowFaceVerification] = useState(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  // Get unique departments
  const departments = ['', ...new Set(employees.map(emp => emp.department))];
  
  // Get rankings to display on employee cards
  const rankings = getMonthlyRankings();
  
  // Filter employees based on search term and department
  useEffect(() => {
    let filtered = employees;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(emp => 
        emp.name.toLowerCase().includes(term) ||
        emp.department.toLowerCase().includes(term) ||
        emp.position.toLowerCase().includes(term) ||
        emp.skills.some(skill => skill.toLowerCase().includes(term))
      );
    }
    
    if (selectedDepartment) {
      filtered = filtered.filter(emp => emp.department === selectedDepartment);
    }
    
    setFilteredEmployees(filtered);
  }, [searchTerm, employees, selectedDepartment]);
  
  // Handle employee card click
  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowFaceVerification(true);
  };

  const handleVerificationComplete = (success: boolean) => {
    setShowFaceVerification(false);
    setIsVerified(success);
    setShowVoteForm(true);
  };
  
  // Handle vote success
  const handleVoteSuccess = () => {
    setShowVoteForm(false);
    setShowSuccessModal(true);
  };

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
            従業員に投票する
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            素晴らしいサービスを提供した従業員を評価しましょう。<br />
            あなたの評価が私たちのサービス向上につながります。
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
            <p className="text-sm">
              本投票システムでは、不正防止およびシステムの安全性向上のため、<br />
              投票時に顔写真を撮影させていただきます。
            </p>
          </div>
        </motion.div>
        
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm">
            {/* Search input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="名前、部署、スキルで検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
            
            {/* Department filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={20} className="text-gray-400" />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none transition-colors"
              >
                <option value="">全ての部署</option>
                {departments.slice(1).map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Employee cards */}
        {filteredEmployees.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                ranking={rankings.find(r => r.employeeId === employee.id)}
                onClick={() => handleEmployeeClick(employee)}
                showVoteButton
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-8">
            <Award size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm || selectedDepartment
                ? '検索条件に一致する従業員が見つかりませんでした。'
                : '従業員データがありません。'}
            </p>
          </div>
        )}
        
        {/* Face verification modal */}
        <AnimatePresence>
          {showFaceVerification && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
              >
                <h2 className="text-xl font-bold mb-4">顔認証</h2>
                <FaceVerification onVerificationComplete={handleVerificationComplete} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        
        {/* Vote form modal */}
        <AnimatePresence>
          {showVoteForm && selectedEmployee && (
            <VoteForm
              employee={selectedEmployee}
              onClose={() => setShowVoteForm(false)}
              onSuccess={handleVoteSuccess}
              isVerified={isVerified}
            />
          )}
        </AnimatePresence>
        
        {/* Success modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <SuccessModal
              message={`${selectedEmployee?.name}への評価を送信しました。ご協力ありがとうございます。`}
              onClose={() => setShowSuccessModal(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VotePage;