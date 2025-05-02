import React from 'react'
import Loder from '../Loder/Loder'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Helmet } from 'react-helmet'

export default function Categories() {
  // دالة جلب البيانات من API
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  // استخدام React Query لجلب البيانات
  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
    staleTime: 10000,
  });

  // في حالة وجود خطأ
  if (isError) {
    return (
      <div className="text-red-500 text-center py-10">
        Error loading categories: {error.message}
      </div>
    );
  }

  // إذا كانت البيانات فارغة أو غير موجودة
  const categories = data?.data?.data || [];

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-gray-900 py-10 px-4">
      <Helmet>
        <title>Our Categories</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-center mb-8 text-purple-600 dark:text-white">
        Our Categories
      </h1>

      {/* إذا كانت البيانات في حالة تحميل */}
      {isLoading ? (
        <Loder />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {categories.map((category) => (
            <div
              key={category._id}
              className="w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-4 flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:border-purple-500 dark:hover:border-purple-400 hover:-translate-y-3 transform"
            >
              <div className="w-[200px] h-[200px] mb-4 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-xl font-extrabold text-purple-600 dark:text-white text-center">
                {category.name}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
