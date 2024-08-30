import React from 'react'

export default function Contact() {
  return (
    <>
      <div className='flex lg:flex-row flex-col container lg:gap-[100px] my-10'>
        <div className='flex flex-col items-center'>
          <p className='text-[1.5rem] font-[700] w-[150px]'>Contact Us</p>
          <img src="./contact.jpg" alt="dogs"
        className='container w-[200px] my-10'  />
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, laborum enim soluta, quos vitae commodi asperiores, corrupti ut veritatis facere libero tempore voluptatum eveniet iusto tempora quis numquam fuga inventore repellat vel? Hic, repellendus quo odio fuga quaerat distinctio natus itaque corrupti ut veritatis facere libero tempore voluptatum eveniet iusto tempora quis numquam fuga inventore repellat vel? Hic, repellendus quo odio fuga quaerat distinctio natus itaque </p>
        </div>
      </div>

      <div className=' bg-[#FEC23E] p-5'>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3796.131545206991!2d85.36855257663362!3d27.692666981030605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1a3afcb176b5%3A0xe1b34bc1e9f9b0df!2sBig%20Mart!5e0!3m2!1sen!2snp!4v1724658125083!5m2!1sen!2snp" width="100%" height="350"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
      className='container'></iframe>
      </div>
      
      <div className='container  bg-[#FEC23E] p-5 px-20 my-5'>
        <form className='flex flex-col gap-5'>
          <p>Drop us Feed back</p>
          <label htmlFor="name">Name*</label>
          <input type="text" name='name' placeholder='name'
          className='p-2'/>
          <label htmlFor="email">Email*</label>
          <input type="email" name='email' placeholder='example@example.com'
          className='p-2'/>
          <label htmlFor="message">Message*</label>
          <textarea name="message" id="message"></textarea>
          <button className='py-2 bg-white max-w-[100px] ml-[40%] rounded-lg'>Send Email</button>
        </form>
      </div>
    </>
  )
}
