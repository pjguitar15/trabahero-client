// app/components/InfoSection.tsx
import React from 'react'

interface InfoSectionProps {
  title: string
  children: React.ReactNode
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, children }) => {
  return (
    <div className='pb-1 mb-3 border-b'>
      <h2 className='text-2xl font-bold text-slate-800'>{title}</h2>
      <p className='text-slate-500 mb-4 text-md'>{children}</p>
    </div>
  )
}

export default InfoSection
