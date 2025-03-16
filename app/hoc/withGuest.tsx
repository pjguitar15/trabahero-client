import { useRouter } from 'next/navigation'
import { useEffect, useState, ComponentType } from 'react'
import axiosInstance from '@/utils/axiosInstance'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

const withGuest = <P extends object>(Component: ComponentType<P>) => {
  return function GuestProtectedComponent(props: P) {
    const router = useRouter()
    const [isGuest, setIsGuest] = useState<boolean | null>(null)

    useEffect(() => {
      const checkSession = async () => {
        const token = localStorage.getItem('access_token')

        if (!token) {
          setIsGuest(true) // No token means the user is a guest
          return
        }

        try {
          const response = await axiosInstance.get('/auth/validate-session', {
            headers: { Authorization: `Bearer ${token}` },
          })

          if (response.status === 200) {
            // ✅ Authenticated users should be redirected
            router.push('/buyer-landing/dashboard')
          } else {
            throw new Error('Invalid session')
          }
        } catch (error) {
          console.error('Session validation error:', error)
          localStorage.removeItem('access_token')
          setIsGuest(true) // Token invalid -> treat as guest
        }
      }

      checkSession()
    }, [])

    if (isGuest === null)
      return (
        <div className='flex items-center justify-center h-screen'>
          <Card className='p-6 shadow-none'>
            <CardContent className='flex flex-col items-center gap-3'>
              <Loader2 className='h-6 w-6 animate-spin text-primary' />
              <span className='text-sm text-muted-foreground'>
                Checking session...
              </span>
            </CardContent>
          </Card>
        </div>
      )

    if (!isGuest) return null // Prevent flicker before redirect

    return <Component {...props} />
  }
}

export default withGuest
