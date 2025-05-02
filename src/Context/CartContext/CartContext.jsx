import { data } from "autoprefixer";
import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props) {
    const [cartId, setCartId] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    let headers = {
        token: localStorage.getItem("userToken")
    };

    // التحقق من وجود التوكن
    if (!headers.token) {
        console.error("No user token found. Please log in.");
    }

    // دالة لإضافة منتج للسلة
    async function addProduct(productId) {
        try {
            const response = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId }, { headers });
            setCartId(response.data.data._id);
            console.log(response);
            
            setTotalPrice(response.data.data.totalCartPrice);
            toast.success(response.data.message);
            return response;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error adding product to cart");
            console.error("Error adding product to cart:", error);
            return error;
        }
    }

    // دالة لجلب المنتجات في السلة
    async function getProductToCart() {
        try {
            const response = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers });
            setCartId(response.data.data._id);
            setTotalPrice(response.data.data.totalCartPrice);
            return response;
        } catch (error) {
            console.error("Error fetching cart data:", error);
            return error;
        }
    }

    // دالة لحذف منتج من السلة
    async function deleteProduct(productId) {
        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers });
            setTotalPrice(response.data.data.totalCartPrice);
            return response;
        } catch (error) {
            console.error("Error deleting product from cart:", error);
            return error;
        }
    }

    // دالة لتحديث السلة
    async function updateCart(productId, count) {
        try {
            const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers });
            setTotalPrice(response.data.data.totalCartPrice);
            setCartId(response.data.data._id);
            return response;
        } catch (error) {
            console.error("Error updating cart:", error);
            return error.response;
        }
    }

    // دالة لتفريغ السلة
    async function clearCart() {
        try {
            const response = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", { headers });
            setTotalPrice(0);
            return response;
        } catch (error) {
            console.error("Error clearing the cart:", error);
            return error;
        }
    }

    // دالة للدفع عبر الإنترنت
    async function onlinePayment(shippingAddress) {
        try {
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, { shippingAddress }, { headers });
            window.location.href = response.data.session.url;
            return response;
        } catch (error) {
            console.error("Error during online payment:", error);
            return error;
        }
    }

    // دالة للدفع عند الاستلام
    async function cashPayment(shippingAddress) {
        try {
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, { shippingAddress }, { headers });
            window.location.href = "http://localhost:5173/allorders";
            return response;
        } catch (error) {
            console.error("Error during cash payment:", error);
            return error;
        }
    }

    return (
        <CartContext.Provider value={{
            addProduct,
            totalPrice,
            deleteProduct,
            updateCart,
            clearCart,
            getProductToCart,
            onlinePayment,
            cashPayment
        }}>
            {props.children}
        </CartContext.Provider>
    );
}
