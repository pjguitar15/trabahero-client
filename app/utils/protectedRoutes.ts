export const protectedRoutes = [
  '/buyer-landing',
  '/account',
  '/settings',
  'profile',
]

export const protectedPatterns = [
  /^\/overview/,
  /^\/dashboard/,
  /^\/admin/,
  /^\/freelancer-onboarding/,
]

export const isProtectedRoute = (pathname: string): boolean => {
  return (
    protectedRoutes.includes(pathname) ||
    protectedPatterns.some((pattern) => pattern.test(pathname))
  )
}
