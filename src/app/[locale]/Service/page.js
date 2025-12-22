'use client'
import React from 'react'
import { useState,useEffect } from 'react'
import ServiceMobile from '../../responsive/Service/ServiceMobile'
function page() {
  const [isMobile, setIsMobile] = useState(false)
  
    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 1024)
      check()
      window.addEventListener('resize', check)
      return () => window.removeEventListener('resize', check)
    }, [])
  
     if (isMobile) return <ServiceMobile/>

  return (
    <div>
        <div className="bg-cover bg-center w-screen" style={{height:"1150px", backgroundColor: "white"}}>
          <div className ="pt-12 pb-10 container mx-auto mb-10 border-b-2 border-blue-400 ">
             <h1 className="flex  text-blue-500 text-5xl " style={{color:"#0F4C71"}}>SERVICE & SUPPORT</h1>
            
          </div>
          
          <div className=" container mx-auto  "style={{height:"1000px"}}>
              <div className="relative w-full" style={{height:"600px"}}>
                <img 
                  src="https://goetvalves.eu/image/dn4.png" 
                  alt="Image" 
                  className="w-full h-full object-cover" 
                  style={{ objectPosition: "20% 30%" }} // slightly left and slightly up
                />
                {/* overlay */}
                <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                    "url(https://www.nieruf.de/media/fa/fc/75/1727169671/premium-news-background-blue-checked.svg?ts=1727169671)",
                    WebkitMaskImage:
                    "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 100%)",
                    maskImage:
                    "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,1) 100%)",

                }}
                />
              </div>
              <br/>
             
              <div className="grid grid-cols-3 gap-5 text-white">
              
                    <div className="col-span-1  p-4" style={{height:"400px",backgroundColor:"#28A8DE"}}>
                        {/* Left Div with 1/3 width */}
                        <div>
                        <h2 className="text-lg ">FAQs - Coil & Current</h2>
                       
                        </div>
                        <div>
                        <h2 className="text-lg ">Service, Maintenance and Commissioning</h2>
                       
                        </div>
                    </div>
                    <div className="col-span-2 bg-gray-300 p-4">
                        {/* Right Div with 2/3 width */}
                        <div>
                            <h2 className="text-lg ">Service, Maintenance and Commissioning</h2>
                        </div>
                    </div>
                </div>
              
          </div>

          

       </div>
    </div>
  )
}

export default page