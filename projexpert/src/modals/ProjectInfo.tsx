import { motion } from "framer-motion";

export default function InfoModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white p-6 rounded-lg shadow-xl max-w-lg relative z-[10000]"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Project Management Platform</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="mt-4 space-y-4">
          <p className="text-gray-700">
            Our platform helps teams collaborate efficiently by providing:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>Task Management:</strong> Assign and track tasks with deadlines.</li>
            <li><strong>Collaboration:</strong> Team members can communicate and share files.</li>
            <li><strong>Progress Tracking:</strong> Monitor project milestones in real-time.</li>
            <li><strong>Reports & Analytics:</strong> Gain insights with detailed reports.</li>
            <li><strong>Integrations:</strong> Connect with third-party tools like Slack & GitHub.</li>
          </ul>
        </div>

        {/* Close Button */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg 
              hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-md 
              hover:shadow-lg"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
