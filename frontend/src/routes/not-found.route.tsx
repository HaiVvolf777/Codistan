import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import NotFound from '@/pages/NotFound'

export const notfoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: () => (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <NotFound />
    </div>
  ),
})