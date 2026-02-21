'use client'
import {React,useState,useEffect,useRef,use} from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y , EffectCoverflow,  Autoplay } from 'swiper/modules';
import { FileText, Cube, Download } from "lucide-react";

import 'swiper/css/effect-coverflow';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Link from 'next/link'

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import ProductDetail from '@/src/app/responsive/product/ProductDetail';

//paypal
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useTranslations } from 'next-intl';

function page({params}) {
  const  t  = useTranslations('ProductDetail');
  const t2 = useTranslations('PurchaseTab')
  const unwrappedParams = use(params); // 这一步是关键
  const [items, setItems] = useState([]);
  const paramid = items.findIndex(item => item.id === Number(unwrappedParams.id));  //// 找到当前 URL param(传进来是数据库产品 id) 对应的产品在 items 数组里的位置（index），方便安全访问
  const item = items.find(i => i.id === Number(unwrappedParams.id));
  const [view, setView] = useState("description");
  const containerRef = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  const [quantity,setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(quantity); //THIS FIX THE BUG that paypal value doesnt update
  const [totalValue,setTotalValue] = useState(0); // 默认 0
  const [userEmail,setUserEmail] = useState()
  const [isMobile, setIsMobile] = useState(false)

   const [isLoggedIn, setIsLoggedIn] = useState(false);

   const accessories = [
  "/101806-A-M8-CONNECTORS.png",
  "/101809-A-CONNECTORS-1.png",
  "/102418-A-CG-CONNECTORS.png",
  "/104418-A-full-wave-rectification-CG-CONNECTORS.png",
    "/106809.png",
  "/181002.png",
  "/241622.png",
  "/302802-8200.png",
    "/110602.png",
];
 const baseUrl = "https://goetvalves.eu/accesorry";

   console.log("item:", item);
console.log("video:", item?.video);



   // 找 items 里对应的 index
const indextest = items.findIndex(item => item.id === Number(unwrappedParams.id));

console.log("indextest:",indextest)


  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("loggedIn") === "true");

  }, []);

  useEffect(() => {
    fetch("/api/products") //从本地API路由获取数据,这里没错
      .then(res => res.json())
      .then(data => {
        console.log("Fetched items:", data); // 检查数据
        setItems(data);
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);



  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize() // initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    quantityRef.current = quantity; // Update the ref whenever the quantity changes
    if(items.length > 0 && items[paramid]){
      const newTotalPrice = (quantity * items[paramid].priceNum).toFixed(2)
      setTotalValue(newTotalPrice);
    }
  }, [quantity, items, paramid]);

  const calculateTotalValue = () => {
    if(items.length === 0 || !items[paramid]) return 0;
    return parseFloat(quantity * items[paramid].priceNum).toFixed(2) 
  }

  const toggleMenu = () => {
      setIsOpen(!isOpen);
  };

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
      setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
  };

  useEffect(() => {
    if (view === "viewer") {
        if (containerRef.current && items.length > 0 && items[paramid]) {
            const scene = new THREE.Scene();
            const width = containerRef.current.clientWidth; 
            const height = containerRef.current.clientHeight; 
            
            const camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 2000);
            const renderer = new THREE.WebGLRenderer();
            const light = new THREE.AmbientLight(0x404040, 1); 
            const directionalLight = new THREE.DirectionalLight(0xffffff, 2);

            scene.add(directionalLight);
            scene.add(light);

            containerRef.current.appendChild(renderer.domElement);
            renderer.setSize(width, height);
            scene.background = new THREE.Color(0xffffff); 
            
            const controls = new OrbitControls(camera, renderer.domElement);
            camera.position.set(50, 300, 50);
            controls.update();

            const loader = new GLTFLoader();
            loader.load(
                `/demo${parseInt(paramid) + 1}.glb`,
                function (glb) {
                    glb.scene.position.set(0, 0, 0);
                    scene.add(glb.scene);
                    const animate = () => {
                        requestAnimationFrame(animate);
                        controls.update();
                        glb.scene.rotation.y += 0.01;
                        renderer.render(scene, camera);
                    };
                    animate();
                },
                undefined,
                function (error) {
                    console.log('An error occurred in product page', error);
                }
            );

            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 2000);
        } else {
            console.warn('containerRef or items[paramid] not set');
        }
    }
}, [view, paramid, items]);

  const initialOptions = {
      clientId: "AVUCxrYI-UFeGL-HHLjmZBCTn5qt7vB7I6HuXcaujVesJ7e09O5F1ZrxfjJFmXA1nqXGOQ9dhc4xuPYC",
      currency: 'EUR',
  };

  function generateOrderNumber() {
      const timestamp = Date.now().toString(); 
      const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase(); 
      const orderNumber = `GoetValve-${timestamp}-${randomChars}`; 
      return orderNumber;
  }

  // 渲染前安全判断
  if( !item) return <div>Loading...</div>; //这一步能解决异步问题的bug,不然item还没反回来就报错了。item要等到fetch完才有值

  return (
    <div>
        {isMobile ? (
        // Mobile view
        <div className="flex flex-col pt-30 px-6 max-w-xl mx-auto space-y-8 font-sans">
        {/* Product Title */}
        <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900 leading-snug">{item?.name}</h1>
            <p className="text-sm text-gray-500 tracking-wide">Typ: {item?.serialNum}</p>
        </div>

        {/* Video */}
        <div className="relative w-full overflow-hidden rounded-3xl shadow-xl">
            <video className="w-full h-auto rounded-3xl object-cover" controls muted>
            <source src={item?.video||null} type="video/mp4" />
            </video>
            <div className="absolute bottom-3 left-3 bg-white/70 px-3 py-1 rounded-full text-xs font-medium text-gray-700">Preview</div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">Product Details</h2>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
            {Object.entries(items[paramid])
                .filter(([key]) => !['priceNum','src','id','pdf','price','category','video'].includes(key))
                .map(([key,value]) => (
                <div key={key} className="flex flex-col">
                    <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">{t(key)}</span>
                    <span className="text-gray-900 font-semibold">{value}</span>
                </div>
                ))}
            </div>
        </div>

        {/* Price */}
        {isLoggedIn && (
        <div>
            <p className="text-3xl font-bold text-gray-900">{item?.price}</p>
            <p className="text-xs text-gray-400 mt-1 tracking-wide">{t2('inklMwst')}</p>
        </div>)}

        </div>


      ) : (<div className="bg-white h-auto">
        {/*
        <video autoPlay loop muted className="object-cover w-full h-full">
                    <source src='/p3.mp4' type="video/mp4"/>
        </video>*/}

        <div className="flex justify-between px-10 py-5 bg-white">
            {/* Left Side Div */}
            <div className="ml-[5%] w-3/5 h-auto mr-[10%]">
                {/* Title and Serial Number */}
                <div className="mt-[20px] mb-[20px] text-[30px] font-bold text-lightBlue">Typ: {item?.serialNum}</div>
                {/* Product Name */}
                <div className="mb-[50px] text-[20px] font-sans text-[#2B3136]">{items[paramid].name}</div>
                {/* Video */}
                <div className="mt-4">
                <video  autoPlay loop muted className="w-full h-full">
                    {/*console.log(params.id)*/}
                    <source src={item?.video||null} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                </div>

            </div>

            {/* Right Side Div */}
            <div className="flex flex-col space-y-4 mr-[5%] mt-[5%] bg-[#E5F0F6] text-black rounded-[20px] p-4 w-full max-w-[400px] box-border overflow-hidden">
  {/*
      Problem:
      - Using w-1/5 fixed the container to 20% → it does not scale when zoomed.
      - Inner content could overshoot when zoomed or numbers are large.

      Solution:
      - Use w-full + max-w-[400px] (or adjust) so the container grows/shrinks with parent/viewport.
      - box-border ensures padding is included in width.
      - overflow-hidden prevents inner elements from spilling.
      - Children (price, VAT, benefits) use flex and break-words to remain compact.
  */}
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


                    <div className="w-full flex flex-col items-start px-4 text-[#0F4C71] box-border overflow-hidden">
                    {/*
                        Problem:
                        - Main price and VAT sometimes overshoot parent on zoom.
                        - Default content-box causes padding to add extra width.
                        - Alignment is off when numbers wrap or zoomed.

                        Solution:
                        - Apply box-border so padding is included in width.
                        - Use flex-col + items-start to vertically align main price and VAT.
                        - Use w-full + break-words to prevent overshoot.
                        - Small gap between prices to keep layout neat.
                    */}
                    {isLoggedIn ? (
                        <div className="flex flex-col items-start w-full gap-1 box-border">
                        {/* Main price button */}
                        <div
                            className="flex items-center justify-start rounded-xl py-3 transition-all duration-300 backdrop-blur-sm text-3xl font-bold text-gray-900 w-full break-words box-border"
                            style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
                        >
                            {items[paramid].price} 
                        </div>

                        {/* VAT price vertically aligned with main price */}
                        <span className="text-xs font-light text-gray-500 break-words ml-1 box-border">
                            {(parseFloat(items[paramid].price) * 1.19).toFixed(2)} € {t2('inklMwst')}
                        </span>
                        </div>
                    ) : (
                        <div
                        className="flex items-center justify-center rounded-xl px-4 py-3 transition-all duration-300 backdrop-blur-sm text-lg font-medium text-customBlue bg-customBlue/5 hover:bg-customBlue/10 hover:border-customBlue/70 w-full break-words cursor-pointer box-border"
                        style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
                        onClick={() => (window.location.href = "/en/login")}
                        >
                        Login to purchase
                        </div>
                    )}
                    </div>

                </div>


                {/* Datenblatt and Bestellen */}
             
                <div className="mt-6 pb-[30px] flex flex-col justify-left">
                        {isLoggedIn && (
                        <button
                            onClick={() => setIsOpen(true)}
                            className="mb-[20px] w-2/3 py-2 rounded-lg bg-gradient-to-r from-[#B0D6EC] to-[#E5F0F6] text-black flex items-center justify-center shadow-md hover:bg-gradient-to-r hover:from-[#9AC9E3] hover:to-[#CFE6F1] transition duration-300 ease-in-out"
                        >
                            {t2('buyNow')}
                        </button>
                        )}


                    {isLoggedIn && (
                    <a href={item?.pdf} className="w-full">
                        <button className="w-2/3 py-2 rounded-lg bg-gradient-to-r from-[#B0D6EC] to-[#E5F0F6] text-black flex items-center justify-center shadow-md hover:bg-gradient-to-r hover:from-[#9AC9E3] hover:to-[#CFE6F1] transition duration-300 ease-in-out">
                        <span className="font-medium text-sm">{t2('viewDatenblatt')}</span>
                        </button>
                    </a>)}
                </div>



                    {/* Lieferzeit and Expressversand */}
                    <div className="ml-2 flex flex-col  mt-[50px] text-sm font-light">
                        <div>{t2('lieferzeit')} </div> <br />
                        <div className="text-lightBlue"> {t2('aufLagerVersand3_5Tagen')}</div>
                        <div className="text-lightBlue"> {t2('nichtAufLagerBestellungAufAnfrage')}</div><br />
                        <div className="cursor-pointer"> {t2('versandkostenInfo')}</div>
                    </div>

                
                
                {/* Textbox */}
                <div className="text-sm mt-4 p-2 font-light leading-relaxed">
                    {/*Versand am: <span className="text-lightBlue"> innerhalb 2 Wochen nach Bestellungsdatum</span><br /><br />*/}
                    {t2('erwarteteLieferung2Wochen')} <br /><br />
                    {/*Bestellen Sie innerhalb <span className="text-lightBlue">19 Stunden 52 Minuten per Expressversand.</span><br /><br />*/}
                    <span className="text-xs">{t2('deliveryNotice')}</span>

                </div>

                {/* Certificate */}
                <div className="bg-[#E5F0F6] p-4 rounded-md font-light text-sm flex flex-wrap items-start gap-4 w-full">
                {/*
                    Behavior:
                    1. flex-wrap → allows sections to go to next line if parent is too narrow.
                    2. flex-1 min-w-0 → each section can grow/shrink evenly and wrap text.
                    3. break-words → long words wrap inside their section.
                    4. items-start → all sections align to top, even if some wrap.
                */}

                {/* Umtausch Section */}
                <div className="flex items-center space-x-2 flex-1 min-w-[150px]">
                    <img src="https://www.nieruf.de/bundles/nierufproductbenefits/assets/icon/exchange.svg?1728456486" 
                        alt="Umtausch" 
                        className="h-6 w-6 flex-shrink-0" 
                    />
                    <span className="break-words text-xs">GoetValve Umtausch </span>
                    
                </div>

                {/* Garantie Section */}
                <div className="flex items-center space-x-2 flex-1 min-w-[150px]">
                    <img src="https://www.nieruf.de/bundles/nierufproductbenefits/assets/icon/warranty.svg?1728456486"
                        alt="Garantie"
                        className="h-5 w-5 flex-shrink-0"
                    />
                    <span className="break-words text-xs">12 M. Garantie </span>
                    
                </div>

                {/* Zertifiziert Section */}
                <div className="flex items-center space-x-2 flex-1 min-w-[150px]">
                    <img src="https://www.nieruf.de/bundles/nierufproductbenefits/assets/icon/certified.svg?1728456486" 
                        alt="Zertifiziert" 
                        className="h-6 w-6 flex-shrink-0" 
                    />
                    <span className="break-words text-xs">Zertifiziert </span>
                    <span className="text-blue-400 text-xs"></span>
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
            <div className="flex justify-left mr-[7%] pl-[32%] mt-[5%] mb-[30px] pb-[20px] space-x-20 w-screen border-b border-gray-300 shadow-md">
                <span
                    onClick={() => setView("description")}
                    className="text-[20px] text-[#2B3136] cursor-pointer hover:text-lightBlue transition duration-200"
                >
                <div className="flex justify-center items-center h-full">
                <span className="flex items-center gap-2 text-[40px]">
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Icon-doc.svg"
                    alt="Description"
                    className="w-[40px] h-[40px]"
                    />
                    <span className="text-[20px] font-semibold">Description</span>
                </span>
                </div>

                </span>

                {/*<span
                    onClick={() => setView("viewer")}
                    className="text-[20px] text-[#2B3136] cursor-pointer hover:text-lightBlue transition duration-200"
                >
                    <span  className="text-[40px]">🧊</span> 3D viewer
                </span>*/}


                <span
                    onClick={() => setView("download")}
                    className="text-[20px] text-[#2B3136] cursor-pointer hover:text-lightBlue transition duration-200"
                >
                    <span  className="text-[40px]">⬇️</span> Download
                </span>
            </div>
        </div>

        {(view === "description")&& (
            <div className="ml-[7%] mb-[5vh] flex ">
                <div className="mr-[10%] flex flex-col items-center h-[5%] w-[300px] p-4 bg-white rounded-lg shadow-lg  font-thin">
                    <p className="text-[30px] text-gray-500  mb-[40px]">{"Type:"+ items[paramid].serialNum}</p> 
                    <img 
                        src={items[paramid].src} 
                        alt={items[paramid].name} 
                        className="w-[150px] h-[200px] rounded-lg shadow-md mb-[30px]" 
                    />
                    <h2 className="text-lg text-gray-800 mb-[20px] pl-[20px]">{items[paramid].name}</h2>
                </div>

                <div className="w-2/3 ">
                    <h2 className="font-bold text-[30px] text-customBlue">🧊Produktdetails</h2>
                    <table className="w-full font-thin">
                        <tbody>
                        
                        {Object.entries(items[paramid])
                                .filter(([key,value]) => !['priceNum', 'src','price','category','id','pdf','video'].includes(key) && value !== "" && value != null)
                                .map(([key, value], index) => (
                                    <tr className={`h-[25px] w-[280px] text-[#212529] ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`} key={key}>
                                        <td className="text-[16.8px] font-semibold font-montserrat p-[5px] text-customBlue">
                                            {t(key)} {/* 自动根据语言切换 */}
                                        </td>
                                        <td className="text-[16.8px] font-montserrat p-[10px]">{value}</td>
                                    </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                


            </div>
        
        
        
          
        )}

        {view === "viewer" && (
            <div ref={containerRef} className="ml-[6%] mb-[5vh] mr-[15%] w-4/5 h-[600px] border-t-2 border-b-2 border-black relative mb-[150px]">
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
   <div className="mt-[5%] mb-[5vh]">
   <div className="flex justify-center mx-auto my-8 w-[50%]">
       {/* 3D Modell Section */}
  
       <div className="flex flex-col items-center w-[45%] h-[300px] p-6 bg-white border border-gray-300 rounded-lg shadow-md text-center mr-[15%]">
           <a href="" download>
               <img
                   src="https://www.nieruf.de/bundles/nierufproductdownloads/assets/icon/cad-file.svg?1728456486"
                   alt="3D Modell"
                   className="w-[100px] h-[100px] mb-4"
               />
               <h3 className="text-xl text-customBlue font-semibold">3D Modell</h3>
               <p className="text-gray-600 mt-2">STEP - 4.7 MiB</p>
           </a>
       </div>

       {/* Datenblatt Section  https://www.nieruf.de/bundles/nierufproductdownloads/assets/icon/datasheet.svg?1728456486*/}
        
       <div className="flex flex-col items-center w-[45%] h-[300px] p-6 bg-white border border-gray-300 rounded-lg shadow-md text-center">
            {item?.pdf && (
            <a
                href={isLoggedIn ? item.pdf : "/en/login"}
                target={isLoggedIn ? "_blank" : "_self"}
                download={isLoggedIn}
            >
                <img
                src="https://www.nieruf.de/bundles/nierufproductdownloads/assets/icon/datasheet.svg?1728456486"
                alt="Datenblatt"
                className="w-[100px] h-[100px]"
                />
                <h3 className="text-xl text-customBlue font-semibold">Datenblatt</h3>
                <p className="text-gray-600 mt-2">PDF - 467.26 KiB</p>
            </a>
            )}

       </div>
   </div>
</div>)}
        
    {/* Accessories Section */}

<div className="w-full max-w-7xl mx-auto relative mt-[50px] mb-[10vh] min-h-[30vh]">

  {/* Header / Title */}
<div className="bg-blue-100 px-6 py-3 rounded-md mb-6 w-full flex justify-center shadow-lg">
  <h2 className="text-black text-2xl sm:text-3xl font-bold">
    Accessories
  </h2>
</div>

  {/* Grid */}
  <div className="grid grid-rows-3 grid-cols-3 gap-8">
    {accessories.map((file, index) => {
      const name = file.replace("/", "").replace(".png", "");

      return (
        <div
          key={index}
          className="
            flex flex-col items-center justify-center p-4 rounded-xl shadow-lg bg-white
            transition-transform duration-300
            hover:scale-105
            hover:border-4 hover:border-blue-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]
            active:border-4 active:border-blue-400 active:shadow-[0_0_25px_rgba(59,130,246,0.5)]
          "
        >
          <img
            src={`${baseUrl}${file}`}
            alt={name}
            className="w-36 sm:w-40 h-36 sm:h-40 object-fit rounded-xl shadow-md"
          />
          <span className=" font-thin scale-80 sm:text-base font-thin text-black mt-4 text-center break-words">
            {name}
          </span>
        </div>
      );
    })}
  </div>
</div>

    <div className="relative z-20">
          
            {/* Sliding Menu */}
<div
    className={`z-999 fixed top-0 right-0 w-[400px] h-full bg-gray-100 shadow-lg transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}
>
    <div className="flex flex-col justify-between h-full p-[30px] z-999"> {/* Ensure the container takes full height */}
        <div>
            <h2 className="text-2xl font-bold mb-2 text-lightBlue z-999">Warenkorb</h2>
            <h3 className="text-gray-600 mb-4 z-999">{quantity} Positionen</h3>

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



        </div>)}
    </div>

  )
}

export default page