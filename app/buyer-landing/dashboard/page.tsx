'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import withAuth from '@/app/hoc/withAuth'

const BuyerLanding = () => {
  return (
    <div className='relative min-h-screen'>
      {/* Video Background */}
      <div
        className='absolute inset-0 w-full h-full bg-cover bg-center'
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1617259945337-93a28f685c54?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className='absolute inset-0 bg-black/60' /> {/* Overlay */}
      </div>

      {/* Hero Content */}
      <div className='relative z-20 container mx-auto px-4'>
        <div className='min-h-screen flex flex-col items-center justify-center text-center text-white'>
          <h1 className='text-5xl md:text-7xl font-bold mb-6'>
            Turn Your Skills Into Success
          </h1>
          <p className='text-xl md:text-2xl mb-12 max-w-3xl'>
            {`Join TrabaHero and start earning from your expertise. Whether it's digital services, 
            home repairs, or personal training - your skills are in demand.`}
          </p>
          <Button
            size='lg'
            className='text-lg px-8 py-6 bg-primary hover:bg-primary/90'
            asChild
          >
            <Link href='/freelancer-onboarding/overview/1'>
              Be a trabahero 🦸‍♂️
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Banner */}
      <div className='relative z-20 bg-white py-16'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <Card>
              <CardContent className='flex flex-col items-center justify-center pt-6'>
                <span className='text-2xl font-bold text-primary mb-2'>
                  Every 4 Minutes
                </span>
                <p className='text-sm text-gray-600'>A Service is Booked</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='flex flex-col items-center justify-center pt-6'>
                <span className='text-2xl font-bold text-primary mb-2'>
                  100,000+
                </span>
                <p className='text-sm text-gray-600'>
                  Active Local Service Providers
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='flex flex-col items-center justify-center pt-6'>
                <span className='text-2xl font-bold text-primary mb-2'>
                  ₱500 - ₱50,000
                </span>
                <p className='text-sm text-gray-600'>Service Price Range</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(BuyerLanding)
