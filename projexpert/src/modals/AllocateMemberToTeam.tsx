import { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '../axiosIntance';
import toast from 'react-hot-toast';

const validationSchema = Yup.object().shape({
  teamId: Yup.string()
    .required('Please select a team'),
  userId: Yup.string()
    .required('Please select a user'),
  position: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const AllocateMemberToTeam = ({ isOpen, onClose, refreshData }:any) => {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);

  const initialValues = {
    teamId: '',
    userId: '',
    position: ''
  };

  const handleSubmit = async (values:any, { resetForm }:any) => {
    try {
      const res = await axiosInstance.post("/admin/team/member", values);
      if (res.status === 201) {
        toast.success("Member Allocated Successfully");
        resetForm();
        refreshData?.();
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to allocate member");
    }
  };

  const getAllTeams = async () => {
    try {
      const res = await axiosInstance.get("/admin/team");
      if (res.status === 200) {
        setTeams(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await axiosInstance.get("admin/client/team/internal-only");
      if (res.status === 200) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      getAllTeams();
      getAllUsers();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={onClose}
      />

      <div className="relative bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Allocate Member to Team
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
                  htmlFor="teamId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Team
                </label>
                <Field
                  as="select"
                  id="teamId"
                  name="teamId"
                  className={`w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.teamId && touched.teamId 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a team</option>
                  {teams?.map((team:any) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </Field>
                {errors.teamId && touched.teamId && (
                  <div className="text-red-500 text-sm mt-1">{errors.teamId}</div>
                )}
              </div>

              <div>
                <label 
                  htmlFor="userId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Member
                </label>
                <Field
                  as="select"
                  id="userId"
                  name="userId"
                  className={`w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.userId && touched.userId 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a member</option>
                  {users?.map((user:any) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Field>
                {errors.userId && touched.userId && (
                  <div className="text-red-500 text-sm mt-1">{errors.userId}</div>
                )}
              </div>

              <div>
                <label 
                  htmlFor="position"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Position
                </label>
                <Field
                  type="text"
                  id="position"
                  name="position"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.position && touched.position 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  }`}
                />
                {errors.position && touched.position && (
                  <div className="text-red-500 text-sm mt-1">{errors.position}</div>
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
                  {isSubmitting ? 'Allocating...' : 'Allocate Member'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AllocateMemberToTeam;
