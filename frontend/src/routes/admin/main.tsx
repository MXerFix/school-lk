import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/main')({
  component: () => <div>Hello /admin/admin/main!</div>
})
