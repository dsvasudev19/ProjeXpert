import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from 'yup' ;
import { axiosInstance } from "./../axiosIntance";
import toast from "react-hot-toast";

const formValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
  phone: Yup.string().min(8,"Password must be atleast 8 Characters").required("Phone is required"),
  city:Yup.string().required("City is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm password is required"),
});
const AddVendor = ({ openModal, close,getVendors }: any) => {
  const [showModal, setShowModal] = useState(openModal);
 
  const initialVendorValues = {
    name: "",
    email: "",
    phone: "",
    city:"",
    password: "",
  };
  const handleSubmit=async(values:any,{resetForm}:any)=>{
    try {
        const res=await axiosInstance.post("/vendor",values)
        if(res.status===200){
            toast.success("Vendor Added Successfully");
            getVendors()
        }
    } catch (error) {
        console.log(error)
    }finally{
        close(false)
        resetForm();
    }
  }
  return (
    <>
      {showModal ? (
        <div className="flex justify-center">
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full">
            <div className="relative my-6 mx-auto w-[80%]">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent p-2">Add Vendor</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowModal(false);
                      close(false);
                    }}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                
                <div className="relative p-6 flex-auto">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Provide Original Phone and Email. KYC is done through
                      Phone and Email.
                    </p>

                    <Formik
                      initialValues={initialVendorValues}
                      onSubmit={handleSubmit}
                      validationSchema={formValidation}
                    >
                      {() => (
                        <Form>
                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                              </label>
                              <div className="mt-2">
                                <Field
                                  type="text"
                                  name="name"
                                  id="name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                />
                                <ErrorMessage
                                  component={"div"}
                                  name="name"
                                  className="text-red-500"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                              </label>
                              <div className="mt-2">
                                <Field
                                  type="email"
                                  name="email"
                                  id="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                />
                                <ErrorMessage
                                  component={"div"}
                                  name="email"
                                  className="text-red-500"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Phone
                              </label>
                              <div className="mt-2">
                                <Field
                                  id="text"
                                  name="phone"
                                  type="phone"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                />
                                <ErrorMessage
                                  component={"div"}
                                  name="phone"
                                  className="text-red-500"
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                City
                              </label>
                              <div className="mt-2">
                                <Field
                                  id="city"
                                  name="city"
                                  type="text"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                />
                                <ErrorMessage
                                  component={"div"}
                                  name="city"
                                  className="text-red-500"
                                />
                              </div>
                            </div>

                            <div className="col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                              </label>
                              <div className="mt-2">
                                <Field
                                  type="password"
                                  name="password"
                                  id="password"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                />
                                <ErrorMessage
                                  component={"div"}
                                  name="password"
                                  className="text-red-500"
                                />
                              </div>
                            </div>
                            <div className="col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm Password
                              </label>
                              <div className="mt-2">
                                <Field
                                  type="password"
                                  name="confirmPassword"
                                  id="confirmPassword"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                />
                                <ErrorMessage
                                  component={"div"}
                                  name="confirmPassword"
                                  className="text-red-500"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-3 items-center justify-end p-6 border-solid border-blueGray-200 rounded-b">
                            <button
                              className="text-xl font-bold bg-red-300 text-red-500 rounded p-2 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => {
                                setShowModal(false);
                                close(false);
                              }}
                            >
                              Close
                            </button>
                            <button
                              className="text-xl font-bold border-2 rounded bg-gradient-to-r from-green-500 to-blue-500 p-2 ease-linear transition-all duration-150 text-white"
                              type="submit"
                            >
                              Save Changes
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
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </>
  );
};

export default AddVendor;
