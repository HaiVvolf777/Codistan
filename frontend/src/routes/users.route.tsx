import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import User from '@/pages/User'

export const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users',
  component: User,
})