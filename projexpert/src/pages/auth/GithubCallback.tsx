import { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { axiosInstance } from '../../axiosIntance';
import { useAuth } from '../../contexts/AuthContext';

const GithubCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refreshToken');
    const error = searchParams.get('error');

    const validateAndSetUser = async (authToken: string) => {
      try {
        // Assuming your API endpoint for getting user data
        const response = await axiosInstance.get(`/auth/user/token`);
        
        if (response.data?.user) {
          setUser(response.data.user);
          navigate('/dashboard/analytics');
        } else {
          throw new Error('User data not found');
        }
      } catch (error) {
        console.error('Error validating user:', error);
        toast.error('Failed to validate user');
        navigate('/auth/login');
      }
    };

    if (error) {
      toast.error(error);
      navigate('/auth/login');
      return;
    }

    if (token && refreshToken) {
      // Set tokens in localStorage
      localStorage.setItem('__auth', token);
      localStorage.setItem('refreshToken', refreshToken);

      // Set tokens in cookies (if needed)
      document.cookie = `__auth=${token}; path=/; secure; samesite=strict`;
      document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=strict`;

      toast.success('Successfully logged in with GitHub!');
      
      // Validate token and get user data
      validateAndSetUser(token);
    } else {
      toast.error('Authentication failed');
      navigate('/auth/login');
    }
  }, [searchParams, navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Processing GitHub Login...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  );
};

export default GithubCallback; 