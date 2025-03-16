const ProfileHeader = () => {
  return (
    <div className='flex items-center gap-4'>
      <img
        src='https://via.placeholder.com/100'
        alt='Profile'
        className='w-20 h-20 rounded-full'
      />
      <div>
        <h1 className='text-2xl font-bold'>Juan Dela Cruz</h1>
        <p className='text-gray-500'>Electrician • 5 Years Experience</p>
      </div>
    </div>
  )
}

export default ProfileHeader
