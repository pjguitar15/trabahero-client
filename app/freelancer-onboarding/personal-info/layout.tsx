'use client'
import React from 'react'
import StepNavigation from '@/components/StepNavigation'
import { usePathname } from 'next/navigation'

export default function PersonalInfoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const steps = [
    {
      label: 'Personal Info',
      href: '/freelancer-onboarding/personal-info',
      completed: false,
    },
    {
      label: 'Professional Info',
      href: '/freelancer-onboarding/personal-info/step2',
      completed: false,
    },
    {
      label: 'Account Security',
      href: '/freelancer-onboarding/personal-info/step3',
      completed: false,
    },
  ]

  const activeStep = steps.findIndex((step) => step.href === pathname)

  // Mark steps as completed based on the active step
  steps.forEach((step, index) => {
    if (index < activeStep) {
      step.completed = true
    }
  })

  return (
    <div className='container mx-auto px-4 py-8 mt-16'>
      <StepNavigation steps={steps} activeStep={activeStep} />
      {children}
    </div>
  )
}
