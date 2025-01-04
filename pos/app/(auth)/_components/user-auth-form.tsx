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
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import GithubSignInButton from './github-auth-button';
import { useRouter } from 'next/navigation'; // for navigation

const loginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(2, { message: 'Password must be at least 6 characters' })
});

const registerSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(2, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z
    .string()
    .min(2, { message: 'Password must be at least 6 characters' }),
  name: z.string().min(2, { message: 'Name is required' })
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, startTransition] = useTransition();
  const [isRegistering, setIsRegistering] = useState(false); // State to toggle form view
  const router = useRouter();

  const defaultLoginValues = { email: 'demo@gmail.com' };
  const defaultRegisterValues = {
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
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
    startTransition(() => {
      signIn('credentials', {
        ...data,
        callbackUrl: callbackUrl ?? '/dashboard'
      });
      toast.success('Signed In Successfully!');
    });
  };

  const handleRegisterSubmit = async (data: RegisterFormValues) => {
    // You can call an API to handle registration here
    startTransition(() => {
      signIn('credentials', {
        ...data,
        callbackUrl: callbackUrl ?? '/dashboard'
      });
      setIsRegistering(false);
      toast.success('Signed In Successfully!');
    });
    // Switch back to login form after successful registration
  };

  // Toggle between Login and Register
  const toggleForm = () => {
    setIsRegistering((prev) => !prev);
  };

  return (
    <>
      <Form {...(isRegistering ? registerForm : loginForm)}>
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
              Don't have an account?{' '}
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
