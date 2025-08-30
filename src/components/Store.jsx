import { useEffect, useState } from "react";
import axios from 'axios'; //to make api req from frontend
import Card from "./Card";

export default function Store() {
    const [booksList, setBooks] = useState([]);
    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/book`); //api req to backend and backend send the req to database
                console.log(response.data);
                setBooks(response.data);
            }
            catch (error) {
                console.log("error is....", error);
            }
        }
        getBooks();
    }, []);

    return (
        <>
            <div className="max-w-screen-2xl min-h-screen container mx-auto md:px-16 px-4">
                {/* welcome content div */}
                <div className="mt-40 item-center justify-center text-center">
                    <h1 className="text-2xl md:text-4xl">Bring Stories Home—Find the Perfect Book for You.</h1>
                    <p className="mt-8">Great reads aren’t just found, they’re owned. Start building your personal library today . Preview every book with an instant AI-powered summary, then choose the ones that deserve a place on your shelf.</p>
                    <button className=" mt-8 btn bg-black text-white hover:bg-white hover:text-black"><a href="/">Back</a></button> {/*or you can use <Link to="/ >button</Link> */}
                </div>
                {/* cards div */}
                <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                    {booksList.map(item => (
                        <Card book={item} key={item._id} />
                    ))}
                </div>
            </div>
        </>
    )
}