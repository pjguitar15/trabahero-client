// app/hooks/useSessionCheck.ts
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axiosInstance from '@/utils/axiosInstance'

export const useSessionCheck = (setErrorMessage: (message: string) => void) => {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('access_token')
      if (!token) {
        setErrorMessage('Session expired. Please log in again.') // Set error message if no token
        router.push('/login') // Redirect to login if no token
        return
      }

      try {
        const response = await axiosInstance.get('/auth/validate-session', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the authorization header
          },
        })

        if (response.status !== 200) {
          // If the response is not OK, clear the token
          localStorage.removeItem('access_token')
          setErrorMessage('Session expired. Please log in again.') // Set error message
          router.push('/login') // Redirect to login if session is invalid
        }
      } catch (error) {
        console.error('Session validation error:', error)
        localStorage.removeItem('access_token') // Clear token on error
        setErrorMessage('Session expired. Please log in again.') // Set error message
        router.push('/login') // Redirect to login
      }
    }

    checkSession()
  }, [router, setErrorMessage])
}
