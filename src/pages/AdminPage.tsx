import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Users, UserPlus, Edit, Trash2, X, Save, Key } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Employee } from '../types';
import { formatDate } from '../utils/helpers';

const AdminPage: React.FC = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee, getMonthlyRankings } = useAppContext();
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(null);
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
    name: '',
    department: '',
    position: '',
    photoUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800',
    skills: [],
    joinDate: new Date().toISOString().slice(0, 10),
    bio: ''
  });
  const [skillInput, setSkillInput] = useState('');
  
  // Get rankings
  const rankings = getMonthlyRankings();
  
  // Reset form
  const resetForm = () => {
    setNewEmployee({
      name: '',
      department: '',
      position: '',
      photoUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800',
      skills: [],
      joinDate: new Date().toISOString().slice(0, 10),
      bio: ''
    });
    setSkillInput('');
  };
  
  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEmployeeId) {
      // Update existing employee
      updateEmployee(editingEmployeeId, newEmployee);
      setEditingEmployeeId(null);
    } else {
      // Add new employee
      addEmployee(newEmployee as Omit<Employee, 'id'>);
    }
    
    resetForm();
    setIsAddingEmployee(false);
  };
  
  // Start editing an employee
  const handleEdit = (employee: Employee) => {
    setNewEmployee({
      name: employee.name,
      department: employee.department,
      position: employee.position,
      photoUrl: employee.photoUrl,
      skills: [...employee.skills],
      joinDate: employee.joinDate.slice(0, 10),
      bio: employee.bio
    });
    setEditingEmployeeId(employee.id);
    setIsAddingEmployee(true);
  };
  
  // Add a skill
  const handleAddSkill = () => {
    if (skillInput.trim() && !newEmployee.skills?.includes(skillInput.trim())) {
      setNewEmployee({
        ...newEmployee,
        skills: [...(newEmployee.skills || []), skillInput.trim()]
      });
      setSkillInput('');
    }
  };
  
  // Remove a skill
  const handleRemoveSkill = (skill: string) => {
    setNewEmployee({
      ...newEmployee,
      skills: newEmployee.skills?.filter(s => s !== skill) || []
    });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                管理パネル
              </h1>
              <p className="text-gray-600">
                従業員情報の管理と統計データの確認
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                resetForm();
                setEditingEmployeeId(null);
                setIsAddingEmployee(true);
              }}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-sm"
            >
              <UserPlus size={18} className="mr-2" />
              新しい従業員を追加
            </motion.button>
          </div>
        </motion.div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: '従業員数',
              value: employees.length,
              icon: <Users size={24} className="text-primary-600" />,
              color: 'bg-primary-50 border-primary-100'
            },
            {
              title: '今月の投票総数',
              value: rankings.reduce((sum, r) => sum + r.totalVotes, 0),
              icon: <PlusCircle size={24} className="text-secondary-600" />,
              color: 'bg-secondary-50 border-secondary-100'
            },
            {
              title: '平均評価',
              value: rankings.length > 0
                ? (rankings.reduce((sum, r) => sum + r.averageRating, 0) / rankings.length).toFixed(1)
                : '0.0',
              icon: <Key size={24} className="text-accent-500" />,
              color: 'bg-accent-50 border-accent-100'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`${stat.color} border rounded-xl p-6 shadow-sm`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="p-2 rounded-lg bg-white shadow-sm">
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Employee form */}
        {isAddingEmployee && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="bg-primary-600 text-white p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {editingEmployeeId ? '従業員情報を編集' : '新しい従業員を追加'}
              </h2>
              <button
                onClick={() => setIsAddingEmployee(false)}
                className="text-white hover:text-primary-100 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    名前 <span className="text-error-600">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={newEmployee.name || ''}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    placeholder="佐藤 健太"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
                
                {/* Department */}
                <div>
                  <label htmlFor="department" className="block text-gray-700 font-medium mb-2">
                    部署 <span className="text-error-600">*</span>
                  </label>
                  <input
                    id="department"
                    type="text"
                    value={newEmployee.department || ''}
                    onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                    placeholder="営業部"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
                
                {/* Position */}
                <div>
                  <label htmlFor="position" className="block text-gray-700 font-medium mb-2">
                    役職 <span className="text-error-600">*</span>
                  </label>
                  <input
                    id="position"
                    type="text"
                    value={newEmployee.position || ''}
                    onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                    placeholder="主任"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
                
                {/* Join Date */}
                <div>
                  <label htmlFor="joinDate" className="block text-gray-700 font-medium mb-2">
                    入社日 <span className="text-error-600">*</span>
                  </label>
                  <input
                    id="joinDate"
                    type="date"
                    value={newEmployee.joinDate || ''}
                    onChange={(e) => setNewEmployee({...newEmployee, joinDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
                
                {/* Photo URL */}
                <div className="md:col-span-2">
                  <label htmlFor="photoUrl" className="block text-gray-700 font-medium mb-2">
                    プロフィール画像URL <span className="text-error-600">*</span>
                  </label>
                  <input
                    id="photoUrl"
                    type="url"
                    value={newEmployee.photoUrl || ''}
                    onChange={(e) => setNewEmployee({...newEmployee, photoUrl: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
                
                {/* Skills */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    スキル <span className="text-error-600">*</span>
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="スキルを入力"
                      className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 rounded-r-lg transition-colors"
                    >
                      追加
                    </button>
                  </div>
                  
                  <div className="mt-2 flex flex-wrap gap-2">
                    {newEmployee.skills?.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full flex items-center"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 text-primary-400 hover:text-primary-600"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {newEmployee.skills?.length === 0 && (
                      <p className="text-gray-500 text-sm">
                        スキルを1つ以上追加してください
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Bio */}
                <div className="md:col-span-2">
                  <label htmlFor="bio" className="block text-gray-700 font-medium mb-2">
                    自己紹介 <span className="text-error-600">*</span>
                  </label>
                  <textarea
                    id="bio"
                    value={newEmployee.bio || ''}
                    onChange={(e) => setNewEmployee({...newEmployee, bio: e.target.value})}
                    placeholder="自己紹介や経歴などを入力してください"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    rows={3}
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddingEmployee(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <Save size={18} className="mr-2" />
                  {editingEmployeeId ? '更新' : '追加'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
        
        {/* Employees table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Users className="mr-2" size={20} />
              従業員一覧
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    従業員
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    部署 / 役職
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    入社日
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    スキル
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <motion.tr
                      key={employee.id}
                      variants={itemVariants}
                      className="hover:bg-gray-50"
                    >
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
                              {rankings.find(r => r.employeeId === employee.id)?.rank
                                ? `現在${rankings.find(r => r.employeeId === employee.id)?.rank}位`
                                : '未評価'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {employee.department}
                        </div>
                        <div className="text-sm text-gray-500">
                          {employee.position}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(employee.joinDate)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {employee.skills.slice(0, 3).map((skill, idx) => (
                            <span
                              key={idx}
                              className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                          {employee.skills.length > 3 && (
                            <span className="inline-block text-xs text-gray-500">
                              +{employee.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(employee)}
                            className="text-primary-600 hover:text-primary-900 p-1"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => deleteEmployee(employee.id)}
                            className="text-error-600 hover:text-error-900 p-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      従業員データがありません。新しい従業員を追加してください。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;