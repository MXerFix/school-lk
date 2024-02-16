import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/lk/admission')({
  component: () => <div>Hello /lk/admission!</div>
})