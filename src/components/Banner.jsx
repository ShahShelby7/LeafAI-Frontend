import { Lightbulb, ShoppingCart, BookOpen, Bot, Sparkles, ChevronDown } from "lucide-react";
import { useAuth } from "../Context/AuthProvider";

export default function Banner() {
    const [authUser, setAuthUser] = useAuth();
    return (
        <>
            {/* Banner Section */}
            <div className="max-w-screen-2xl container mx-auto md:px-16 px-4 py-7 flex md:flex-row flex-col mt-7">
                {/* Left part */}
                <div className="md:w-1/2 w-full md:mt-32 mt-12 md:order-1 order-2">
                    <h1 className="text-3xl font-bold mb-6">
                        Discover Books Smarter with {" "}
                        <span className="text-black">AI</span>
                    </h1>
                    <p className="text-xl text-black-700">
                        Our friendly AI tools not only creates quick, easy-to-digest <b>summaries</b> that capture the heart of every story, but also offers personalized book picks based on your mood and interests with <b>AI Guide</b>+. Browse with ease, compare your options, and pick the book that feels just right for you. No stress, just more time enjoying great stories.
                    </p>
                    {!authUser ? < a
                        className="btn bg-black text-white rounded-500 mt-8 hover:bg-white hover:text-black hover:border-black"
                        href="/signup"
                    >
                        Join for free
                    </a> : <a
                        className="btn bg-black text-white rounded-500 mt-8 hover:bg-white hover:text-black hover:border-black"
                        href="#features"
                    >
                        Explore more
                    </a>}
                </div>

                {/* Right part */}
                <div className="md:w-1/2 w-full md:mt-30 md:mb-10 mt-20 md:ml-40 order-1 flex justify-center">
                    <img src="./Banner.png" alt="Banner" className=" w-full h-auto md:h-[370px] md:w-[500px]" />
                </div>

                {/* Scroll Down Indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                    <a href="#features">
                        <ChevronDown className="w-8 h-8 text-gray-600 animate-bounce cursor-pointer" />
                    </a>
                </div>
            </div >

            {/* Top Highlighted AI Features */}
            < div id="features" ></div >
            <div className="max-w-screen-2xl container mx-auto md:px-16 px-6 mt-20 mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Game-Changing AI Features
                </h2>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                    {/* AI Summary */}
                    <div className="shadow-lg p-8 rounded-2xl hover:shadow-2xl transition-all bg-white">
                        <div className="flex items-center gap-4 mb-4">
                            <Sparkles className="w-10 h-10 text-black" />
                            <h3 className="text-2xl font-semibold">AI-Powered Summaries</h3>
                        </div>
                        <p className="text-lg text-gray-700">
                            A <strong>never-before feature</strong>! Get smart, concise,
                            and human-like summaries that let you understand the essence
                            of a book in seconds. Save time and make confident choices.<br />📍You’ll find this feature inside every book details page, where the AI summary is displayed before you buy.
                        </p>
                    </div>

                    {/* AI Smart Recommendations */}
                    <div className="shadow-lg p-8 rounded-2xl hover:shadow-2xl transition-all bg-white">
                        <div className="flex items-center gap-4 mb-4">
                            <Lightbulb className="w-10 h-10 text-black" />
                            <h3 className="text-2xl font-semibold">AI Smart Book Picks (Mood-Based)</h3>
                        </div>
                        <p className="text-lg text-gray-700">
                            Discover books that truly match your vibe! Our AI listens to your mood and interests, then suggests books that fit your exact reading energy. No more endless scrolling.<br />
                            📍 Try it out at the AI Guide+ page, where you can enter your mood and instantly get book picks.</p>
                    </div>
                </div>
            </div>

            {/* Other Features */}
            <div className="max-w-screen-2xl container mx-auto md:px-16 px-6 mt-10 mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">
                    From Shelf to Doorstep
                </h2>

                <div className="grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-8">
                    <div className="shadow-lg p-6 rounded-2xl hover:shadow-xl transition-all bg-white">
                        <div className="flex items-center gap-3 mb-3">
                            <ShoppingCart className="w-7 h-7 text-black" />
                            <h3 className="text-xl font-semibold">Easy Shopping</h3>
                        </div>
                        <p className="text-gray-600">
                            Add books to your cart, checkout smoothly, and enjoy a seamless shopping experience.
                        </p>
                    </div>

                    <div className="shadow-lg p-6 rounded-2xl hover:shadow-xl transition-all bg-white">
                        <div className="flex items-center gap-3 mb-3">
                            <BookOpen className="w-7 h-7 text-black" />
                            <h3 className="text-xl font-semibold">Track Your Library</h3>
                        </div>
                        <p className="text-gray-600">
                            Manage your personal book collection and never lose track of what you own or want to read.
                        </p>
                    </div>
                </div>
            </div>

            {/* Future Upgrades Section */}
            <div className="max-w-screen-2xl container mx-auto md:px-16 px-6 mt-10 mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Next Chapter.. In the Works
                </h2>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                    {/* AI Chatbot */}
                    <div className="shadow-md p-6 rounded-xl hover:shadow-lg transition-all bg-white">
                        <div className="flex items-center gap-3 mb-3">
                            <Bot className="w-7 h-7 text-gray-600" />
                            <h3 className="text-xl font-semibold">AI Chatbot Guide (Coming Soon)</h3>
                        </div>
                        <p className="text-gray-600">
                            Your personal reading assistant! Chat with our AI just like you would with a friend—it helps you explore new genres, ask questions, and even find hidden gems you might have missed.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
