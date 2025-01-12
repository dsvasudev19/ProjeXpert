import { ShieldBan, ArrowLeft, LifeBuoy, KeyRound } from 'lucide-react';

const UnauthorizedAccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl animate-fadeIn">
        <div className="p-8 text-center space-y-8">
          {/* Animated Icon Section */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center transform transition-all duration-500 hover:scale-105 animate-bounce-gentle">
              <ShieldBan className="w-12 h-12 text-emerald-600 animate-pulse" />
            </div>
          </div>

          {/* Main Message with Fade-in Animation */}
          <div className="space-y-3 animate-slideUp">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
              Access Restricted
            </h1>
            <p className="text-lg text-gray-600">
              You don't have permission to access this resource
            </p>
          </div>

          {/* Info Card with Hover Effect */}
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6 space-y-4 transition-all duration-300 hover:transform hover:scale-[1.02] animate-slideUp delay-100">
            <h2 className="text-blue-800 font-semibold flex items-center justify-center gap-2">
              <KeyRound className="w-5 h-5" />
              Need Access?
            </h2>
            <ul className="text-blue-700 space-y-3 text-left list-none">
              <li className="flex items-start gap-2 transition-all duration-300 hover:translate-x-2">
                <span className="inline-block w-2 h-2 mt-2 rounded-full bg-blue-400" />
                Try logging in again with appropriate credentials
              </li>
              <li className="flex items-start gap-2 transition-all duration-300 hover:translate-x-2">
                <span className="inline-block w-2 h-2 mt-2 rounded-full bg-emerald-400" />
                Contact your project administrator for access rights
              </li>
              <li className="flex items-start gap-2 transition-all duration-300 hover:translate-x-2">
                <span className="inline-block w-2 h-2 mt-2 rounded-full bg-blue-400" />
                Verify your account permissions and try again
              </li>
            </ul>
          </div>

          {/* Action Button */}
          {/* <div className="flex justify-center animate-slideUp delay-200">
            <button 
              onClick={() => window.history.back()}
              className="group inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              Return to Safety
            </button>
          </div> */}

          {/* Support Section with Hover Animation */}
          <div className="pt-6 border-t animate-slideUp delay-300">
            <button 
              onClick={() => window.location.href = '/support'}
              className="inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 transition-all duration-300 hover:scale-105"
            >
              <LifeBuoy className="w-5 h-5 animate-spin-slow" />
              <span className="font-medium">Need help? Contact Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these custom animations to your tailwind.config.js
// const tailwindConfig = {
//   theme: {
//     extend: {
//       animation: {
//         'bounce-gentle': 'bounce 3s infinite',
//         'spin-slow': 'spin 4s linear infinite',
//         'fadeIn': 'fadeIn 0.5s ease-in',
//         'slideUp': 'slideUp 0.5s ease-out',
//       },
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: '0' },
//           '100%': { opacity: '1' },
//         },
//         slideUp: {
//           '0%': { transform: 'translateY(20px)', opacity: '0' },
//           '100%': { transform: 'translateY(0)', opacity: '1' },
//         },
//       },
//     },
//   },
// };

export default UnauthorizedAccess;