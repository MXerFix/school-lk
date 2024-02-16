import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/lk/sections')({
  component: () => <div>Hello /lk/sections!</div>
})