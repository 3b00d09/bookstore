import PrivacyPolicy from "../pages/PrivacyPolicy"
import CookiePolicy from '../pages/CookiePolicy';
import BookPage from "../pages/Bookpage";
import SideBar from "./SideBar";
import Cart from '../pages/Cart';
import Profile from '../pages/Profile';
import { OrderHistory, ProfileCart, ProfileIndex, Wishlist } from '../pages/userRoutes';
import {Route, Routes, useLocation} from "react-router-dom"
import Home from '../pages/Home';
import SearchResult from "../pages/SearchResult";
import CategoryResults from "../pages/CategoryResults";
import { useState } from "react";

function MainContent(){
    const location = useLocation();
    const [activeSidebar, setsideBarActive] = useState(true)
    const [activeCategories, setActiveCategories] = useState<String[]>([])
  
    return(

        
        <div className='main-content flex-1 flex'>
        {(location.pathname === '/' || location.pathname.startsWith("/search") || location.pathname.startsWith("/categories")) &&
            <SideBar activeSidebar={activeSidebar} setsideBarActive={setsideBarActive} activeCategories={activeCategories} setActiveCategories={setActiveCategories}/>
        }
        <div className='w-full mx-7 px-4'>
          <Routes>
            <Route path ="/" element={<Home />} />
            <Route path='/privacy' element={<PrivacyPolicy />} />
            <Route path ="/cookies" element={<CookiePolicy />} />
            <Route path="/book/:id" element={<BookPage />} />
            <Route path = "/cart" element={<Cart />} />
            <Route path = "/categories/:query" element={<CategoryResults setsideBarActive={setsideBarActive} setActiveCategories={setActiveCategories} />}></Route>
            <Route path="/search/:query" element={<SearchResult />}/>
            <Route path="/profile" element={<Profile />}>
              <Route path="" element={<ProfileIndex />} />
              <Route path ="purchased" element={<OrderHistory />} />
              <Route path ="wishlist" element={<Wishlist />} />
              <Route path ="cart" element={<ProfileCart />} />
            </Route>
          </Routes>
        </div>
      </div>
    )
}

export default MainContent