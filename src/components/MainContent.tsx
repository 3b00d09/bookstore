import PrivacyPolicy from "../pages/PrivacyPolicy"
import CookiePolicy from '../pages/CookiePolicy';
import BookPage from "../pages/Bookpage";
import SideBar from "./SideBar";
import Cart from '../pages/Cart';
import Profile from '../pages/Profile';
import { OrderHistory, ProfileCart, SoldHistory, ProfileIndex, UserSettings, Wishlist } from '../pages/userRoutes';
import {Route, Routes, useLocation} from "react-router-dom"
import PostBook from '../components/PostBook/PostBook';
import Home from '../pages/Home';
import { useState } from "react";

function MainContent(){
    const location = useLocation();
    
    const [categoryFilter, setCategoryFilter] = useState<string[]>([])
    return(

        
        <div className='main-content relative flex-1 flex'>
        {location.pathname === '/' &&
        <SideBar 
            categoryFilter={categoryFilter} 
            setCategoryFilter = {setCategoryFilter} 
        />}
        <div className='w-full mx-7 px-4'>
          <Routes>
            <Route path ="/" element={<Home categoryFilter={categoryFilter}/>} />
            <Route path ="/create" element={<PostBook />}/>
            <Route path='/privacy' element={<PrivacyPolicy />} />
            <Route path ="/cookies" element={<CookiePolicy />} />
            <Route path="/book/:id" element={<BookPage />} />
            <Route path = "/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />}>
              <Route path="" element={<ProfileIndex />} />
              <Route path ="purchased" element={<OrderHistory />} />
              <Route path ="sold" element={<SoldHistory />} />
              <Route path ="wishlist" element={<Wishlist />} />
              <Route path ="cart" element={<ProfileCart />} />
              <Route path ="settings" element={<UserSettings />} /> 
            </Route>
          </Routes>
        </div>
      </div>
    )
}

export default MainContent