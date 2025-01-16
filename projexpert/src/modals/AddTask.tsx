import { useEffect, useState } from "react";
import { axiosInstance } from "../axiosIntance";
import toast from "react-hot-toast";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

// Yup validation schema
const taskValidationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string().required("Status is required"),
    priority: Yup.string().required("Priority is required"),
    dueDate: Yup.date().required("Due date is required"),
    assigneeId: Yup.string().required("Assignee is required"),
    projectId: Yup.string().required("Project is required"),
    parentTaskId: Yup.string().optional(), // Optional field
    progress: Yup.number().min(0, "Progress must be at least 0").max(100, "Progress cannot exceed 100").required("Progress is required")
});

const AddTask = ({ showAddModal, closeModal, getTasks, proId }: { showAddModal: boolean; closeModal: (value: boolean) => void; getTasks: any; proId?: string }) => {
    const [assignees, setAssignees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [parentTasks, setParentTasks] = useState([]);

    // Function to handle adding the task
    const handleAddTask = async (values: any, { setSubmitting }: any) => {
        try {
            const res = await axiosInstance.post("/admin/task", values);
            if (res.status === 201) {
                toast.success("Task added successfully");
                closeModal(false);
                getTasks();
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add task");
        }
        setSubmitting(false);
    };

    // Fetch assignees, projects, and parent tasks
    const getAssignees = async () => {
        try {
            const res = await axiosInstance.get("/admin/client");
            if (res.status === 200) {
                setAssignees(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getProjects = async () => {
        try {
            const res = await axiosInstance.get("/admin/project");
            if (res.status === 200) {
                setProjects(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getParentTasks = async () => {
        try {
            const res = await axiosInstance.get("/admin/task");
            if (res.status === 200) {
                setParentTasks(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAssignees();
        getParentTasks();
        getProjects();
    }, []);

    return (
        <>
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[600px] max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
                        <Formik
                            initialValues={{
                                title: '',
                                description: '',
                                status: 'Pending',
                                priority: 'medium',
                                dueDate: '',
                                assigneeId: '',
                                projectId: proId?proId:'',
                                parentTaskId: '',
                                progress: 0
                            }}
                            validationSchema={taskValidationSchema}
                            onSubmit={handleAddTask}
                        >
                            {({ isSubmitting }) => (
                                <Form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                        <Field
                                            type="text"
                                            name="title"
                                            className="w-full p-2 border rounded-lg"
                                        />
                                        <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <Field
                                            as="textarea"
                                            name="description"
                                            className="w-full p-2 border rounded-lg"
                                            rows={3}
                                        />
                                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                                            <Field as="select" name="projectId" className="w-full p-2 border rounded-lg" disabled={proId!=null || proId!=undefined}>
                                                <option value="">Select Project</option>
                                                {projects.map((project: any) => (
                                                    <option key={project.id} value={project.id}>{project.name}</option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="projectId" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                                            <Field as="select" name="assigneeId" className="w-full p-2 border rounded-lg">
                                                <option value="">Select Assignee</option>
                                                {assignees.map((assignee: any) => (
                                                    <option key={assignee.id} value={assignee.id}>{assignee.name}</option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="assigneeId" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Parent Task</label>
                                            <Field as="select" name="parentTaskId" className="w-full p-2 border rounded-lg">
                                                <option value="0">Select Parent Task</option>
                                                {parentTasks.map((task: any) => (
                                                    <option key={task.id} value={task.id}>{task.title}</option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="parentTaskId" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                            <Field
                                                type="date"
                                                name="dueDate"
                                                className="w-full p-2 border rounded-lg"
                                            />
                                            <ErrorMessage name="dueDate" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                            <Field as="select" name="priority" className="w-full p-2 border rounded-lg">
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                            </Field>
                                            <ErrorMessage name="priority" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                            <Field as="select" name="status" className="w-full p-2 border rounded-lg">
                                                <option value="Pending">Pending</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                            </Field>
                                            <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Progress</label>
                                            <Field
                                                type="number"
                                                name="progress"
                                                min="0"
                                                max="100"
                                                className="w-full p-2 border rounded-lg"
                                            />
                                            <ErrorMessage name="progress" component="div" className="text-red-500 text-sm mt-1" />
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2 mt-6">
                                        <button
                                            type="button"
                                            onClick={() => closeModal(false)}
                                            className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-300 text-white rounded-lg hover:bg-blue-400"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Adding..." : "Add Task"}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddTask;
