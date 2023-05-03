
import './App.css'
import React from "react"
import {useUser} from "@clerk/clerk-react";
import {Route, Routes} from "react-router-dom"
import PostBook from './components/PostBook/PostBook';
import Header  from './components/Header';
import Home from './pages/home/Home';
import CookieNotice from './components/CookieNotice';
import PrivacyPolicy from "./pages/PrivacyPolicy"
import CookiePolicy from './pages/CookiePolicy';



function App() {

  const user = useUser();

  // need to wait for user auth state to load first otherwise header delays
  if (user.isLoaded){
    return (
      <React.Fragment>
        <CookieNotice />
        <Header />
        <div className='main-content flex-1'>
          <Routes>
            <Route path ="/" element={<Home />} />
            <Route path ="/create" element={<PostBook />}/>
            <Route path='/privacy' element={<PrivacyPolicy />} />
            <Route path ="/cookies" element={<CookiePolicy />} />
          </Routes>
        </div>
      </React.Fragment>
    )
  }

  return(
    <div></div>
  )

}

export default App
