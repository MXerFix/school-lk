import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/lk/payment')({
  component: () => <div>Hello /lk/payment!</div>
})