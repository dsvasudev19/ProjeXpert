import { Wrench, Clock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const UnderMaintenance = () => {
  const { theme } = useTheme();

  return (
    <div className="h-full flex items-center justify-center p-4" style={{ background: `linear-gradient(to bottom right, ${theme.primaryColor}, ${theme.secondaryColor})` }}>
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl animate-fadeIn">
        <div className="p-8 text-center space-y-8">
          {/* Animated Icon Section */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center transform transition-all duration-500 hover:scale-105 animate-bounce-gentle">
              <Wrench className="w-12 h-12 text-gray-600 animate-pulse" />
            </div>
          </div>

          {/* Main Message with Fade-in Animation */}
          <div className="space-y-3 animate-slideUp">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${theme.primaryColor}, ${theme.secondaryColor})` }}>
              Under Maintenance
            </h1>
            <p className="text-lg text-gray-600">
               We should be back shortly. Thank you for your patience.
            </p>
          </div>

          {/* Info Card with Hover Effect */}
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6 space-y-4 transition-all duration-300 hover:transform hover:scale-[1.02] animate-slideUp delay-100">
            <h2 className="text-blue-800 font-semibold flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              Estimated Downtime
            </h2>
            <p className="text-blue-700">
              Currently this feature is under maintenance. We will be back soon with a new update.
            </p>
          </div>

          {/* Support Section with Hover Animation */}
          <div className="pt-6 border-t animate-slideUp delay-300">
            <button 
              onClick={() => window.location.href = '/support'}
              className="inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 transition-all duration-300 hover:scale-105"
            >
              <Clock className="w-5 h-5 animate-spin-slow" />
              <span className="font-medium">Need help? Contact Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderMaintenance; 