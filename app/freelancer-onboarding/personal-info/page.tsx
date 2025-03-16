'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import InfoSection from '@/components/InfoSection'
import withAuth from '@/app/hoc/withAuth'
import axiosInstance from '@/utils/axiosInstance'
import { LastCompletedStep } from '../enums/lastCompletedStep.enums'

const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Invalid phone number').max(15),
  birthDate: z.string().min(1, 'Date of Birth is required'),
  address: z.string().min(5, 'Address is required'),
  skills: z.string().min(3, 'Please enter at least one skill'),
  profilePicture: z.instanceof(FileList).optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
})

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>

const PersonalInfo = () => {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
  })
  const [token, setToken] = useState('')

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('user_info')
    const storedToken = localStorage.getItem('access_token')
    if (storedUserInfo) setUserInfo(JSON.parse(storedUserInfo))
    if (storedToken) setToken(storedToken)
  }, [])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      middleName: userInfo.middleName,
    },
  })

  useEffect(() => {
    setValue('firstName', userInfo.firstName)
    setValue('lastName', userInfo.lastName)
    setValue('email', userInfo.email)
    setValue('middleName', userInfo.middleName)
  }, [userInfo, setValue])

  const onSubmit = async (data: PersonalInfoFormData) => {
    try {
      const storedUserInfo = localStorage.getItem('user_info')
      const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null
      const modifiedData = {
        userId: userInfo?.id || '',
        phoneNumber: data.phoneNumber,
        birthday: data.birthDate,
        address: data.address,
        skills: data.skills
          ?.split(',')
          .map((skill) => skill.trim())
          .filter((skill) => skill), // Removes empty values
        imageUrl: 'https://example.com/placeholder.jpg',
        description: data.description,
      }

      await axiosInstance.post('/personal-details/', modifiedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      router.push('/freelancer-onboarding/personal-info/step2')
    } catch (error) {
      console.error('Error submitting form:', error)
    }

    try {
      await axiosInstance.put(
        '/user-setup/last-completed-step',
        { lastCompletedStep: LastCompletedStep.PERSONAL_INFO},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
    } catch (error) {
      console.error('Error updating last completed step:', error)
    }
  }

  return (
    <div className='flex min-h-screen gap-20'>
      <div className='w-1/2 flex items-center justify-center p-8'>
        <div className='w-full'>
          <InfoSection title='Personal Information'>
            Please fill in your personal details to get started with your
            profile.
          </InfoSection>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <label className='block mb-1 text-sm text-gray-500'>
                Full Name
              </label>
              <div className='flex space-x-4'>
                <Input value={userInfo.firstName} disabled />
                <Input value={userInfo.middleName || ''} disabled />
                <Input value={userInfo.lastName} disabled />
              </div>
            </div>
            <div>
              <label className='block mb-1 text-sm text-gray-500'>
                Email Address
              </label>
              <Input type='email' value={userInfo.email} disabled />
            </div>
            <hr className='my-4 border-t border-gray-300' />
            <div>
              <label className='block mb-1 text-sm text-gray-500'>
                Phone Number
              </label>
              <Input type='tel' {...register('phoneNumber')} />
              {errors.phoneNumber && (
                <p className='text-red-500 text-sm'>
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div>
              <label className='block mb-1 text-sm text-gray-500'>
                Date of Birth
              </label>
              <Input type='date' {...register('birthDate')} />
              {errors.birthDate && (
                <p className='text-red-500 text-sm'>
                  {errors.birthDate.message}
                </p>
              )}
            </div>
            <div>
              <label className='block mb-1 text-sm text-gray-500'>
                Address
              </label>
              <Input {...register('address')} />
              {errors.address && (
                <p className='text-red-500 text-sm'>{errors.address.message}</p>
              )}
            </div>
            <div>
              <label className='block mb-1 text-sm text-gray-500'>Skills</label>
              <Input
                placeholder='e.g. Electrician, Carpenter, Plumber'
                {...register('skills')}
              />
              {errors.skills && (
                <p className='text-red-500 text-sm'>{errors.skills.message}</p>
              )}
            </div>
            <div>
              <label className='block mb-1 text-sm text-gray-500'>
                Profile Picture
              </label>
              <Input type='file' {...register('profilePicture')} />
            </div>
            <div>
              <label className='block mb-1 text-sm text-gray-500'>
                Description
              </label>
              <Textarea rows={4} {...register('description')} />
              {errors.description && (
                <p className='text-red-500 text-sm'>
                  {errors.description.message}
                </p>
              )}
            </div>
            <Button type='submit' className='mt-4 w-full'>
              Continue
            </Button>
          </form>
        </div>
      </div>
      <div
        className='w-1/2 hidden lg:block'
        style={{
          backgroundImage:
            'url(https://static.vecteezy.com/system/resources/previews/026/379/479/non_2x/people-approval-praise-happy-businessman-male-manager-or-employee-proud-of-himself-and-confident-happiness-positive-person-you-did-great-good-job-vector.jpg)',
          backgroundSize: '70% auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
    </div>
  )
}

export default withAuth(PersonalInfo)
