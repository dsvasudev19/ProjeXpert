

import { useState, useEffect, useRef } from 'react';
import {
    Search,
    BarChart3,
    FileText,
    Users,
    Briefcase,
    Kanban,
    CreditCard,
    CheckSquare,
    ListTodo,
    UserCircle,
    Settings,
    Bug,
    MessageSquare,
    PlusCircle,
    Calendar,
    Bot,
    Video,
    Layers,
    Shield,
    X,
    Sparkles,
    Clock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// This component enhances the search bar in the DashboardHeader
const SearchMenu = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [_, setShowResults] = useState(false);
    const [filteredRoutes, setFilteredRoutes] = useState<any>([]);
    const [showInitialSuggestions, setShowInitialSuggestions] = useState(false);
    const searchRef = useRef<any>(null);
    const navigate = useNavigate();

    // Icon mapping for route types
    const getRouteIcon = (path: any) => {
        const iconProps = { size: 20 };

        if (path.includes('analytics')) return <BarChart3 {...iconProps} className="text-blue-600" />;
        if (path.includes('files')) return <FileText {...iconProps} className="text-teal-600" />;
        if (path.includes('team')) return <Users {...iconProps} className="text-amber-600" />;
        if (path.includes('project') && !path.includes('projects')) return <Briefcase {...iconProps} className="text-indigo-600" />;
        if (path.includes('kanban')) return <Kanban {...iconProps} className="text-purple-600" />;
        if (path.includes('payment')) return <CreditCard {...iconProps} className="text-green-600" />;
        if (path.includes('task') && !path.includes('tasks')) return <CheckSquare {...iconProps} className="text-rose-600" />;
        if (path.includes('todo')) return <ListTodo {...iconProps} className="text-amber-600" />;
        if (path.includes('profile')) return <UserCircle {...iconProps} className="text-sky-600" />;
        if (path.includes('settings')) return <Settings {...iconProps} className="text-gray-600" />;
        if (path.includes('bugs')) return <Bug {...iconProps} className="text-red-600" />;
        if (path.includes('chat')) return <MessageSquare {...iconProps} className="text-violet-600" />;
        if (path.includes('add') || path.includes('new-project')) return <PlusCircle {...iconProps} className="text-green-600" />;
        if (path.includes('calendar')) return <Calendar {...iconProps} className="text-cyan-600" />;
        if (path.includes('ai-chat')) return <Bot {...iconProps} className="text-purple-600" />;
        if (path.includes('meeting')) return <Video {...iconProps} className="text-pink-600" />;
        if (path.includes('roles')) return <Shield {...iconProps} className="text-slate-700" />;

        // Default icon
        return <Layers {...iconProps} />;
    };

    // Get background style for route based on its type
    const getRouteBgStyle = (path: any) => {
        if (path.includes('analytics')) return "from-blue-50 to-blue-100 border-blue-200";
        if (path.includes('files')) return "from-teal-50 to-teal-100 border-teal-200";
        if (path.includes('team')) return "from-amber-50 to-amber-100 border-amber-200";
        if (path.includes('project')) return "from-indigo-50 to-indigo-100 border-indigo-200";
        if (path.includes('kanban')) return "from-purple-50 to-purple-100 border-purple-200";
        if (path.includes('payment')) return "from-green-50 to-green-100 border-green-200";
        if (path.includes('task')) return "from-rose-50 to-rose-100 border-rose-200";
        if (path.includes('todo')) return "from-amber-50 to-amber-100 border-amber-200";
        if (path.includes('profile')) return "from-sky-50 to-sky-100 border-sky-200";
        if (path.includes('settings')) return "from-gray-50 to-gray-100 border-gray-200";
        if (path.includes('bugs')) return "from-red-50 to-red-100 border-red-200";
        if (path.includes('chat')) return "from-violet-50 to-violet-100 border-violet-200";
        if (path.includes('calendar')) return "from-cyan-50 to-cyan-100 border-cyan-200";
        if (path.includes('ai-chat')) return "from-purple-50 to-purple-100 border-purple-200";
        if (path.includes('meeting')) return "from-pink-50 to-pink-100 border-pink-200";
        if (path.includes('roles')) return "from-slate-50 to-slate-100 border-slate-200";

        // Default style
        return "from-slate-50 to-slate-100 border-slate-200";
    };

    // Group routes by category
    const categorizeRoutes = (routes: any) => {
        const categories: any = {
            "Analytics & Reporting": routes.filter((r: any) => r.path.includes('analytics')),
            "Project Management": routes.filter((r: any) => r.path.includes('project') || r.path.includes('kanban')),
            "Tasks & Todo": routes.filter((r: any) => r.path.includes('task') || r.path.includes('todo')),
            "Communication": routes.filter((r: any) => r.path.includes('chat') || r.path.includes('meeting')),
            "Resources": routes.filter((r: any) => r.path.includes('files') || r.path.includes('team') || r.path.includes('client')),
            "System": routes.filter((r: any) => r.path.includes('settings') || r.path.includes('profile') || r.path.includes('roles')),
            "Other": []
        };

        // Add routes that didn't match any category to "Other"
        routes.forEach((route: any) => {
            if (!Object.values(categories).flat().includes(route)) {
                categories["Other"].push(route);
            }
        });

        // Remove empty categories
        return Object.entries(categories).filter(([_, items]: any) => items.length > 0);
    };

    // All available routes with human-readable labels and their paths with enhanced keywords
    const routes = [
        {
            label: 'Analytics Dashboard',
            path: '/dashboard/analytics',
            keywords: ['stats', 'metrics', 'overview', 'dashboard', 'charts', 'graphs', 'performance', 'data', 'home', 'reports', 'main', 'insights'],
            description: 'View project performance and key metrics',
            frequentlyUsed: true
        },
        {
            label: 'File Management',
            path: '/dashboard/files',
            keywords: ['documents', 'upload', 'storage', 'files', 'attachments', 'download', 'paperwork', 'assets', 'resources'],
            description: 'Manage your project documents and files'
        },
        {
            label: 'Team Members',
            path: '/dashboard/team',
            keywords: ['employees', 'staff', 'people', 'colleagues', 'workers', 'users', 'personnel', 'workforce', 'crew', 'human resources'],
            description: 'View and manage team members',
            frequentlyUsed: true
        },
        // {
        //     label: 'Projects Overview',
        //     path: '/dashboard/project',
        //     keywords: ['work', 'clients', 'assignments', 'jobs', 'portfolio', 'products', 'services', 'deliverables', 'initiatives'],
        //     description: 'See all active and completed projects',
        //     frequentlyUsed: true
        // },
        {
            label: 'Kanban Board',
            path: '/dashboard/kanban',
            keywords: ['boards', 'tasks', 'agile', 'sprint', 'workflow', 'scrum', 'process', 'progress', 'status'],
            description: 'Track work progress visually'
        },
        {
            label: 'Payment Transactions',
            path: '/dashboard/payment',
            keywords: ['finance', 'money', 'billing', 'invoices', 'payments', 'accounting', 'revenue', 'expenses', 'budget', 'costs'],
            description: 'Track payments, invoices and billing'
        },
        // {
        //     label: 'Task Management',
        //     path: '/dashboard/task',
        //     keywords: ['todos', 'assignments', 'work', 'activities', 'duties', 'responsibilities', 'actions', 'tickets', 'issues'],
        //     description: 'Manage tasks across all projects',
        //     frequentlyUsed: true
        // },
        {
            label: 'Todo List',
            path: '/dashboard/todo',
            keywords: ['tasks', 'checklist', 'personal', 'to-do', 'reminders', 'pending', 'activities', 'actionable', 'daily'],
            description: 'Your personal todo list',
            frequentlyUsed: true
        },
        {
            label: 'Client Management',
            path: '/dashboard/client',
            keywords: ['customers', 'partners', 'accounts', 'sponsors', 'stakeholders', 'companies', 'organizations', 'businesses'],
            description: 'Manage client information and details'
        },
        {
            label: 'Roles & Permissions',
            path: '/dashboard/roles-and-permissions',
            keywords: ['access', 'security', 'authorization', 'privileges', 'rights', 'restrictions', 'user roles', 'capabilities'],
            description: 'Configure user access and permissions'
        },
        // {
        //     label: 'Bug Tracking',
        //     path: '/dashboard/bugs',
        //     keywords: ['issues', 'errors', 'problems', 'defects', 'glitches', 'failures', 'incidents', 'crashes', 'debugging'],
        //     description: 'Track and resolve software bugs'
        // },
        {
            label: 'Settings',
            path: '/dashboard/settings',
            keywords: ['preferences', 'configuration', 'account', 'options', 'profile', 'setup', 'customization', 'parameters'],
            description: 'Manage application settings'
        },
        {
            label: 'User Profile',
            path: '/dashboard/u/profile',
            keywords: ['account', 'personal', 'information', 'details', 'user', 'bio', 'credentials', 'avatar', 'picture'],
            description: 'View and edit your profile'
        },
        {
            label: 'Chat',
            path: '/dashboard/chat',
            keywords: ['messages', 'communication', 'talk', 'conversations', 'discussions', 'dialogue', 'messaging', 'texting'],
            description: 'Chat with team members'
        },
        {
            label: 'Create New Project',
            path: '/dashboard/project/projects/add',
            keywords: ['add', 'create', 'start', 'initiate', 'launch', 'begin', 'setup', 'establish', 'form', 'deploy'],
            description: 'Start a new project',
            frequentlyUsed: true
        },
        {
            label: 'Timeline',
            path: '/dashboard/calendar',
            keywords: ['schedule', 'events', 'planner', 'dates', 'appointments', 'meetings', 'deadlines', 'timeline', 'agenda'],
            description: 'View your schedule and events',
            frequentlyUsed: true
        },
        {
            label: 'AI Chat Assistant',
            path: '/dashboard/ai-chat',
            keywords: ['bot', 'help', 'support', 'assistant', 'artificial intelligence', 'guidance', 'aid', 'chatbot', 'helper'],
            description: 'Get AI assistance with your work'
        },
        {
            label: 'Meeting Room',
            path: '/dashboard/meeting-room',
            keywords: ['conference', 'call', 'video', 'discussion', 'meeting', 'zoom', 'webinar', 'presentation', 'session'],
            description: 'Join virtual meetings'
        },

        // Project-specific routes
        {
            label: 'Project Analytics',
            path: '/dashboard/project/analytics',
            keywords: ['project', 'metrics', 'data', 'statistics', 'performance', 'kpi', 'measurements', 'evaluation', 'tracking'],
            description: 'Analytics for specific projects',
            frequentlyUsed: true
        },
        {
            label: 'Task List',
            path: '/dashboard/project/tasks/list',
            keywords: ['project', 'todos', 'assignments', 'activities', 'items', 'action items', 'deliverables', 'work items'],
            description: 'View tasks for specific projects',
            frequentlyUsed: true
        },
        {
            label: 'Add Task',
            path: '/dashboard/project/tasks/add',
            keywords: ['create', 'new', 'assignment', 'todo', 'add task', 'work item', 'activity', 'record', 'register'],
            description: 'Create a new task'
        },
        {
            label: 'Project Settings',
            path: '/dashboard/project/settings',
            keywords: ['project', 'configuration', 'preferences', 'setup', 'options', 'parameters', 'adjustments', 'controls'],
            description: 'Configure project settings'
        },
        {
            label: 'Bug List',
            path: '/dashboard/project/bugs/list',
            keywords: ['issues', 'errors', 'defects', 'problems', 'tickets', 'incidents', 'malfunctions', 'faults', 'glitches'],
            description: 'View project bugs and issues'
        },
        {
            label: 'Report Bug',
            path: '/dashboard/project/bugs/report',
            keywords: ['submit', 'issue', 'error', 'log', 'defect', 'problem', 'create', 'record', 'document'],
            description: 'Report a new bug or issue'
        },
        {
            label: 'Project List',
            path: '/dashboard/project/projects/list',
            keywords: ['all', 'overview', 'work', 'catalog', 'collection', 'inventory', 'directory', 'registry', 'portfolio'],
            description: 'View list of all projects'
        },
        {
            label: 'Project Team',
            path: '/dashboard/project/team',
            keywords: ['members', 'colleagues', 'collaborators', 'partners', 'workers', 'contributors', 'participants', 'personnel'],
            description: 'View project team members'
        }
    ];

    // Get frequently used routes for initial suggestions
    const frequentlyUsedRoutes = routes.filter(route => route.frequentlyUsed);

    // Filter routes based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredRoutes([]);
            return;
        }

        const query = searchQuery.toLowerCase();
        const results = routes.filter(route =>
            route.label.toLowerCase().includes(query) ||
            route.keywords.some(keyword => keyword.toLowerCase().includes(query))
        );

        setFilteredRoutes(results);
    }, [searchQuery]);

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
                setShowInitialSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle navigation to selected route
    const handleRouteSelect = (path: any) => {
        navigate(path);
        setSearchQuery('');
        setShowResults(false);
        setShowInitialSuggestions(false);
    };

    return (
        <div className="flex-1 relative ml-16" ref={searchRef}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search (Press '/' to focus)"
                    className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowInitialSuggestions(true)}
                    onClick={() => setShowInitialSuggestions(true)}
                />
                {(searchQuery || showInitialSuggestions) && (
                    <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => {
                            setSearchQuery('');
                            setShowInitialSuggestions(false);
                        }}
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Results container with creative layout */}
            {(showInitialSuggestions || searchQuery) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50 max-h-96 overflow-y-auto">
                    {/* Search results header */}
                    <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-700">
                            {searchQuery ? `Results for "${searchQuery}"` : 'Quick Access'}
                        </h3>
                        <span className="text-xs text-gray-500">
                            {filteredRoutes.length > 0 ? `${filteredRoutes.length} items` : frequentlyUsedRoutes.length > 0 ? `${frequentlyUsedRoutes.length} items` : 'No results'}
                        </span>
                    </div>

                    {!searchQuery && (
                        <div className="mt-4 p-2">
                            <div className="flex items-center mb-2">
                                <Sparkles size={16} className="mr-2 text-gray-500" />
                                <span className="text-xs font-medium text-gray-500">QUICK ACTIONS</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                <button
                                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200 hover:shadow-md transition-all duration-200 group"
                                    onClick={() => handleRouteSelect('/dashboard/project/projects/add')}
                                >
                                    <PlusCircle size={24} className="text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-medium">New Project</span>
                                </button>
                                <button
                                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200 hover:shadow-md transition-all duration-200 group"
                                    onClick={() => handleRouteSelect('/dashboard/project/tasks/add')}
                                >
                                    <CheckSquare size={24} className="text-rose-600 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-medium">Add Task</span>
                                </button>
                                <button
                                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-md transition-all duration-200 group"
                                    onClick={() => handleRouteSelect('/dashboard/meeting-room')}
                                >
                                    <Video size={24} className="text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-medium">Join Meeting</span>
                                </button>
                                <button
                                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 hover:shadow-md transition-all duration-200 group"
                                    onClick={() => handleRouteSelect('/dashboard/ai-chat')}
                                >
                                    <Bot size={24} className="text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-medium">AI Assistant</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Creative layout for search results */}
                    <div className="p-3">
                        {/* Frequently used section */}
                        {!searchQuery && (
                            <div className="mb-4">
                                <div className="flex items-center mb-2">
                                    <Clock size={16} className="mr-2 text-gray-500" />
                                    <span className="text-xs font-medium text-gray-500">FREQUENTLY USED</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {frequentlyUsedRoutes.map((route, index) => (
                                        <button
                                            key={index}
                                            className={`inline-flex items-center py-2 px-4 rounded-lg bg-gradient-to-r ${getRouteBgStyle(route.path)} border hover:shadow-md transition-all duration-200 group`}
                                            onClick={() => handleRouteSelect(route.path)}
                                        >
                                            <div className="mr-2 rounded-full p-1 bg-white bg-opacity-70 group-hover:bg-opacity-100 transition-all">
                                                {getRouteIcon(route.path)}
                                            </div>
                                            <span className="font-medium text-sm whitespace-nowrap">{route.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Search results categorized */}
                        {searchQuery && filteredRoutes.length > 0 && (
                            <>
                                {categorizeRoutes(filteredRoutes).map(([category, items]: any, idx) => (
                                    <div key={idx} className="mb-4">
                                        <div className="flex items-center mb-2">
                                            <span className="text-xs font-medium text-gray-500">{category.toUpperCase()}</span>
                                            <span className="text-xs text-gray-400 ml-2">({items.length})</span>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {items.map((route: any, index: any) => (
                                                <button
                                                    key={index}
                                                    className={`inline-flex items-center py-2 px-4 rounded-lg bg-gradient-to-r ${getRouteBgStyle(route.path)} border hover:shadow-md transition-all duration-200 group`}
                                                    onClick={() => handleRouteSelect(route.path)}
                                                >
                                                    <div className="mr-2 rounded-full p-1 bg-white bg-opacity-70 group-hover:bg-opacity-100 transition-all">
                                                        {getRouteIcon(route.path)}
                                                    </div>
                                                    <span className="font-medium text-sm whitespace-nowrap">{route.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                        {/* No results state */}
                        {searchQuery && filteredRoutes.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-8">
                                <div className="bg-gray-100 rounded-full p-4 mb-4">
                                    <Search size={24} className="text-gray-400" />
                                </div>
                                <p className="text-gray-500 mb-2">No results found for "{searchQuery}"</p>
                                <p className="text-sm text-gray-400">Try searching with different keywords</p>
                            </div>
                        )}
                    </div>

                    {/* Navigation shortcut tips */}
                    <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
                        <div className="flex justify-between items-center text-xs text-gray-500">
                            <div>
                                <span className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-700 mr-1 font-mono">↑</span>
                                <span className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-700 mr-1 font-mono">↓</span>
                                <span>to navigate</span>
                            </div>
                            <div>
                                <span className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-700 mr-1 font-mono">Enter</span>
                                <span>to select</span>
                            </div>
                            <div>
                                <span className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-700 mr-1 font-mono">Esc</span>
                                <span>to close</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchMenu;