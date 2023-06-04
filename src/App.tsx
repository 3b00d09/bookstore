
import './App.css'
import React from "react"
import { useEffect } from "react";
import {useUser} from "@clerk/clerk-react";
import {Route, Routes, useLocation} from "react-router-dom"
import PostBook from './components/PostBook/PostBook';
import Header  from './components/Header';
import Home from './pages/Home';
import CookieNotice from './components/CookieNotice';
import PrivacyPolicy from "./pages/PrivacyPolicy"
import CookiePolicy from './pages/CookiePolicy';
import BookPage from './pages/Bookpage';
import SideBar from './components/SideBar';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import { OrderHistory, ProfileCart, Selling, SoldHistory, ProfileIndex, UserSettings, Wishlist } from './pages/userRoutes';



function App() {

  const user = useUser();
  const location = useLocation();

  useEffect(() =>{
    const cart = localStorage.getItem("cart")
    const interactions = localStorage.getItem("interactions")

    if (interactions === null){
      let arr: Array<Int16Array> = []
      localStorage.setItem("interactions", JSON.stringify(arr))
    }

    if (cart === null){
      let arr: Array<Int16Array> = []
      localStorage.setItem("cart", JSON.stringify(arr))
    }

    setInterval(() =>{
      const newInteractions = JSON.parse(localStorage.getItem("interactions") || "[]")
      if(newInteractions.length === 0) return
    
      // send new interactions here

      // reset interactions after we send them
      localStorage.setItem("interactions", JSON.stringify([]))
    }, 1000 * 10)

  }, [])

  // need to wait for user auth state to load first otherwise header delays
  if (user.isLoaded){
    return (
      <React.Fragment>
        <CookieNotice />
        <Header />
        <div className='main-content flex-1 flex'>
          {!location.pathname.startsWith('/profile') && <SideBar />}
          <div className='w-full mx-7 px-4'>
            <Routes>
              <Route path ="/" element={<Home />} />
              <Route path ="/create" element={<PostBook />}/>
              <Route path='/privacy' element={<PrivacyPolicy />} />
              <Route path ="/cookies" element={<CookiePolicy />} />
              <Route path="/book/:id" element={<BookPage />} />
              <Route path = "/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />}>
                <Route path="" element={<ProfileIndex />} />
                <Route path ="purchased" element={<OrderHistory />} />
                <Route path ="sold" element={<SoldHistory />} />
                <Route path="selling" element={<Selling />} />
                <Route path ="wishlist" element={<Wishlist />} />
                <Route path ="cart" element={<ProfileCart />} />
                <Route path ="settings" element={<UserSettings />} /> 
              </Route>
            </Routes>
          </div>
        </div>
      </React.Fragment>
    )
  }

  return(
    <div></div>
  )

}

export default App
