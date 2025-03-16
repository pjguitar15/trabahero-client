import { useRouter } from 'next/navigation'
import { useEffect, useState, ComponentType } from 'react'
import axiosInstance from '@/utils/axiosInstance'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

const withAuth = <P extends object>(Component: ComponentType<P>) => {
  return function ProtectedComponent(props: P) {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
      const checkSession = async () => {
        const token = localStorage.getItem('access_token')

        if (!token) {
          setIsAuthenticated(false)
          router.push('/login')
          return
        }

        try {
          const response = await axiosInstance.get('/auth/validate-session', {
            headers: { Authorization: `Bearer ${token}` },
          })

          if (response.status === 200) {
            setIsAuthenticated(true)
          } else {
            throw new Error('Invalid session')
          }
        } catch (error) {
          console.error('Session validation error:', error)
          localStorage.removeItem('access_token')
          setIsAuthenticated(false)
          router.push('/login')
        }
      }

      checkSession()
    }, [])

    if (isAuthenticated === null)
      return (
        <div className='flex items-center justify-center h-screen'>
          <Card className='p-6 shadow-none'>
            <CardContent className='flex flex-col items-center gap-3'>
              <Loader2 className='h-6 w-6 animate-spin text-primary' />
              <span className='text-sm text-muted-foreground'>
                Validating session...
              </span>
            </CardContent>
          </Card>
        </div>
      )

    if (!isAuthenticated) return null // Avoid flicker before redirect

    return <Component {...props} />
  }
}

export default withAuth
