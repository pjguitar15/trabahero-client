'use client'

import React from 'react'
import { useSessionCheck } from './hooks/useSessionCheck'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Search } from 'lucide-react'

const Page = () => {
  useSessionCheck()

  return (
    <div className='relative min-h-screen bg-white'>
      {/* Added mt-16 to account for fixed navbar height */}
      <div className='container mx-auto px-4 py-24 mt-16'>
        {/* Added a container with background and rounded corners */}
        <Card className='bg-black p-8'>
          <div className='flex flex-col items-center justify-center text-center text-white'>
            <h1 className='text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
              Scale your professional workforce with freelancers
            </h1>

            <div className='w-full max-w-2xl mb-16 relative'>
              <Input
                type='search'
                placeholder='Search for any service...'
                className='w-full h-14 text-black text-lg rounded-xl border-2 border-white/20 backdrop-blur-md bg-white pr-14'
              />
              <Button
                variant="secondary"
                size="icon"
                className='absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900 hover:bg-black transition-colors'
              >
                <Search className="h-5 w-5 text-white" />
              </Button>
            </div>

            <div className='flex flex-wrap justify-center gap-4 mb-16'>
              <p className='text-sm opacity-70 w-full mb-4'>Trusted by:</p>
              <div className='flex flex-wrap justify-center gap-12 opacity-70'>
                <span className='font-semibold'>Disney</span>
                <span className='font-semibold'>Google</span>
                <span className='font-semibold'>NETFLIX</span>
                <span className='font-semibold'>P&G</span>
                <span className='font-semibold'>PayPal</span>
                <span className='font-semibold'>Microsoft</span>
              </div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 text-center'>
              <Card className='flex flex-col items-center p-4 hover:bg-white/10 transition-colors cursor-pointer bg-transparent text-white'>
                <span className='text-sm font-medium'>Programming & Tech</span>
              </Card>
              <Card className='flex flex-col items-center p-4 hover:bg-white/10 transition-colors cursor-pointer bg-transparent text-white'>
                <span className='text-sm font-medium'>Graphics & Design</span>
              </Card>
              <Card className='flex flex-col items-center p-4 hover:bg-white/10 transition-colors cursor-pointer bg-transparent text-white'>
                <span className='text-sm font-medium'>Digital Marketing</span>
              </Card>
              <Card className='flex flex-col items-center p-4 hover:bg-white/10 transition-colors cursor-pointer bg-transparent text-white'>
                <span className='text-sm font-medium'>Writing & Translation</span>
              </Card>
              <Card className='flex flex-col items-center p-4 hover:bg-white/10 transition-colors cursor-pointer bg-transparent text-white'>
                <span className='text-sm font-medium'>Video & Animation</span>
              </Card>
              <Card className='flex flex-col items-center p-4 hover:bg-white/10 transition-colors cursor-pointer bg-transparent text-white'>
                <span className='text-sm font-medium'>AI Services</span>
              </Card>
              <Card className='flex flex-col items-center p-4 hover:bg-white/10 transition-colors cursor-pointer bg-transparent text-white'>
                <span className='text-sm font-medium'>Music & Audio</span>
              </Card>
              <Card className='flex flex-col items-center p-4 hover:bg-white/10 transition-colors cursor-pointer bg-transparent text-white'>
                <span className='text-sm font-medium'>Business</span>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Page
