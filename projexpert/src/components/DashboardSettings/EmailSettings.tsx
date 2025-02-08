import { useEffect, useState } from 'react';

import { toast } from 'react-hot-toast';
import { axiosInstance } from '../../axiosIntance';

// Add this CSS class to your global styles or component
const switchButtonStyle = `
  relative inline-flex h-6 w-11 items-center rounded-full
  transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
`;

const switchKnobStyle = `
  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
`;


const EmailSettings = () => {

    const [emailConfig, setEmailConfig] = useState({
        host: '',
        port: '',
        auth: {
            user: '',
            pass: ''
        },
        fromName: '',
        fromEmail: '',
        enableSSL: false,
    });


    const handleSaveEmailConfig = async () => {
        try {
            const res = await axiosInstance.put("/config/email", emailConfig)
            if (res.status === 200) {
                toast.success('Email settings saved successfully');
            }
        } catch (error) {
            toast.error('Failed to save email settings');
        }
    };
    const getEmailConfig = async () => {
        const res = await axiosInstance.get("/config/email")
        if (res.status === 200) {
            setEmailConfig(res.data)
        }
    }

    useEffect(() => {
        
        getEmailConfig()
    }, [])

    return (
        <div>
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800">Email Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                        <input
                            type="text"
                            value={emailConfig.host}
                            onChange={(e) => setEmailConfig({ ...emailConfig, host: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                            placeholder="smtp.example.com"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                        <input
                            type="text"
                            value={emailConfig.port}
                            onChange={(e) => setEmailConfig({ ...emailConfig, port: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                            placeholder="587"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                        <input
                            type="text"
                            value={emailConfig.auth.user}
                            onChange={(e) => setEmailConfig({ ...emailConfig, auth: { ...emailConfig.auth, user: e.target.value } })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                        <input
                            type="password"
                            value={emailConfig.auth.pass}
                            onChange={(e) => setEmailConfig({ ...emailConfig, auth: { ...emailConfig.auth, pass: e.target.value } })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sender Name</label>
                        <input
                            type="text"
                            value={emailConfig.fromName}
                            onChange={(e) => setEmailConfig({ ...emailConfig, fromName: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sender Email</label>
                        <input
                            type="email"
                            value={emailConfig.fromEmail}
                            onChange={(e) => setEmailConfig({ ...emailConfig, fromEmail: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="form-group col-span-2">
                        <label className="flex items-center space-x-3">
                            <button
                                type="button"
                                onClick={() => setEmailConfig({ ...emailConfig, enableSSL: !emailConfig.enableSSL })}
                                className={`${switchButtonStyle} ${emailConfig.enableSSL ? 'bg-green-500' : 'bg-gray-200'
                                    }`}
                            >
                                <span
                                    className={`${switchKnobStyle} ${emailConfig.enableSSL ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                            <span className="text-sm text-gray-700">Enable SSL/TLS</span>
                        </label>
                    </div>
                </div>
                <button
                    onClick={handleSaveEmailConfig}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                    Save Email Settings
                </button>
            </div>
        </div>
    )
}

export default EmailSettings;