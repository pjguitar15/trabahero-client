'use client'

import React, { use } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { onboardingSteps } from './steps'
import { notFound } from 'next/navigation'
import { Lightbulb } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import Modal from '@/components/Modal'
import axiosInstance from '@/utils/axiosInstance'

export default function OnboardingStep({
  params,
}: {
  params: Promise<{ step: string }>
}) {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const { step } = use(params)
  const stepIndex = parseInt(step) - 1
  const stepData = onboardingSteps[stepIndex]

  if (!stepData) {
    notFound()
  }

  const nextStep = stepIndex + 2
  const hasNextStep = stepIndex < onboardingSteps.length - 1

  const handleProceed = async () => {
    const token = localStorage.getItem('access_token')
    if (!token) return

    try {
      const payload = {
        lastCompletedStep: 'onboarding',
      }
      await axiosInstance.put('/user-setup/last-completed-step', payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the authorization header
        },
      })
    } catch (error) {
      console.error('Error updating last completed step:', error)
    }
    router.push('/freelancer-onboarding/personal-info')
  }

  const handleComplete = () => {
    setShowModal(true)
  }

  return (
    <div className='container mx-auto px-4 py-8 mt-16'>
      {showModal && ( // Render modal if showModal is true
        <Modal
          title='Congratulations!'
          message='You have completed the onboarding overview steps. You can now proceed to personal information.'
          icon={<CheckCircle className='h-10 w-10 text-green-500' />}
          buttonText='Go to Personal Information'
          canExit={false} // Set to true if you want to allow closing
          onProceed={handleProceed}
        />
      )}
      <div className='max-w-4xl mx-auto'>
        <Card className='p-6'>
          <h2 className='text-2xl font-bold mb-2'>{stepData.title}</h2>
          <p className='text-gray-600 mb-6'>{stepData.subtitle}</p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {stepData.items.map(
              (
                item: { heading: string; description: string },
                itemIndex: number,
              ) => (
                <div
                  key={itemIndex}
                  className='border rounded-lg p-4 flex items-start gap-4 hover:shadow-md transition-shadow'
                >
                  <div className='p-2 bg-primary/10 rounded-lg'>
                    <Lightbulb className='h-5 w-5 text-primary' />
                  </div>
                  <div>
                    <h3 className='font-semibold'>{item.heading}</h3>
                    <p className='text-gray-600 text-sm'>{item.description}</p>
                  </div>
                </div>
              ),
            )}
          </div>
        </Card>

        <div className='mt-8 flex justify-between'>
          {stepIndex > 0 && (
            <Button variant='outline' asChild>
              <Link href={`/freelancer-onboarding/overview/${stepIndex}`}>
                Previous
              </Link>
            </Button>
          )}
          {hasNextStep || stepIndex === 2 ? ( // Show Complete button on step 3
            <Button
              asChild
              className='px-8'
              onClick={stepIndex === 2 ? handleComplete : undefined}
            >
              <Link
                href={
                  hasNextStep
                    ? `/freelancer-onboarding/overview/${nextStep}`
                    : '#'
                }
              >
                {hasNextStep ? 'Continue' : 'Complete'}
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
