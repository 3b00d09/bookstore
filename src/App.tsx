
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



function App() {

  const user = useUser();
  const location = useLocation();

  useEffect(() =>{
    const cart = localStorage.getItem("cart")
    if (cart === null){
      let arr: Array<Int16Array> = []
      localStorage.setItem("cart", JSON.stringify(arr))
    }
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
              <Route path="/profile" element={<Profile />} />
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
