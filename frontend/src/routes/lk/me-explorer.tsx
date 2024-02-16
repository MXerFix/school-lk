import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/lk/me-explorer')({
  component: () => <div>Hello /lk/me-explorer!</div>
})