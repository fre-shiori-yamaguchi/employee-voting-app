import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, X } from 'lucide-react';
import { Employee } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface VoteFormProps {
  employee: Employee;
  onClose: () => void;
  onSuccess: () => void;
  isVerified: boolean;
}

// 投票理由の型定義
type VotingReason = 
  | 'service_quality'
  | 'communication'
  | 'problem_solving'
  | 'professionalism'
  | 'knowledge'
  | 'other';

// 投票理由の選択肢
const VOTING_REASONS: { value: VotingReason; label: string }[] = [
  { value: 'service_quality', label: 'サービスの質が高かった' },
  { value: 'communication', label: 'コミュニケーションが円滑だった' },
  { value: 'problem_solving', label: '問題解決が迅速だった' },
  { value: 'professionalism', label: '専門性が高かった' },
  { value: 'knowledge', label: '知識が豊富だった' },
  { value: 'other', label: 'その他' }
];

const VoteForm: React.FC<VoteFormProps> = ({ employee, onClose, onSuccess, isVerified }) => {
  const { addVote } = useAppContext();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [votingReason, setVotingReason] = useState<VotingReason>('service_quality');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 顔認証が成功している場合のみ投票を処理
      if (isVerified) {
        if (rating < 1) {
          setError('評価を選択してください');
          return;
        }
        
        // 匿名投票用の一時的なIDを生成
        const anonymousId = `anon-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // Add vote
        await addVote({
          employeeId: employee.id,
          customerId: anonymousId,
          rating,
          comment,
          votingReason
        });
      }
      // 認証失敗時は何もせずに成功したように見せる
      onSuccess();
    } catch (error) {
      console.error('Error submitting vote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-primary-600 text-white p-5">
          <button 
            className="absolute right-4 top-4 text-white hover:text-gray-200 transition-colors"
            onClick={onClose}
            aria-label="閉じる"
          >
            <X size={20} />
          </button>
          <h2 className="text-xl font-bold">評価を送信</h2>
          <p className="text-primary-100 mt-1">
            {employee.name} ({employee.department})
          </p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5">
          {/* Star rating */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              評価を選択してください
            </label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="focus:outline-none"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                >
                  <Star 
                    size={32}
                    className={`${
                      (hoveredStar ? hoveredStar >= star : rating >= star)
                        ? 'text-accent-500 fill-accent-500'
                        : 'text-gray-300'
                    } transition-colors`}
                  />
                </motion.button>
              ))}
            </div>
            <p className="text-center text-sm mt-2 text-gray-500">
              {rating === 1 && '改善が必要'}
              {rating === 2 && '普通'}
              {rating === 3 && '良い'}
              {rating === 4 && 'とても良い'}
              {rating === 5 && '素晴らしい'}
            </p>
          </div>

          {/* Voting Reason */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              投票理由を選択してください
            </label>
            <div className="space-y-2">
              {VOTING_REASONS.map((reason) => (
                <label key={reason.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="votingReason"
                    value={reason.value}
                    checked={votingReason === reason.value}
                    onChange={(e) => setVotingReason(e.target.value as VotingReason)}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-gray-700">{reason.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Comment */}
          <div className="mb-6">
            <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
              コメント (任意)
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="この従業員についてのフィードバックを入力してください"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              rows={3}
            />
          </div>
          
          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-error-50 text-error-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {/* Submit button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            disabled={isSubmitting || rating === 0}
          >
            <Send size={18} className="mr-2" />
            {isSubmitting ? '送信中...' : '評価を送信する'}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default VoteForm;