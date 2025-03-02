'use client'

import { Input } from '@/components/ui/input'
import { Bell, MessageSquare, Heart, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { UserInfo } from '@/app/constants/userInfoConstants'

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('access_token')
      const storedUserInfo = localStorage.getItem('user_info')

      if (!token) {
        setUserInfo(null)
        return
      }

      // First try to get from localStorage
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo))
      }

      // Then fetch fresh data
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        console.log('RESPONSE', response)

        if (response.ok) {
          const data: UserInfo = await response.json()
          setUserInfo(data)
          localStorage.setItem('user_info', JSON.stringify(data))
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error)
      }
    }

    fetchUserInfo()

    // Listen for login/logout events
    const handleLoginEvent = () => fetchUserInfo()
    window.addEventListener('login', handleLoginEvent)
    window.addEventListener('storage', handleLoginEvent)

    return () => {
      window.removeEventListener('login', handleLoginEvent)
      window.removeEventListener('storage', handleLoginEvent)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_info') // Remove user info on logout
    setUserInfo(null)
    router.push('/login')
  }

  const renderAuthButton = () => {
    const token = localStorage.getItem('access_token')

    if (token) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='h-8 w-8 cursor-pointer'>
              <AvatarFallback className='bg-primary/10'>
                {userInfo?.initials || <User className='h-4 w-4' />}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-56'>
            {userInfo && (
              <>
                <DropdownMenuLabel>
                  {userInfo.firstName} {userInfo.lastName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem asChild>
              <Link href='/profile' className='w-full'>
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/settings' className='w-full'>
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/gigs' className='w-full'>
                My Gigs
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-red-600' onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    if (pathname === '/login') {
      return (
        <Button variant='outline' onClick={() => router.push('/register')}>
          Register
        </Button>
      )
    }

    if (pathname === '/register') {
      return (
        <Button variant='outline' onClick={() => router.push('/login')}>
          Login
        </Button>
      )
    }

    return <Button onClick={() => router.push('/login')}>Login</Button>
  }

  return (
    <nav className='w-full h-16 border-b bg-background fixed top-0 z-50'>
      <div className='container mx-auto h-full'>
        <div className='flex items-center justify-between h-full'>
          <div className='flex items-center gap-8'>
            <Link href='/' className='font-bold text-xl'>
              TRABAHERO
            </Link>

            {/* Search Bar */}
            <div className='w-[400px]'>
              <Input
                type='search'
                placeholder='What service are you looking for today?'
                className='w-full'
              />
            </div>
          </div>

          {/* Right side */}
          <NavigationMenu>
            <NavigationMenuList className='flex items-center gap-2'>
              {/* Navigation Icons - Only show when logged in */}
              {localStorage.getItem('access_token') && (
                <>
                  <NavigationMenuItem>
                    <Button variant='ghost' size='icon' asChild>
                      <Link href='/notifications'>
                        <Bell className='h-5 w-5' />
                      </Link>
                    </Button>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Button variant='ghost' size='icon' asChild>
                      <Link href='/messages'>
                        <MessageSquare className='h-5 w-5' />
                      </Link>
                    </Button>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Button variant='ghost' size='icon' asChild>
                      <Link href='/favorites'>
                        <Heart className='h-5 w-5' />
                      </Link>
                    </Button>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Button variant='ghost' asChild>
                      <Link href='/orders'>Orders</Link>
                    </Button>
                  </NavigationMenuItem>
                </>
              )}

              {/* Auth Button */}
              <NavigationMenuItem>{renderAuthButton()}</NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  )
}
