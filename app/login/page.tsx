'use client'

import React from 'react'
import LoginForm from './components/LoginForm'
import withGuest from '../hoc/withGuest'

const page = () => {
  return (
    <div className='container mx-auto flex items-center h-screen'>
      <LoginForm className='w-[500px] mx-auto' />
    </div>
  )
}

export default withGuest(page)
