import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '../../axiosIntance';
import { Mail, Lock, ArrowRight, Briefcase, Github } from 'lucide-react';
import toast from 'react-hot-toast';

const SignInPage = () => {
  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const res = await axiosInstance.post('/auth/login', values);
      if (res.status === 200) {
        localStorage.setItem("__auth", res.data.token)
        localStorage.setItem("refreshToken", res.data.refreshToken)
        toast.success("Welcome back to ProjeXpert!");
        window.location.href = "/dashboard/analytics";
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGithubLogin = () => {
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
            Welcome Back to Your Project Command Center
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Access your projects, collaborate with your team, and drive success with our powerful project management platform.
          </p>
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-white rounded shadow-sm">
              <div className="p-2 bg-blue-100 rounded">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Real-time Analytics</h3>
                <p className="text-sm text-gray-500">Track project progress instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded shadow-xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500">
              Enter your credentials to access your workspace
            </p>
          </div>

          <button
            onClick={handleGithubLogin}
            type="button"
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 font-medium mb-6"
          >
            <Github className="mr-2 h-5 w-5" />
            Sign in with GitHub
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="mt-8 space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative flex items-center">
                    <div className="absolute left-3 text-gray-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className={`appearance-none block w-full pl-10 px-3 py-3 border ${
                        errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                      } rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative flex items-center">
                    <div className="absolute left-3 text-gray-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className={`appearance-none block w-full pl-10 px-3 py-3 border ${
                        errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                      } rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Enter your password"
                    />
                  </div>
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      id="remember-me"
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <button 
                    type="button" 
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    onClick={() => window.location.href = '/auth/forgot-password'}
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>

                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
                    Create an account
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

export default SignInPage;
