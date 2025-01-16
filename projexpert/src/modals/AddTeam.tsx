import { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '../axiosIntance';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Required'),
  leadId: Yup.string()
    .required('Please select a team lead'),
  department: Yup.string()
    .required('Required'),
});

const AddTeam = ({ isOpen, onClose, getTeams }:any) => {
    const [users,setUsers]=useState([])
  const initialValues = {
    name: '',
    description: '',
    leadId: '',
    department: ''
  };

  const handleSubmit=async(values:any,{resetForm}:any)=>{
    try {
        console.log(values)
        resetForm();
        getTeams()
    } catch (error) {
        console.log(error)
    }
  }

  const getAllUsers=async()=>{
    try {
        const res=await axiosInstance.get("admin/client/team-only")
        if(res.status===200){
            setUsers(res.data)
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{
    getAllUsers()
  },[])

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Add New Team
        </h2>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label 
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Team Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name && touched.name 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  }`}
                />
                {errors.name && touched.name && (
                  <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                )}
              </div>

              <div>
                <label 
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className={`w-full px-3 py-2 border rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description && touched.description 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  }`}
                />
                {errors.description && touched.description && (
                  <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                )}
              </div>

              <div>
                <label 
                  htmlFor="leadId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Lead
                </label>
                <Field
                  as="select"
                  id="leadId"
                  name="leadId"
                  className={`w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.leadId && touched.leadId 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a team lead</option>
                  {users?.map((user:any) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Field>
                {errors.leadId && touched.leadId && (
                  <div className="text-red-500 text-sm mt-1">{errors.leadId}</div>
                )}
              </div>

              <div>
                <label 
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Department
                </label>
                <Field
                  type="text"
                  id="department"
                  name="department"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.department && touched.department 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  }`}
                />
                {errors.department && touched.department && (
                  <div className="text-red-500 text-sm mt-1">{errors.department}</div>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-green-600 text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Adding...' : 'Add Team'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTeam;