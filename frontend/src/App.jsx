import React from 'react'
import { Button } from './components/ui/button'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import {Home} from './pages/home'
import {Navbar} from './components/navbar'
import {Signup} from './pages/signup'
import {Login} from './pages/login'
import Verify from './pages/Verify'
import VerifyEmail from './pages/VerifyEmail'

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
  },
  {
    path:'/verify',
    element:<>
    <Verify></Verify>

    </>
  },
  {
    path:'/verify/:token',
    element:<>
    <VerifyEmail/>

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
