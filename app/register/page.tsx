'use client'

import React from 'react'
import RegisterForm from './components/RegisterForm'
import withGuest from '../hoc/withGuest'

const Register = () => {
  return (
    <div className='container mx-auto flex items-center h-screen'>
      <RegisterForm className='w-[500px] mx-auto' />
    </div>
  )
}

export default withGuest(Register)
