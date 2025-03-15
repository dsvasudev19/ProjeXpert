// import { useState, useEffect } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { X, Play, Pause, Clock } from 'lucide-react';
// import Select from 'react-select';
// import { axiosInstance } from '../axiosIntance'; // Adjust path as needed

// // Validation schema for starting a timer
// const startTimerSchema = Yup.object().shape({
//     projectId: Yup.number().required('Project ID is required'),
//     taskId: Yup.number().required('Task ID is required'),
//     description: Yup.string(), // Optional
// });

// // Validation schema for stopping a timer
// const stopTimerSchema = Yup.object().shape({
//     description: Yup.string(), // Optional
// });

// interface TimerModalProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// interface ActiveTimer {
//     id: number;
//     projectId: number;
//     projectName: string;
//     taskId: number;
//     taskName: string;
//     description: string;
//     startTime: string;
// }

// const TimerModal = ({ isOpen, onClose }: TimerModalProps) => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [projects, setProjects] = useState([]);
//     const [tasks, setTasks] = useState([]);
//     const [activeTimer, setActiveTimer] = useState<ActiveTimer | null>(null);
//     const [elapsedTime, setElapsedTime] = useState<string>("00:00:00");

//     // Check if there's an active timer and fetch projects/tasks
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Check if there's an active timer
//                 const activeTimerResponse = await axiosInstance.get('/timers/active');
//                 if (activeTimerResponse.data && !activeTimerResponse.data.endTime) {
//                     setActiveTimer(activeTimerResponse.data);
//                 } else {
//                     setActiveTimer(null);
//                 }

//                 // Fetch projects and tasks for dropdowns (only needed for Start Timer mode)
//                 if (!activeTimer) {
//                     const projectResponse = await axiosInstance.get('/admin/project');
//                     const taskResponse = await axiosInstance.get('/admin/task');
//                     setProjects(projectResponse.data);
//                     setTasks(taskResponse.data);
//                 }
//             } catch (err) {
//                 console.error('Error fetching data:', err);
//                 setError('Failed to load data');
//             }
//         };

//         if (isOpen) {
//             fetchData();
//         }
//     }, [isOpen]);

//     // Update elapsed time for active timer
//     useEffect(() => {
//         let interval: ReturnType<typeof setInterval>;

//         if (activeTimer && isOpen) {
//             interval = setInterval(() => {
//                 const startTime = new Date(activeTimer.startTime).getTime();
//                 const now = new Date().getTime();
//                 const diff = now - startTime;

//                 // Format elapsed time as HH:MM:SS
//                 const hours = Math.floor(diff / (1000 * 60 * 60));
//                 const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//                 const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//                 setElapsedTime(
//                     `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
//                 );
//             }, 1000);
//         }

//         return () => clearInterval(interval);
//     }, [activeTimer, isOpen]);

//     // Prepare options for react-select
//     const projectOptions = projects.map((project: any) => ({
//         value: project.id,
//         label: project.name || `Project ${project.id}`,
//     }));

//     const taskOptions = tasks.map((task: any) => ({
//         value: task.id,
//         label: task.name || `Task ${task.id}`,
//     }));

//     const startTimerInitialValues = {
//         projectId: '',
//         taskId: '',
//         description: '',
//     };

//     const stopTimerInitialValues = {
//         description: activeTimer?.description || '',
//     };

//     // Handler for starting a timer
//     const handleStartTimer = async (values: any, { setSubmitting, resetForm }: any) => {
//         setLoading(true);
//         setError(null);

//         try {
//             const timerData = {
//                 projectId: Number(values.projectId),
//                 taskId: Number(values.taskId),
//                 description: values.description || '',
//                 startTime: new Date().toISOString(),
//             };

//             const response = await axiosInstance.post('/timers/start', timerData);

//             if (response.status === 200 || response.data.success) {
//                 setActiveTimer(response.data);
//                 resetForm();
//             } else {
//                 setError(response.data.message || 'Failed to start timer');
//             }
//         } catch (err: any) {
//             setError('Error starting timer: ' + (err.response?.data?.message || err.message));
//             console.error('Error starting timer:', err);
//         } finally {
//             setLoading(false);
//             setSubmitting(false);
//         }
//     };

//     // Handler for stopping a timer
//     const handleStopTimer = async (values: any, { setSubmitting }: any) => {
//         if (!activeTimer) return;

//         setLoading(true);
//         setError(null);

//         try {
//             const timerData = {
//                 id: activeTimer.id,
//                 description: values.description || activeTimer.description,
//                 endTime: new Date().toISOString(),
//             };

//             const response = await axiosInstance.put(`/timers/${activeTimer.id}/stop`, timerData);

//             if (response.status === 200 || response.data.success) {
//                 setActiveTimer(null);
//                 onClose();
//             } else {
//                 setError(response.data.message || 'Failed to stop timer');
//             }
//         } catch (err: any) {
//             setError('Error stopping timer: ' + (err.response?.data?.message || err.message));
//             console.error('Error stopping timer:', err);
//         } finally {
//             setLoading(false);
//             setSubmitting(false);
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50">
//             {/* Backdrop */}
//             <div
//                 className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300"
//                 onClick={onClose}
//             />
//             {/* Modal */}
//             <div className="absolute top-16 right-4 w-full max-w-sm bg-white rounded-xl shadow-2xl transform transition-all duration-300 origin-top-right scale-95 animate-in">
//                 <div className="flex items-center justify-between p-4 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900">
//                         {activeTimer ? 'Stop Timer' : 'Start Timer'}
//                     </h2>
//                     <button
//                         className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
//                         onClick={onClose}
//                     >
//                         <X className="w-5 h-5" />
//                     </button>
//                 </div>

//                 <div className="p-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
//                     {error && (
//                         <div className="mb-4 bg-red-50 text-red-700 p-2 rounded-md text-sm">
//                             {error}
//                         </div>
//                     )}

//                     {/* Active Timer Display */}
//                     {activeTimer && (
//                         <div className="mb-6 bg-teal-50 p-3 rounded-lg">
//                             <div className="flex items-center justify-between mb-2">
//                                 <div className="flex items-center">
//                                     <Clock className="w-4 h-4 text-teal-600 mr-2" />
//                                     <span className="font-medium text-teal-800">{elapsedTime}</span>
//                                 </div>
//                                 <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">Running</span>
//                             </div>
//                             <div className="text-sm text-gray-700 mb-1">
//                                 <span className="font-medium">Project:</span> {activeTimer.projectName || `Project ${activeTimer.projectId}`}
//                             </div>
//                             <div className="text-sm text-gray-700">
//                                 <span className="font-medium">Task:</span> {activeTimer.taskName || `Task ${activeTimer.taskId}`}
//                             </div>
//                         </div>
//                     )}

//                     {/* Start Timer Form */}
//                     {!activeTimer && (
//                         <Formik
//                             initialValues={startTimerInitialValues}
//                             validationSchema={startTimerSchema}
//                             onSubmit={handleStartTimer}
//                         >
//                             {({ values, setFieldValue, errors }) => (
//                                 <Form>
//                                     {/* Project ID */}
//                                     <div className="mb-4">
//                                         <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-1">
//                                             Project <span className="text-red-500">*</span>
//                                         </label>
//                                         <Select
//                                             id="projectId"
//                                             name="projectId"
//                                             options={projectOptions}
//                                             value={projectOptions.find((option) => option.value === values.projectId) || null}
//                                             onChange={(option) => setFieldValue('projectId', option?.value || '')}
//                                             placeholder="Select a project..."
//                                             classNamePrefix="react-select"
//                                             className={`text-sm ${errors.projectId ? 'border-red-300' : ''}`}
//                                         />
//                                         <ErrorMessage name="projectId" component="div" className="text-red-600 text-xs mt-1" />
//                                     </div>

//                                     {/* Task ID */}
//                                     <div className="mb-4">
//                                         <label htmlFor="taskId" className="block text-sm font-medium text-gray-700 mb-1">
//                                             Task <span className="text-red-500">*</span>
//                                         </label>
//                                         <Select
//                                             id="taskId"
//                                             name="taskId"
//                                             options={taskOptions}
//                                             value={taskOptions.find((option) => option.value === values.taskId) || null}
//                                             onChange={(option) => setFieldValue('taskId', option?.value || '')}
//                                             placeholder="Select a task..."
//                                             classNamePrefix="react-select"
//                                             className={`text-sm ${errors.taskId ? 'border-red-300' : ''}`}
//                                         />
//                                         <ErrorMessage name="taskId" component="div" className="text-red-600 text-xs mt-1" />
//                                     </div>

//                                     {/* Description */}
//                                     <div className="mb-4">
//                                         <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                                             Description
//                                         </label>
//                                         <Field
//                                             as="textarea"
//                                             id="description"
//                                             name="description"
//                                             rows={2}
//                                             placeholder="What are you working on?"
//                                             className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 ${errors.description ? 'border-red-300' : 'border-gray-200'
//                                                 }`}
//                                         />
//                                         <ErrorMessage name="description" component="div" className="text-red-600 text-xs mt-1" />
//                                     </div>

//                                     {/* Submit Button */}
//                                     <div className="flex justify-end">
//                                         <button
//                                             type="submit"
//                                             disabled={loading}
//                                             className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 flex items-center ${loading
//                                                     ? 'bg-teal-400 cursor-not-allowed'
//                                                     : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'
//                                                 }`}
//                                         >
//                                             {loading ? (
//                                                 <span className="flex items-center">
//                                                     <svg
//                                                         className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                                                         xmlns="http://www.w3.org/2000/svg"
//                                                         fill="none"
//                                                         viewBox="0 0 24 24"
//                                                     >
//                                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                                                         <path
//                                                             className="opacity-75"
//                                                             fill="currentColor"
//                                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                                         />
//                                                     </svg>
//                                                     Processing...
//                                                 </span>
//                                             ) : (
//                                                 <>
//                                                     <Play className="w-4 h-4 mr-2" />
//                                                     Start Timer
//                                                 </>
//                                             )}
//                                         </button>
//                                     </div>
//                                 </Form>
//                             )}
//                         </Formik>
//                     )}

//                     {/* Stop Timer Form */}
//                     {activeTimer && (
//                         <Formik
//                             initialValues={stopTimerInitialValues}
//                             validationSchema={stopTimerSchema}
//                             onSubmit={handleStopTimer}
//                         >
//                             {({ errors }) => (
//                                 <Form>
//                                     {/* Description */}
//                                     <div className="mb-4">
//                                         <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                                             Description
//                                         </label>
//                                         <Field
//                                             as="textarea"
//                                             id="description"
//                                             name="description"
//                                             rows={2}
//                                             placeholder="What did you accomplish?"
//                                             className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 ${errors.description ? 'border-red-300' : 'border-gray-200'
//                                                 }`}
//                                         />
//                                         <ErrorMessage name="description" component="div" className="text-red-600 text-xs mt-1" />
//                                     </div>

//                                     {/* Submit Button */}
//                                     <div className="flex justify-end">
//                                         <button
//                                             type="submit"
//                                             disabled={loading}
//                                             className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 flex items-center ${loading
//                                                     ? 'bg-red-400 cursor-not-allowed'
//                                                     : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
//                                                 }`}
//                                         >
//                                             {loading ? (
//                                                 <span className="flex items-center">
//                                                     <svg
//                                                         className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                                                         xmlns="http://www.w3.org/2000/svg"
//                                                         fill="none"
//                                                         viewBox="0 0 24 24"
//                                                     >
//                                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                                                         <path
//                                                             className="opacity-75"
//                                                             fill="currentColor"
//                                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                                         />
//                                                     </svg>
//                                                     Stopping...
//                                                 </span>
//                                             ) : (
//                                                 <>
//                                                     <Pause className="w-4 h-4 mr-2" />
//                                                     Stop Timer
//                                                 </>
//                                             )}
//                                         </button>
//                                     </div>
//                                 </Form>
//                             )}
//                         </Formik>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TimerModal;


import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X, Play, Pause, Clock } from 'lucide-react';
import Select from 'react-select';
import { axiosInstance } from '../axiosIntance'; // Adjust path as needed

// Validation schema for starting a timer
const startTimerSchema = Yup.object().shape({
  projectId: Yup.number().required('Project ID is required'),
  taskId: Yup.number().required('Task ID is required'),
  description: Yup.string(), // Optional
});

// Validation schema for stopping a timer
const stopTimerSchema = Yup.object().shape({
  description: Yup.string(), // Optional
});

interface TimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ActiveTimer {
  id: number;
  projectId: number;
  projectName: string;
  taskId: number;
  taskName: string;
  description: string;
  startTime: string;
}

const TimerModal = ({ isOpen, onClose }: TimerModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeTimer, setActiveTimer] = useState<ActiveTimer | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string>("00:00:00");
  
  // Check if there's an active timer and fetch projects/tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if there's an active timer
        const activeTimerResponse = await axiosInstance.get('/admin/timers/active');
        console.log(activeTimerResponse)
        if (activeTimerResponse.data && !activeTimerResponse.data.endTime) {
          setActiveTimer(activeTimerResponse.data);
        } else {
          setActiveTimer(null);
        }

        // Fetch projects and tasks for dropdowns (only needed for Start Timer mode)
        if (!activeTimer) {
          const projectResponse = await axiosInstance.get('/admin/project');
          const taskResponse = await axiosInstance.get('/admin/task');
          setProjects(projectResponse.data);
          setTasks(taskResponse.data);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  // Update elapsed time for active timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (activeTimer && isOpen) {
      interval = setInterval(() => {
        const startTime = new Date(activeTimer.startTime).getTime();
        const now = new Date().getTime();
        const diff = now - startTime;
        
        // Format elapsed time as HH:MM:SS
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setElapsedTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [activeTimer, isOpen]);

  // Prepare options for react-select
  const projectOptions = projects.map((project: any) => ({
    value: project.id,
    label: project.name || `Project ${project.id}`,
  }));

  const taskOptions = tasks.map((task: any) => ({
    value: task.id,
    label: task.name || `Task ${task.id}`,
  }));

  const startTimerInitialValues = {
    projectId: '',
    taskId: '',
    description: '',
  };

  const stopTimerInitialValues = {
    description: activeTimer?.description || '',
  };

  // Handler for starting a timer
  const handleStartTimer = async (values: any, { setSubmitting, resetForm }: any) => {
    setLoading(true);
    setError(null);

    try {
      const timerData = {
        projectId: Number(values.projectId),
        taskId: Number(values.taskId),
        description: values.description || '',
        startTime: new Date().toISOString(),
      };

      const response = await axiosInstance.post('/admin/timers/start', timerData);

      if (response.status === 200 || response.data.success) {
        setActiveTimer(response.data.data);
        resetForm();
      } else {
        setError(response.data.message || 'Failed to start timer');
      }
    } catch (err: any) {
      setError('Error starting timer: ' + (err.response?.data?.message || err.message));
      console.error('Error starting timer:', err);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // Handler for stopping a timer
  const handleStopTimer = async (values: any, { setSubmitting }: any) => {
    if (!activeTimer) return;
    
    setLoading(true);
    setError(null);

    try {
      const timerData = {
        id: activeTimer.id,
        description: values.description || activeTimer.description,
        endTime: new Date().toISOString(),
      };

      const response = await axiosInstance.put(`/admin/timers/${activeTimer.id}/stop`, timerData);

      if (response.status === 200 || response.data.success) {
        setActiveTimer(null);
        onClose();
      } else {
        setError(response.data.message || 'Failed to stop timer');
      }
    } catch (err: any) {
      setError('Error stopping timer: ' + (err.response?.data?.message || err.message));
      console.error('Error stopping timer:', err);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="absolute top-16 right-4 w-full max-w-sm bg-white rounded-xl shadow-2xl transform transition-all duration-300 origin-top-right scale-95 animate-in">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {activeTimer ? 'Stop Timer' : 'Start Timer'}
          </h2>
          <button
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
          {error && (
            <div className="mb-4 bg-red-50 text-red-700 p-2 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Active Timer Display */}
          {activeTimer && (
            <div className="mb-6 bg-teal-50 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-teal-600 mr-2" />
                  <span className="font-medium text-teal-800">{elapsedTime}</span>
                </div>
                <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">Running</span>
              </div>
              <div className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Project:</span> {activeTimer.projectName || `Project ${activeTimer.projectId}`}
              </div>
              <div className="text-sm text-gray-700">
                <span className="font-medium">Task:</span> {activeTimer.taskName || `Task ${activeTimer.taskId}`}
              </div>
            </div>
          )}

          {/* Start Timer Form */}
          {!activeTimer && (
            <Formik
              initialValues={startTimerInitialValues}
              validationSchema={startTimerSchema}
              onSubmit={handleStartTimer}
            >
              {({ values, setFieldValue, errors }) => (
                <Form>
                  {/* Project ID */}
                  <div className="mb-4">
                    <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-1">
                      Project <span className="text-red-500">*</span>
                    </label>
                    <Select
                      id="projectId"
                      name="projectId"
                      options={projectOptions}
                      value={projectOptions.find((option) => option.value === values.projectId) || null}
                      onChange={(option) => setFieldValue('projectId', option?.value || '')}
                      placeholder="Select a project..."
                      classNamePrefix="react-select"
                      className={`text-sm ${errors.projectId ? 'border-red-300' : ''}`}
                    />
                    <ErrorMessage name="projectId" component="div" className="text-red-600 text-xs mt-1" />
                  </div>

                  {/* Task ID */}
                  <div className="mb-4">
                    <label htmlFor="taskId" className="block text-sm font-medium text-gray-700 mb-1">
                      Task <span className="text-red-500">*</span>
                    </label>
                    <Select
                      id="taskId"
                      name="taskId"
                      options={taskOptions}
                      value={taskOptions.find((option) => option.value === values.taskId) || null}
                      onChange={(option) => setFieldValue('taskId', option?.value || '')}
                      placeholder="Select a task..."
                      classNamePrefix="react-select"
                      className={`text-sm ${errors.taskId ? 'border-red-300' : ''}`}
                    />
                    <ErrorMessage name="taskId" component="div" className="text-red-600 text-xs mt-1" />
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      rows={2}
                      placeholder="What are you working on?"
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                        errors.description ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    <ErrorMessage name="description" component="div" className="text-red-600 text-xs mt-1" />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 flex items-center ${
                        loading
                          ? 'bg-teal-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'
                      }`}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start Timer
                        </>
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}

          {/* Stop Timer Form */}
          {activeTimer && (
            <Formik
              initialValues={stopTimerInitialValues}
              validationSchema={stopTimerSchema}
              onSubmit={handleStopTimer}
            >
              {({ errors }) => (
                <Form>
                  {/* Description */}
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      rows={2}
                      placeholder="What did you accomplish?"
                      className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                        errors.description ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    <ErrorMessage name="description" component="div" className="text-red-600 text-xs mt-1" />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 flex items-center ${
                        loading
                          ? 'bg-red-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                      }`}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Stop Timer
                        </>
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimerModal;