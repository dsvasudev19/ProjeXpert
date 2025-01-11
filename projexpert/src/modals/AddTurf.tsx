import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { axiosInstance } from "../axiosIntance";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const formValidation = Yup.object().shape({
  vendorId: Yup.string().required("Vendor is required"),
  name: Yup.string().required("Turf name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .positive("Price must be a positive number")
    .required("Price is required"),
  startTime: Yup.string().required("Start time is required"),
  stopTime: Yup.string().required("Stop time is required"),
  location: Yup.object().shape({
    latitude: Yup.number().required("Latitude is required"),
    longitude: Yup.number().required("Longitude is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    pincode: Yup.string().required("Pincode is required"),
  }),
  amenities: Yup.string().required("Amenities are required"),
});

const AddTurf = ({ openModal, close, getTurfs }:any) => {
  const [showModal, setShowModal] = useState(openModal);

  const initialTurfValues = {
    vendorId: "",
    name: "",
    description: "",
    price: "",
    startTime: "",
    stopTime: "",
    amenities: "",
    location: {
      latitude: "",
      longitude: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
  };

  const handleSubmit = async (values:any, { resetForm }:any) => {
    try {
      const res = await axiosInstance.post("/turf", values);
      if (res.status === 200) {
        toast.success("Turf Added Successfully");
        getTurfs();
      }
    } catch (error) {
      console.log(error);
    } finally {
      close(false);
      resetForm();
    }
  };

  return (
    <>
      {showModal ? (
        <div className="flex justify-center">
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full">
            <div className="relative my-6 mx-auto w-[80%]">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent p-2">
                    Add Turf
                  </h3>
                  <button
                    className="p-1 ml-auto border-2 border-black text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowModal(false);
                      close(false);
                    }}
                  >
                    <X className="text-gray-900"/>
                    
                  </button>
                </div>

                <div className="relative p-6 flex-auto h-[70vh] overflow-y-auto">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Turf Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Provide the necessary turf details.
                    </p>

                    <Formik
                      initialValues={initialTurfValues}
                      onSubmit={handleSubmit}
                      validationSchema={formValidation}
                    >
                      {() => (
                        <Form>
                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Vendor
                              </label>
                              <div className="mt-2">
                                <Field
                                  as="select"
                                  name="vendorId"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                >
                                  <option value="">Select Vendor</option>
                                  {/* Replace with dynamic list of vendors */}
                                  <option value="1">Vendor 1</option>
                                  <option value="2">Vendor 2</option>
                                </Field>
                                <ErrorMessage
                                  component={"div"}
                                  name="vendorId"
                                  className="text-red-500"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Turf Name
                              </label>
                              <div className="mt-2">
                                <Field
                                  type="text"
                                  name="name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                />
                                <ErrorMessage
                                  component={"div"}
                                  name="name"
                                  className="text-red-500"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-6">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                              </label>
                              <div className="mt-2">
                                <Field
                                  as="textarea"
                                  name="description"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                />
                                <ErrorMessage
                                  component={"div"}
                                  name="description"
                                  className="text-red-500"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-6">
                              <div className="grid grid-cols-3 gap-6">
                                <div className="sm:col-span-1">
                                  <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Price
                                  </label>
                                  <div className="mt-2">
                                    <Field
                                      type="number"
                                      name="price"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    />
                                    <ErrorMessage
                                      component={"div"}
                                      name="price"
                                      className="text-red-500"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-1">
                                  <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Start Time
                                  </label>
                                  <div className="mt-2">
                                    <Field
                                      type="time"
                                      name="startTime"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    />
                                    <ErrorMessage
                                      component={"div"}
                                      name="startTime"
                                      className="text-red-500"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-1">
                                  <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Stop Time
                                  </label>
                                  <div className="mt-2">
                                    <Field
                                      type="time"
                                      name="stopTime"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    />
                                    <ErrorMessage
                                      component={"div"}
                                      name="stopTime"
                                      className="text-red-500"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="sm:col-span-6">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Amenities (Comma separated)
                              </label>
                              <div className="mt-2">
                                <Field
                                  type="text"
                                  name="amenities"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                />
                                <ErrorMessage
                                  component={"div"}
                                  name="amenities"
                                  className="text-red-500"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-6">
                              <h3 className="text-base font-medium leading-6 text-gray-900">
                                Location Information
                              </h3>
                              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                  <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Latitude
                                  </label>
                                  <div className="mt-2">
                                    <Field
                                      type="number"
                                      name="location.latitude"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    />
                                    <ErrorMessage
                                      component={"div"}
                                      name="location.latitude"
                                      className="text-red-500"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Longitude
                                  </label>
                                  <div className="mt-2">
                                    <Field
                                      type="number"
                                      name="location.longitude"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    />
                                    <ErrorMessage
                                      component={"div"}
                                      name="location.longitude"
                                      className="text-red-500"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-6">
                                  <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Address
                                  </label>
                                  <div className="mt-2">
                                    <Field
                                      type="text"
                                      name="location.address"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    />
                                    <ErrorMessage
                                      component={"div"}
                                      name="location.address"
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
                                      type="text"
                                      name="location.city"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    />
                                    <ErrorMessage
                                      component={"div"}
                                      name="location.city"
                                      className="text-red-500"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label className="block text-sm font-medium leading-6 text-gray-900">
                                    State
                                  </label>
                                  <div className="mt-2">
                                    <Field
                                      type="text"
                                      name="location.state"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    />
                                    <ErrorMessage
                                      component={"div"}
                                      name="location.state"
                                      className="text-red-500"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Country
                                  </label>
                                  <div className="mt-2">
                                    <Field
                                      type="text"
                                      name="location.country"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    />
                                    <ErrorMessage
                                      component={"div"}
                                      name="location.country"
                                      className="text-red-500"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Pincode
                                  </label>
                                  <div className="mt-2">
                                    <Field
                                      type="text"
                                      name="location.pincode"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    />
                                    <ErrorMessage
                                      component={"div"}
                                      name="location.pincode"
                                      className="text-red-500"
                                    />
                                  </div>
                                </div>
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

export default AddTurf;
