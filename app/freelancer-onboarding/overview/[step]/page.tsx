'use client'

import React, { use } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { onboardingSteps } from './steps'
import { notFound } from 'next/navigation'
import { Lightbulb } from 'lucide-react'

export default function OnboardingStep({
  params,
}: {
  params: Promise<{ step: string }>
}) {
  const { step } = use(params)
  const stepIndex = parseInt(step) - 1
  const stepData = onboardingSteps[stepIndex]

  if (!stepData) {
    notFound()
  }

  const nextStep = stepIndex + 2
  const hasNextStep = stepIndex < onboardingSteps.length - 1

  return (
    <div className='container mx-auto px-4 py-8 mt-16'>
      <div className='max-w-4xl mx-auto'>
        <Card className='p-6'>
          <h2 className='text-2xl font-bold mb-2'>{stepData.title}</h2>
          <p className='text-gray-600 mb-6'>{stepData.subtitle}</p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {stepData.items.map((item: { heading: string; description: string }, itemIndex: number) => (
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
            ))}
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
          {hasNextStep ? (
            <Button asChild className='px-8'>
              <Link href={`/freelancer-onboarding/overview/${nextStep}`}>
                Continue
              </Link>
            </Button>
          ) : (
            <Button asChild className='px-8'>
              <Link href='/freelancer-onboarding/complete'>Complete</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
