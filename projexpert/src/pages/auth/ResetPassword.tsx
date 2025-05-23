import { Mail, Lock, ArrowRight, Briefcase } from "lucide-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../../axiosIntance";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useConfig } from "../../contexts/ConfigurationsContext";
const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { config } = useConfig();
  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[!@#$%^&*]/, "Password must contain at least one special character")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const res = await axiosInstance.post("/auth/reset-password?token=" + token, values);
      if (res.status === 200) {
        toast.success("Password reset successful! Please login with your new password.");
        window.location.href = "/auth/login";
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
  };

  const getUserByToken = async (token: string) => {
    try {
      const res = await axiosInstance.get("/auth/reset-password?token=" + token);
      if (res.status === 200) {
        setInitialValues({
          email: res.data.user.email,
          password: "",
          confirmPassword: "",
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (!token) {
      window.location.href = "/auth/forgot-password";
    }
    if (token) {
      setToken(token);
      getUserByToken(token);
    }

  }, []);



  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-white">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-gradient-to-br from-blue-100 to-blue-50">
        <div className="max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-12 h-12 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {config.appName}
            </h1>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Reset Your Password
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Don't worry! We'll help you get back to managing your projects with a simple password reset process.
          </p>
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-white rounded shadow-sm">
              <div className="p-2 bg-blue-100 rounded">
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
        <div className="max-w-md w-full bg-white rounded shadow-lg p-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
              Reset Your Password
            </h1>
            <p className="text-gray-600">Enter your email and new password below</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 text-gray-400 h-5 w-5 pointer-events-none" />
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      disabled={true}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="you@company.com"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3 text-gray-400 h-5 w-5 pointer-events-none" />
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="••••••••"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3 text-gray-400 h-5 w-5 pointer-events-none" />
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="••••••••"
                    />
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium"
                >
                  {isSubmitting ? "Resetting Password..." : "Reset Password"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                  Remember your password?{" "}
                  <a
                    href="/auth/login"
                    className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    Sign in to {config.appName}
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

export default ResetPassword;
