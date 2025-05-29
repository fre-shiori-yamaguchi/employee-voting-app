import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Award, BarChart3, Users } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  // Feature boxes content
  const features = [
    {
      title: '従業員に投票',
      description: '素晴らしいサービスを提供した従業員に評価を送りましょう。あなたの一票が彼らの励みになります。',
      icon: <Award size={40} className="text-primary-600" />,
      path: '/vote',
      color: 'bg-primary-50 border-primary-200'
    },
    {
      title: 'ランキングを確認',
      description: '月間のトップパフォーマーをチェック。誰が最も高い評価を獲得しているかをご覧ください。',
      icon: <BarChart3 size={40} className="text-secondary-600" />,
      path: '/leaderboard',
      color: 'bg-secondary-50 border-secondary-200'
    },
    {
      title: '従業員一覧',
      description: '当社の素晴らしいチームメンバーをご紹介。様々な部署の専門家たちがお客様をサポートします。',
      icon: <Users size={40} className="text-accent-500" />,
      path: '/vote',
      color: 'bg-accent-50 border-accent-200'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero section */}
      <section className="relative bg-gradient-to-br from-primary-700 to-primary-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              お客様の声で作る<br />
              <span className="text-accent-300">公正な評価システム</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              素晴らしいサービスを提供した従業員に投票しましょう。<br />
              あなたの評価が私たちのサービス向上につながります。
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => navigate('/vote')}
                className="bg-white text-primary-700 hover:bg-primary-50 font-medium px-8 py-3 rounded-lg shadow-lg transition-colors duration-300 text-lg flex items-center mx-auto"
              >
                <Award className="mr-2" size={20} />
                今すぐ投票する
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              従業員評価アプリの特徴
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              私たちは顧客の声を大切にしています。あなたのフィードバックが私たちのサービス改善に役立ちます。
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onClick={() => navigate(feature.path)}
                className={`${feature.color} border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* How it works section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              使い方
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              簡単3ステップで従業員に評価を送ることができます
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: '従業員を選択',
                description: '投票ページで評価したい従業員を選びます。',
                delay: 0.2
              },
              {
                step: '02',
                title: '評価を入力',
                description: '5段階評価とコメントで従業員のパフォーマンスを評価します。',
                delay: 0.4
              },
              {
                step: '03',
                title: '投票を送信',
                description: '必要情報を入力して評価を送信します。月に一度投票できます。',
                delay: 0.6
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay, duration: 0.5 }}
                className="text-center relative"
              >
                <div className="inline-block bg-primary-600 text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
                
                {/* Connector line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-6 left-[calc(100%_-_16px)] w-8 border-t-2 border-dashed border-primary-300"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="bg-secondary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              あなたの評価が私たちのサービスを向上させます
            </h2>
            <p className="text-xl text-secondary-100 mb-8 max-w-3xl mx-auto">
              素晴らしいサービスを提供した従業員に感謝の気持ちを伝えましょう。あなたの一票が彼らの励みになります。
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => navigate('/vote')}
                className="bg-white text-secondary-700 hover:bg-secondary-50 font-medium px-8 py-3 rounded-lg shadow-lg transition-colors duration-300 text-lg"
              >
                従業員に投票する
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;