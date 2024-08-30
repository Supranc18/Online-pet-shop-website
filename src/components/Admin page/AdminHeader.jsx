import React from 'react'

import { Link} from 'react-router-dom'
import { FaClipboardList } from 'react-icons/fa'
import { IoBagAdd } from 'react-icons/io5'
import { MdDashboard } from 'react-icons/md'


export default function AdminHeader() {

    
  return (
    <>
 
    <div>
    <div className='grid '>
                <div className='flex flex-col h-[100vh] py-7 border-r-2'>
                    <div className='flex items-center hover:text-[blue] hover:bg-[#F3F2F7] p-4  cursor-pointer gap-3'>
                        <MdDashboard />
                        <Link >Dashboard</Link>
                    </div>
                    <div className='flex items-center hover:text-[blue] hover:bg-[#F3F2F7] p-4  cursor-pointer gap-3'>
                        <IoBagAdd/>
                        <Link to={"/products/addproduct"} >Add Dogs</Link>
                    </div>
                    <div className='flex items-center hover:text-[blue] hover:bg-[#F3F2F7] p-4  cursor-pointer gap-3'>
                        <FaClipboardList />
                        <Link to={'/products'} >Dogs Lists</Link>
                    </div>
                    <div className='flex items-center hover:text-[blue] hover:bg-[#F3F2F7] p-4  cursor-pointer gap-3'>
                        <IoBagAdd/>
                        <Link to={"/acessories/addacessories"} >Add Acessories</Link>
                    </div>
                    <div className='flex items-center hover:text-[blue] hover:bg-[#F3F2F7] p-4  cursor-pointer gap-3'>
                        <FaClipboardList />
                        <Link to={'/acessories'} >Acessories Lists</Link>
                    </div>
                    
                </div>
            </div>
    </div>
    </>
  )
}
