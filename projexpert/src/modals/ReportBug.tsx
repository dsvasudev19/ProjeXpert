import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '../axiosIntance';
import toast from 'react-hot-toast';

interface User {
    id: number;
    name: string;  // Assuming users have a name field
}

interface Project {
    id: number;
    name: string;  // Assuming projects have a name field
}

interface ReportBugModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: any;
    proId?: number
}

const ReportBugModal: React.FC<ReportBugModalProps > = ({ isOpen, onClose, onSubmit, proId }) => {
    const [users, setUsers] = React.useState<User[]>([]);
    const [projects, setProjects] = React.useState<Project[]>([]);


    const reportBug=async(values:any,{resetForm}:any)=>{
        try {
            const res=await axiosInstance.post("/admin/bug",values)
            if(res.status===201){
                toast.success("Bug Reported Successfully")
                onClose()
                onSubmit()
                resetForm();
            }
        } catch (error) {
            console.log(error)
        }
    }
    // Fetch users and projects data when modal opens
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axiosInstance.get("admin/client/team/internal-only");
                if (res.status === 200) {
                    setUsers(res.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchProjects = async () => {
            try {
                const res = await axiosInstance.get("/admin/project");
                if (res.status === 200) {
                    setProjects(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (isOpen) {
            fetchUsers();
            fetchProjects();
        }
    }, [isOpen]);

    const initialValues = {
        title: '',
        description: '',
        status: 'open',
        priority: 'medium',
        dueDate: '',
        resolution: '',
        projectId: proId?proId:"",
        assigneeId: '',
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        status: Yup.string().required('Status is required'),
        priority: Yup.string().required('Priority is required'),
        projectId: Yup.string().required('Project is required'),
        assigneeId: Yup.string().required('Assignee is required'),
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Report Bug</h2>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={reportBug}
                >
                    {() => (
                        <Form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <Field
                                        type="text"
                                        name="title"
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-10"
                                    />
                                    <ErrorMessage name="title" component="div" className="text-red-600 text-sm" />
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <Field as="select" name="status" className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-10">
                                        <option value="">Status</option>
                                        <option value="open">Open</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                        <option value="closed">Closed</option>
                                    </Field>
                                    <ErrorMessage name="status" component="div" className="text-red-600 text-sm" />
                                </div>

                                {/* Description */}
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <Field
                                        as="textarea"
                                        name="description"
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
                                </div>

                                {/* Priority */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                                    <Field as="select" name="priority" className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-10">
                                        <option value="">Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="critical">Critical</option>
                                    </Field>
                                    <ErrorMessage name="priority" component="div" className="text-red-600 text-sm" />
                                </div>

                                {/* Due Date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                                    <Field
                                        type="date"
                                        name="dueDate"
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-10"
                                    />
                                </div>

                                {/* Resolution */}
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Resolution</label>
                                    <Field
                                        as="textarea"
                                        name="resolution"
                                        rows={2}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>

                                {/* Project Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Project</label>
                                    <Field as="select" name="projectId" className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-10" disabled={proId!=undefined || proId!=null}>
                                        <option value="">Select Project</option>
                                        {projects?.map(project => (
                                            <option key={project?.id} value={project?.id}>{project?.name}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="projectId" component="div" className="text-red-600 text-sm" />
                                </div>

                                {/* Assignee */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Assignee</label>
                                    <Field as="select" name="assigneeId" className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-10">
                                        <option value="">Select Assignee</option>
                                        {users?.map(user => (
                                            <option key={user?.id} value={user?.id}>{user?.name}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="assigneeId" component="div" className="text-red-600 text-sm" />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-4 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ReportBugModal;
