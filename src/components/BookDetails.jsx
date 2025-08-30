import { useEffect, useState } from 'react';
import { useParams, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import toast from "react-hot-toast";
import { useAuth } from '../Context/AuthProvider';

export default function BookDetails() {
    const [authUser, setAuthUser] = useAuth();
    const { id } = useParams();  //to get the id of book(fetch from react component to send to backend)
    const [book, setBook] = useState(null);
    const [summary, setSummary] = useState("");
    const [loadingSummary, setLoadingSummary] = useState(false);
    const navigate = useNavigate();  //to navigate back page


    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/book/${id}`);  //this is request to backend
                // console.log(response.data);
                setBook(response.data);
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };
        fetchBook();
    }, [id]);


    const fetchSummary = async () => {
        setLoadingSummary(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/book/${id}/summary`);
            setSummary(response.data.summary);
        } catch (error) {
            console.error("Error fetching summary:", error);
        } finally {
            setLoadingSummary(false);
        }
    };
    const handleAddCart = async () => {

        try {
            if (!authUser) {
                navigate("/signup");
                toast.error("Sign Up or Log in First")
                return;
            }
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/addtocart`, {
                userId: authUser._id,
                bookId: id
            });
            console.log(response.data);
            toast.success(book.title + " " + response.data.message);

        } catch (error) {
            console.error("Error while adding to cart", error.response.data.message);
            toast.error(error.response.data.message);
        }
    }



    const handleGoBack = () => {
        navigate(-1); // Goes back one step in history
    };

    if (!book) return <div className="text-center mt-20">Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="max-w-screen-xl mx-auto px-4 py-16 relative mt-20">
                {/* Back Button */}
                <button
                    onClick={handleGoBack}
                    className="absolute top-4 left-4 flex items-center gap-2 text-black hover:text-gray-600 transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    <span>Go Back</span>
                </button>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left side - Image */}
                    <div className="flex justify-center items-center">
                        <img
                            src={book.url}
                            alt={book.title}
                            className="max-h-[500px] object-contain shadow-lg rounded-lg"
                        />
                    </div>

                    {/* Right side - Details */}
                    <div className="flex flex-col space-y-4">
                        <h1 className="text-3xl font-bold">{book.title}</h1>
                        <p className="text-xl font-semibold">Author: {book.authorname}</p>
                        <p className="text-gray-600">{book.description}</p>

                        <div className="border-t border-gray-200 py-4">
                            <p className="text-2xl font-bold">${book.price}</p>
                            {book.availability ? <p className="text-green-600">In Stock</p> : <p className="text-red-600">Out of Stock</p>}
                        </div>


                        <div className="flex gap-4 mt-6 mb-6">
                            <button className="btn bg-black text-white hover:bg-white hover:text-black border border-black px-8 py-2 rounded-lg" onClick={() => { authUser ? toast.success("Order Sucsessful. Thank you") : toast.error("Login to order") }}>
                                Buy Now
                            </button>
                            <button className="btn bg-white text-black border border-black px-8 py-2 rounded-lg hover:bg-black hover:text-white" onClick={handleAddCart}>
                                Add to Cart
                            </button>
                        </div>



                        <div className="h-[220px] border border-gray-300 rounded-lg shadow-lg p-4 overflow-y-auto">
                            <h2 className="text-xl font-semibold mb-4">AI Summary of the book</h2>

                            {loadingSummary ? (
                                <p className="text-gray-500 italic">Generating AI summary...it may take few seconds</p>
                            ) : summary ? (
                                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{summary}</p>
                            ) : (
                                <button
                                    onClick={fetchSummary}
                                    className="btn bg-black text-white hover:bg-white hover:text-black border border-black px-8 py-2 rounded-lg"
                                >
                                    Generate Summary
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </div>


            <Footer />
        </>
    );
}