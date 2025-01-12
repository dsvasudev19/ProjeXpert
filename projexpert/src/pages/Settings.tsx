import { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import {  Save } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    projectName: '',
    projectDescription: '',
    projectDeadline: '',
    projectBudget: '',
  };

  const validationSchema = Yup.object({
    projectName: Yup.string().required('Project name is required'),
    projectDescription: Yup.string().required('Project description is required'),
    projectDeadline: Yup.date().required('Project deadline is required').nullable(),
    projectBudget: Yup.number().positive('Budget must be a positive number').required('Budget is required'),
  });

  const handleSubmit = async (values: any) => {
    console.log(values)
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Project settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update project settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
            Project Settings
          </h1>
          <p className="text-gray-600">Manage your project settings</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <Field
                  id="projectName"
                  name="projectName"
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Description
                </label>
                <Field
                  id="projectDescription"
                  name="projectDescription"
                  as="textarea"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter project description"
                />
              </div>

              <div>
                <label htmlFor="projectDeadline" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Deadline
                </label>
                <Field
                  id="projectDeadline"
                  name="projectDeadline"
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="projectBudget" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Budget
                </label>
                <Field
                  id="projectBudget"
                  name="projectBudget"
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter project budget"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200"
                disabled={isSubmitting || loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
                <Save className="ml-2 h-4 w-4" />
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Settings;
