// app/freelancer-onboarding/personal-info/page.tsx
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import InfoSection from '@/components/InfoSection'

export default function PersonalInfo() {
  const router = useRouter()

  const handleContinue = () => {
    router.push('/freelancer-onboarding/personal-info/step2') // Navigate to step 2
  }

  return (
    <div className='mx-auto'>
      <InfoSection title='Personal Information'>
        Please fill in your personal details to get started with your profile.
      </InfoSection>

      <form>
        <div className='mb-4'>
          <label className='block mb-1 text-sm text-gray-500'>Full Name</label>
          <input type='text' className='border rounded p-2 w-full' required />
        </div>
        <div className='mb-4'>
          <label className='block mb-1 text-sm text-gray-500'>
            Display Name
          </label>
          <input type='text' className='border rounded p-2 w-full' required />
        </div>
        <div className='mb-4'>
          <label className='block mb-1 text-sm text-gray-500'>
            Profile Picture
          </label>
          <input type='file' className='border rounded p-2 w-full' />
        </div>
        <div className='mb-4'>
          <label className='block mb-1 text-sm text-gray-500'>
            Description
          </label>
          <textarea
            className='border rounded p-2 w-full'
            rows={4}
            required
          ></textarea>
        </div>
        <Button onClick={handleContinue} className='mt-4'>
          Continue
        </Button>
      </form>
    </div>
  )
}
