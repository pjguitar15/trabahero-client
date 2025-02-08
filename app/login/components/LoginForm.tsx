'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Toaster } from '@/components/ui/toaster'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { XCircle } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { LoginFormInputProps } from '../types/loginFormTypes'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
})

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const {
    register: login,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputProps>({
    resolver: zodResolver(formSchema),
  })
  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit: SubmitHandler<LoginFormInputProps> = async (data) => {
    console.log(data)
    setLoading(true)
    setServerError(null)

    await new Promise((resolve) => setTimeout(resolve, 1000)) // 1-second delay

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong')
      }

      console.log('Login successful:', result)

      // Show success toast
      toast({
        title: 'Login Successful',
        description:
          'You have successfully logged in. Redirecting to Dashboard...',
      })

      await new Promise((resolve) => setTimeout(resolve, 2000)) // 2-second delay

      // Save token to localStorage
      localStorage.setItem('access_token', result.access_token)
      router.push('/dashboard')
      // Redirect or refresh page after successful login
    } catch (error: unknown) {
      if (error instanceof Error) {
        setServerError(error.message)
      } else {
        setServerError('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = () => {
    if (serverError) setServerError(null)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  {...login('email', { onChange: handleInputChange })}
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className='text-red-500'>{String(errors.email.message)}</p>
                )}
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  {...login('password', { onChange: handleInputChange })}
                  id='password'
                  type='password'
                  placeholder='********'
                  required
                />
                {errors.password && (
                  <p className='text-red-500'>
                    {String(errors.password.message)}
                  </p>
                )}
              </div>

              {serverError && (
                <Alert variant='destructive'>
                  <XCircle className='h-4 w-4 text-red-500' />
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>{serverError}</AlertDescription>
                </Alert>
              )}

              <Button disabled={loading} type='submit' className='w-full'>
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <Button disabled={loading} variant='outline' className='w-full'>
                Login with Google
              </Button>
            </div>

            <div className='mt-4 text-center text-sm'>
              {`Don't have an account? `}
              <a href='/register' className='underline underline-offset-4'>
                Register
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}

export default LoginForm
