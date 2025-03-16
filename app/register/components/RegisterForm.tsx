'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { XCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must not exceed 20 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores',
    ),
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  middleName: z
    .string()
    .max(50, 'Middle name must not exceed 50 characters')
    .optional(),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one number, and one special character',
    ),
  confirmPassword: z.string(),
})

type RegisterFormInputs = z.infer<typeof formSchema>

const RegisterForm = (props: React.ComponentPropsWithoutRef<'div'>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(formSchema),
  })

  const [serverError, setServerError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setLoading(true)
    try {
      setServerError(null)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong')
      }

      toast({
        title: 'Registration Successful',
        description:
          'You have successfully registered. Redirecting to login...',
      })

      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message)
        setLoading(false)
      } else {
        setServerError('Unexpected error occurred')
        setLoading(false)
      }
    }
  }

  const handleInputChange = () => {
    if (serverError) setServerError(null)
  }

  return (
    <div className={cn('flex flex-col gap-6', props.className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Register</CardTitle>
          <CardDescription>Create your account here</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='firstName'>First Name</Label>
                <Input
                  {...register('firstName')}
                  id='firstName'
                  type='text'
                  placeholder='John'
                  required
                  onChange={handleInputChange}
                />
                {errors.firstName && (
                  <p className='text-red-500'>
                    {String(errors.firstName.message)}
                  </p>
                )}
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='middleName'>Middle Name (Optional)</Label>
                <Input
                  {...register('middleName')}
                  id='middleName'
                  type='text'
                  placeholder='Diddy'
                  onChange={handleInputChange}
                />
                {errors.middleName && (
                  <p className='text-red-500'>
                    {String(errors.middleName.message)}
                  </p>
                )}
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='lastName'>Last Name</Label>
                <Input
                  {...register('lastName')}
                  id='lastName'
                  type='text'
                  placeholder='Doe'
                  required
                  onChange={handleInputChange}
                />
                {errors.lastName && (
                  <p className='text-red-500'>
                    {String(errors.lastName.message)}
                  </p>
                )}
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='username'>Username</Label>
                <Input
                  {...register('username')}
                  id='username'
                  type='text'
                  placeholder='john_doe'
                  required
                  onChange={handleInputChange}
                />
                {errors.username && (
                  <p className='text-red-500'>
                    {String(errors.username.message)}
                  </p>
                )}
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  {...register('email')}
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
                  {...register('password')}
                  id='password'
                  type='password'
                  placeholder='********'
                  required
                  onChange={handleInputChange}
                />
                {errors.password && (
                  <p className='text-red-500'>
                    {String(errors.password.message)}
                  </p>
                )}
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input
                  {...register('confirmPassword')}
                  id='confirmPassword'
                  type='password'
                  placeholder='********'
                  required
                  onChange={handleInputChange}
                />
                {errors.confirmPassword && (
                  <p className='text-red-500'>
                    {String(errors.confirmPassword.message)}
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
                Register
              </Button>
              <Button disabled={loading} variant='outline' className='w-full'>
                Register with Google
              </Button>
            </div>

            <div className='mt-4 text-center text-sm'>
              Already have an account?{' '}
              <a href='/login' className='underline underline-offset-4'>
                Sign in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}

export default RegisterForm
