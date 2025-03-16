const ServicesSection = () => {
  const services = [
    'House Wiring',
    'Electrical Repairs',
    'Lighting Installation',
  ]

  return (
    <div className='p-4 bg-gray-100 rounded-lg'>
      <h2 className='text-xl font-semibold'>Services Offered</h2>
      <ul className='list-disc list-inside text-gray-600'>
        {services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
    </div>
  )
}

export default ServicesSection
