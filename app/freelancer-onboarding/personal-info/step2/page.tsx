'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import InfoSection from '@/components/InfoSection'

export default function Step2() {
  const router = useRouter()
  const [occupation, setOccupation] = useState('')
  const [fromYear, setFromYear] = useState('2020')
  const [toYear, setToYear] = useState('2023')
  const [skills, setSkills] = useState<string[]>([])

  const handleContinue = () => {
    router.push('/freelancer-onboarding/personal-info/step3') // Navigate to step 3
  }

  const handleBack = () => {
    router.push('/freelancer-onboarding/personal-info') // Navigate back to step 1
  }

  const handleSkillChange = (skill: string) => {
    setSkills((prev) => {
      if (prev.includes(skill)) {
        return prev.filter((s) => s !== skill)
      } else {
        return [...prev, skill]
      }
    })
  }

  return (
    <div className='container mx-auto'>
      <InfoSection title='Professional Information'>
        This is where you will provide details about your professional
        background, skills, and experiences.
      </InfoSection>

      <div className='flex py-3'>
        <div className='w-1/4'>
          <h3 className='text-lg'>Your Occupation*</h3>
        </div>
        <div className='mx-auto w-full'>
          <div className='mb-4 flex'>
            <select
              className='border rounded p-2 w-2/3'
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              required
            >
              <option value='Graphics & Design'>Graphics & Design</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className='mb-4 flex gap-3 items-center'>
            <label className='mb-1'>From</label>
            <select
              className='border rounded p-2'
              value={fromYear}
              onChange={(e) => setFromYear(e.target.value)}
            >
              {[...Array(30)].map((_, i) => (
                <option key={i} value={2020 + i}>
                  {2020 + i}
                </option>
              ))}
            </select>

            <label className='mb-1 text-center'>To</label>
            <select
              className='border rounded p-2'
              value={toYear}
              onChange={(e) => setToYear(e.target.value)}
            >
              {[...Array(30)].map((_, i) => (
                <option key={i} value={2020 + i}>
                  {2020 + i}
                </option>
              ))}
            </select>
          </div>

          <div className='mb-4'>
            <label className='block mb-1'>
              Choose two to five of your best skills in Graphics & Design
            </label>
            <div className='grid grid-cols-2 gap-4'>
              {[
                'AI Artists',
                'Architecture & Interior Design',
                'Brochure Design',
                'Business Cards & Stationery',
                'Cartoons & Comics',
                'Character Modeling',
                'Flyer Design',
                'Image Editing',
                'Logo Design',
                'NFT Art',
                'Presentation Design',
                'Website Design',
                // Add more skills as needed
              ].map((skill) => (
                <label key={skill} className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={skills.includes(skill)}
                    onChange={() => handleSkillChange(skill)}
                  />
                  <span className='ml-2'>{skill}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='flex space-x-4 mt-4'>
            <Button onClick={handleBack} variant='outline'>
              Back
            </Button>
            <Button onClick={handleContinue}>Continue</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
