// import React, { useState, useEffect } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import { axiosInstance } from '../axiosIntance';

// // Define interfaces
// interface TicketFormValues {
//   title: string;
//   description: string;
//   category: string;
//   priority: 'Low' | 'Medium' | 'High' | 'Critical';
//   projectId: string | null;
// }

// interface Project {
//   id: number;
//   name: string;
// }

// // Yup Validation Schema
// const ticketSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, 'Title must be at least 3 characters')
//     .max(100, 'Title cannot exceed 100 characters')
//     .required('Title is required'),
//   description: Yup.string()
//     .min(10, 'Description must be at least 10 characters')
//     .required('Description is required'),
//   category: Yup.string().required('Category is required'),
//   priority: Yup.string()
//     .oneOf(['Low', 'Medium', 'High', 'Critical'], 'Invalid priority')
//     .required('Priority is required'),
//   projectId: Yup.string().required('Project is required'),
// });

// const RaiseTicket: React.FC = () => {
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Fetch projects from API
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axiosInstance.get('/admin/project');
//         setProjects(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Failed to fetch projects:', error);
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const initialValues: TicketFormValues = {
//     title: '',
//     description: '',
//     category: '',
//     priority: 'Medium',
//     projectId: '',
//   };

//   const handleSubmit = async (
//     values: TicketFormValues,
//     { setSubmitting, setErrors, setStatus }: any
//   ) => {
//     try {
//       const response = await axiosInstance.post('/admin/ticket', values, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if(response.status===201){
//         setStatus({ success: 'Ticket raised successfully!' });
//     //    setTimeout(() => navigate('/dashboard/tickets'), 2000);
//       }
      
//     } catch (err: any) {
//       setErrors({
//         submit: err.response?.data?.error || 'Something went wrong. Please try again.',
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Priority badge colors - modified to align with the new color palette
//   const priorityColors = {
//     Low: 'bg-green-100 text-green-800 border-green-200',
//     Medium: 'bg-blue-100 text-blue-800 border-blue-200',
//     High: 'bg-amber-100 text-amber-800 border-amber-200',
//     Critical: 'bg-red-100 text-red-800 border-red-200',
//   };

//   const categoryIcons = {
//     Technical: (
//       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
//       </svg>
//     ),
//     Billing: (
//       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
//       </svg>
//     ),
//     'Feature Request': (
//       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
//       </svg>
//     ),
//     Bug: (
//       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
//       </svg>
//     ),
//     Other: (
//       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//       </svg>
//     ),
//   };

//   return (
//     <div className="h-full overflow-auto bg-[#D1E0D7] rounded">
//       <div className="max-w-full mx-auto">
//         {/* Redesigned Header Section */}
//         <div className="bg-[#607EBC] text-white shadow-md relative">
//           <div className="mx-auto px-6 py-6 sm:px-8">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <div className="mb-4 md:mb-0">
//                 <h1 className="text-2xl font-bold tracking-wide">Support Request</h1>
//                 <div className="mt-2 text-white/90 max-w-xl flex items-center">
//                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                   <p>Submit a detailed request and we'll respond within 24 hours</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="bg-white/10 backdrop-blur-sm rounded-md px-3 py-1.5">
//                   <div className="flex items-center space-x-2">
//                     <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
//                     <span className="text-xs font-medium">Support available</span>
//                   </div>
//                 </div>
//                 <button 
//                   onClick={() => navigate('/dashboard/tickets')}
//                   className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md transition-colors duration-200 backdrop-blur-sm"
//                 >
//                   My Tickets
//                 </button>
//               </div>
//             </div>
//           </div>
//           {/* Decorative accent line */}
//           <div className="h-1 bg-gradient-to-r from-[#D1E0D7] to-[#607EBC]/50"></div>
//         </div>

//         {/* Main Content - Form Section */}
//         <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
//           <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
//             {/* Form Header */}
//             <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
//               <h2 className="text-xl font-semibold text-[#607EBC]">Create New Support Ticket</h2>
//               <p className="mt-1 text-sm text-gray-500">
//                 Please provide detailed information to help us assist you more efficiently.
//               </p>
//             </div>

//             {/* Formik Form */}
//             <Formik
//               initialValues={initialValues}
//               validationSchema={ticketSchema}
//               onSubmit={handleSubmit}
//               enableReinitialize
//             >
//               {({ isSubmitting, status, errors, values, touched }: any) => (
//                 <Form className="px-6 py-6">
//                   <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//                     {/* Left Column - Main Fields */}
//                     <div className="lg:col-span-3 space-y-6">
//                       {/* Title */}
//                       <div>
//                         <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                           Ticket Title
//                         </label>
//                         <Field
//                           id="title"
//                           name="title"
//                           type="text"
//                           className={`w-full px-4 py-3 border ${
//                             touched.title && errors.title ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
//                           } rounded-lg focus:ring-2 focus:ring-[#607EBC] focus:border-[#607EBC] transition-all duration-200 shadow-sm`}
//                           placeholder="Provide a clear summary of your issue"
//                         />
//                         <ErrorMessage
//                           name="title"
//                           component="p"
//                           className="mt-1 text-sm text-red-600"
//                         />
//                       </div>

//                       {/* Description */}
//                       <div>
//                         <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                           Detailed Description
//                         </label>
//                         <Field
//                           as="textarea"
//                           id="description"
//                           name="description"
//                           rows={8}
//                           className={`w-full px-4 py-3 border ${
//                             touched.description && errors.description ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
//                           } rounded-lg focus:ring-2 focus:ring-[#607EBC] focus:border-[#607EBC] transition-all duration-200 shadow-sm`}
//                           placeholder="Please provide as much detail as possible including any error messages, steps to reproduce, and what you've tried so far..."
//                         />
//                         <ErrorMessage
//                           name="description"
//                           component="p"
//                           className="mt-1 text-sm text-red-600"
//                         />
//                         <div className="mt-1 text-xs text-gray-500 flex items-center">
//                           <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                           </svg>
//                           Pro tip: Including screenshots or specific errors helps us resolve your issue faster
//                         </div>
//                       </div>

//                       {/* Messages */}
//                       {errors?.submit && (
//                         <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md animate-fade-in">
//                           <div className="flex">
//                             <div className="flex-shrink-0">
//                               <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                               </svg>
//                             </div>
//                             <div className="ml-3">
//                               <p className="text-sm text-red-700">{errors?.submit}</p>
//                             </div>
//                           </div>
//                         </div>
//                       )}
                      
//                       {status?.success && (
//                         <div className="bg-green-50 border border-green-200 p-4 rounded-md animate-fade-in">
//                           <div className="flex">
//                             <div className="flex-shrink-0">
//                               <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                               </svg>
//                             </div>
//                             <div className="ml-3">
//                               <p className="text-sm font-medium text-green-800">{status.success}</p>
//                               <p className="mt-1 text-sm text-green-700">You'll be redirected to your tickets shortly.</p>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Right Column - Metadata */}
//                     <div className="lg:col-span-1 space-y-6">
//                       {/* Category */}
//                       <div>
//                         <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//                           Category
//                         </label>
//                         <div className="relative">
//                           <Field
//                             as="select"
//                             id="category"
//                             name="category"
//                             className={`w-full px-4 py-3 border ${
//                               touched.category && errors.category ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
//                             } rounded-lg focus:ring-2 focus:ring-[#607EBC] focus:border-[#607EBC] transition-all duration-200 shadow-sm appearance-none pr-10 bg-white`}
//                           >
//                             <option value="" disabled>Select issue type</option>
//                             <option value="Technical">Technical</option>
//                             <option value="Billing">Billing</option>
//                             <option value="Feature Request">Feature Request</option>
//                             <option value="Bug">Bug</option>
//                             <option value="Other">Other</option>
//                           </Field>
//                           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
//                             <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                             </svg>
//                           </div>
//                         </div>
//                         <ErrorMessage
//                           name="category"
//                           component="p"
//                           className="mt-1 text-sm text-red-600"
//                         />
//                       </div>

//                       {/* Priority */}
//                       <div>
//                         <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
//                           Priority
//                         </label>
//                         <div className="relative">
//                           <Field
//                             as="select"
//                             id="priority"
//                             name="priority"
//                             className={`w-full px-4 py-3 border ${
//                               touched.priority && errors.priority ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
//                             } rounded-lg focus:ring-2 focus:ring-[#607EBC] focus:border-[#607EBC] transition-all duration-200 shadow-sm appearance-none pr-10 bg-white`}
//                           >
//                             <option value="Low">Low</option>
//                             <option value="Medium">Medium</option>
//                             <option value="High">High</option>
//                             <option value="Critical">Critical</option>
//                           </Field>
//                           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
//                             <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                             </svg>
//                           </div>
//                         </div>
//                         <ErrorMessage
//                           name="priority"
//                           component="p"
//                           className="mt-1 text-sm text-red-600"
//                         />
//                       </div>

//                       {/* Project ID - Now as Dropdown */}
//                       <div>
//                         <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-1">
//                           Related Project
//                         </label>
//                         <div className="relative">
//                           <Field
//                             as="select"
//                             id="projectId"
//                             name="projectId"
//                             className={`w-full px-4 py-3 border ${
//                               touched.projectId && errors.projectId ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
//                             } rounded-lg focus:ring-2 focus:ring-[#607EBC] focus:border-[#607EBC] transition-all duration-200 shadow-sm appearance-none pr-10 bg-white`}
//                             disabled={loading}
//                           >
//                             <option value="" disabled>
//                               {loading ? 'Loading projects...' : 'Select a project'}
//                             </option>
//                             {projects?.map((project) => (
//                               <option key={project?.id} value={project?.id}>
//                                 {project?.name}
//                               </option>
//                             ))}
//                           </Field>
//                           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
//                             <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                             </svg>
//                           </div>
//                         </div>
//                         <ErrorMessage
//                           name="projectId"
//                           component="p"
//                           className="mt-1 text-sm text-red-600"
//                         />
//                       </div>

//                       {/* Ticket Preview with the new color scheme */}
//                       {(values.title || values.priority || values.category) && (
//                         <div className="mt-6 bg-[#D1E0D7]/40 p-4 rounded-lg border border-[#D1E0D7]">
//                           <h3 className="text-sm font-medium text-gray-700 mb-3">Ticket Preview</h3>
//                           <div className="space-y-3">
//                             {values.title && (
//                               <div className="text-sm font-medium text-gray-800 truncate">{values.title}</div>
//                             )}
//                             <div className="flex flex-wrap gap-2">
//                               {values.category && (
//                                 <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#607EBC]/20 text-[#607EBC] border border-[#607EBC]/30">
//                                   <span className="mr-1">
//                                     {categoryIcons[values.category as keyof typeof categoryIcons]}
//                                   </span>
//                                   {values.category}
//                                 </div>
//                               )}
//                               {values.priority && (
//                                 <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${priorityColors[values.priority as keyof typeof priorityColors]}`}>
//                                   {values.priority}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="mt-8 border-t border-gray-200 pt-6 flex items-center justify-end space-x-4">
//                     <button
//                       type="button"
//                       onClick={() => navigate('/dashboard')}
//                       className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
//                     >
//                       Cancel
//                     </button>
                    
//                     <button
//                       type="submit"
//                       disabled={isSubmitting}
//                       className="px-6 py-2.5 text-sm font-medium text-white bg-[#607EBC] rounded-lg shadow-sm hover:bg-[#607EBC]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#607EBC] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed min-w-[120px]"
//                     >
//                       {isSubmitting ? (
//                         <span className="flex items-center justify-center">
//                           <svg
//                             className="animate-spin h-4 w-4 mr-2 text-white"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             />
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                             />
//                           </svg>
//                           Submitting...
//                         </span>
//                       ) : (
//                         'Submit Ticket'
//                       )}
//                     </button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>

//           {/* Support Information Cards with updated colors */}
//           <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100">
//               <div className="flex items-start">
//                 <div className="flex-shrink-0 bg-[#D1E0D7] p-2 rounded-lg">
//                   <svg className="h-6 w-6 text-[#607EBC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </div>
//                 <div className="ml-4">
//                   <h3 className="text-sm font-medium text-gray-900">Response Time</h3>
//                   <p className="mt-1 text-sm text-gray-500">We typically respond to tickets within 24 hours during business days.</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100">
//               <div className="flex items-start">
//                 <div className="flex-shrink-0 bg-[#D1E0D7] p-2 rounded-lg">
//                   <svg className="h-6 w-6 text-[#607EBC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
//                   </svg>
//                 </div>
//                 <div className="ml-4">
//                   <h3 className="text-sm font-medium text-gray-900">Priority System</h3>
//                   <p className="mt-1 text-sm text-gray-500">Critical issues are addressed immediately. Regular tickets follow standard queue.</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100">
//               <div className="flex items-start">
//                 <div className="flex-shrink-0 bg-[#D1E0D7] p-2 rounded-lg">
//                   <svg className="h-6 w-6 text-[#607EBC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
//                   </svg>
//                 </div>
//                 <div className="ml-4">
//                   <h3 className="text-sm font-medium text-gray-900">Need Help?</h3>
//                   <p className="mt-1 text-sm text-gray-500">For urgent issues, contact our support team directly at <span className="text-[#607EBC] font-medium">support@company.com</span></p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RaiseTicket;


import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../axiosIntance';
// Define interfaces
interface TicketFormValues {
  title: string;
  description: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  projectId: string | null;
  attachments: File[] | null; // New field for attachments
}

interface Project {
  id: number;
  name: string;
}

// Yup Validation Schema
const ticketSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters')
    .required('Title is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  category: Yup.string().required('Category is required'),
  priority: Yup.string()
    .oneOf(['Low', 'Medium', 'High', 'Critical'], 'Invalid priority')
    .required('Priority is required'),
  projectId: Yup.string().notRequired(),
  attachments: Yup.mixed()
    .test('fileCount', 'Maximum 10 attachments allowed', (value:any) => !value || value.length <= 10)
    .test('fileSize', 'Each file must be less than 5MB', (value:any) => {
      return !value || value.every((file: File) => file.size <= 5 * 1024 * 1024);
    }),
});

const RaiseTicket: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get('/admin/project');
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const initialValues: TicketFormValues = {
    title: '',
    description: '',
    category: '',
    priority: 'Medium',
    projectId: '',
    attachments: null,
  };

  const handleSubmit = async (
    values: TicketFormValues,
    { setSubmitting, setErrors, setStatus }: any
  ) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('category', values.category);
      formData.append('priority', values.priority);
      formData.append('projectId', values.projectId || '');
      if (values.attachments) {
        values.attachments.forEach((file) => formData.append('file', file));
      }

      const response = await axiosInstance.post('/admin/ticket', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(response.status===201){
        setStatus({ success: 'Ticket raised successfully!' });
        // setTimeout(() => navigate('/dashboard/ticket'), 2000);
      }
    } catch (err: any) {
      setErrors({
        submit: err.response?.data?.error || 'Something went wrong. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const priorityColors = {
    Low: 'bg-green-100 text-green-800 border-green-200',
    Medium: 'bg-blue-100 text-blue-800 border-blue-200',
    High: 'bg-amber-100 text-amber-800 border-amber-200',
    Critical: 'bg-red-100 text-red-800 border-red-200',
  };

  const categoryIcons = {
    Technical: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    ),
    Billing: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
      </svg>
    ),
    'Feature Request': (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
      </svg>
    ),
    Bug: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
    ),
    Other: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
  };

  return (
    <div className="h-full overflow-auto bg-[#D1E0D7] rounded">
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <div className="bg-[#607EBC] text-white shadow-md relative">
          <div className="mx-auto px-6 py-6 sm:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl font-bold tracking-wide">Support Request</h1>
                <div className="mt-2 text-white/90 max-w-xl flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p>Submit a detailed request and we'll respond within 24 hours</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-md px-3 py-1.5">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-xs font-medium">Support available</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/dashboard/tickets')}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md transition-colors duration-200 backdrop-blur-sm"
                >
                  My Tickets
                </button>
              </div>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-[#D1E0D7] to-[#607EBC]/50"></div>
        </div>

        {/* Main Content */}
        <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold text-[#607EBC]">Create New Support Ticket</h2>
              <p className="mt-1 text-sm text-gray-500">
                Please provide detailed information to help us assist you more efficiently.
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={ticketSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting, status, errors, values, touched, setFieldValue }: any) => (
                <Form className="px-6 py-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-3 space-y-6">
                      {/* Title */}
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                          Ticket Title
                        </label>
                        <Field
                          id="title"
                          name="title"
                          type="text"
                          className={`w-full px-4 py-3 border ${
                            touched.title && errors.title ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                          } rounded-lg focus:ring-2 focus:ring-[#607EBC] focus:border-[#607EBC] transition-all duration-200 shadow-sm`}
                          placeholder="Provide a clear summary of your issue"
                        />
                        <ErrorMessage name="title" component="p" className="mt-1 text-sm text-red-600" />
                      </div>

                      {/* Description */}
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                          Detailed Description
                        </label>
                        <Field
                          as="textarea"
                          id="description"
                          name="description"
                          rows={8}
                          className={`w-full px-4 py-3 border ${
                            touched.description && errors.description ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                          } rounded-lg focus:ring-2 focus:ring-[#607EBC] focus:border-[#607EBC] transition-all duration-200 shadow-sm`}
                          placeholder="Please provide as much detail as possible including any error messages, steps to reproduce, and what you've tried so far..."
                        />
                        <ErrorMessage name="description" component="p" className="mt-1 text-sm text-red-600" />
                        <div className="mt-1 text-xs text-gray-500 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          Pro tip: Including screenshots or specific errors helps us resolve your issue faster
                        </div>
                      </div>

                      {/* Attachments */}
                      <div>
                        <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 mb-1">
                          Attachments (Optional, max 10 files, 5MB each)
                        </label>
                        <div className="relative">
                          <input
                            id="attachments"
                            name="attachments"
                            type="file"
                            multiple
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              const files = event.currentTarget.files ? Array.from(event.currentTarget.files) : null;
                              setFieldValue('attachments', files);
                             
                            }}
                            className="hidden"
                          />
                          <label
                            htmlFor="attachments"
                            className={`w-full px-4 py-3 border ${
                              touched.attachments && errors.attachments ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                            } rounded-lg bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition-all duration-200 flex items-center justify-center`}
                          >
                            <svg className="w-5 h-5 mr-2 text-[#607EBC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                            </svg>
                            <span className="text-sm text-gray-600">
                              {values.attachments && values.attachments.length > 0
                                ? `${values.attachments.length} file(s) selected`
                                : 'Click to upload files'}
                            </span>
                          </label>
                        </div>
                        {values.attachments && values.attachments.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {values.attachments.map((file: File, index: number) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-[#D1E0D7]/40 p-2 rounded-md text-sm text-gray-700"
                              >
                                <div className="flex items-center truncate">
                                  <svg className="w-4 h-4 mr-2 text-[#607EBC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                  </svg>
                                  <span className="truncate">{file.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newAttachments = values.attachments.filter((_: File, i: number) => i !== index);
                                    setFieldValue('attachments', newAttachments.length > 0 ? newAttachments : null);
                                  }}
                                  className="text-red-600 hover:text-red-800 transition-colors duration-200"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                        <ErrorMessage name="attachments" component="p" className="mt-1 text-sm text-red-600" />
                      </div>

                      {/* Messages */}
                      {errors?.submit && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md animate-fade-in">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-red-700">{errors?.submit}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {status?.success && (
                        <div className="bg-green-50 border border-green-200 p-4 rounded-md animate-fade-in">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-green-800">{status.success}</p>
                              <p className="mt-1 text-sm text-green-700">You'll be redirected to your tickets shortly.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-1 space-y-6">
                      {/* Category */}
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <div className="relative">
                          <Field
                            as="select"
                            id="category"
                            name="category"
                            className={`w-full px-4 py-3 border ${
                              touched.category && errors.category ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-[#607EBC] focus:border-[#607EBC] transition-all duration-200 shadow-sm appearance-none pr-10 bg-white`}
                          >
                            <option value="" disabled>Select issue type</option>
                            <option value="Technical">Technical</option>
                            <option value="Billing">Billing</option>
                            <option value="Feature Request">Feature Request</option>
                            <option value="Bug">Bug</option>
                            <option value="Other">Other</option>
                          </Field>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <ErrorMessage name="category" component="p" className="mt-1 text-sm text-red-600" />
                      </div>

                      {/* Priority */}
                      <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                          Priority
                        </label>
                        <div className="relative">
                          <Field
                            as="select"
                            id="priority"
                            name="priority"
                            className={`w-full px-4 py-3 border ${
                              touched.priority && errors.priority ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-[#607EBC] focus:border-[#607EBC] transition-all duration-200 shadow-sm appearance-none pr-10 bg-white`}
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                          </Field>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <ErrorMessage name="priority" component="p" className="mt-1 text-sm text-red-600" />
                      </div>

                      {/* Project ID */}
                      <div>
                        <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-1">
                          Related Project
                        </label>
                        <div className="relative">
                          <Field
                            as="select"
                            id="projectId"
                            name="projectId"
                            className={`w-full px-4 py-3 border ${
                              touched.projectId && errors.projectId ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                            } rounded-lg focus:ring-2 focus:ring-[#607EBC] focus:border-[#607EBC] transition-all duration-200 shadow-sm appearance-none pr-10 bg-white`}
                            disabled={loading}
                          >
                            <option value="" disabled>
                              {loading ? 'Loading projects...' : 'Select a project'}
                            </option>
                            {projects?.map((project) => (
                              <option key={project?.id} value={project?.id}>
                                {project?.name}
                              </option>
                            ))}
                          </Field>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <ErrorMessage name="projectId" component="p" className="mt-1 text-sm text-red-600" />
                      </div>

                      {/* Ticket Preview */}
                      {(values.title || values.priority || values.category) && (
                        <div className="mt-6 bg-[#D1E0D7]/40 p-4 rounded-lg border border-[#D1E0D7]">
                          <h3 className="text-sm font-medium text-gray-700 mb-3">Ticket Preview</h3>
                          <div className="space-y-3">
                            {values.title && (
                              <div className="text-sm font-medium text-gray-800 truncate">{values.title}</div>
                            )}
                            <div className="flex flex-wrap gap-2">
                              {values.category && (
                                <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#607EBC]/20 text-[#607EBC] border border-[#607EBC]/30">
                                  <span className="mr-1">
                                    {categoryIcons[values.category as keyof typeof categoryIcons]}
                                  </span>
                                  {values.category}
                                </div>
                              )}
                              {values.priority && (
                                <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${priorityColors[values.priority as keyof typeof priorityColors]}`}>
                                  {values.priority}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 border-t border-gray-200 pt-6 flex items-center justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard')}
                      className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 text-sm font-medium text-white bg-[#607EBC] rounded-lg shadow-sm hover:bg-[#607EBC]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#607EBC] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed min-w-[120px]"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin h-4 w-4 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Ticket'
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/* Support Information Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-[#D1E0D7] p-2 rounded-lg">
                  <svg className="h-6 w-6 text-[#607EBC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">Response Time</h3>
                  <p className="mt-1 text-sm text-gray-500">We typically respond to tickets within 24 hours during business days.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-[#D1E0D7] p-2 rounded-lg">
                  <svg className="h-6 w-6 text-[#607EBC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">Priority System</h3>
                  <p className="mt-1 text-sm text-gray-500">Critical issues are addressed immediately. Regular tickets follow standard queue.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-[#D1E0D7] p-2 rounded-lg">
                  <svg className="h-6 w-6 text-[#607EBC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">Need Help?</h3>
                  <p className="mt-1 text-sm text-gray-500">For urgent issues, contact our support team directly at <span className="text-[#607EBC] font-medium">support@company.com</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaiseTicket;