import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { axiosInstance } from '../../axiosIntance'; // Make sure to adjust the import path
import { Mail, Lock, ArrowRight, Building2 } from 'lucide-react';

const SignInPage = () => {
  const initialValues = { username: '', password: '' };

  const validationSchema = Yup.object({
    username: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
    // .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const res = await axiosInstance.post('/auth/login', values);
      if (res.status === 200) {
        localStorage.setItem("accessToken", res.data.accessToken)
        localStorage.setItem("refreshToken", res.data.refreshToken)
        console.log('Login successful:', res.data);
      }
    } catch (error: any) {
      console.error('Login failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-50 items-center justify-center p-12">
        <div className="max-w-lg">
          <Building2 className="w-16 h-16 text-indigo-600 mb-8" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">ProjeXpert</h2>
          <p className="text-lg text-gray-600">
            Optimize your turf management with our cutting-edge technology.
            Join the thousands of groundskeepers and superintendents who rely on ProjeXpert.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <p className="text-gray-600">Advanced Analytics Dashboard</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <p className="text-gray-600">Secure Cloud Integration</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <p className="text-gray-600">24/7 Premium Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Sign in to your account
            </h1>
            <p className="text-gray-600">
              Welcome back! Please enter your details.
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Field
                      id="username"
                      name="username"
                      type="email"
                      className={`pl-10 w-full px-4 py-2 border ${errors.username && touched.username ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="Enter your email"
                    />
                    {errors.username && touched.username ? (
                      <div className="text-red-500 text-sm">{errors.username}</div>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className={`pl-10 w-full px-4 py-2 border ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      placeholder="Enter your password"
                    />
                    {errors.password && touched.password ? (
                      <div className="text-red-500 text-sm">{errors.password}</div>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      id="remember-me"
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isSubmitting}
                >
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>

                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign up
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

