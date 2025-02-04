import React, { useEffect, useState } from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    confirmationText: string;
    actionText: string;
    action: () => void;
    title?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    confirmationText,
    actionText,
    action,
    title = 'Confirm Action'
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isVisible && isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isVisible, isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center 
            transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} z-[9999]`}>
            
            <div className={`bg-white rounded-lg max-w-md w-full transform
                transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-95'} relative z-[10000]`}>
                
                <div className="flex items-center justify-between px-6 pt-6">
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        aria-label="Close"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-6 py-4">
                    <p className="text-gray-600 text-base leading-relaxed">{confirmationText}</p>
                </div>

                <div className="px-6 pb-6">
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => setIsVisible(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 
                                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 
                                rounded-md transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => {
                                action();
                                setIsVisible(false);
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 
                                hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 
                                rounded-md transition-colors duration-200"
                        >
                            {actionText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;