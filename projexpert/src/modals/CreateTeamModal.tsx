import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X } from 'lucide-react';
import Select from 'react-select';
import { axiosInstance } from '../axiosIntance'; // Adjust the path as needed
import toast from 'react-hot-toast';

// Validation schema using Yup
const teamSchema = Yup.object().shape({
  name: Yup.string().required('Team name is required'),
  description: Yup.string(),
  leadId: Yup.number().required('Team lead is required'),
  memberIds: Yup.array().of(Yup.number()).min(1, 'At least one member is required'),
  department: Yup.string().required('Department is required'),
});

const CreateTeamModal = ({ isOpen, onClose, onTeamCreated, data }: any) => {
  const [users, setUsers] = useState<any>([]); // For lead and member options
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [departmentOptions,setDepartmentOptions]=useState<any>([])
  


  const getAllDepartments=async()=>{
    try {
        const res=await axiosInstance.get("/admin/department")
        if(res.status===200){
            console.log(res.data)
            setDepartmentOptions(res.data.map((item:any)=>{return {label:item.name,value:item.id}}))
        }
    } catch (error) {
        console.log(error)
    }
  }

  // Fetch users for lead and members dropdowns
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/admin/client/team/internal-only'); // Adjust endpoint as needed
        if (response.status === 200) {
          setUsers(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  useEffect(()=>{
    getAllDepartments()
  },[])

  // Prepare options for react-select
  const leadOptions = users.map((user: any) => ({
    value: user.id,
    label: user.name,
  }));

  const memberOptions = users.map((user: any) => ({
    value: user.id,
    label: user.name,
  }));

  // Initial values based on whether data is provided (edit mode) or not (create mode)
  const initialValues = data
    ? {
        name: data.name || '',
        description: data.description || '',
        leadId: data.lead ? users.find((u: any) => u.name === data.lead)?.id || '' : '',
        memberIds: Array.from({ length: data.members || 0 }, (_, i) => i + 1), // Placeholder, adjust if member IDs are available
        department: data.department || '',
      }
    : {
        name: '',
        description: '',
        leadId: '',
        memberIds: [],
        department: '',
      };

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    setLoading(true);
    setError(null);

    try {
      const teamData = {
        name: values.name,
        description: values.description,
        leadId: values.leadId,
        memberIds: values.memberIds,
        department: values.department,
      };

      let response;
      if (data?.id) {
        // Update existing team
        console.log(teamData)
        response = await axiosInstance.put(`/admin/t`, teamData);
        // response = await axiosInstance.put(`/admin/team/${data.id}`, teamData);
      } else {
        // Create new team
        console.log(teamData)
        response = await axiosInstance.post('/admin/team', teamData);
      }

      if (response.status === 200 || response.status===201) {
        toast.success("Team Created Successfully")
        onTeamCreated();
        onClose();
        if (!data?.id) resetForm(); // Reset form only for create mode
      } else {
        setError(response.data.message || `Failed to ${data?.id ? 'update' : 'create'} team`);
      }
    } catch (err: any) {
      setError(`Error ${data?.id ? 'updating' : 'creating'} team: ` + (err.response?.data?.message || err.message));
      console.error(`Error ${data?.id ? 'updating' : 'creating'} team:`, err);
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
        <div className="w-screen max-w-md transform transition ease-in-out duration-300">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                {data?.id ? 'Edit Team' : 'Create Team'}
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
                validationSchema={teamSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ values, setFieldValue, errors }) => (
                  <Form>
                    {/* Team Name */}
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Team Name <span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        className={`w-full pl-3 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${
                          errors.name ? 'border-red-300' : 'border-gray-200'
                        }`}
                      />
                      <ErrorMessage name="name" component="div" className="text-red-600 text-xs mt-1" />
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

                    {/* Team Lead */}
                    <div className="mb-4">
                      <label htmlFor="leadId" className="block text-sm font-medium text-gray-700 mb-1">
                        Team Lead <span className="text-red-500">*</span>
                      </label>
                      <Select
                        id="leadId"
                        name="leadId"
                        options={leadOptions}
                        value={leadOptions.find((option: any) => option.value === values.leadId) || null}
                        onChange={(option: any) => setFieldValue('leadId', option?.value || '')}
                        placeholder="Select team lead..."
                        classNamePrefix="react-select"
                        className={`text-sm ${errors.leadId ? 'border-red-300' : ''}`}
                      />
                      <ErrorMessage name="leadId" component="div" className="text-red-600 text-xs mt-1" />
                    </div>

                    {/* Members */}
                    <div className="mb-4">
                      <label htmlFor="memberIds" className="block text-sm font-medium text-gray-700 mb-1">
                        Members <span className="text-red-500">*</span>
                      </label>
                      <Select
                        id="memberIds"
                        name="memberIds"
                        isMulti
                        options={memberOptions}
                        value={memberOptions.filter((option: any) => values.memberIds.includes(option.value))}
                        onChange={(options: any) =>
                          setFieldValue('memberIds', options ? options.map((opt: any) => opt.value) : [])
                        }
                        placeholder="Select team members..."
                        classNamePrefix="react-select"
                        className={`text-sm ${errors.memberIds ? 'border-red-300' : ''}`}
                      />
                      <ErrorMessage name="memberIds" component="div" className="text-red-600 text-xs mt-1" />
                    </div>

                    {/* Department */}
                    <div className="mb-4">
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                        Department <span className="text-red-500">*</span>
                      </label>
                      <Select
                        id="department"
                        name="department"
                        options={departmentOptions}
                        value={departmentOptions.find((option: any) => option.value === values.department) || null}
                        onChange={(option: any) => setFieldValue('department', option?.value || '')}
                        placeholder="Select department..."
                        classNamePrefix="react-select"
                        className={`text-sm ${errors.department ? 'border-red-300' : ''}`}
                      />
                      <ErrorMessage name="department" component="div" className="text-red-600 text-xs mt-1" />
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
                          data?.id ? 'Update Team' : 'Create Team'
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

export default CreateTeamModal;