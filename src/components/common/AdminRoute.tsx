import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center animate-in fade-in-50 slide-in-from-bottom-4 duration-1000">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">تسجيل الدخول مطلوب</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">يرجى تسجيل الدخول للوصول إلى لوحة الأدمن</p>
          <div className="space-y-4">
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center"
            >
              تسجيل الدخول
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>للوصول للأدمن، استخدم:</p>
              <p className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-1">
                admin@blog.com
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <div className="text-center animate-in fade-in-50 slide-in-from-bottom-4 duration-1000">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">الوصول مرفوض</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">ليس لديك صلاحية للوصول لهذه الصفحة</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            الدور الحالي: <span className="font-semibold">{user.role}</span>
          </p>
          <div className="space-y-3">
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center"
            >
              العودة للرئيسية
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>تحتاج حساب أدمن؟ جرب:</p>
              <p className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-1">
                zezo@blog.com
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;