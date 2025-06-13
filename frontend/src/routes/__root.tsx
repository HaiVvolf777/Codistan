import { createRootRoute, createRouter } from '@tanstack/react-router'
import Layout from '@/components/Layout'
import { dashboardRoute } from './dashboard.route'
import { userRoute } from './users.route'
import { notfoundRoute } from './not-found.route'
import NotFound from '@/pages/NotFound'

export const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: () => <NotFound /> 
})

export const routeTree = rootRoute.addChildren([
  dashboardRoute,
  userRoute,
  notfoundRoute
])

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => <NotFound />
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}