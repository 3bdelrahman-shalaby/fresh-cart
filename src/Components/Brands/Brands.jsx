import React from 'react'
import Loder from '../Loder/Loder'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import Slider from 'react-slick'

export default function Brands() {

 function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  let { data, isError, error ,isLoading } = useQuery({
    queryKey: ["Brands"],
    queryFn: getBrands,
    staleTime :10000
  });

  if (isError)
    return (
      <div className="text-red-500 text-center py-10">
        Error loading brands: {error.message}
      </div>
    );

  const brands = data?.data?.data || [];



  return (
    
  <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-gray-900 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-600 dark:text-white">
        Our Brands
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {brands.map((brand) => (
          <div
          key={brand._id}
 
        className="w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-4 flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:border-purple-500 dark:hover:border-purple-400 hover:-translate-y-3 transform"
           >
            <div className="w-28 h-30 mb-4 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center overflow-hidden">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-xl font-extrabold  text-purple-600 dark:text-white text-center">
              {brand.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}
