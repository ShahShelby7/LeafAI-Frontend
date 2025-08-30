import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function MoodRecommendation() {
    const [mood, setMood] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRecommendations = async () => {
        if (!mood) return;
        setLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/recommend`, { mood });
            setBooks(res.data);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
        setLoading(false);
    };


    return (
        <>
            <Navbar />
            <div className="max-w-screen-2xl container mx-auto px-4 md:px-16 mt-20 min-h-[450px]">
                <h1 className="text-3xl font-bold text-center mb-6 flex justify-center items-center gap-2">
                    <BsEmojiSmileFill />
                    AI Mood-Based Book Recommendations
                </h1>


                {/* Mood Input */}
                <div className="flex justify-center items-center gap-3 mb-6">
                    <input
                        type="text"
                        placeholder="Enter your mood (e.g., happy, adventurous, sad)"
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        className="input input-bordered w-80"
                    />
                    <button
                        onClick={fetchRecommendations}
                        className="btn bg-black text-white hover:bg-white hover:text-black hover:border-black"
                    >
                        Ai+ Recommend
                    </button>
                </div>

                {loading && <p className="text-center">✨ Ai is Finding the best books for you...</p>}

                {/* Results */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {books.map((book, idx) => (
                        <div key={idx} className="card bg-base-100 shadow-xl hover:scale-105 duration-150 mr-4 w-70 h-[350px]">
                            <figure>
                                <img className="h-40 object-cover"
                                    src={book.cover}
                                    alt={book.title}
                                />
                            </figure>
                            <div className="card-body h-15">
                                <h2 className="card-title">{book.title}</h2>
                                <p>Written By {book.author}</p>

                                <div className="card-actions justify-between">
                                    {book.available ? (
                                        <>
                                            <div className="badge badge-outline mt-4">Available</div>
                                            <a href={`/book/${book.id}`} className="btn h-5 w-30 rounded-full hover:bg-black hover:text-white">
                                                More details
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <div className="badge badge-outline mt-4">Not in Store</div>
                                            <button disabled className="btn h-5 w-30 rounded-full bg-gray-300 text-white">
                                                Unavailable
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                    ))}

                </div>
            </div>
            <Footer />
        </>
    );
}
