'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import InfoSection from '@/components/InfoSection'
import withAuth from '@/app/hoc/withAuth'
import axiosInstance from '@/utils/axiosInstance'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { XCircle } from 'lucide-react'

// Define form schema
const formSchema = z.object({
  skills: z.array(
    z.object({
      name: z.string().min(1, 'Skill name is required'),
      type: z.enum(['online', 'offline']),
    }),
  ),
  education: z.array(
    z.object({
      school: z.string().optional(),
      degree: z.string().optional(),
      year: z
        .string()
        .regex(/^\d{4}$/, 'Year must be a 4-digit number') // Only 4-digit numbers
        .optional(),
    }),
  ),
  certifications: z.array(
    z.object({
      name: z.string().optional(),
      year: z
        .string()
        .regex(/^\d{4}$/, 'Year must be a 4-digit number') // Only 4-digit numbers
        .optional(),
    }),
  ),
  workExperience: z.array(
    z
      .object({
        company: z.string().optional(),
        jobTitle: z.string().optional(),
        employmentType: z
          .enum([
            'full-time',
            'part-time',
            'freelance',
            'contract',
            'internship',
          ])
          .optional(),
        fromYear: z
          .string()
          .regex(/^\d{4}$/, 'From year must be a 4-digit number') // Only 4-digit numbers
          .optional(),
        toYear: z
          .string()
          .regex(/^\d{4}$/, 'To year must be a 4-digit number') // Only 4-digit numbers
          .optional(),
        responsibilities: z.string().optional(),
      })
      .optional(),
  ),
  dialects: z.array(z.string()).nonempty('At least one dialect is required'),
  workSamples: z.array(
    z.object({
      workType: z.string().min(1, 'Work type is required'),
      title: z.string().min(1, 'Title is required'),
      description: z.string().min(1, 'Description is required'),
      images: z.array(z.string()).min(1, 'At least 1 image is required'),
      link: z.string().url('Invalid URL'),
    }),
  ),
  socialMedia: z
    .object({
      linkedin: z.string().url('Invalid LinkedIn URL').optional(),
      portfolio: z.string().url('Invalid portfolio URL').optional(),
    })
    .optional(),
})

// Type for form values
type FormValues = z.infer<typeof formSchema>

const Step2 = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: [],
      education: [{ school: '', degree: '', year: '' }],
      certifications: [{ name: '', year: '' }],
      workExperience: [
        {
          company: '',
          jobTitle: '',
          employmentType: 'full-time',
          fromYear: '',
          toYear: '',
          responsibilities: '',
        },
      ],
      dialects: [],
      workSamples: [
        { workType: '', title: '', description: '', images: [], link: '' },
      ],
      socialMedia: { linkedin: '', portfolio: '' },
    },
  })

  // State to track new skill input
  const [skillInput, setSkillInput] = useState('')
  const [skillType, setSkillType] = useState<'online' | 'offline'>('online')
  const [serverError, setServerError] = useState<string | null>(null)

  const skills = watch('skills')

  // Handle adding skill via Enter key
  const handleSkillInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault()

      setValue('skills', [
        ...getValues('skills'),
        { name: skillInput.trim(), type: skillType },
      ])
      setSkillInput('') // Reset input
    }
  }

  // Remove skill
  const removeSkill = (index: number) => {
    setValue(
      'skills',
      getValues('skills').filter((_, i) => i !== index),
    )
  }

  // Add education entry
  const addEducation = () => {
    setValue('education', [
      ...getValues('education'),
      { school: '', degree: '', year: '' },
    ])
  }

  // Remove education entry
  const removeEducation = (index: number) => {
    setValue(
      'education',
      getValues('education').filter((_, i) => i !== index),
    )
  }

  // Add certification entry
  const addCertification = () => {
    setValue('certifications', [
      ...getValues('certifications'),
      { name: '', year: '' },
    ])
  }

  // Remove certification entry
  const removeCertification = (index: number) => {
    setValue(
      'certifications',
      getValues('certifications').filter((_, i) => i !== index),
    )
  }

  const onSubmit = async (data: FormValues) => {
    setServerError(null)
    const storedUserInfo = localStorage.getItem('user_info')
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null
    const payload = { ...data, userId: userInfo?.id || '' }
    const token = localStorage.getItem('access_token')
    try {
      await axiosInstance.post('/professional-info/', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      router.push('/freelancer-onboarding/personal-info/step3')
    } catch (error: unknown) {
      if (error instanceof Error) {
        setServerError(error.message)
      } else {
        setServerError('An unexpected error occurred')
      }
    }
  }

  return (
    <div className='container mx-auto'>
      <InfoSection title='Professional Information'>
        Provide details about your skills, education, and certifications.
      </InfoSection>

      <main className='flex gap-12'>
        <form onSubmit={handleSubmit(onSubmit)} className='py-3'>
          {/* Skills */}
          <div className='mb-4'>
            <h3 className='text-lg'>Skills*</h3>

            {/* Skill input */}
            <div className='flex gap-2 mb-2'>
              <input
                className='border rounded p-2 w-full'
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillInput}
                placeholder='Type skill and press Enter'
              />

              {/* Online / Offline selector */}
              <select
                className='border rounded p-2'
                value={skillType}
                onChange={(e) =>
                  setSkillType(e.target.value as 'online' | 'offline')
                }
              >
                <option value='online'>Online</option>
                <option value='offline'>Offline</option>
              </select>
            </div>

            {/* Display skills as tags */}
            <div className='flex flex-wrap gap-2'>
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className='bg-gray-200 px-3 py-1 rounded-full flex items-center space-x-2'
                >
                  <span>
                    {skill.name} ({skill.type})
                  </span>
                  <button
                    type='button'
                    className='text-red-500'
                    onClick={() => removeSkill(index)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {errors.skills && (
              <p className='text-red-500'>{errors.skills.message}</p>
            )}
          </div>

          {/* Education Section */}
          <div className='mb-4'>
            <h3 className='text-lg'>Education*</h3>
            {watch('education').map((_, index) => (
              <div key={index} className='mb-2 flex gap-2'>
                <input
                  className='border rounded p-2 w-1/3'
                  placeholder='School'
                  {...register(`education.${index}.school`)}
                />
                <input
                  className='border rounded p-2 w-1/3'
                  placeholder='Degree'
                  {...register(`education.${index}.degree`)}
                />
                <select
                  className='border rounded p-2 w-1/3'
                  {...register(`education.${index}.year`)}
                >
                  <option value=''>Select Year</option>
                  {Array.from({ length: 50 }, (_, i) => {
                    const year = new Date().getFullYear() - i
                    return (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    )
                  })}
                </select>
                <button
                  type='button'
                  className='text-red-500'
                  onClick={() => removeEducation(index)}
                >
                  ×
                </button>
              </div>
            ))}
            <Button type='button' variant='outline' onClick={addEducation}>
              + Add Education
            </Button>
          </div>

          {/* Certification Section */}
          <div className='mb-4'>
            <h3 className='text-lg'>Certifications</h3>
            {watch('certifications').map((_, index) => (
              <div key={index} className='mb-2 flex gap-2'>
                <input
                  className='border rounded p-2 w-2/3'
                  placeholder='Certificate Name'
                  {...register(`certifications.${index}.name`)}
                />
                <input
                  className='border rounded p-2 w-1/3'
                  placeholder='Year'
                  {...register(`certifications.${index}.year`)}
                />
                <button
                  type='button'
                  className='text-red-500'
                  onClick={() => removeCertification(index)}
                >
                  ×
                </button>
              </div>
            ))}
            <Button type='button' variant='outline' onClick={addCertification}>
              + Add Certification
            </Button>
          </div>

          {/* Work Experience */}
          <div className='mb-4'>
            <h3 className='text-lg'>Work Experience*</h3>
            {watch('workExperience').map((_, index) => (
              <div key={index} className='mb-2 flex flex-wrap gap-2'>
                <input
                  className='border rounded p-2 w-1/3'
                  placeholder='Company Name'
                  {...register(`workExperience.${index}.company`)}
                />
                <input
                  className='border rounded p-2 w-1/3'
                  placeholder='Job Title'
                  {...register(`workExperience.${index}.jobTitle`)}
                />
                <select
                  className='border rounded p-2 w-1/3'
                  {...register(`workExperience.${index}.employmentType`)}
                >
                  <option value='full-time'>Full-Time</option>
                  <option value='part-time'>Part-Time</option>
                  <option value='freelance'>Freelance</option>
                  <option value='contract'>Contract</option>
                  <option value='internship'>Internship</option>
                </select>
                <input
                  className='border rounded p-2 w-1/4'
                  placeholder='From Year'
                  {...register(`workExperience.${index}.fromYear`)}
                />
                <input
                  className='border rounded p-2 w-1/4'
                  placeholder='To Year'
                  {...register(`workExperience.${index}.toYear`)}
                />
                <textarea
                  className='border rounded p-2 w-full'
                  placeholder='Responsibilities (Optional)'
                  {...register(`workExperience.${index}.responsibilities`)}
                />
              </div>
            ))}
            <Button
              type='button'
              variant='outline'
              onClick={() =>
                setValue('workExperience', [
                  ...getValues('workExperience'),
                  {
                    company: '',
                    jobTitle: '',
                    employmentType: 'full-time',
                    fromYear: '',
                    toYear: '',
                    responsibilities: '',
                  },
                ])
              }
            >
              + Add Work Experience
            </Button>
          </div>

          {/* Dialects */}
          <div className='mb-4'>
            <h3 className='text-lg'>Dialects Spoken*</h3>
            <div className='flex flex-wrap gap-4'>
              {/* Tagalog */}
              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  value='Tagalog'
                  {...register('dialects')}
                  className='form-checkbox h-5 w-5 text-blue-600'
                />
                <span>Tagalog</span>
              </label>

              {/* Bisaya */}
              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  value='Bisaya'
                  {...register('dialects')}
                  className='form-checkbox h-5 w-5 text-blue-600'
                />
                <span>Bisaya</span>
              </label>

              {/* Ilocano */}
              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  value='Ilocano'
                  {...register('dialects')}
                  className='form-checkbox h-5 w-5 text-blue-600'
                />
                <span>Ilocano</span>
              </label>

              {/* Hiligaynon */}
              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  value='Hiligaynon'
                  {...register('dialects')}
                  className='form-checkbox h-5 w-5 text-blue-600'
                />
                <span>Hiligaynon</span>
              </label>
            </div>
            {errors.dialects && (
              <p className='text-red-500'>{errors.dialects.message}</p>
            )}
          </div>

          {/* Work Samples */}
          <div className='mb-4'>
            <h3 className='text-lg'>Work Samples*</h3>

            {watch('workSamples').map((sample, index) => (
              <div key={index} className='mb-4 p-3 border rounded'>
                {/* Title */}
                <input
                  className='border rounded p-2 w-full mb-2'
                  placeholder='Title of Work'
                  {...register(`workSamples.${index}.title`)}
                />

                {/* Description */}
                <textarea
                  className='border rounded p-2 w-full mb-2'
                  placeholder='Description of the work'
                  {...register(`workSamples.${index}.description`)}
                />

                {/* Work Type */}
                <select
                  className='border rounded p-2 w-full mb-2'
                  {...register(`workSamples.${index}.workType`)}
                >
                  <option value=''>Select Work Type</option>
                  <option value='design'>Design</option>
                  <option value='development'>Development</option>
                  <option value='writing'>Writing</option>
                  <option value='other'>Other</option>
                </select>

                {/* Image Upload */}
                <label className='border-2 border-dashed border-gray-300 rounded-lg p-4 w-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition'>
                  <span className='text-gray-600 mb-2'>Add Images</span>
                  <div className='w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full'>
                    <span className='text-2xl text-gray-500'>+</span>
                  </div>
                  <input
                    type='file'
                    multiple
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []).map(
                        (file) => URL.createObjectURL(file),
                      )
                      setValue(`workSamples.${index}.images`, files)
                    }}
                  />
                </label>

                {/* Display Uploaded Images */}
                <div className='flex gap-2 flex-wrap mb-2'>
                  {sample?.images?.map((img, imgIndex) => (
                    <div key={imgIndex} className='relative'>
                      <img
                        src={img}
                        alt='Work Sample'
                        className='h-20 w-20 object-cover'
                      />
                      <button
                        type='button'
                        className='absolute top-0 right-0 bg-red-500 text-white px-2'
                        onClick={() => {
                          setValue(
                            `workSamples.${index}.images`,
                            sample?.images?.filter((_, i) => i !== imgIndex),
                          )
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                {/* Link (Optional) */}
                <input
                  className='border rounded p-2 w-full'
                  placeholder='Project Link (Optional)'
                  {...register(`workSamples.${index}.link`)}
                />

                {/* Remove Work Sample Button */}
                <button
                  type='button'
                  className='text-red-500 mt-2'
                  onClick={() => {
                    setValue(
                      'workSamples',
                      getValues('workSamples').filter((_, i) => i !== index),
                    )
                  }}
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Add Work Sample Button */}
            <Button
              type='button'
              variant='outline'
              onClick={() =>
                setValue('workSamples', [
                  ...getValues('workSamples'),
                  {
                    workType: '',
                    title: '',
                    description: '',
                    images: [],
                    link: '',
                  },
                ])
              }
            >
              + Add Work Sample
            </Button>

            {errors.workSamples && (
              <p className='text-red-500'>{errors.workSamples.message}</p>
            )}
          </div>

          {/* Social Media */}
          <div className='mb-4'>
            <h3 className='text-lg'>Social Media Links</h3>
            <input
              className='border rounded p-2 w-full mb-2'
              placeholder='LinkedIn Profile URL'
              {...register('socialMedia.linkedin')}
            />
            <input
              className='border rounded p-2 w-full'
              placeholder='Portfolio URL'
              {...register('socialMedia.portfolio')}
            />
          </div>
          {serverError && (
            <Alert variant='destructive'>
              <XCircle className='h-4 w-4 text-red-500' />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          {/* Buttons */}
          <div className='flex space-x-4 mt-4'>
            <Button
              onClick={() =>
                router.push('/freelancer-onboarding/personal-info')
              }
              variant='outline'
            >
              Back
            </Button>
            <Button type='submit'>Continue</Button>
          </div>
        </form>
        <div>
          <img
            src='https://creativevip.net/resource-images/15-superhero-icons-1.png'
            alt=''
          />
        </div>
      </main>
    </div>
  )
}

export default withAuth(Step2)
