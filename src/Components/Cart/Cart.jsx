// import React, { useContext, useState } from 'react'
// import { useEffect } from 'react';
// import { CarContext } from '../../Context/CartContext/CartContext';
// import Loder from '../Loder/Loder';
// import { Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet';

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([])
//   const [loder, setLoder] = useState(true)
// let {getToCart , removeCartItem , clearCart ,totalCartPrice ,updateCartItem} = useContext(CarContext);

// async function getCart(){
//  let {data} = await getToCart();
//  console.log(data.data.products);
//  setCartItems(data.data.products)
//  setLoder(false)
// }
// useEffect(() => {

//   getCart()
// }, [])

// async function removeItem(productId){
//   let {data} = await removeCartItem(productId);
//   console.log(data);
//   setCartItems(data.data.products)
// }

// async function Clear(){
//   let {data} = await clearCart();
//   console.log(data);
//   setCartItems([])
// }

// async function updateItem(productId , count){
//   let {data} = await updateCartItem(productId , count);
//   console.log(data);
//   setCartItems(data.data.products)
// }

//   return (
//     <>
//      <Helmet>
//                 <meta charSet="utf-8" />
//                 <title>Cart</title>
//             </Helmet>


// {loder?<Loder/>:<div className=" container w-5/6 mx-auto my-10 relative overflow-x-auto shadow-md sm:rounded-lg">
// <div className=" flex-wrap flex my-3">

//        <p className=' w-1/2 font-extrabold text-2xl py-5 text-black' colSpan={2}>Total Price :   <span className=' text-main'> {totalCartPrice}</span><span className=' text-black font-extrabold text-xl  '> EGP</span></p>
     
// </div >
//   <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//     <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//       <tr>
//         <th scope="col" className="px-16 py-3">
//           <span className="sr-only">Image</span>
//         </th>
//         <th scope="col" className=" text-xl font-extrabold text-center  text-black px-6 py-3">
//           Product
//         </th>
//         <th scope="col" className="text-xl font-extrabold text-center text-black px-6 py-3">
//           Qty
//         </th>
//         <th scope="col" className="text-xl font-extrabold text-center text-black px-6 py-3">
//          Unit Price
//         </th>
//         <th scope="col" className="text-xl font-extrabold text-center text-black px-6 py-3">
//          Total Price
//         </th>
//         <th scope="col" className="text-xl font-extrabold text-center text-black px-6 py-3">
//           Action
//         </th>
//       </tr>
//     </thead>
//     <tbody>
// {cartItems.map((item)=>
//   <tr key={item.product.id} className="bg-white  border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
//   <td className="p-4">
//     <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
//   </td>
//   <td className="px-6 text-main text-center py-4 font-semibold text-gray-900 dark:text-white">
//     {item.product.title.split(" ").slice(0,2).join(" ")}
//   </td>
//   <td className="px-6 py-4">
//     <div className="flex items-center  text-black font-bold text-xl">
//       <button onClick={()=>updateItem(item.product.id , item.count-1)} className="inline-flex  items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-black bg-white border border-black rounded mx-3" type="button">
//         <span className="sr-only ">Quantity button </span>
//         <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
//           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
//         </svg>
//       </button>
//       <div>
//          <span>{item.count}</span>
//       </div>
//       <button onClick={()=>updateItem(item.product.id , item.count+1)} className="inline-flex  items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-black bg-white border border-black rounded  " type="button">
//         <span className="sr-only ">Quantity button</span>
//         <svg className="w-3 h-3 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
//         </svg>
//       </button>
//     </div>
//   </td>
//   <td className="px-6 py-4 font-bold text-center font-semibold text-black dark:text-white">
//     {item.price} EGP
//   </td>
//   <td className="px-6 py-4 font-semibold text-center text-black dark:text-white">
//   {item.price * item.count} EGP
//   </td>
//   <td className="px-6 py-4 text-center">
//     <button onClick={()=>removeItem(item.product.id)} className="font-medium border border-red-500  bg-white-600 py-1 px-2 rounded-lg text-red-600 hover:text-white hover:bg-red-600 "><i className='fa fa-trash'></i> Remove</button>
//   </td>
// </tr>
// )}
// <tr className=' p-10'>
//   <td colSpan={3} className='py-5 text-center'><button onClick={()=>Clear()} className='font-bold text-xl border border-red-500  bg-white-600 py-1.5 px-3 rounded-lg text-red-600 hover:text-white hover:bg-red-600   '>Delete Your Cart</button></td>


//   <td colSpan={3} className='py-5 text-center'><Link to="/CheckOut" onClick={()=>Clear()} className='font-bold text-xl border border-[#15d615]  bg-white-600 py-1.5 px-3 rounded-lg text-main hover:text-white hover:bg-[#15d615] '>Checkout</Link></td>
// </tr>
//     {/* <tr className="bg-white  border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
//        <td className=' font-extrabold text-xl     py-5 text-black' colSpan={2}>Total Cart Price :</td>
//       <td className=' text-main py-5 font-extrabold text-xl  ' colSpan={4}>{totalCartPrice} <span className=' text-black font-extrabold text-xl  '>EGP</span></td>

//     </tr> */}
//     </tbody>
//   </table>
// </div>}




    
//     </>
//   )
// }
// import React, { useContext, useState } from 'react'
// import { useEffect } from 'react';
// import { CarContext } from '../../Context/CartContext/CartContext';
// import Loder from '../Loder/Loder';
// import { Link } from 'react-router-dom';

import React, {  useContext, useEffect } from 'react'
import { CartContext } from '../../Context/CartContext/CartContext';
import { useState } from 'react'

import { Link } from 'react-router-dom'
import Loder from '../Loder/Loder';

export default function Cart() {
  const [loder, setloder] = useState(true)
  const [cart, setCart] = useState([])

  let { getProductToCart, clearCart, deleteProduct, totalPrice, updateCart } = useContext(CartContext)

  async function getCart() {
    let response = await getProductToCart()
    // console.log(response);
    setloder(false)

    setCart(response?.data?.data)
  }



  async function updateitem(id, count) {
    const response = await updateCart(id, count);

    if (response?.data?.status === 'success') {
      setCart(response.data.data);

    } else {
      console.log('Failed to update item', response?.data?.message || response);
    }
  }


  async function deleteItem(id) {
    let response = await deleteProduct(id);
    if (response?.data?.status === 'success') {
      setCart(response.data.data);
    } else {
      console.log('Failed to delete item', response);
    }
  }


  async function clearToCart() {
    try {
      let response = await clearCart();

      setCart([]);
    } catch (error) {
      console.error('Error clearing the cart:', error);

    }
  }


  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };




  useEffect(() => {
    getCart()

  }, [])

  return (
    <>


      {loder ? <Loder /> : <div className="relative m-3 my-12  mb-10 container mx-auto   overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 pt-3 capitalize  bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 text-center font-extrabold text-xl py-3">Image</th>

              <th scope="col" className="px-6 text-center font-extrabold text-xl py-3">Product</th>
              <th scope="col" className="px-6 text-center font-extrabold text-xl py-3">Qty</th>
              <th scope="col" className="px-6 text-center font-extrabold text-xl py-3">Uint Price</th>
              <th scope="col" className="px-6 text-center font-extrabold text-xl py-3">Total Price</th>
              <th scope="col" className="px-6  text-center font-extrabold text-xl py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart?.products?.map((item) => <tr key={item.product.id} className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="p-4">
                <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full rounded" alt="iPhone 12" />
              </td>
              <td className="px-6 py-4 font-semibold text-purple-600 dark:text-white">{item.product.category.name}</td>
              <td className="px-6 py-4">
                <div className="flex justify-center items-center space-x-3">
                  {/* زرار ناقص */}
                  <button
                    onClick={() => updateitem(item.product._id, item.count - 1)}

                    type="button"
                    className="h-8 w-8 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 18 2" xmlns="http://www.w3.org/2000/svg">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>


                  <span className="w-16 text-center bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg py-1.5 px-3 inline-block">
                    {item.count}
                  </span>


                  {/* زرار زائد */}
                  <button
                    onClick={() => updateitem(item.product._id, item.count + 1)}

                    type="button"
                    className="h-8 w-8 rounded-xl  flex items-center justify-center text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>


              </td>
              <td className="px-6 py-4 text-green-600 font-bold">${item.price}</td>
              <td className="px-6 py-4 text-green-600 font-bold">${item.price * item.count}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => deleteItem(item.product._id)}
                  className="text-white  bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Remove
                </button>
              </td>


            </tr>)}
            <tr  >
              <td className='  p-4 text-center font-extrabold text-xl '>
                <p className=' mb-16 text-main text-2xl font-bold'>${totalPrice}</p>

              </td>
              <td colSpan={4} className=' text-center  p-4'>
                <button

                  onClick={() => clearToCart()}
                  className="text-white me-5 mb-16 bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-7 py-3 text-center"
                >
                  Clear Cart
                </button>

              </td>
              <td className=' p-4' >
       

                <div className="relative mb-16 inline-block text-left">
                  {/* الزر */}
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-main text-white px-4 py-2 text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    onClick={toggleDropdown}
                  >
                    Checkout

                    <svg className="-mr-1 ml-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7l7 7 7-7"></path>
                    </svg>
                  </button>

                  {/* قائمة الخيارات المنسدلة */}
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Link to="/checkout"  state={{type : "online payment"}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-400">Online Payment </Link>
                        <Link to="/checkout" state={{type : "cash payment"}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-400">Cash Payment</Link>
                      </div>
                    </div>
                  )}
                </div>

              </td>
            </tr>
          </tbody>
        </table>
      </div>}








    </>
  )
}
