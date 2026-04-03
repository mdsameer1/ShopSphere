import React from 'react'
import { Button } from './components/ui/button'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import {Home} from './pages/home'
import {Navbar} from './components/navbar'
import {Signup} from './pages/signup'
import {Login} from './pages/login'

 const router=createBrowserRouter( [
  {
    path:'/',
    element:<>
    <Navbar></Navbar>
    <Home></Home>

    </>
  },
  {
    path:'/signup',
    element:<>
    <Signup></Signup>

    </>
  },
  {
    path:'/login',
    element:<>
    <Login></Login>

    </>
  }
 ])

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
