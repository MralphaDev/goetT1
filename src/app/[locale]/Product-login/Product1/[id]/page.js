'use client'
import {React,useState,useEffect,useRef,use} from 'react'
import {items} from '../../Product1/items'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from 'next/link'

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//supabase
//import { createClient } from '../../../utils/supabase/client'

//paypal
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function page({params}) {
  const unwrappedParams = use(params);
  const paramid = unwrappedParams.id;
  const [view, setView] = useState("description");
  const containerRef = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  const [quantity,setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const [totalValue,setTotalValue] = useState(items[paramid].priceNum)
  const quantityRef = useRef(quantity); //THIS FIX THE BUG that paypal value doesnt update
  //const supabase = createClient()
  const [userEmail,setUserEmail] = useState()


    /*supabase.auth.getUser().then(({ data: { user }, error }) => {
    if (error) {
            console.error(error);
    } else {
            setUserEmail(user.email);
            console.log(userEmail)
        }
    });  //基于bug运行 Error fetching user: AuthSessionMissingError: Auth session missing!*/

    useEffect(() => {
        quantityRef.current = quantity; // Update the ref whenever the quantity changes
    }, [quantity]);

    const calculateTotalValue = () => {
        
        return parseFloat(quantity * items[paramid].priceNum).toFixed(2) 
    }


    useEffect(() =>{
        const newTotalPrice = calculateTotalValue();
        console.log("test quantity"+ quantity)
        console.log("test"+ totalValue)
        setTotalValue(newTotalPrice);
    },[quantity])

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1); // Use previous state to increment, react auto provides current state as argument
    };

    // Function to decrease quantity
    const handleDecrease = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1)); // Decrement but not below 1
    };


    

  useEffect(() => {
    if (view === "viewer") {
        // Only proceed if the ref is available
        if (containerRef.current) {
            const scene = new THREE.Scene();
            const width = containerRef.current.clientWidth; // Get the width of the modal
            const height = containerRef.current.clientHeight; // Get the height of the modal
            
            const camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 2000);
            const renderer = new THREE.WebGLRenderer();
            const gridHelper = new THREE.GridHelper(1000, 1000);
            const light = new THREE.AmbientLight(0x404040, 1); // soft white light
            const directionalLight = new THREE.DirectionalLight(0xffffff, 2);

            scene.add(directionalLight);
            scene.add(light);

            // Only append the renderer if the ref is valid
            containerRef.current.appendChild(renderer.domElement);
            renderer.setSize(width, height);
            scene.background = new THREE.Color(0xffffff); // White background
            
            const controls = new OrbitControls(camera, renderer.domElement);
            camera.position.set(50, 300, 50); // Move the camera back and up
            controls.update();

            const loader = new GLTFLoader(); // Instantiate a loader
            loader.load(
                `/demo${parseInt(paramid.id) + 1}.glb`,
                function (glb) {
                    console.log("Load successfully in product page");
                    glb.scene.position.set(0, 0, 0);
                    scene.add(glb.scene);
                    animate(glb.scene);
                },
                undefined, // No progress function
                function (error) {
                    console.log('An error occurred in product page');
                    console.log("The ERROR IS: " + error);
                }
            );

            /*const animate = () => {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
                
            };*/

            const animate = (mesh) => {
                requestAnimationFrame(() => animate(mesh)); // Recursively call animate
                controls.update();
                
                // Update position or other properties of the mesh
                mesh.rotation.y += 0.01; // Adjust the value to control the speed of rotation
                
                renderer.render(scene, camera);
            };
            
            //animate();

            setShowMessage(true);

            setTimeout(() => {
                setShowMessage(false); // Hide the message after 2 seconds
            }, 2000);

        } else {
            console.warn('containerRef is not set');
        }
    }
}, [view,paramid.id]); // THIS IS WHERE THE ISSUE IS!!!! view is one of the dependency Dependencies array to re-run on changes to view or params.id 
   
    //useEffect(() => {},[])

 
     //paypal
     const initialOptions = {
        clientId: "AVUCxrYI-UFeGL-HHLjmZBCTn5qt7vB7I6HuXcaujVesJ7e09O5F1ZrxfjJFmXA1nqXGOQ9dhc4xuPYC",
        currency: 'EUR',
        // Add other options as needed
    };

    function generateOrderNumber() {
        const timestamp = Date.now().toString(); // Get current timestamp
        const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generate random alphanumeric string
        const orderNumber = `GoetValve-${timestamp}-${randomChars}`; // Combine them into order number format
        return orderNumber;
    }

  return (

    <div className="bg-white h-auto">

        <div className='px-[15vw] border-b border-blue-400 border-b-[5px]' style={{height:"170px"}}>
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, A11y]}
                        spaceBetween={50}
                        slidesPerView={6}
                        navigation
                        //pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                        >

                        <SwiperSlide>
                            <div>
                            <div className='flex justify-center cursor-pointer'>
                                <Link href="/Product/Product1">
                                    <img className='h-32 hover:scale-105 transition-transform duration-200' 
                                    src="https://www.nieruf.de/thumbnail/9d/83/4a/1707834708/Manometer-Absperrventile_400x400.png?ts=1710263478">
                                    </img>
                                </Link>
                               
                            </div>
                                <div className='flex justify-center items-center text-gray-400'>
                                    category1
                                </div>
                            </div>
                        </SwiperSlide>
                        
                        
                        <SwiperSlide>
                            <div>
                            <div className='flex justify-center cursor-pointer'>
                                <Link href="/Product/Product2">
                                    <img className='h-32 hover:scale-105 transition-transform duration-200' 
                                    src="https://www.nieruf.de/thumbnail/9d/83/4a/1707834708/Manometer-Absperrventile_400x400.png?ts=1710263478">
                                    </img>
                                </Link>
                               
                            </div>
                                <div className='flex justify-center items-center text-gray-400'>
                                    category2
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div>
                            <div className='flex justify-center cursor-pointer'>
                                <img className='h-32 hover:scale-105 transition-transform duration-200' src="https://www.nieruf.de/thumbnail/9d/83/4a/1707834708/Manometer-Absperrventile_400x400.png?ts=1710263478"></img>
                            </div>
                                <div className='flex justify-center items-center text-gray-400'>
                                category3
                                </div>
                            </div>
                        </SwiperSlide>
                        
                        <SwiperSlide>
                            <div>
                            <div className='flex justify-center cursor-pointer'>
                                <img className='h-32 hover:scale-105 transition-transform duration-200' src="https://www.nieruf.de/thumbnail/9d/83/4a/1707834708/Manometer-Absperrventile_400x400.png?ts=1710263478"></img>
                            </div>
                                <div className='flex justify-center items-center text-gray-400'>
                                    category4
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div>
                            <div className='flex justify-center cursor-pointer'>
                                <img className='h-32 hover:scale-105 transition-transform duration-200' src="https://www.nieruf.de/thumbnail/9d/83/4a/1707834708/Manometer-Absperrventile_400x400.png?ts=1710263478"></img>
                            </div>
                                <div className='flex justify-center items-center text-gray-400'>
                                    category4
                                </div>
                            </div>
                        </SwiperSlide>
                        
                        <SwiperSlide>
                            <div>
                            <div className='flex justify-center cursor-pointer'>
                                <img className='h-32 hover:scale-105 transition-transform duration-200' src="https://www.nieruf.de/thumbnail/9d/83/4a/1707834708/Manometer-Absperrventile_400x400.png?ts=1710263478"></img>
                            </div>
                                <div className='flex justify-center items-center text-gray-400'>
                                category5
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div>
                            <div className='flex justify-center'>
                                <img className='h-32 hover:scale-105 transition-transform duration-200' src="https://www.nieruf.de/thumbnail/9d/83/4a/1707834708/Manometer-Absperrventile_400x400.png?ts=1710263478"></img>
                            </div>
                                <div className='flex justify-center items-center text-gray-400'>
                                    category6
                                </div>
                            </div>
                        </SwiperSlide>
                        
                        <SwiperSlide>
                            <div>
                            <div className='flex justify-center'>
                                <img className='h-32 hover:scale-105 transition-transform duration-200' src="https://www.nieruf.de/thumbnail/9d/83/4a/1707834708/Manometer-Absperrventile_400x400.png?ts=1710263478"></img>
                            </div>
                                <div className='flex justify-center items-center text-gray-400'>
                                    Absperrsvalve
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div>
                            <div className='flex justify-center'>
                                <img className='h-32' src="https://www.nieruf.de/thumbnail/9d/83/4a/1707834708/Manometer-Absperrventile_400x400.png?ts=1710263478"></img>
                            </div>
                                <div className='flex justify-center items-center text-gray-400'>
                                    Absperrsvalve
                                </div>
                            </div>
                        </SwiperSlide>
                        
                        <SwiperSlide>
                            <div>
                            <div className='flex justify-center'>
                                <img className='h-32' src="https://www.nieruf.de/thumbnail/9d/83/4a/1707834708/Manometer-Absperrventile_400x400.png?ts=1710263478"></img>
                            </div>
                                <div className='flex justify-center items-center text-gray-400'>
                                    Absperrsvalve
                                </div>
                            </div>
                        </SwiperSlide>
            
                    </Swiper>        
        </div>

        {/*
        <video autoPlay loop muted className="object-cover w-full h-full">
                    <source src='/p3.mp4' type="video/mp4"/>
        </video>*/}

        <div className="flex justify-between px-10 py-5 bg-white">
            {/* Left Side Div */}
            <div className="ml-[5%] w-3/5 h-auto mr-[10%]">
                {/* Title and Serial Number */}
                <div className="mt-[20px] mb-[20px] text-[30px] font-bold text-lightBlue">Typ: {items[paramid].serialNum}</div>
                {/* Product Name */}
                <div className="mb-[50px] text-[20px] font-sans text-[#2B3136]">{items[paramid].name}</div>
                {/* Video */}
                <div className="mt-4">
                <video controls loop muted className="w-full h-full">
                    {/*console.log(params.id)*/}
                    <source src={`/p${parseInt(paramid)+1}.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                </div>
            </div>

            {/* Right Side Div */}
            <div className="w-1/5 flex flex-col space-y-4 mr-[5%] mt-[5%] bg-[#E5F0F6]  text-black rounded-[20px] p-4">
                {/* Selector for number of products */}
                <div className="flex space-x-4 ml-4 mt-4 mb-[20px]">
                    <div className="flex items-center justify-between mt-4 mb-4">
                        <button onClick={()=>handleDecrease()} className="px-3 py-1 rounded-lg text-black  shadow-md transition duration-300 ease-in-out hover:scale-105">
                            -
                        </button>

                        <span className="text-lg font-normal mx-4">{quantity}</span>

                        <button onClick={()=>handleIncrease()} className="px-3 py-1 rounded-lg text-black shadow-md transition duration-300 ease-in-out hover:scale-105">
                            +
                        </button>
                    </div>



                    <div className="pl-[30px] text-black pr-6">
                        {/* Original Price */}
                        <div className="text-3xl font-bold">{items[paramid].price} </div>
                        
                        {/* Price including VAT */}
                        <div className="text-xs font-light text-gray-500 mt-1">
                            {(parseFloat(items[paramid].price) * 1.19).toFixed(2)} € inkl. Mwst.
                        </div>
                    </div>

                </div>


                {/* Datenblatt and Bestellen */}
             
                <div className="mt-6 pb-[30px] flex flex-col justify-left">
                    <button  onClick={() => setIsOpen(true)} className="mb-[20px] w-2/3 py-2 rounded-lg bg-gradient-to-r from-[#B0D6EC] to-[#E5F0F6] text-black flex items-center justify-center shadow-md hover:bg-gradient-to-r hover:from-[#9AC9E3] hover:to-[#CFE6F1] transition duration-300 ease-in-out">
                        Buy Now
                    </button>

                    <a href="https://www.nieruf.de/nieruf/datasheets/de_de/Absperrklappe-AK01-AK02.pdf" className="w-full">
                        <button className="w-2/3 py-2 rounded-lg bg-gradient-to-r from-[#B0D6EC] to-[#E5F0F6] text-black flex items-center justify-center shadow-md hover:bg-gradient-to-r hover:from-[#9AC9E3] hover:to-[#CFE6F1] transition duration-300 ease-in-out">
                        <span className="font-medium text-sm">View Datenblatt</span>
                        </button>
                    </a>
                </div>



                    {/* Lieferzeit and Expressversand */}
                    <div className="ml-2 flex flex-col  mt-[50px] text-sm font-light">
                        <div>Lieferzeit: <span className="text-lightBlue"> 3-5 Tage</span></div>
                        <div className="cursor-pointer">Expressversand</div>
                    </div>

                
                
                

                {/* Textbox */}
                <div className="text-sm mt-4 p-2 font-light leading-relaxed">
                    Versand am: <span className="text-lightBlue"> Freitag, 11. Oktober</span><br /><br />
                    Garantierte Lieferung bis <span className="text-lightBlue"> Montag, 14. Oktober, 12 Uhr.</span> <br /><br />
                    Bestellen Sie innerhalb <span className="text-lightBlue">19 Stunden 52 Minuten per Expressversand.</span><br /><br />
                    <span className="text-xs">*Angegebene Lieferzeiten gelten für Mo.- Fr. ohne Berücksichtigung von Feiertagen.</span>

                </div>

                {/* Certificate */}
                <div className="bg-[#E5F0F6] p-4 rounded-md font-light text-sm mt-4 flex items-center space-x-6">
                    {/* Umtausch Section */}
                    <div className="flex items-center space-x-2">
                        <img src="https://www.nieruf.de/bundles/nierufproductbenefits/assets/icon/exchange.svg?1728456486" alt="Umtausch" className="h-6 w-6" />
                        <span>GoetValve Umtausch</span>
                        <span className="text-blue-400 text-xs">i</span>
                    </div>

                    {/* Garantie Section https://www.nieruf.de/bundles/nierufproductbenefits/assets/icon/warranty.svg?1728456486 */}
                    <div className="flex items-center space-x-2">
                        <img src="https://img.freepik.com/premium-vector/12-months-warranty-support-service-icon-vector-stock-illustration_100456-10501.jpg?w=826" alt="Garantie" className="h-6 w-6" />
                        <span>12 M. Garantie</span>
                        <span className="text-blue-400 text-xs">i</span>
                    </div>
                    
                    {/* Zertifiziert Section */}
                    <div className="flex items-center space-x-2">
                        <img src="https://www.nieruf.de/bundles/nierufproductbenefits/assets/icon/certified.svg?1728456486" alt="Zertifiziert" className="h-6 w-6" />
                        <span>Zertifiziert</span>
                        <span className="text-blue-400 text-xs">i</span>
                    </div>
                </div>


                {/* Question Box */}
                <div className="flex flex-col space-y-2 mt-4">
                    <div className="font-semibold ml-2">Have a question?</div>
                    <textarea className="w-full h-16 border border-gray-300 p-2 rounded text-sm font-light" placeholder="Ask about this product"></textarea>
                </div>
            </div>



        </div>
        <div className="flex justify-center">
            <div className="flex justify-center mr-[7%] ml-[1.5%] mt-[5%] mb-[30px] pb-[20px] space-x-20 w-screen border-b border-gray-300">
                <span
                    onClick={() => setView("description")}
                    className="text-[#2B3136] cursor-pointer hover:text-lightBlue transition duration-200"
                >
                    Description
                </span>

                <span
                    onClick={() => setView("viewer")}
                    className="text-[#2B3136] cursor-pointer hover:text-lightBlue transition duration-200"
                >
                    3D viewer
                </span>


                <span
                    onClick={() => setView("download")}
                    className="text-[#2B3136] cursor-pointer hover:text-lightBlue transition duration-200"
                >
                    download
                </span>
            </div>
        </div>
       

                
        {(view === "description")&& (
            <div className="ml-[7%]  flex ">
                <div className="mr-[10%] flex flex-col items-center h-[5%] w-[300px] p-4 bg-white rounded-lg shadow-lg border-2 border-gray-300 font-thin">
                    <p className="text-[30px] text-gray-500  mb-[40px]">{"Type:"+ items[paramid].serialNum}</p> 
                    <img 
                        src={items[paramid].src} 
                        alt={items[paramid].name} 
                        className="w-[100px] h-[150px] rounded-lg shadow-md mb-[50px]" 
                    />
                    <h2 className="text-lg text-gray-800 mb-[20px] pl-[20px]">{items[paramid].name}</h2>
                </div>

                <div className="w-2/3 pb-[200px]">
                    <h2 className="font-bold text-[30px] text-customBlue">Produktdetails</h2>
                    <table className="w-full font-thin">
                        <tbody>
                        
                        {Object.entries(items[paramid])
                            .filter(([key]) => !['priceNum', 'src'].includes(key)) // Filter out keys you want to skip
                            .map(([key, value]) => (
                                <tr className="h-[62px] w-[280px] text-[#212529]" key={key}>
                                    <td className="text-[16.8px] font-semibold font-montserrat p-[10px] text-customBlue">{key}</td>
                                    <td className=" text-[16.8px] font-montserrat p-[10px]">{value}</td>
                                </tr>
                        ))}

                        </tbody>
                    </table>
                </div>
                


        </div>
        
        
        
          
        )}

        {view === "viewer" && (
            <div ref={containerRef} className="ml-[6%] mr-[15%] w-4/5 h-[600px] border-t-2 border-b-2 border-black relative mb-[150px]">
                {showMessage && (
                <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-200 ${showMessage ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="text-white p-4 rounded shadow-md">
                        You can hold Ctrl to drag the object.
                    </div>
                </div>
            )}
            </div>
        )}

       {view === "download" && (
   <div className="mt-[5%] mb-[10%]">
   <div className="flex justify-center mx-auto my-8 w-[50%]">
       {/* 3D Modell Section */}
       <div className="flex flex-col items-center w-[45%] h-[300px] p-6 bg-white border border-gray-300 rounded-lg shadow-md text-center mr-[15%]">
           <a href="https://www.nieruf.de/nieruf/cad-files/MV04_DN8_1-4%20Zoll.STEP" download>
               <img
                   src="https://www.nieruf.de/bundles/nierufproductdownloads/assets/icon/cad-file.svg?1728456486"
                   alt="3D Modell"
                   className="w-[100px] h-[100px] mb-4"
               />
               <h3 className="text-xl text-customBlue font-semibold">3D Modell</h3>
               <p className="text-gray-600 mt-2">STEP - 4.7 MiB</p>
           </a>
       </div>

       {/* Datenblatt Section */}
       <div className="flex flex-col items-center w-[45%] h-[300px] p-6 bg-white border border-gray-300 rounded-lg shadow-md text-center">
           <a href="https://www.nieruf.de/nieruf/datasheets/de_de/Magnetventil-MV04.pdf" download>
               <img
                   src="https://www.nieruf.de/bundles/nierufproductdownloads/assets/icon/datasheet.svg?1728456486"
                   alt="Datenblatt"
                   className="w-[100px] h-[100px]"
               />
               <h3 className="text-xl text-customBlue font-semibold">Datenblatt</h3>
               <p className="text-gray-600 mt-2">PDF - 467.26 KiB</p>
           </a>
       </div>
   </div>
</div>)}


    <div className="relative z-20">
          
            {/* Sliding Menu */}
<div
    className={`fixed top-0 right-0 w-[400px] h-full bg-gray-100 shadow-lg transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}
>
    <div className="flex flex-col justify-between h-full p-[30px]"> {/* Ensure the container takes full height */}
        <div>
            <h2 className="text-2xl font-bold mb-2 text-lightBlue">Warenkorb</h2>
            <h3 className="text-gray-600 mb-4">{quantity} Positionen</h3>

            <div className="flex items-center justify-between mt-4 border-b pb-2 pt-2">
                <div className="flex items-center">
                    <img
                        src={items[paramid].src}
                        alt="Cart Item"
                        className="w-16 h-16 object-cover rounded-lg shadow-md" // Styles for the image
                    />
                    <div className="ml-3">
                        <div className="font-thin">{items[paramid].name}</div>
                        <div className="text-gray-600">Anzahl: {quantity}</div> {/* Replace with actual quantity */}
                    </div>
                </div>
            </div>

            <div className="mt-4 ">
                <h4 className="text-xs">{items[paramid].name}</h4>
            </div>

            <div className="bg-[#E5F0F6] p-4 rounded-md font-light text-sm mt-4 flex items-center space-x-6">
                    {/* Umtausch Section */}
                    <div className="flex items-center space-x-2">
                        <img src="https://www.nieruf.de/bundles/nierufproductbenefits/assets/icon/exchange.svg?1728456486" alt="Umtausch" className="h-6 w-6" />
                        <span>GoetValve Umtausch</span>
                        <span className="text-blue-400 text-xs">i</span>
                    </div>

                    {/* Garantie Section https://www.nieruf.de/bundles/nierufproductbenefits/assets/icon/warranty.svg?1728456486 */}
                    <div className="flex items-center space-x-2">
                        
                        <span>12 M. Garantie</span>
                        <span className="text-blue-400 text-xs">i</span>
                    </div>
                    
                    {/* Zertifiziert Section */}
                    <div className="flex items-center space-x-2">
                        <img src="https://www.nieruf.de/bundles/nierufproductbenefits/assets/icon/certified.svg?1728456486" alt="Zertifiziert" className="h-6 w-6" />
                        <span>Zertifiziert</span>
                        <span className="text-blue-400 text-xs"></span>
                    </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-[30px]">
                <h2 className="text-xl font-bold mb-4">Preise</h2>
                
                <div className="flex justify-between mt-2">
                    <span>Zwischensumme</span>
                    <span>{totalValue}€</span>
                </div>
                
                <div className="flex justify-between mt-2">
                    <span>Versandkosten (Versand DHL)</span>
                    <span>+ 7,30 €</span>
                </div>
                
                <p className="text-sm text-gray-500 mt-2">
                    * Preise exkl. MwSt. zzgl. Versandkosten
                </p>

                <hr className="my-4" />

                <div className="flex justify-between font-bold mt-2">
                    <span>Gesamtsumme</span>
                    <span>{(totalValue * 1.19 + 7.3).toFixed(2)} €</span>
                </div>

                <div className="flex justify-between mt-2 text-gray-700">
                    <span>Gesamtnettosumme</span>
                    <span>{(parseFloat(totalValue) + 7.3)} €</span>
                </div>

                <div className="flex justify-between mt-2 text-gray-700">
                    <span>zzgl. 19 % MwSt.</span>
                    <span>{(totalValue * 0.19).toFixed(2)} €</span>
                </div>
        </div>

        </div>

        <div>
            {/* Total Amount */}
            <div className="mt-4">
                <h4 className="font-bold text-lg">Gesamtsumme: {(totalValue * 1.19 + 7.3).toFixed(2)} €</h4>
            </div>

            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    style={{
                        layout: 'vertical',
                        shape: 'rect',
                        label: 'paypal',
                        height: 40,
                    }}
                    createOrder={(data, actions) => {
                        // Directly calculate the total value inside the createOrder function
                        const calculatedTotalValue = (quantityRef.current * items[paramid].priceNum).toFixed(2); // Use the ref for quantity
                        console.log("Paypal Value is:" + calculatedTotalValue);
                        console.log("Paypal quantity is:" + quantityRef.current);

                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: calculatedTotalValue
                                },
                            }],
                        });
                    }}
                    onApprove={(data, actions) => {
                        const calculatedTotalValue = (quantityRef.current * items[paramid].priceNum).toFixed(2); // Use the ref for quantity

                        return actions.order.capture().then((details) => {
                            alert('Transaction completed!');
                            const orderNumber = generateOrderNumber();
                            // Optionally handle the successful payment here (e.g., redirect, display a message)
                            /*supabase 
                                .from('purchased')
                                .insert([
                                    { email: details.payer.email_address, address: details.payer.address, items: items[params.id].name, totalValue: calculatedTotalValue, name: details.payer.name.given_name, orderNum: orderNumber }
                                ])
                                .then(({ data, error }) => {
                                    if (error) {
                                        console.error('Error inserting data:', error);
                                    } else {
                                        console.log('Data inserted:', data);
                                    }
                                });*/
                        });
                    }}
                    onError={(err) => {
                        console.error('PayPal Checkout onError', err);
                        // Handle any errors that occur during the transaction
                    }}
                />
            </PayPalScriptProvider>
        </div>
    </div>
</div>


            {/* Overlay */}
            {isOpen && (
                <div
                    style={{ width: `calc(100vw - 405px)` }}
                    className="fixed inset-0 bg-black opacity-50 z-10 "
                    onClick={toggleMenu} // Close the cart when clicking the background
                />
            )}

    </div>



    </div>
  )
}

export default page