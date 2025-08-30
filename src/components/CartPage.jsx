import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import toast from "react-hot-toast";

export default function CartPage() {
    const { id } = useParams(); // userId
    const [cart, setCart] = useState([]);

    //get cart details from backend (user data)
    useEffect(() => {
        const getCart = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/cart/${id}`);
                console.log(response.data);
                setCart(response.data); // backend returns populated cart(with book details)
            } catch (error) {
                console.error("Error fetching cart", error);
            }
        };
        getCart();
    }, [id]);



    // Increase Quantity
    const handleIncrease = async (bookId) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/cart/increase`, {
                userId: id,
                bookId
            });
            setCart(response.data.cart); // backend returns updated cart
            console.log(response.data.cart);
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error increasing quantity", error);
        }
    };

    // Decrease Quantity
    const handleDecrease = async (bookId) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/cart/decrease`, {
                userId: id,
                bookId
            });
            setCart(response.data.cart); // backend returns updated cart
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error decreasing quantity", error);
        }
    };

    // Remove Book Completely
    const handleRemove = async (bookId) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/cart/remove`, {
                userId: id,
                bookId
            });
            setCart(response.data.cart);
            toast.success("Book removed from cart");
        } catch (error) {
            console.error("Error removing book", error);
        }
    };

    // Calculate subtotal
    const [subtotal, setSubtotal] = useState(0);
    useEffect(() => {
        const total = cart.reduce(
            (sum, item) => sum + (item.bookId?.price || 0) * item.quantity,
            0
        );
        setSubtotal(total);
    }, [cart]);



    return (
        <>
            <Navbar />
            <div className="max-w-screen-xl mx-auto px-4 py-16 mt-20">
                <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

                {cart.length === 0 ? (
                    <p className="text-gray-600 text-lg">Your cart is empty.</p>
                ) : (
                    <div className="space-y-6">
                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition"
                            >
                                {/* Book Image */}
                                <img
                                    src={item.bookId.url}
                                    alt={item.bookId.title}
                                    className="w-24 h-32 object-contain rounded-lg shadow"
                                />

                                {/* Book Details + Actions */}
                                <div className="flex-1 flex flex-col gap-3 w-full">
                                    <h2 className="text-lg md:text-xl font-semibold text-center md:text-left">
                                        {item.bookId.title}
                                    </h2>
                                    <p className="text-gray-600 text-center md:text-left">
                                        By {item.bookId.authorname}
                                    </p>
                                    <p className="text-lg font-bold text-center md:text-left">
                                        ${item.bookId.price}
                                    </p>
                                    <p className="text-sm text-gray-500 text-center md:text-left">
                                        {item.bookId.availability ? "In Stock" : "Out of Stock"}
                                    </p>

                                    {/* Quantity + Remove for Mobile */}
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-4">
                                        <div className="flex items-center justify-center sm:justify-start gap-3">
                                            <button
                                                onClick={() => handleDecrease(item.bookId._id)}
                                                className="px-3 py-1 border rounded-lg hover:bg-gray-200"
                                            >
                                                −
                                            </button>
                                            <span className="text-lg font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => handleIncrease(item.bookId._id)}
                                                className="px-3 py-1 border rounded-lg hover:bg-gray-200"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleRemove(item.bookId._id)}
                                            className="text-red-600 hover:text-red-800 font-medium"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Subtotal + Checkout */}
                        <div className="flex flex-col md:flex-row justify-between items-center mt-10 p-6 bg-gray-100 rounded-2xl shadow-md gap-4">
                            <h2 className="text-xl md:text-2xl font-bold">
                                Subtotal: ${subtotal}
                            </h2>
                            <button
                                onClick={() => toast.success("Proceeding to checkout")}
                                className="bg-black text-white px-6 py-3 rounded-xl hover:bg-white hover:text-black border border-black transition w-full md:w-auto"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}