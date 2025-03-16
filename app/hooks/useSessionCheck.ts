'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axiosInstance from '@/utils/axiosInstance'

export const useSessionCheck = () => {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('access_token')
      if (!token) return

      try {
        const response = await axiosInstance.get('/auth/validate-session', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the authorization header
          },
        })

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
