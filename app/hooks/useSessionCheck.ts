import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export const useSessionCheck = () => {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('access_token')
      if (!token) return

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API}/auth/validate-session`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (response.status === 200) {
          router.push('/buyer-landing/dashboard')
        } else {
          localStorage.removeItem('access_token')
        }
      } catch (error) {
        console.error('Session validation error:', error)
        localStorage.removeItem('access_token')
      }
    }

    checkSession()
  }, [router])
}
