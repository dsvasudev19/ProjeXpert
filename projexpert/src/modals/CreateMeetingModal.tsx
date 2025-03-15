import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X, UserPlus, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { axiosInstance } from '../axiosIntance';

// Validation schema using Yup
const meetingSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  startTime: Yup.date()
    .required('Start time is required')
    .min(new Date(), 'Start time cannot be in the past'),
  endTime: Yup.date()
    .required('End time is required')
    .min(Yup.ref('startTime'), 'End time must be after start time'),
  roomName: Yup.string().required("Room name is required"),
  password: Yup.string(),
  isRecurring: Yup.boolean(),
  recurrencePattern: Yup.string().when('isRecurring', {
    is: true,
    then: (schema) => schema.required('Recurrence pattern is required for recurring meetings'),
    otherwise: (schema) => schema.notRequired(),
  }),
  participants: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    })
  ),
  status: Yup.string().default('scheduled'),
});

const CreateMeetingModal = ({ isOpen, onClose, selectedDate, onMeetingCreated, id }: any) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [showParticipantSearch, setShowParticipantSearch] = useState(false);
  const [data,setData]=useState<any>({})

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/admin/client');
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  const getMeetingById=async(id:any)=>{
    try {
      const res=await axiosInstance.get(`/admin/timeline/meetings/${id}`)
      if(res.status===200){
        setData(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getMeetingById(id)
  },[id])

  const filteredUsers = searchTerm
    ? users.filter((user: any) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  // Determine initial values based on whether data is provided (edit mode) or not (create mode)
  const initialValues = data
    ? {
        title: data.title || '',
        description: data.description || '',
        startTime: data.startTime ? format(new Date(data.startTime), "yyyy-MM-dd'T'HH:mm") : format(new Date(), "yyyy-MM-dd'T'HH:mm"),
        endTime: data.endTime ? format(new Date(data.endTime), "yyyy-MM-dd'T'HH:mm") : format(new Date(), "yyyy-MM-dd'T'HH:mm"),
        roomName: data.roomName || '',
        password: data.password || '',
        isRecurring: data.isRecurring || false,
        recurrencePattern: data.recurrencePattern || '',
        participants: data.MeetingParticipants?.map((mp: any) => ({
          id: mp.User.id,
          name: mp.User.name,
          email: mp.User.email,
        })) || [],
        status: data.status || 'scheduled',
      }
    : {
        title: '',
        description: '',
        startTime: selectedDate ? format(new Date(selectedDate), "yyyy-MM-dd'T'HH:mm") : '',
        endTime: selectedDate
          ? format(new Date(new Date(selectedDate).setHours(new Date(selectedDate).getHours() + 1)), "yyyy-MM-dd'T'HH:mm")
          : '',
        roomName: '',
        password: '',
        isRecurring: false,
        recurrencePattern: '',
        participants: [],
        status: 'scheduled',
      };

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    setLoading(true);
    setError(null);

    try {
      const meetingData = {
        title: values.title,
        description: values.description,
        startTime: new Date(values.startTime).toISOString(),
        endTime: new Date(values.endTime).toISOString(),
        roomName: values.roomName,
        password: values.password,
        isRecurring: values.isRecurring,
        recurrencePattern: values.recurrencePattern,
        status: values.status,
        participants: values.participants.map((p: any) => p.id),
      };

      let response;
      if (data?.id) {
        // Update existing meeting
        response = await axiosInstance.put(`/admin/timeline/meetings/${data.id}`, meetingData);
      } else {
        // Create new meeting
        response = await axiosInstance.post('/admin/timeline/meetings', meetingData);
      }

      if (response.data.success) {
        onMeetingCreated(response.data.data);
        onClose();
        if (!data?.id) resetForm(); // Reset form only for create mode
      } else {
        setError(response.data.message || `Failed to ${data?.id ? 'update' : 'create'} meeting`);
      }
    } catch (err: any) {
      setError(`Error ${data?.id ? 'updating' : 'creating'} meeting: ` + (err.response?.data?.message || err.message));
      console.error(`Error ${data?.id ? 'updating' : 'creating'} meeting:`, err);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-xl transform transition ease-in-out duration-300">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                {data?.id ? 'Edit Meeting' : 'Create Meeting'}
              </h2>
              <button className="text-gray-400 hover:text-gray-500" onClick={onClose}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {error && (
                <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Formik
                initialValues={initialValues}
                validationSchema={meetingSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ values, setFieldValue, errors }) => (
                  <Form>
                    {/* Title */}
                    <div className="mb-4">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <Field
                          type="text"
                          id="title"
                          name="title"
                          className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                            errors.title ? 'border-red-300' : 'border-gray-200'
                          }`}
                        />
                      </div>
                      <ErrorMessage name="title" component="div" className="text-red-600 text-xs mt-1" />
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
                        rows={3}
                        className={`w-full pl-3 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                          errors.description ? 'border-red-300' : 'border-gray-200'
                        }`}
                      />
                      <ErrorMessage name="description" component="div" className="text-red-600 text-xs mt-1" />
                    </div>

                    {/* Date & Time */}
                    <div className="mb-4 grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                          Start Time <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <Field
                            type="datetime-local"
                            id="startTime"
                            name="startTime"
                            className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                              errors.startTime ? 'border-red-300' : 'border-gray-200'
                            }`}
                          />
                        </div>
                        <ErrorMessage name="startTime" component="div" className="text-red-600 text-xs mt-1" />
                      </div>

                      <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                          End Time <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Clock className="w-4 h-4 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <Field
                            type="datetime-local"
                            id="endTime"
                            name="endTime"
                            className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                              errors.endTime ? 'border-red-300' : 'border-gray-200'
                            }`}
                          />
                        </div>
                        <ErrorMessage name="endTime" component="div" className="text-red-600 text-xs mt-1" />
                      </div>
                    </div>

                    {/* Room Name & Password */}
                    <div className="mb-4 grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="roomName" className="block text-sm font-medium text-gray-700 mb-1">
                          Room Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <Field
                            type="text"
                            id="roomName"
                            name="roomName"
                            className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                              errors.roomName ? 'border-red-300' : 'border-gray-200'
                            }`}
                          />
                        </div>
                        <ErrorMessage name="roomName" component="div" className="text-red-600 text-xs mt-1" />
                      </div>

                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <Clock className="w-4 h-4 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <Field
                            type="text"
                            id="password"
                            name="password"
                            className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                              errors.password ? 'border-red-300' : 'border-gray-200'
                            }`}
                          />
                        </div>
                        <ErrorMessage name="password" component="div" className="text-red-600 text-xs mt-1" />
                      </div>
                    </div>

                    {/* Recurring Meeting */}
                    <div className="mb-4">
                      <div className="flex items-center">
                        <Field
                          type="checkbox"
                          id="isRecurring"
                          name="isRecurring"
                          className="h-4 w-4 text-green-600 focus:ring-green-400 border-gray-200 rounded"
                        />
                        <label htmlFor="isRecurring" className="ml-2 block text-sm text-gray-700">
                          Recurring Meeting
                        </label>
                      </div>
                      <ErrorMessage name="isRecurring" component="div" className="text-red-600 text-xs mt-1" />
                    </div>

                    {/* Recurrence Pattern */}
                    {values.isRecurring && (
                      <div className="mb-4">
                        <label htmlFor="recurrencePattern" className="block text-sm font-medium text-gray-700 mb-1">
                          Recurrence Pattern
                        </label>
                        <Field
                          as="select"
                          id="recurrencePattern"
                          name="recurrencePattern"
                          className={`w-full pl-3 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                            errors.recurrencePattern ? 'border-red-300' : 'border-gray-200'
                          }`}
                        >
                          <option value="">Select pattern...</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="biweekly">Bi-weekly</option>
                          <option value="monthly">Monthly</option>
                        </Field>
                        <ErrorMessage name="recurrencePattern" component="div" className="text-red-600 text-xs mt-1" />
                      </div>
                    )}

                    {/* Participants */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Participants</label>
                      <div className="mb-3">
                        {values.participants.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {values.participants.map((participant: any) => (
                              <div
                                key={participant.id}
                                className="bg-blue-100 text-blue-800 text-xs rounded-full px-3 py-1 flex items-center"
                              >
                                <span>{participant.name}</span>
                                <button
                                  type="button"
                                  onClick={() => setFieldValue('participants', values.participants.filter((p: any) => p.id !== participant.id))}
                                  className="ml-1.5 text-blue-500 hover:text-blue-700"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No participants added</p>
                        )}
                      </div>

                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                        onClick={() => setShowParticipantSearch(!showParticipantSearch)}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        {showParticipantSearch ? 'Hide' : 'Add Participants'}
                      </button>

                      {showParticipantSearch && (
                        <div className="mt-3 border border-gray-200 rounded-md shadow-sm">
                          <div className="p-3 border-b border-gray-200">
                            <div className="relative">
                              <UserPlus className="w-4 h-4 text-green-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                              <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 border-gray-200"
                              />
                            </div>
                          </div>
                          <div className="max-h-60 overflow-y-auto">
                            {filteredUsers.length > 0 ? (
                              <ul className="divide-y divide-gray-200">
                                {filteredUsers.map((user: any) => (
                                  <li
                                    key={user.id}
                                    className="px-3 py-2.5 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => {
                                      if (!values.participants.some((p: any) => p.id === user.id)) {
                                        setFieldValue('participants', [...values.participants, user]);
                                      }
                                      setSearchTerm('');
                                    }}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <span className="text-sm font-medium text-gray-900">{user.name}</span>
                                        <span className="block text-xs text-gray-500">{user.email}</span>
                                      </div>
                                      {values.participants.some((p: any) => p.id === user.id) && (
                                        <span className="text-xs text-green-600">Added</span>
                                      )}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="p-3 text-sm text-gray-500">No users found</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
                          ${loading ? 'bg-gradient-to-r from-blue-400 to-green-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600'} 
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400`}
                      >
                        {loading ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {data?.id ? 'Updating...' : 'Creating...'}
                          </span>
                        ) : (
                          data?.id ? 'Update Meeting' : 'Create Meeting'
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMeetingModal;