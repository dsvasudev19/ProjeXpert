import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '../axiosIntance';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';



const AddProject = ({ isModalOpen, closeModal, getProjects }: any) => {
    const [clients,setClients]=useState<any>()


    const projectInitialValues = {
        name: '',
        status: 'active',
        description: '',
        startDate: '',
        endDate: '',
        budget: '',
        priority: 'low',
        clientId: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Title is Required'),
        status: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        startDate: Yup.date().required('Required'),
        endDate: Yup.date().required('Required'),
        budget: Yup.number().required('Budget is Required').positive(),
        priority: Yup.string().required('Priority is Required'),
        clientId: Yup.string().required('Required'),
    });

    const getAllClients=async()=>{
        try {
          const res=await axiosInstance.get("/admin/client/users/clients")
          if(res.status===200){
            setClients(res.data.data)
          }
        } catch (error) {
          
        }
      }

    const handleProjectSubmit = async (values: any) => {
        console.log(values)
        try {
            const res = await axiosInstance.post("/admin/project", values)
            if (res.status === 201) {
                toast.success("Successfully Added the Project")
                getProjects()
                closeModal();
            }
            console.log(values)

            // closeModal();
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    useEffect(()=>{
        getAllClients()
    },[])

    return (
        <div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-[800px] h-[550px] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
                        <Formik
                            initialValues={projectInitialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleProjectSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                                            <Field
                                                type="text"
                                                name="name"
                                                className="block w-full rounded-md border border-gray-300 px-4 py-2.5"
                                                required
                                            />
                                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                            <Field as="select" name="status" className="block w-full rounded-md border border-gray-300 px-4 py-2.5" required>
                                                <option value="">Select Status</option>
                                                <option value="active">Active</option>
                                                <option value="on-hold">On Hold</option>
                                                <option value="completed">Completed</option>
                                            </Field>
                                            <ErrorMessage name="status" component="div" className="text-red-500 text-sm" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <Field
                                            as="textarea"
                                            name="description"
                                            rows={3}
                                            className="block w-full rounded-md border border-gray-300 px-4 py-2.5"
                                            required
                                        />
                                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                            <Field
                                                type="date"
                                                name="startDate"
                                                className="block w-full rounded-md border border-gray-300 px-4 py-2.5"
                                                required
                                            />
                                            <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                            <Field
                                                type="date"
                                                name="endDate"
                                                className="block w-full rounded-md border border-gray-300 px-4 py-2.5"
                                                required
                                            />
                                            <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                                            <Field
                                                type="number"
                                                name="budget"
                                                className="block w-full rounded-md border border-gray-300 px-4 py-2.5"
                                                required
                                            />
                                            <ErrorMessage name="budget" component="div" className="text-red-500 text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                            <Field as="select" name="priority" className="block w-full rounded-md border border-gray-300 px-4 py-2.5" required>
                                                <option value="">Select Priority</option>
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                            </Field>
                                            <ErrorMessage name="priority" component="div" className="text-red-500 text-sm" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                                            <Field as="select" name="clientId" className="block w-full rounded-md border border-gray-300 px-4 py-2.5" required>
                                                <option value={""}>Select Client</option>
                                                {clients?.map((client:any) => (
                                                    <option key={client.id} value={client.id}>{client.name}</option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="clientId" component="div" className="text-red-500 text-sm" />
                                        </div>
                                        
                                    </div>

                                    <div className="flex justify-end gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => closeModal()}
                                            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                        >
                                            {isSubmitting ? 'Adding...' : 'Add Project'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddProject;