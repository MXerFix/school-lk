import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

const Index = () => {

  const navigate = useNavigate()

  useEffect(() => {
    navigate({
      to: '/lk/home'
    })
  }, [navigate])


  return <div></div>
}

export const Route = createFileRoute("/")({
  component: Index
})
