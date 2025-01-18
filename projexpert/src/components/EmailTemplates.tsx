import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const EmailTemplateShowcase = () => {
  const [expandedTemplate, setExpandedTemplate] = useState<any>('registration');

  const demoData = {
    userName: "John Doe",
    verificationLink: "https://projecthub.com/verify/abc123", 
    projectName: "Website Redesign",
    startDate: "2025-02-01",
    dueDate: "2025-03-15",
    projectDescription: "Complete overhaul of company website with modern design",
    teamName: "Design Squad",
    teamLead: "Sarah Johnson",
    department: "Creative",
    role: "UI Designer",
    projectManager: "Mike Wilson",
    taskName: "Homepage Wireframes",
    priority: "High",
    taskDescription: "Create wireframes for the new homepage layout",
    resetLink: "https://projecthub.com/reset/xyz789",
    loginLink: "https://projecthub.com/login",
    dueTimeframe: "tomorrow",
    currentStatus: "In Progress"
  };

  const templates = [
    {
      id: 'registration',
      title: 'User Registration',
      content: (
        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-green-50 to-blue-50 border-4 border-double border-green-700/20">
          <div className="mb-8">
            <img src="/api/placeholder/150/50" alt="Company Logo" className="h-16 mb-6 opacity-90"/>
            <h1 className="text-3xl font-serif text-green-800 mb-6 text-center border-b-2 border-green-700/20 pb-4">Welcome to ProjectHub!</h1>
            <p className="text-green-700 mb-4 font-serif">Dear {demoData.userName},</p>
            <p className="text-green-700 mb-4 leading-relaxed">We are delighted to welcome you to ProjectHub, where innovation meets tradition.</p>
            <p className="text-green-700 mb-6 leading-relaxed">Your account has been crafted with care. Please verify your email address to begin your journey:</p>
            <div className="mb-8 text-center">
              <a href={demoData.verificationLink} className="inline-block px-8 py-3 bg-gradient-to-r from-green-700 to-blue-700 text-white font-serif rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">Verify Email Address</a>
            </div>
            <p className="text-green-700 mb-2 text-sm italic">If the button appears inactive, kindly utilize this link:</p>
            <p className="text-blue-700 break-all mb-6 text-sm">{demoData.verificationLink}</p>
          </div>
          <div className="border-t-2 border-green-700/20 pt-6 text-sm text-green-600 text-center font-serif italic">
            <p>Should you not have initiated this account creation, please disregard this correspondence.</p>
          </div>
        </div>
      )
    },
    {
      id: 'project-creation',
      title: 'Project Creation',
      content: (
        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-green-50 to-blue-50 border-4 border-double border-green-700/20">
          <div className="mb-8">
            <img src="/api/placeholder/150/50" alt="Company Logo" className="h-16 mb-6 opacity-90"/>
            <h1 className="text-3xl font-serif text-green-800 mb-6 text-center border-b-2 border-green-700/20 pb-4">New Project Announcement</h1>
            <p className="text-green-700 mb-4 font-serif">Dear {demoData.userName},</p>
            <p className="text-green-700 mb-6 leading-relaxed">We are pleased to announce the creation of a new venture:</p>
            <div className="bg-white/50 p-6 rounded-lg mb-6 border-2 border-green-700/20">
              <p className="font-serif text-green-800 text-xl mb-4 text-center">Project Particulars</p>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Project Name: {demoData.projectName}</li>
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Commencement: {demoData.startDate}</li>
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Completion: {demoData.dueDate}</li>
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Description: {demoData.projectDescription}</li>
              </ul>
            </div>
            <div className="text-center mb-6">
              <a href="#" className="inline-block px-8 py-3 bg-gradient-to-r from-green-700 to-blue-700 text-white font-serif rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">View Project Details</a>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'team-allocation',
      title: 'Team Allocation',
      content: (
        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-green-50 to-blue-50 border-4 border-double border-green-700/20">
          <div className="mb-8">
            <img src="/api/placeholder/150/50" alt="Company Logo" className="h-16 mb-6 opacity-90"/>
            <h1 className="text-3xl font-serif text-green-800 mb-6 text-center border-b-2 border-green-700/20 pb-4">Team Assignment Notice</h1>
            <p className="text-green-700 mb-4 font-serif">Dear {demoData.userName},</p>
            <p className="text-green-700 mb-6 leading-relaxed">We are delighted to inform you of your team assignment:</p>
            <div className="bg-white/50 p-6 rounded-lg mb-6 border-2 border-green-700/20">
              <p className="font-serif text-green-800 text-xl mb-4 text-center">Team Particulars</p>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Team Name: {demoData.teamName}</li>
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Team Lead: {demoData.teamLead}</li>
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Department: {demoData.department}</li>
              </ul>
            </div>
            <div className="text-center mb-6">
              <a href="#" className="inline-block px-8 py-3 bg-gradient-to-r from-green-700 to-blue-700 text-white font-serif rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">Access Team Dashboard</a>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'project-allocation',
      title: 'Project Allocation',
      content: (
        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-green-50 to-blue-50 border-4 border-double border-green-700/20">
          <div className="mb-8">
            <img src="/api/placeholder/150/50" alt="Company Logo" className="h-16 mb-6 opacity-90"/>
            <h1 className="text-3xl font-serif text-green-800 mb-6 text-center border-b-2 border-green-700/20 pb-4">Project Assignment Notice</h1>
            <p className="text-green-700 mb-4 font-serif">Dear {demoData.userName},</p>
            <p className="text-green-700 mb-6 leading-relaxed">We are pleased to inform you of your new project assignment:</p>
            <div className="bg-white/50 p-6 rounded-lg mb-6 border-2 border-green-700/20">
              <p className="font-serif text-green-800 text-xl mb-4 text-center">Project Particulars</p>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Project: {demoData.projectName}</li>
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Your Role: {demoData.role}</li>
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Commencement: {demoData.startDate}</li>
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Project Manager: {demoData.projectManager}</li>
              </ul>
            </div>
            <div className="text-center mb-6">
              <a href="#" className="inline-block px-8 py-3 bg-gradient-to-r from-green-700 to-blue-700 text-white font-serif rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">View Project Details</a>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'task-assignment',
      title: 'Task Assignment',
      content: (
        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-green-50 to-blue-50 border-4 border-double border-green-700/20">
          <div className="mb-8">
            <img src="/api/placeholder/150/50" alt="Company Logo" className="h-16 mb-6 opacity-90"/>
            <h1 className="text-3xl font-serif text-green-800 mb-6 text-center border-b-2 border-green-700/20 pb-4">New Task Assignment</h1>
            <p className="text-green-700 mb-4 font-serif">Dear {demoData.userName},</p>
            <p className="text-green-700 mb-6 leading-relaxed">A new task awaits your attention:</p>
            <div className="bg-white/50 p-6 rounded-lg mb-6 border-2 border-green-700/20">
              <p className="font-serif text-green-800 text-xl mb-4 text-center">Task Particulars</p>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Task: {demoData.taskName}</li>
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Project: {demoData.projectName}</li>
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Due Date: {demoData.dueDate}</li>
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Priority: {demoData.priority}</li>
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Description: {demoData.taskDescription}</li>
              </ul>
            </div>
            <div className="text-center mb-6">
              <a href="#" className="inline-block px-8 py-3 bg-gradient-to-r from-green-700 to-blue-700 text-white font-serif rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">View Task Details</a>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'forgot-password',
      title: 'Forgot Password',
      content: (
        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-green-50 to-blue-50 border-4 border-double border-green-700/20">
          <div className="mb-8">
            <img src="/api/placeholder/150/50" alt="Company Logo" className="h-16 mb-6 opacity-90"/>
            <h1 className="text-3xl font-serif text-green-800 mb-6 text-center border-b-2 border-green-700/20 pb-4">Password Reset Request</h1>
            <p className="text-green-700 mb-4 font-serif">Dear {demoData.userName},</p>
            <p className="text-green-700 mb-6 leading-relaxed">We have received your request to reset your password. Please click below to proceed:</p>
            <div className="text-center mb-8">
              <a href={demoData.resetLink} className="inline-block px-8 py-3 bg-gradient-to-r from-green-700 to-blue-700 text-white font-serif rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">Reset Password</a>
            </div>
            <p className="text-green-700 mb-2 text-sm italic">If the button appears inactive, kindly utilize this link:</p>
            <p className="text-blue-700 break-all mb-6 text-sm">{demoData.resetLink}</p>
            <p className="text-green-700 italic">This link shall expire in 24 hours. If you did not request this change, please disregard this notice.</p>
          </div>
        </div>
      )
    },
    {
      id: 'reset-password',
      title: 'Reset Password Confirmation',
      content: (
        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-green-50 to-blue-50 border-4 border-double border-green-700/20">
          <div className="mb-8">
            <img src="/api/placeholder/150/50" alt="Company Logo" className="h-16 mb-6 opacity-90"/>
            <h1 className="text-3xl font-serif text-green-800 mb-6 text-center border-b-2 border-green-700/20 pb-4">Password Successfully Reset</h1>
            <p className="text-green-700 mb-4 font-serif">Dear {demoData.userName},</p>
            <p className="text-green-700 mb-6 leading-relaxed">Your password has been successfully reset. You may now access your account with your new credentials.</p>
            <div className="text-center mb-8">
              <a href={demoData.loginLink} className="inline-block px-8 py-3 bg-gradient-to-r from-green-700 to-blue-700 text-white font-serif rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">Access Your Account</a>
            </div>
            <p className="text-green-700 italic text-center">If you did not initiate this change, please contact our support team with utmost urgency.</p>
          </div>
        </div>
      )
    },
    {
      id: 'task-due',
      title: 'Task Due Reminder',
      content: (
        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-green-50 to-blue-50 border-4 border-double border-green-700/20">
          <div className="mb-8">
            <img src="/api/placeholder/150/50" alt="Company Logo" className="h-16 mb-6 opacity-90"/>
            <h1 className="text-3xl font-serif text-green-800 mb-6 text-center border-b-2 border-green-700/20 pb-4">Courteous Task Reminder</h1>
            <p className="text-green-700 mb-4 font-serif">Dear {demoData.userName},</p>
            <p className="text-green-700 mb-6 leading-relaxed">This notice serves to remind you of an approaching deadline {demoData.dueTimeframe}:</p>
            <div className="bg-white/50 p-6 rounded-lg mb-6 border-2 border-green-700/20">
              <p className="font-serif text-green-800 text-xl mb-4 text-center">Task Particulars</p>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Task: {demoData.taskName}</li>
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Project: {demoData.projectName}</li>
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Due Date: {demoData.dueDate}</li>
                <li className="flex items-center"><span className="font-serif mr-2">✦</span> Current Status: {demoData.currentStatus}</li>
              </ul>
            </div>
            <div className="text-center mb-6">
              <a href="#" className="inline-block px-8 py-3 bg-gradient-to-r from-green-700 to-blue-700 text-white font-serif rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">View Task Details</a>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif text-green-800 mb-12 text-center">Email Template Collection</h1>
        
        <div className="space-y-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white/80 rounded-lg shadow-lg border-2 border-green-700/20">
              <button
                className="w-full px-8 py-4 flex justify-between items-center hover:bg-green-50/50 transition-colors duration-200"
                onClick={() => setExpandedTemplate(expandedTemplate === template.id ? null : template.id)}
              >
                <span className="text-xl font-serif text-green-800">{template.title}</span>
                {expandedTemplate === template.id ? (
                  <ChevronUp className="w-6 h-6 text-green-600" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-green-600" />
                )}
              </button>
              
              {expandedTemplate === template.id && (
                <div className="border-t-2 border-green-700/20">
                  {template.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateShowcase;