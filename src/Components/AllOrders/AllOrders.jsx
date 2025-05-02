import React from 'react'
import { Helmet } from 'react-helmet'
import imgg from "../../assets/delif.jpg"
export default function AllOrders() {
  return (
    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Order</title>
            </Helmet>
    <div className='  h-[80vh]'>
      <div className='flex'>
    

        <div className=' w-2/3 text-center  flex justify-center '>  <img className='border border-gray-400 rounded-xl w-[400px] h-[400px]' src={imgg} alt="" /></div>
        <div className=' w-1/3 pt-[170px]  pr-[200px]'>   <h1 className='text-center   text-main text-4xl font-extrabold'> . مسافة السكه</h1></div>
    </div>
    </div>
    </>
  )
}
