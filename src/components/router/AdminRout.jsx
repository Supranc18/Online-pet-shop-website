import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import AdminHeader from '../Admin page/AdminHeader';
import { useDispatch, useSelector } from 'react-redux'
import { setuser } from '../../redux/slice/userSlice';


export default function AdminRout() {

  const dispatch =useDispatch()

  let reduxUser = useSelector((store) => {
    return store.user.value
  })
  let navigat = useNavigate()

  function logoutHandle() {
    dispatch(setuser(localStorage.removeItem('token')))
    navigat('/')
    
  }
  return (
    <>
       <div className='flex justify-between items-center px-12 py-4 border-b-2'>
        <div className='flex items-center gap-20'>
            <h1  className=' text-[1.2rem] font-[600]'>Pawstore Admin</h1>
            <p className='text-[blue] font-[600] pl-5'>{reduxUser.name.toUpperCase()}</p>
            </div>
        <div>
            <button type='button' onClick={logoutHandle}>
                <Link>Logout</Link>
            </button>
        </div>
        
    </div>
      <div className='grid grid-cols-5'>
        <div className='col-span-1'>
          <AdminHeader />
        </div>
        <div className='col-span-4'>
          <Outlet />
        </div>
        </div>

      </>
      )
}
