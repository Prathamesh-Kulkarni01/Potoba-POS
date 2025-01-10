'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import GithubSignInButton from './github-auth-button';
import { useRouter } from 'next/navigation'; // for navigation
import { useUser } from '@/hooks/useUser'; // Import useUser hook
import { registerOwner } from '@/lib/api/auth';
import { Autocomplete } from '@/components/ui/autocomplete';

const loginRoles = [
  { value: 'staff', label: 'Staff' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'owner', label: 'Owner' }
]; // Define login roles

const registerRoles = [
  { value: 'owner', label: 'Owner' }
]; // Define register roles

const loginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  role: z.string().nonempty({ message: 'Role is required' }) // Added role field
});

const registerSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  name: z.string().min(2, { message: 'Name is required' }),
  role: z.string().nonempty({ message: 'Role is required' }) // Added role field
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, startTransition] = useTransition();
  const [isRegistering, setIsRegistering] = useState(false); // State to toggle form view
  const router = useRouter();
  const { status } = useSession();
  const { updateToken } = useUser(); // Use useUser hook
  
  const defaultLoginValues = { email: 'demo@gmail.com', role: '' };
  const defaultRegisterValues = {
    email: 'test@example.com', // Dummy data for testing
    password: 'password123', // Dummy data for testing
    confirmPassword: 'password123', // Dummy data for testing
    name: 'Test User', // Dummy data for testing
    role: 'owner' // Dummy data for testing
  };

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultLoginValues
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultRegisterValues
  });

  const handleLoginSubmit = async (data: LoginFormValues) => {
    startTransition(async () => {
      const res = await signIn('credentials', {
        redirect: false,
        ...data,
        callbackUrl: callbackUrl ?? '/dashboard'
      });
     
      if (res?.error) {
        toast.error('Invalid credentials or error');
      } else {
        toast.success('Signed In Successfully!');
        if (res && res.ok && res.token) {
          updateToken(res.token); // Update token context
        }
        router.push('/dashboard');
      }
    });
  };

  if (status === "authenticated") {
    router.push('/dashboard');
    return null;
  }

  const handleRegisterSubmit = async (data: RegisterFormValues) => {
   
    try {
      const response = await registerOwner(data); // Use registerOwner method

      if (!response) {
        throw new Error('Registration failed');
      }

      toast.success('Registered Successfully!');
      setIsRegistering(false); // Show login form after successful registration
      loginForm.reset(); // Reset login form to clear any previous data
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  // Toggle between Login and Register
  const toggleForm = () => {
    setIsRegistering((prev) => !prev);
  };

  return (
    <>
      <Form {...(isRegistering ? registerForm as unknown as UseFormReturn<LoginFormValues> : loginForm)}>
        <form
          onSubmit={
            isRegistering
              ? registerForm.handleSubmit(handleRegisterSubmit)
              : loginForm.handleSubmit(handleLoginSubmit)
          }
          className="w-full space-y-2"
        >
          {isRegistering && (
            <>
              <FormField
                control={registerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Autocomplete
                        options={registerRoles}
                        placeholder="Select your role"
                        disabled={loading}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {!isRegistering && (
            <>
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email..."
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Autocomplete
                        options={loginRoles}
                        placeholder="Select your role"
                        disabled={loading}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <Button disabled={loading} className="ml-auto w-full" type="submit">
            {isRegistering ? 'Register' : 'Continue With Email'}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GithubSignInButton />

      <div className="mt-4 text-center">
        <span className="text-sm text-muted-foreground">
          {isRegistering ? (
            <>
              Already have an account?{' '}
              <button
                className="font-semibold text-primary"
                onClick={toggleForm}
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?{' '}
              <button
                className="font-semibold text-primary"
                onClick={toggleForm}
              >
                Register
              </button>
            </>
          )}
        </span>
      </div>
    </>
  );
}
