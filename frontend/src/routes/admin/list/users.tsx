import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/list/users')({
  component: () => <div>Hello /admin/list/users!</div>
})