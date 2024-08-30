import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { FaHamburger } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { IoCartOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setuser } from '../redux/slice/userSlice'
import axios from 'axios'
import { setProduct } from '../redux/slice/productSlice'

  
export default function Header() {
  const navigat =useNavigate()
  const [search, setSearch] = useState("")

  const dispatch = useDispatch()
  let reduxUser = useSelector((store) => {
    return store.user.value
  })

  let reduxCart = useSelector((store) => {
    return store.cart.value
  })


  
 
  const[hamBurger, setHamBurger]= useState(false)

  function closeHeader() {
    setHamBurger(false)
  }
  function openHeader() {
    setHamBurger(true)
    
  }

  function logoutHandle() {
    localStorage.removeItem('token')
    dispatch(setuser(null));
    
  }
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/product?search=${search}`)
    .then((res)=>{
      dispatch(setProduct(res.data))
    }).catch((err)=>{
    })
  },[search])
  



  function formHandle(e) {
    e.preventDefault()
    navigat("/bread")
    setSearch(e.target.search.value) 
    console.log(e.target.search.value);
    
    e.target.search.value=""  
    
  }

  return (
    <>
    <div className=' bg-[#FEC23E]'>
        <div className='container lg:flex lg:justify-between lg:items-center '>
          <div className='flex justify-between  py-4'>
          <div className='flex gap-5 items-center' >
            <img src="./logo.png" alt="dog logo" className='w-12'/>
            <p className='text-2xl font-bold'>Pawstor</p>
          </div>
          <div className='flex items-center gap-4 lg:hidden'>
            <Link to={'/cart'} className='flex'><IoCartOutline/>
            {reduxCart && reduxCart.length > 0 ? 
           (<sup className='bg-[red] flex justify-center items-center rounded-full w-4 h-4 font-[700] text-white  text-[0.7rem] '>{reduxCart.length}</sup>)
           :null
          }
            </Link>
            {reduxUser ? 
              (<>
                <p className='text-[blue]'>{reduxUser.name.toUpperCase()}</p>
                <button type='button' onClick={logoutHandle}>Logout</button>
                </>
                
              ):
              (
                <Link to={"/login"}>Log in</Link>)
                }
            
            <FaHamburger className={`lg:hidden ${!hamBurger ? "block" : "hidden"} cursor-pointer`} onClick={openHeader}/>
          </div>
          </div>
          <div className={`border border-black flex justify-between lg:p-0 p-3 my ${!hamBurger? "hidden" :"block"} lg:flex  lg:border-none`}>
          <div className={` items-center gap-6  lg:flex lg:flex-row flex flex-col justify-start  lg:p-0 p-5 mt-3` }>
            <Link to={"/"}> Home</Link>
            <Link to={"/bread"}> Breeds</Link>
            <Link to={"/accessories"}> Accessories</Link>
            <Link to={"/contact"}> Contact</Link>
            <form  className='flex items-center bg-white px-3 py-1 rounded-xl '
            onSubmit={formHandle}> 
              <input type="text" placeholder='Search for pets...' name='search'  className='outline-none'/>
              <button><BiSearch/></button>
            </form>
          </div>
          <IoMdClose onClick={closeHeader} className='cursor-pointer text-xl lg:hidden'/>
          </div>
          <div className='lg:flex items-center gap-4 hidden'>
           <Link to={'/cart'} className='flex'><IoCartOutline className='text-2xl cursor-pointer'/>
           {reduxCart && reduxCart.length > 0 ? 
           (<sup className='bg-[red] flex justify-center items-center rounded-full w-4 h-4 font-[700] text-white  text-[0.7rem] '>{reduxCart.length}</sup>)
           :null
          }
          
          </Link>
          
    
          {reduxUser ? 
              (<>
                <p className='text-[blue]'>{reduxUser.name.toUpperCase()}</p>
                <button type='button' onClick={logoutHandle}>Logout</button>
                </>
                
              ):
              (
                <Link to={"/login"}>Log in</Link>)
                }
            <FaHamburger className={`lg:hidden ${!hamBurger ? "block" : "hidden"} cursor-pointer`} onClick={openHeader}/>
          </div>
        </div>
        </div>
    </>
  )
}
