import ContactPage from "./components/ContactPage"
import SignUp from "./components/SignUp"
import StorePage from "./StorePage/StorePage"
import CartPage from "./components/CartPage"
import HomePage from "./HomePage/HomePage"    //these are routes(in each route different page is shown)
import { Routes, Route } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import BookDetails from './components/BookDetails';
import AiRecommend from './components/AiRecommend';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/cart/:id" element={<CartPage />} />
        <Route path="/airecommend" element={<AiRecommend />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
