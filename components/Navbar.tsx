'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Bell, MessageSquare, Heart, User } from 'lucide-react'
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { UserInfo } from '@/app/constants/userInfoConstants'
import Image from 'next/image'

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const navLinks = [
    { href: '/notifications', icon: Bell },
    { href: '/messages', icon: MessageSquare },
    { href: '/favorites', icon: Heart },
    { href: '/orders', label: 'Orders' },
  ]

  const authMenuItems = [
    { href: `/profile/${userInfo?.id}`, label: 'Profile' },
    { href: '/settings', label: 'Settings' },
    { href: '/gigs', label: 'My Gigs' },
  ]

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('access_token')
      const storedUserInfo = localStorage.getItem('user_info')

      if (!token) {
        setUserInfo(null)
        return
      }

      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo))
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/users/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )

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

    const handleLoginEvent = () => fetchUserInfo()
    window.addEventListener('login', handleLoginEvent)
    window.addEventListener('storage', handleLoginEvent)

    return () => {
      window.removeEventListener('login', handleLoginEvent)
      window.removeEventListener('storage', handleLoginEvent)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === '/buyer-landing/dashboard') {
        setIsScrolled(window.scrollY > 50)
      } else {
        setIsScrolled(false) // Ensure navbar is always solid on other routes
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Run it initially to set the correct state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname]) // Dependency on pathname to re-run when route changes

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_info')
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
            {authMenuItems.map((item, index) => (
              <DropdownMenuItem asChild key={index}>
                <Link href={item.href} className='w-full'>
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-red-600' onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    const authButtons = [
      {
        path: '/login',
        action: () => router.push('/register'),
        label: 'Register',
      },
      {
        path: '/register',
        action: () => router.push('/login'),
        label: 'Login',
      },
    ]

    const currentAuthButton = authButtons.find((btn) => pathname === btn.path)

    return currentAuthButton ? (
      <Button variant='outline' onClick={currentAuthButton.action}>
        {currentAuthButton.label}
      </Button>
    ) : (
      <Button onClick={() => router.push('/login')}>Login</Button>
    )
  }

  return (
    <nav
      className={`w-full h-16 fixed top-0 z-50 transition-colors duration-500 ${
        pathname === '/buyer-landing/dashboard'
          ? isScrolled
            ? 'bg-white shadow-md'
            : 'bg-transparent'
          : 'bg-white shadow-md'
      }`}
    >
      <div className='container mx-auto h-full'>
        <div className='flex items-center justify-between h-full'>
          <div className='flex items-center gap-8'>
            <Link
              href='/'
              className={`font-bold text-xl transition-colors duration-500 ${
                pathname === '/buyer-landing/dashboard'
                  ? isScrolled
                    ? 'text-black'
                    : 'text-white'
                  : 'text-black'
              }`}
            >
              <Image
                src='/logo.png'
                alt='Trabahero Logo'
                width={200} // Adjust size as needed
                height={50}
                priority
              />
            </Link>

            {/* Search Bar */}
            {/* <div className='w-[400px]'>
              <Input
                type='search'
                placeholder='What service are you looking for today?'
                className='w-full'
              />
            </div> */}
          </div>

          {/* Right side */}
          <NavigationMenu>
            <NavigationMenuList className='flex items-center gap-2'>
              {localStorage.getItem('access_token') &&
                navLinks.map(({ href, icon: Icon, label }) => (
                  <NavigationMenuItem key={href}>
                    {Icon ? (
                      <Button variant='ghost' size='icon' asChild>
                        <Link href={href}>
                          <Icon
                            className={`h-5 w-5 transition-colors duration-500 ${
                              pathname === '/buyer-landing/dashboard'
                                ? isScrolled
                                  ? 'text-black'
                                  : 'text-white'
                                : 'text-black'
                            }`}
                          />
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        variant='ghost'
                        className={`transition-colors duration-500 ${
                          pathname === '/buyer-landing/dashboard'
                            ? isScrolled
                              ? 'text-black'
                              : 'text-white'
                            : 'text-black'
                        }`}
                        asChild
                      >
                        <Link href={href}>{label}</Link>
                      </Button>
                    )}
                  </NavigationMenuItem>
                ))}

              <NavigationMenuItem>{renderAuthButton()}</NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  )
}
