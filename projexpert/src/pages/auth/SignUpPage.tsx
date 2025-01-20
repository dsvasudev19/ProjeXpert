import { Mail, Lock, User, ArrowRight, Briefcase, Shield, Sparkles, Github } from "lucide-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { axiosInstance } from "../../axiosIntance";

const SignUpPage = () => {
  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
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
    const registerToast=toast.loading("Creating account...")
    try {
      const res = await axiosInstance.post(`/auth/register`, values);
      if (res.status === 201) {
        setTimeout(()=>{
          toast.success("Welcome to ProjeXpert! Your account has been created successfully.",{
            id:registerToast
          });
          
        },1000)
        setTimeout(()=>{
          window.location.href = "/auth/login";
        },2000)
      }
    } catch (error: any) {
      console.log(error)
      toast.error(error.response?.data?.message || "An error occurred during signup",{
        id:registerToast
      });
    }
  };

  const handleGithubSignup = () => {
    window.location.href = `${import.meta.env.VITE_APP_API_URL}/api/v1/auth/github`;
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
            Transform Your Project Management Experience
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Join thousands of successful teams who use ProjeXpert to streamline their projects,
            enhance collaboration, and deliver outstanding results.
          </p>
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-white rounded shadow-sm">
              <div className="p-2 bg-blue-100 rounded">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI-Powered Insights</h3>
                <p className="text-gray-600">Smart analytics and predictive project planning</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-white rounded shadow-sm">
              <div className="p-2 bg-blue-100 rounded">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Enterprise Security</h3>
                <p className="text-gray-600">Bank-grade encryption and compliance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded shadow-lg p-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
              Start Your Journey
            </h1>
            <p className="text-gray-600">Create your account to experience better project management</p>
          </div>

          <button
            onClick={handleGithubSignup}
            type="button"
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 font-medium mb-6"
          >
            <Github className="mr-2 h-5 w-5" />
            Continue with GitHub
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3 text-gray-400 h-5 w-5 pointer-events-none" />
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Work Email
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 text-gray-400 h-5 w-5 pointer-events-none" />
                    <Field
                      id="email"
                      name="email"
                      type="email"
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
                    Password
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
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                  Already have an account?{" "}
                  <a
                    href="/auth/login"
                    className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    Sign in to ProjeXpert
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

export default SignUpPage;
