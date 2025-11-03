import React from 'react'

function page() {
  return (
    <div className="bg-white h-screen w-screen" style={{height:"2000px"}}>
        <div>
          
            <div className="flex bg-cover bg-center w-screen " style={{ height: "700px",backgroundImage: "url(https://www.nieruf.de/media/ea/fb/0d/1710351033/Gruppe-3767.webp)"}}>
                <div className="flex flex-1 items-center">
                    <img src="https://www.nieruf.de/media/ae/9a/35/1709276517/NieRuf_Premium-News_2024_Druckminderer-02_RZ_komprimiert.png" alt="Image" className="object-contain h-full mx-auto" />
                </div>
                
                
                <div className="flex items-start flex-1 ">
                    <div className="" style={{ marginTop: "25%" }}> 
                        <h1 className="text-8xl font-semibold text-white">
                        APPLICATIONS 
                        </h1>
                    </div>
            
                </div>
            </div>

            <div className ="pt-12 pb-10 container mx-auto mb-10 border-b-2 border-blue-400 ">
                <h1 className="flex pt-5 text-blue-500 text-5xl " style={{color:"#0F4C71"}}>CHECK OUT</h1>
                <h1 className="flex text-blue-500 text-5xl" style={{color:"#28A8DE"}}>OUR APPLICATIONS</h1>
            </div>

            <div className="mt-20 container mx-auto">
                <div className="grid grid-cols-3 gap-8">
                    <div className="relative overflow-hidden rounded-tl-[8%] rounded-tr-[8%] rounded-bl-[8%] rounded-br-[8%]">
                        <img src="http://www.goetvalve.eu/uploadfiles/c1.jpg" alt="Image 1" className="w-full h-full"></img>
                        <div className="absolute inset-0 flex items-end pb-5 pl-3 opacity-0  hover:opacity-100 transition duration-300 bg-black bg-opacity-50 text-white">
                            Used in production line of pure water and beverage liquid nitrogen filling and sealing bottles
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-tl-[8%] rounded-tr-[8%] rounded-bl-[8%] rounded-br-[8%]">
                        <img src="http://www.goetvalve.eu/uploadfiles/c2.jpg" alt="Image 2" className="w-full h-full"></img>
                        <div className="absolute inset-0 flex items-end pb-5 pl-5 opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50 text-white">
                         Used in liquid nitrogen tank filling
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-tl-[8%] rounded-tr-[8%] rounded-bl-[8%] rounded-br-[8%]">
                        <img src="http://www.goetvalve.eu/uploadfiles/c3.jpg" alt="Image 3" className="w-full h-full"></img>
                        <div className="absolute inset-0 flex items-end pb-5 pl-5 opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50 text-white">
                        Used in tunnel type liquid nitrogen quick-freezing machine
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-8 mt-12">
                    <div className="relative overflow-hidden rounded-tl-[8%] rounded-tr-[8%] rounded-bl-[8%] rounded-br-[8%]">
                        <img src="http://www.goetvalve.eu/uploadfiles/c4.jpg" alt="Image 4" className="w-full"></img>
                        <div className="absolute inset-0 flex items-end pb-5 pl-5 opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50 text-white">
                             Applied to automatic control of liquid nitrogen pipeline
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-tl-[8%] rounded-tr-[8%] rounded-bl-[8%] rounded-br-[8%]">
                        <img src="http://www.goetvalve.eu/uploadfiles/c5.jpg" alt="Image 5" className="w-full h-full"></img>
                        <div className="absolute inset-0 flex items-end pb-5 pl-5 opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50 text-white">
                        Used in CNC machine tool cooling
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-tl-[8%] rounded-tr-[8%] rounded-bl-[8%] rounded-br-[8%]">
                        <img src="http://www.goetvalve.eu/uploadfiles/c6.jpg" alt="Image 6" className="w-full h-full"></img>
                        <div className="absolute inset-0 flex items-end pb-5 pl-5 opacity-0 hover:opacity-100 transition duration-300 bg-black bg-opacity-50 text-white">
                        Food quick freezer
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default page