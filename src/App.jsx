import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import MainRout from './components/router/MainRout';
import AdminRout from './components/router/AdminRout'
import Home from './components/Home';
import Login from './components/authentication/Login';
import Signin from './components/authentication/Signin';
import AdminHome from './components/Admin page/AdminHome';

import { useDispatch, useSelector } from 'react-redux';
import { setuser } from './redux/slice/userSlice';
import AdminAddProduct from './components/Admin page/AdminAddProduct';
import Bread from './components/Pages/Bread';
import AdminProducts from './components/Admin page/AdminProducts';
import Accessories from './components/Pages/Accessories';
import Contact from './components/Contact';
import Cart from './components/Pages/Cart';
import Acessories from './components/Admin page/Acessories';
import Addacessories from './components/Admin page/Addacessories';
import Blog from './components/Admin page/Blog';
import AddBlog from './components/Admin page/AddBlog';
import BlogHome from './components/Pages/BlogHome';

export default function App() {
  let dispatch = useDispatch()
  let reduxUser = useSelector((store) => {
    return store.user.value
  })
  const [isLoading, setisLoading] = useState(
    localStorage.getItem("token") ? true : false
  )


  useEffect(() => {


    let token = localStorage.getItem('token')
    if (token) {
      axios.get("http://localhost:8000/api/get-user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        dispatch(setuser(res.data)) 
        setisLoading(false)
      })
        .catch((err) => {
          console.log(err.response);
          
          localStorage.removeItem("token")
          setisLoading(false)

        })
    }
    else {
      setisLoading(false)
    }

  }, [])

  let router;

  router = createBrowserRouter([
    {
      path: "/",
      element: <MainRout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "signin",
          element: <Signin />
        },
        {
          path: "bread",
          element: <Bread />
        },
        {
          path: "accessories",
          element: <Accessories />
        },
        {
          path: "contact",
          element: <Contact />
        },
        {
          path: "cart",
          element: <Cart/>
        },
        {
          path: "blog",
          element: <BlogHome/>
        },
      ],
    },

  ]);

  if (reduxUser?.role=="seller") {
    router = createBrowserRouter([
      {path:"",
        element: <AdminRout/>,
        children:[
          {
            path: "/",
            element: 
              <AdminHome/>
            ,  
          },
          {
            path: "products",
            children:[
              {
                path:"",
                element: 
              <AdminProducts/>
            ,  
              },
              {
                path:"addproduct",
                element: 
              <AdminAddProduct/>
            ,  
              }
              ,
              {
                path:"edit/:slug",
                element: 
              <AdminAddProduct/>
            ,  
              }
            ]
          },
        
          {
            path: "acessories",
            children:[
              {
                path:"",
                element: 
              <Acessories/>
            ,  
              },
              {
                path:"addacessories",
                element: 
              <Addacessories/>
            ,  
              }
              ,
              {
                path:"edit/:slug",
                element: 
              <Addacessories/>
            ,  
              }
            ]
          },
       
          {
            path: "blog",
            children:[
              {
                path:"",
                element: 
              <Blog/>
            ,  
              },
              {
                path:"addblog",
                element: 
              <AddBlog/>
            ,  
              }
              ,
              {
                path:"edit/:slug",
                element: 
              <AddBlog/>
            ,  
              }
            ]
          },
        
      

          
        ]
      }
        
        ]);
  }


  if (isLoading) {
    return <>
    <div className='h-[100vh] flex justify-center items-center flex-col'>
    <p className='text-[#FEC23E] text-[2.5rem]'>Pawstore</p>
    <p className='text-[#FEC23E] text-[1.5rem]'> loading.....</p>
    </div>
    </>
  }

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}
