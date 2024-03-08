import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/list/documents')({
  component: () => <div>Hello /admin/list/documents!</div>
})