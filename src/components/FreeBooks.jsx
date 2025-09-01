import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";  //slick corousel for books sliding 
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FreeBooks() {
  const [booksList, setBooks] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/book`); //api req to backend server and server send the req to database
        console.log(response.data);
        setBooks(response.data);
      }
      catch (error) {
        console.log("error is....", error);
      }
    }
    getBooks();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-16 px-4 mt-16" id="books">

      <div>
        <h1 className="text-xl font-semibold">Explore books</h1>
        <p className="mb-8">Explore and get AI Synopsis of the Books for free</p>
      </div>
      {!booksList.length ? <div className="text-center mt-20 text-black">Books loading...!</div> : null}
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="transform 500ms ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {booksList.map(book => (
          <Card book={book} key={book._id} />
        ))}
      </Carousel>
    </div>
  )
}