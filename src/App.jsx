
import { createBrowserRouter, Navigate, Outlet, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login'
import { useSelector } from 'react-redux'
import DashBoardPage from './pages/DashBoard';

function App() {

  function ProtectedLayout(){
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if(!isAuthenticated){
      return <Navigate to='/login' />;
    }
    return <Outlet />
  }

  const router = createBrowserRouter([
    {
      path : '/login',
      element : <LoginPage />
    },
    {
      element : <ProtectedLayout />,
      children : [
        {
          path : '/dashboard',
          element : <DashBoardPage />,
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
