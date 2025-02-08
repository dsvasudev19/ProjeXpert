import { useState, useEffect } from 'react';
import {
    Github, Linkedin, Mail, CreditCard,
    MessageSquare, Bot, BrainCircuit, ChevronDown, ChevronUp
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../../axiosIntance';
import { Editor } from '@monaco-editor/react';

// Add this CSS class to your global styles or component
const switchButtonStyle = `
  relative inline-flex h-6 w-11 items-center rounded-full
  transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
`;

const switchKnobStyle = `
  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
`;

// Integration configuration with icons and labels
const INTEGRATIONS_CONFIG = {
    github: { icon: Github, label: 'GitHub' },
    google: { icon: Mail, label: 'Google' },
    linkedin: { icon: Linkedin, label: 'LinkedIn' },
    openAi: { icon: Bot, label: 'OpenAI' },
    stripe: { icon: CreditCard, label: 'Stripe' },
    claude: { icon: MessageSquare, label: 'Claude AI' },
    groq: { icon: BrainCircuit, label: 'Groq' },
    razorpay: { icon: CreditCard, label: 'Razorpay' },
    // Add more integrations as needed
};

// Add these helper functions at the top level
const formatJSON = (json: string): string => {
    try {
        return JSON.stringify(JSON.parse(json), null, 2);
    } catch {
        return json;
    }
};

const isValidJSON = (json: string): boolean => {
    try {
        JSON.parse(json);
        return true;
    } catch {
        return false;
    }
};

const Integrations = () => {
    const [integrations, setIntegrations] = useState<Record<string, {
        enabled: boolean;
        config: string;
    }>>({});
    const [loading, setLoading] = useState(true);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    // Fetch all integrations on component mount
    useEffect(() => {
        fetchIntegrations();
    }, []);

    const fetchIntegrations = async () => {
        try {
            const response = await axiosInstance.get('/config/integrations');
            if (response.status === 200) {
                const data = response.data;
                
                // Initialize all integrations from INTEGRATIONS_CONFIG with default values
                const initialState = Object.keys(INTEGRATIONS_CONFIG).reduce((acc, key) => ({
                    ...acc,
                    [key]: {
                        enabled: false,
                        config: '{}'
                    }
                }), {});

                // Merge with received data
                const transformedData = {
                    ...initialState,
                    ...Object.entries(data).reduce((acc, [key, value]: [string, any]) => ({
                        ...acc,
                        [key]: {
                            enabled: Boolean(value.enabled),
                            config: typeof value === 'object' ? JSON.stringify(value, null, 2) : '{}'
                        }
                    }), {})
                };

                setIntegrations(transformedData);
            }
        } catch (error) {
            toast.error('Failed to fetch integrations');
            console.error('Error fetching integrations:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateIntegration = async (key: string, data: { config: string }) => {
        try {
            // Validate JSON before sending
            JSON.parse(data.config); 
            const res = await axiosInstance.put(`/config/integrations/${key}`, data);
            if (res.status === 200) {
                toast.success(`${key} integration updated successfully`);
                await fetchIntegrations();
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                toast.error('Invalid JSON format');
            } else {
                toast.error(`Failed to update ${key} integration`);
                console.error('Error updating integration:', error);
            }
        }
    };

    const toggleExpanded = (key: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const toggleIntegration = (key: string) => {
        setIntegrations(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                enabled: !prev[key].enabled
            }
        }));
    };

    const updateIntegrationConfig = (key: string, value: string) => {
        setIntegrations(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                config: value
            }
        }));
    };

    const handleSave = async (key: string) => {
        const integration = integrations[key];
        await updateIntegration(key, {
            config: integration.config
        });
    };

    if (loading) {
        return <div className="flex items-center justify-center p-8">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">Integration Management</h3>

            <div className="grid grid-cols-1 gap-4">
                {Object.entries(INTEGRATIONS_CONFIG).map(([key, config]) => {
                    const Icon = config.icon;
                    const integration = integrations[key] || { enabled: false, config: '{}' };
                    const isExpanded = expandedSections[key];

                    return (
                        <div key={key} className="bg-white rounded-lg shadow border">
                            <div 
                                className="p-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between"
                                onClick={() => toggleExpanded(key)}
                            >
                                <div className="flex items-center gap-2">
                                    <Icon className="w-5 h-5" />
                                    <h4 className="font-medium">{config.label}</h4>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleIntegration(key);
                                        }}
                                        className={`${switchButtonStyle} ${integration.enabled ? 'bg-green-500' : 'bg-gray-200'}`}
                                    >
                                        <span className={`${switchKnobStyle} ${integration.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                    {isExpanded ? (
                                        <ChevronUp className="w-5 h-5 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-500" />
                                    )}
                                </div>
                            </div>

                            <div className={`border-t ${isExpanded ? 'block' : 'hidden'}`}>
                                <div className="p-4 space-y-4">
                                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                                        <Editor
                                            height="300px"
                                            defaultLanguage="json"
                                            value={integration.config}
                                            onChange={(value) => updateIntegrationConfig(key, value || '{}')}
                                            options={{
                                                minimap: { enabled: false },
                                                fontSize: 14,
                                                formatOnPaste: true,
                                                formatOnType: true,
                                                scrollBeyondLastLine: false,
                                                wordWrap: "on",
                                                wrappingIndent: "indent",
                                                automaticLayout: true,
                                                tabSize: 2,
                                            }}
                                            theme="vs-light"
                                            beforeMount={(monaco) => {
                                                monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                                                    validate: true,
                                                    allowComments: false,
                                                    schemas: [],
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => updateIntegrationConfig(key, formatJSON(integration.config))}
                                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                                            title="Format JSON"
                                        >
                                            Format
                                        </button>
                                        <button
                                            onClick={() => handleSave(key)}
                                            disabled={!isValidJSON(integration.config)}
                                            className={`px-4 py-2 rounded-lg transition ${
                                                isValidJSON(integration.config)
                                                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Integrations;