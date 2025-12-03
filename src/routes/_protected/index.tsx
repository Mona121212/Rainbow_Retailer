import { createFileRoute, Navigate } from '@tanstack/react-router'
import ProtectedRoutes from '../../components/ProtectedRoutes'

export const Route = createFileRoute('/_protected/')({
  component: () => {
    return (
      <ProtectedRoutes allowGuest>
        <Navigate to="/dashboard" />
      </ProtectedRoutes>
    )
  },
})

