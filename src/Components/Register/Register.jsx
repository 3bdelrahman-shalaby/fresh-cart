import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Register() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 

  async function callRegister(callBody){
    setErrorMessage("");
    setIsLoading(true);
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', callBody);
      if (data.message === "success") {
        navigate('/login');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.response?.data?.message || 'An error occurred');
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string().min(5, "Name is too short").max(20, "Name is too long").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required('Password is required').min(8, "Password is too short"),
    rePassword: Yup.string().required("Please confirm your password").oneOf([Yup.ref('password')], "Passwords must match"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}/, "Phone number should start with 01 and contain 9 digits")
  });

  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "@gmail.com",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema: validationSchema,
    onSubmit: callRegister
  });

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet> 
     <div className="py-10 bg-gray-100 dark:bg-gray-800">

       <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="w-full py-12 max-w-md mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl shadow-gray-600">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Create an Account</h2>
          
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
          
          <form onSubmit={registerForm.handleSubmit} className="space-y-4 ">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={registerForm.values.name} 
                onChange={registerForm.handleChange} 
                onBlur={registerForm.handleBlur} 
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
              />
              {registerForm.errors.name && registerForm.touched.name && <div className="text-red-500 text-xs mt-1">{registerForm.errors.name}</div>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={registerForm.values.email} 
                onChange={registerForm.handleChange} 
                onBlur={registerForm.handleBlur} 
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
              />
              {registerForm.errors.email && registerForm.touched.email && <div className="text-red-500 text-xs mt-1">{registerForm.errors.email}</div>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={registerForm.values.password} 
                onChange={registerForm.handleChange} 
                onBlur={registerForm.handleBlur} 
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
              />
              {registerForm.errors.password && registerForm.touched.password && <div className="text-red-500 text-xs mt-1">{registerForm.errors.password}</div>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Confirm Password</label>
              <input 
                type="password" 
                id="rePassword" 
                name="rePassword" 
                value={registerForm.values.rePassword} 
                onChange={registerForm.handleChange} 
                onBlur={registerForm.handleBlur} 
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
              />
              {registerForm.errors.rePassword && registerForm.touched.rePassword && <div className="text-red-500 text-xs mt-1">{registerForm.errors.rePassword}</div>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={registerForm.values.phone} 
                onChange={registerForm.handleChange} 
                onBlur={registerForm.handleBlur} 
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
              />
              {registerForm.errors.phone && registerForm.touched.phone && <div className="text-red-500 text-xs mt-1">{registerForm.errors.phone}</div>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-gray-500 dark:text-gray-300">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
              <button 
                type="submit" 
                className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={!(registerForm.isValid && registerForm.dirty)}
              >
                {isLoading ? <i className="fa fa-spinner fa-spin"></i> : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </section>
     </div>
    </>
  );
}
