import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Input from './Input.js';
import Button from './Button.js';

const AuthForm = () => {
  const [variant, setVariant] = useState('LOGIN');
  const [loading, setLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) => (prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', data);

      if (response.status === 200) {
        // Authentication successful
        const { token } = response.data.authorisation; // Extract the JWT token from the response

        toast.success('Login successful');
        setTimeout(() => {
          setLoading(false);

          // Save the JWT token to local storage
          localStorage.setItem('token', token);

          // Redirect or perform any necessary actions
        }, 3000);
      } else {
        // Authentication failed
        toast.error('Invalid credentials');
        setLoading(false);
      }
    } catch (error) {
      // Error occurred during login
      console.error('Login error:', error);
      toast.error('An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            errors={errors}
            id="email"
            label="Email"
            type="email"
            register={register}
            disabled={loading}
          />
          <Input
            errors={errors}
            id="password"
            label="Password"
            register={register}
            type="password"
            disabled={loading}
          />
          <div>
            <Button disabled={loading} fullWidth type="submit">
              {variant === 'LOGIN' ? 'Sign In' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500 ">
          <div>{variant === 'LOGIN' ? 'New to ZICTA USSD Hub?' : 'Already have an account?'}</div>
          <div
            onClick={toggleVariant}
            className="underlin cursor-pointer text-sky-500 hover:text-sky-600"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Sign in'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
