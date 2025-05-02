import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { TokenContext } from '../../Context/TokenContext';
import { Helmet } from 'react-helmet';

export default function Login() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 

  let { token, setToken } = useContext(TokenContext);

  async function callLogin(callBody){
    setErrorMessage("");
    setIsLoading(true);
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', callBody);
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setToken(data.token);
        console.log( data.token);
        
        navigate('/');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.response?.data?.message || 'An error occurred');
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required('Password is required')
  });

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: callLogin
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
     <div className="py-16 bg-gray-100 dark:bg-gray-800">

     <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl shadow-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Login</h2>
          
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
          
          <form onSubmit={loginForm.handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={loginForm.values.email} 
                onChange={loginForm.handleChange} 
                onBlur={loginForm.handleBlur} 
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
              />
              {loginForm.errors.email && loginForm.touched.email && <div className="text-red-500 text-xs mt-1">{loginForm.errors.email}</div>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={loginForm.values.password} 
                onChange={loginForm.handleChange} 
                onBlur={loginForm.handleBlur} 
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
              />
              {loginForm.errors.password && loginForm.touched.password && <div className="text-red-500 text-xs mt-1">{loginForm.errors.password}</div>}
            </div>

            {/* Register Link */}
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-gray-500 dark:text-gray-300">Don't have an account? <Link to="/register" className="text-blue-500">Register now</Link></p>
              <button 
                type="submit" 
                className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={!(loginForm.isValid && loginForm.dirty)}
              >
                {isLoading ? <i className="fa fa-spinner fa-spin"></i> : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </section>
     </div>
    </>
  );
}
