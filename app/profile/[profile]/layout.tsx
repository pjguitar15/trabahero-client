export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='mx-auto mt-24 md:p-8 lg:p-12 space-y-6 bg-white shadow-lg rounded-lg'>
      {children}
    </div>
  )
}
