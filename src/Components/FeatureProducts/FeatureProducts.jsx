import axios from 'axios'
import React, { useContext } from 'react'
import Loder from '../Loder/Loder'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext/CartContext'


export default function FeatureProducts() {

  // استخدام Context الخاص بـ Cart
  let { addProduct } = useContext(CartContext);

  // دالة لإضافة المنتج إلى السلة
  async function handleAddToCart(productId) {
    try {
      let data = await addProduct(productId);
      console.log(data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  // دالة لجلب المنتجات من API
  function getProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }

  // استخدام React Query لجلب البيانات
  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["featureProducts"],
    queryFn: getProduct
  })

  // التأكد من وجود البيانات قبل التكرار عليها
  const products = data?.data?.data || [];

  return (
    <>
      {isLoading ? (
        <Loder />
      ) : isError ? (
        <div className="text-red-500  text-center mt-4">Error: {error.message}</div>
      ) : (
        <div className="transition-colors duration-500 bg-white dark:bg-gray-900">
          <div className="pl-12 py-3">
            <h1 className="text-3xl font-bold text-center my-2 text-purple-600 dark:text-white">
              Products
            </h1>
          </div>

          <div className="flex flex-wrap container justify-center gap-6 p-4 bg-white dark:bg-gray-900 transition-colors duration-300">
            {products.map((product) => (
              <div
                key={product._id}
                className="product container w-72 border border-gray-400 dark:border-gray-700 rounded-2xl shadow-lg p-4 flex flex-col bg-white dark:bg-gray-800 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-purple-500 dark:hover:border-purple-400 hover:-translate-y-3"
              >
                <Link to={`/productDetails/${product._id}/${product.category.name}`}>
                  <div className="w-full h-64 flex items-center justify-center mb-4 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <h2 className="text-lg font-semibold text-purple-600 mb-1 text-gray-800 dark:text-white">
                    {product.title}
                  </h2>
                  <p className="text-black dark:text-gray-300 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mt-2 mb-4">
                    <span className="text-green-600 font-bold">${product.price}</span>
                    <span className="text-yellow-500 text-sm flex items-center gap-1">
                      ⭐ {product.ratingsAverage}
                    </span>
                  </div>
                </Link>

                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="flex-1 btn text-xl py-1 bg-purple-300 text-white rounded-md hover:bg-purple-900 transition-colors duration-300"
                  >
                    Add To Cart
                  </button>
                  <button className="w-10 h-10 btn bg-gray-200 dark:bg-gray-700 text-red-500 rounded-md hover:bg-red-100 dark:hover:bg-red-300 transition">
                    ❤️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
