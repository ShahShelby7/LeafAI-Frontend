import { Link } from "react-router-dom"
export default function Card({ book }) {
    return (

        <div className="mt-10">
            <Link to={`/book/${book._id}`}>
                {/* card from tailwind */}
                <div className="card bg-base-100 shadow-xl hover:scale-105 duration-150 mr-4 w-70 h-[350px]">
                    <figure>
                        <img className="h-40"
                            src={book.url}
                            alt={book.title} />
                    </figure>
                    <div className="card-body h-15">
                        <h2 className="card-title">
                            {book.title}
                        </h2>
                        <p>Written By {book.authorname}</p>
                        <div className="card-actions justify-between">
                            <div className="badge badge-outline mt-4">${book.price}</div>
                            <div className="btn h-5 w-30 rounded-full hover:bg-black hover:text-white">More details</div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}