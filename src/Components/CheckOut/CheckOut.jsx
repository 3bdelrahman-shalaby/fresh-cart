import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext/CartContext';

export default function CheckOut() {
   let {onlinePayment , cashPayment}= useContext(CartContext)
   const [paymentType, setpaymentType] = useState(null)
   let {state} = useLocation() 
   console.log(state.type);
  
   useEffect(() => {
    setpaymentType(state.type)
   }, [])
   

   async function paymentOnline(values){
    if(paymentType == "online payment"){
        await onlinePayment(values)
    }else{
        await cashPayment(values)
        
    }
   }
  

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (values) => {
        // console.log(values);
        paymentOnline(values)
    
        
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-900">
      <form onSubmit={formik.handleSubmit} className="p-6 rounded-lg shadow-lg w-full max-w-md dark:bg-gray-800 bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-main text-center">Order Details Of {paymentType} </h2>
        
        {/* Details */}
        <div className="mb-4">
          <label className="block text-xl mb-2" htmlFor="details">Details</label>
          <textarea
            onChange={formik.handleChange}
            value={formik.values.details}
            onBlur={formik.handleBlur}
            id="details"
            className="w-full p-3 rounded-md focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-500 bg-gray-200 text-gray-900 focus:ring-blue-500"
            rows="4"
            placeholder="Enter details..."
          />
        </div>
        
        {/* Phone */}
        <div className="mb-4">
          <label className="block text-xl mb-2" htmlFor="phone">Phone</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.phone}  
            onBlur={formik.handleBlur}
            id="phone"
            type="tel"
            className="w-full p-3 rounded-md focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-500 bg-gray-200 text-gray-900 focus:ring-blue-500"
            placeholder="Enter your phone number"
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block text-xl mb-2" htmlFor="city">City</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.city}  
            onBlur={formik.handleBlur}
            id="city"
            type="text"
            className="w-full p-3 rounded-md focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-500 bg-gray-200 text-gray-900 focus:ring-blue-500"
            placeholder="Enter your city"
          />
        </div>

        <button

        disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="w-full p-3 rounded-md transition duration-300 dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-700 bg-blue-500 text-white border border-blue-500 hover:bg-indigo-700"
        >
          PayNow
        </button>
      </form>
    </div>
  );
}
