import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X } from 'lucide-react';
import { axiosInstance } from '../axiosIntance';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ProjectAllocation = ({ isOpen, onClose }: any) => {
  const [teamMembers, setTeamMembers] = useState<any>([])
  // Sample data - replace with your actual data
  const [projects, setProjects] = useState<any>([])


  const validationSchema = Yup.object({
    projectId: Yup.string().required('Project selection is required'),
    teamMemberId: Yup.string().required('Team member selection is required')
  });

  if (!isOpen) return null;

  const getAllUsers = async () => {
    try {
      const res = await axiosInstance.get("admin/client/team/internal-only");
      if (res.status === 200) {
        setTeamMembers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProjects = async () => {
    try {
      const res = await axiosInstance.get("/admin/project")
      if (res.status === 200) {
        setProjects(res.data)
      }
      // setProjects(dummyProjects)
    } catch (error) {
      console.log(error)
    }
  }

  const allocateProject = async (values: any) => {
    try {
      const res = await axiosInstance.post(`/admin/project-assignment/${values.projectId}`, values)
      if (res.status === 200) {
        toast.success("Project allocated successfully")
        onClose()
      }
    } catch (error:any) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    getAllProjects(),
      getAllUsers()
  }, [])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md transform transition-all">
        <div className="border-b border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="px-6 py-4 flex items-center justify-between">
            <h3 className="text-xl font-serif text-green-800">Project Allocation</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <Formik
          initialValues={{ projectId: '', teamMemberId: '' }}
          validationSchema={validationSchema}
          onSubmit={allocateProject}
        >
          {({ isSubmitting }) => (
            <Form className="p-6 space-y-6 bg-green-50/30">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-green-700">
                  Select Project
                </label>
                <Field
                  as="select"
                  name="projectId"
                  className="w-full px-3 py-2 border border-green-200 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-300 bg-white/70 backdrop-blur-sm transition-all"
                >
                  <option value="">Choose a project</option>
                  {projects?.map((project: any) => (
                    <option key={project?.id} value={project?.id}>
                      {project?.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="projectId"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-green-700">
                  Select Team Member
                </label>
                <Field
                  as="select"
                  name="teamMemberId"
                  className="w-full px-3 py-2 border border-green-200 rounded-md shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-300 bg-white/70 backdrop-blur-sm transition-all"
                >
                  <option value="">Choose a team member</option>
                  {teamMembers?.map((member: any) => (
                    <option key={member?.id} value={member?.id}>
                      {member?.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="teamMemberId"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-green-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 bg-white border border-green-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-md shadow-sm hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                >
                  Allocate
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProjectAllocation;