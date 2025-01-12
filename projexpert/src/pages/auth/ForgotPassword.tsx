import { Mail, ArrowRight, Briefcase } from "lucide-react";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { axiosInstance } from "../../axiosIntance";

const ForgotPassword = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const res = await axiosInstance.post('/auth/forgot-password', values);
      if (res.status === 200) {
        toast.success("Password reset link has been sent to your email!");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-white">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-gradient-to-br from-blue-100 to-blue-50">
        <div className="max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-12 h-12 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              ProjeXpert
            </h1>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Reset Your Password
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Don't worry! We'll help you get back to managing your projects with a simple password reset process.
          </p>
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure Reset Process</h3>
                <p className="text-gray-600">Bank-grade security for your account</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
              Password Recovery
            </h1>
            <p className="text-gray-600">
              Enter your email and we'll send you instructions to reset your password
            </p>
          </div>

          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 text-gray-400 h-5 w-5 pointer-events-none" />
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className={`pl-10 w-full px-4 py-3 border ${
                        errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02]"
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>

                <p className="text-center text-sm text-gray-600">
                  Remember your password?{" "}
                  <a
                    href="/auth/login"
                    className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    Back to Sign in
                  </a>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
