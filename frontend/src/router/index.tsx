import { createBrowserRouter } from "react-router-dom"

import { HomePage } from "../pages/HomePage"
import { RepositoryPage } from "../pages/RepositoryPage"
import { NotFoundPage } from "../pages/NotFoundPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/repositories/:repositoryId",
    element: <RepositoryPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])