import React from 'react'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
    <div className='bg-[#eaeaff]'>
    <div className='flex justify-between container  pt-20 flex-wrap gap-5'>
        <div className='flex flex-col gap-7'>
            <Link>Home</Link>
            <Link>About</Link>
            <Link>Services</Link>
            <Link>Contact Us</Link>
        </div>
        <div className='flex flex-col gap-5'>
            <h1>Contact</h1>
            <p>Pepsicola</p>
            <p>Kathmandu, Nepal</p>
            <p>+977-9868675662</p>
        </div>
        <div >
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3796.131545206991!2d85.36855257663362!3d27.692666981030605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1a3afcb176b5%3A0xe1b34bc1e9f9b0df!2sBig%20Mart!5e0!3m2!1sen!2snp!4v1724658125083!5m2!1sen!2snp" max-width="400" height="250"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>

    <div className='container flex justify-between py-10'>
        <p>Copyright @ 2024 Pawstor</p>

        <div className='flex gap-5'>
            <FaFacebook className='text-[1.5rem] text-[blue]'/>
            <FaYoutube className='text-[1.5rem] text-[red]'/>
            <FaInstagram className='text-[1.5rem] text-[#f8889b]'/>

        </div>
        <p>Created by Ankit Karmacharya</p>
    </div>
    </div>
    </>
  )
}
