import { createFileRoute } from '@tanstack/react-router'
import Auth from '../pages/Auth/Auth'

export const Route = createFileRoute('/auth')({
  component: Auth
})