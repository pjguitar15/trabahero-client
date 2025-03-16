// 'use client'

// import React, { createContext, useContext, useEffect, useState } from 'react'
// import { useRouter, usePathname } from 'next/navigation'
// import axiosInstance from '@/utils/axiosInstance'
// import Modal from '@/components/Modal'
// import { AlertTriangle } from 'lucide-react'
// import { isProtectedRoute } from '../utils/protectedRoutes'

// interface SessionContextType {
//   isAuthenticated: boolean
//   errorMessage: string
//   loading: boolean
// }

// const SessionContext = createContext<SessionContextType | undefined>(undefined)

// export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const router = useRouter()
//   const pathname = usePathname()
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
//   const [errorMessage, setErrorMessage] = useState<string>('')
//   const [loading, setLoading] = useState<boolean>(true)
//   const [showModal, setShowModal] = useState<boolean>(false)

//   useEffect(() => {
//     const checkSession = async () => {
//       setLoading(true)
//       const token = localStorage.getItem('access_token')

//       if (!token) {
//         setIsAuthenticated(false)
//         setErrorMessage('Session expired. Please log in again.')

//         if (isProtectedRoute(pathname)) {
//           setShowModal(true) // Show modal only for protected pages
//         }

//         setLoading(false)
//         return
//       }

//       try {
//         const response = await axiosInstance.get('/auth/validate-session', {
//           headers: { Authorization: `Bearer ${token}` },
//         })

//         if (response.status === 200) {
//           setIsAuthenticated(true)
//           setShowModal(false)
//         } else {
//           throw new Error('Invalid session')
//         }
//       } catch (error) {
//         console.error('Session validation error:', error)
//         localStorage.removeItem('access_token')
//         setIsAuthenticated(false)

//         if (isProtectedRoute(pathname)) {
//           setShowModal(true)
//         }
//       } finally {
//         setLoading(false)
//       }
//     }

//     checkSession()
//   }, []) // Remove `pathname` dependency to avoid excessive re-runs

//   const handleLoginClick = () => {
//     setShowModal(false)
//     router.push('/login')
//   }

//   return (
//     <SessionContext.Provider value={{ isAuthenticated, errorMessage, loading }}>
//       {children}

//       {/* 🔹 Show modal only if user is on a protected page */}
//       {showModal && (
//         <Modal
//           title='Session Expired'
//           message={errorMessage}
//           icon={<AlertTriangle className='h-10 w-10 text-red-500' />}
//           buttonText='Log In'
//           canExit={true}
//           onProceed={handleLoginClick}
//         />
//       )}
//     </SessionContext.Provider>
//   )
// }

// export const useSession = () => {
//   const context = useContext(SessionContext)
//   if (!context) {
//     throw new Error('useSession must be used within a SessionProvider')
//   }
//   return context
// }
