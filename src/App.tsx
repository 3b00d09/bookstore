
import './App.css'
import React from "react"
//import { ClerkProvider } from '@clerk/clerk-react'

import {useUser} from "@clerk/clerk-react";

import {Route, Routes} from "react-router-dom"

import PostBook from './components/PostBook/PostBook';
import Header  from './components/Header';
import Home from './pages/home/Home';



function App() {

  const user = useUser();

  // need to wait for user auth state to load first otherwise header delays
  if (user.isLoaded){
    return (
      <React.Fragment>
        <Header />
        <div className='main-content'>
          <Routes>
            <Route path ="/" element={<Home />} />
            <Route path ="/create" element={<PostBook />}/>
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
