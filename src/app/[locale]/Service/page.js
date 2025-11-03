import React from 'react'

function page() {
  return (
    <div>
        <div className="bg-cover bg-center w-screen" style={{height:"1150px", backgroundColor: "white"}}>
          <div className ="pt-12 pb-10 container mx-auto mb-10 border-b-2 border-blue-400 ">
             <h1 className="flex pt-5 text-blue-500 text-5xl " style={{color:"#0F4C71"}}>SERVICE & SUPPORT</h1>
            
          </div>
          
          <div className="pt-5 container mx-auto  "style={{height:"1000px"}}>
              <div className="w-full" style={{height:"450px"}} >
                <img src="http://www.goetvalve.eu/images/aba4.jpg" alt="Image" className="w-full h-full object-cover" ></img>
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