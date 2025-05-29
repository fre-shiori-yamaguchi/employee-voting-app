import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee, Vote, MonthlyRanking } from '../types';
import { initialEmployees, initialVotes } from '../data/initialData';
import { generateId } from '../utils/helpers';

interface AppContextType {
  employees: Employee[];
  votes: Vote[];
  currentMonth: string;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  addVote: (vote: Omit<Vote, 'id' | 'date'>) => void;
  getMonthlyRankings: () => MonthlyRanking[];
  hasVoted: (customerId: string, employeeId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  
  // Get current month in format "YYYY-MM"
  const currentMonth = new Date().toISOString().slice(0, 7);

  // Load initial data from localStorage or use defaults
  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    const storedVotes = localStorage.getItem('votes');
    
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      setEmployees(initialEmployees);
    }
    
    if (storedVotes) {
      setVotes(JSON.parse(storedVotes));
    } else {
      setVotes(initialVotes);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);
  
  useEffect(() => {
    localStorage.setItem('votes', JSON.stringify(votes));
  }, [votes]);

  // Add a new employee
  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee = {
      ...employee,
      id: generateId(),
    };
    setEmployees([...employees, newEmployee]);
  };

  // Update an existing employee
  const updateEmployee = (id: string, employeeUpdate: Partial<Employee>) => {
    setEmployees(
      employees.map((employee) => 
        employee.id === id ? { ...employee, ...employeeUpdate } : employee
      )
    );
  };

  // Delete an employee
  const deleteEmployee = (id: string) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  // Add a new vote
  const addVote = (vote: Omit<Vote, 'id' | 'date'>) => {
    const newVote = {
      ...vote,
      id: generateId(),
      date: new Date().toISOString(),
    };
    setVotes([...votes, newVote]);
  };

  // Check if a customer has already voted for an employee this month
  const hasVoted = (customerId: string, employeeId: string) => {
    return votes.some(vote => {
      const voteMonth = vote.date.slice(0, 7);
      return vote.customerId === customerId && 
             vote.employeeId === employeeId && 
             voteMonth === currentMonth;
    });
  };

  // Get monthly rankings
  const getMonthlyRankings = () => {
    // Filter votes for the current month
    const monthlyVotes = votes.filter(vote => vote.date.slice(0, 7) === currentMonth);
    
    // Calculate total votes and average rating for each employee
    const employeeStats = employees.map(employee => {
      const employeeVotes = monthlyVotes.filter(vote => vote.employeeId === employee.id);
      const totalVotes = employeeVotes.length;
      const totalRating = employeeVotes.reduce((sum, vote) => sum + vote.rating, 0);
      const averageRating = totalVotes > 0 ? totalRating / totalVotes : 0;
      
      return {
        employeeId: employee.id,
        totalVotes,
        averageRating,
        rank: 0, // Will be calculated after sorting
        month: currentMonth,
      };
    });
    
    // Sort by average rating (desc) and then total votes (desc)
    const sortedStats = [...employeeStats].sort((a, b) => {
      if (b.averageRating !== a.averageRating) {
        return b.averageRating - a.averageRating;
      }
      return b.totalVotes - a.totalVotes;
    });
    
    // Assign ranks
    return sortedStats.map((stat, index) => ({
      ...stat,
      rank: index + 1
    }));
  };

  const value = {
    employees,
    votes,
    currentMonth,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    addVote,
    getMonthlyRankings,
    hasVoted,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};