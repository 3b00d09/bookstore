
import './App.css'
import React from "react"
import { useEffect } from "react";
import {useUser} from "@clerk/clerk-react";
import CookieNotice from './components/CookieNotice';
import MainContent from './components/MainContent';
import Header from './components/Header';
import {  QueryClient, QueryClientProvider} from '@tanstack/react-query'


function App() {

  const user = useUser();
  const queryClient = new QueryClient()


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
        <QueryClientProvider client={queryClient}>
          <CookieNotice />
          <Header />
          <MainContent />
        </QueryClientProvider>
      </React.Fragment>
    )
  }

  return(
    <div></div>
  )

}

export default App
