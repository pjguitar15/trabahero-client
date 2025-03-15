// app/components/StepNavigation.tsx
import React from 'react'
import Link from 'next/link'
import { Check, ChevronRight } from 'lucide-react' // Importing the Check icon from Lucid

interface StepNavigationProps {
  steps: { label: string; href: string; completed: boolean }[]
  activeStep: number // Prop to indicate the active step
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  steps,
  activeStep,
}) => {
  return (
    <div className='flex items-center mb-4 border-t border-b border-gray-300 py-4'>
      {' '}
      {/* Added gray border top and bottom */}
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {step.completed ? (
            <span className='flex items-center'>
              <span className='mr-1 text-blue-500'>
                <Check />
              </span>
              <span className='font-semibold'>{step.label}</span>
            </span>
          ) : (
            <Link
              href={step.href}
              className={`flex items-center ${
                index === activeStep
                  ? 'text-blue-500 font-semibold'
                  : 'text-gray-500'
              }`}
            >
              <span className='mr-1 text-white bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center p-1 text-sm font-semibold'>
                {' '}
                {/* Added padding */}
                {index + 1}
              </span>
              <span className='font-semibold text-sm'>{step.label}</span>
            </Link>
          )}
          {index < steps.length - 1 && (
            <span
              className='mx-2 text-gray-500'
              style={{ marginLeft: '8px', marginRight: '8px' }}
            >
              {' '}
              {/* Added left and right margins */}
              <ChevronRight
                className='w-4 h-4'
                style={{ fontWeight: 'normal' }}
              />{' '}
              {/* Made chevron smaller and turned font weight down */}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default StepNavigation
