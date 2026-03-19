
import { createBrowserRouter, Navigate, Outlet, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login'
import { useSelector } from 'react-redux'
import DashBoardPage from './pages/DashBoard';
import TaskDetailsPage from './pages/TaskDetailsPage';
import RootLayout from './pages/RootLayout';

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
          element : <RootLayout><DashBoardPage /></RootLayout>,
        },
        {
          path : '/dashboard/:id',
          element : <RootLayout><TaskDetailsPage /></RootLayout>
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
