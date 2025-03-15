// app/freelancer-onboarding/personal-info/step3/page.tsx
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import InfoSection from '@/components/InfoSection'

export default function Step3() {
  const router = useRouter()

  const handleContinue = () => {
    // Navigate to the next step or completion page
    router.push('/freelancer-onboarding/completion') // Adjust this to your completion page
  }

  const handleBack = () => {
    router.push('/freelancer-onboarding/personal-info/step2') // Navigate back to step 2
  }

  return (
    <div className='container mx-auto'>
      <InfoSection title='Account Security'>
        Trust and safety is a big deal in our community. Please verify your
        email and phone number so that we can keep your account secured.
      </InfoSection>

      <div className='mx-auto'>
        <h3 className='text-xl font-semibold mb-4'>Step 3: Account Security</h3>
        <div className='mb-4'>
          <div className='flex justify-between items-center'>
            <span>Email</span>
            <span className='text-green-500'>Verified</span>
          </div>
          <p className='text-gray-500'>Private</p>
        </div>
        <div className='mb-4'>
          <div className='flex justify-between items-center'>
            <span>Phone Number</span>
            <span className='text-green-500'>Verified</span>
          </div>
          <p className='text-gray-500'>
            We will never share your phone number.
          </p>
        </div>
        <div className='flex space-x-4 mt-4'>
          <Button onClick={handleBack} variant='outline'>
            Back
          </Button>
          <Button onClick={handleContinue}>Continue</Button>
        </div>
      </div>
    </div>
  )
}
