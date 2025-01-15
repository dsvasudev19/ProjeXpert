
import { Formik, Form, Field } from "formik";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../axiosIntance";
import toast from "react-hot-toast";

const AddClient = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [roles,setRoles]=useState<any>([])
    const initialValues = { name: "", email: "", roleId: "" };

    const handleSubmit = async (values: typeof initialValues) => {
       try {
           const res=await axiosInstance.post("/admin/client",values)
           if(res.status===201){
            toast.success("Client Onboarded Successfully")
            onClose();
           }
           
       } catch (error) {
        console.log(error)
       }
    };
    
    const getAllRoles = async () => {
        try {
            const res = await axiosInstance.get("/admin/role")
            if (res.status === 200) {
                setRoles(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(()=>{
        getAllRoles()
    },[])

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] border-t-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-emerald-800">Add New Member</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form className="space-y-4">
                        <div>
                            <label className="text-sm text-emerald-600 mb-1 block">Full Name</label>
                            <Field
                                name="name"
                                type="text"
                                className="w-full p-2 border border-gray-200 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-emerald-600 mb-1 block">Email Address</label>
                            <Field
                                name="email"
                                type="email"
                                className="w-full p-2 border border-gray-200 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-emerald-600 mb-1 block">Role</label>
                            <Field
                                name="roleId"
                                as="select"
                                className="w-full p-2 border border-gray-200 rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                            >
                                <option value="">Select Role</option>
                                {roles.map((role: any) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name.toUpperCase()}
                                    </option>
                                ))}
                            </Field>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-2 rounded-md hover:from-emerald-600 hover:to-blue-600 transition-colors"
                        >
                            Add Member
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};


export default AddClient;