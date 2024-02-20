import ReactDOM from "react-dom/client"
import "./index.css"

// Import the generated route tree
import { routeTree } from "./routeTree.gen"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// Create a new router instance
const router = createRouter({ routeTree,   },)

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <RouterProvider router={router} />
  </QueryClientProvider>
)
