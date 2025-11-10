"use client"
import React, { useState, useEffect,useRef} from 'react';

// Import items
import { items } from "../Product1/items"; 

import { useRouter } from 'next/router';
import { usePathname } from "next/navigation";
// Import Swiper React components
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Categorydsc from './categorydsc'
import Link from 'next/link'
import MobileProductPage1 from '@/src/app/responsive/product/MobileProductPage1';

import { useTranslations } from 'next-intl';

//THREE.JS
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import ShoppingCart from '../shoppingCart';

import LanguageSwitcher from '../../langSwitcher';

//paypal
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import Loggout from '../loggout'



//https://codesandbox.io/p/sandbox/multifilters-forked-nc6kg2?file=%2Fsrc%2FMultiFilters.js%3A26%2C66-28%2C21
//https://www.youtube.com/watch?v=u1yr_HZivzk

const YourPage =  () => {
    const t = useTranslations('Product1'); // Load "Category" namespace

    const [selectedFilters,setSelectedFilters] = useState([])
    const [filteredItems,setFilterItems] = useState(items)

    //filtering criteria 
    let filters1 = ["DN25",'DN27','DN28','DN29','DN30','DN31','DN32','DN33','DN34','DN35','DN36','DN37']
    let filters2 = ["2/2","3/2","5/2"]
    let filters3 = ["12V-DC","24V-DC","110V","230V"]
    let filters4 = ["Aluminium",'PA','PP','PVC']
    let filters5 = ['EPDM','FKM','FPM','NBR']
    let filters6 = ['Federraumbelüftung','NC','NO']
    let filters7 = ['direktgesteuert','servorgesteurt','zwanggesteuert']
    let filters8 = ['0-10','10-20','20-30','30-40','40-50']

    //filter states
    const [tempFilters, setTempFilters] = useState(filters1) // Initialize with all filters1
    const [tempFilters2,setTempFilters2] = useState(filters2)// Initialize with all filters2
    const [tempFilters3,setTempFilters3] = useState(filters3)// Initialize with all filters2
    const [tempFilters4,setTempFilters4] = useState(filters4)// Initialize with all filters2
    const [tempFilters5,setTempFilters5] = useState(filters5)// Initialize with all filters2
    const [tempFilters6,setTempFilters6] = useState(filters6)// Initialize with all filters2
    const [tempFilters7,setTempFilters7] = useState(filters7)// Initialize with all filters2
    const [tempFilters8,setTempFilters8] = useState(filters8)// Initialize with all filters2

    //login state
    const [ID,setID] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    // modal state
    const [modalOpen,setModalOpen] = useState(false)
    const modalRef = useRef(null);

    const [device, setDevice] = useState('pc'); // 'pc' | 'tablet' | 'mobile'

    useEffect(() => {
        const handleResize = () => {
        const width = window.innerWidth;
        if (width <= 500) setDevice('mobile');
        else if (width <= 1024) setDevice('tablet');
        else setDevice('pc');
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // initial check

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    //Pathname and locale
    const pathname = usePathname(); // ✅ inside component
    const segments = pathname.split("/"); // ["", "en", "Product-login", "Product1"] Split the path and take only the first segment after /
    const locale = segments[1]; // "en", "de", "it"
    const loginPath = `/${locale}/login`; // "/en/login"


    useEffect(() => {
        const checkUserSignedIn = async () => {
                const loggedIn = localStorage.getItem("loggedIn") === "true";
                setIsLoggedIn(loggedIn);
        };
        
            checkUserSignedIn();
    }, []); // Empty dependency array to run only on mount

    //----------------------------------------------FILTER HANDLER-------------------------------------------------//
    // Filter selection handler
    const handleSelect = (selectedCategory) => {
        if (selectedFilters.includes(selectedCategory)) {
            let filters = selectedFilters.filter((el) => el !== selectedCategory);
            setSelectedFilters(filters);
            setTempFilters(filters1)
            setTempFilters2(filters2)
            setTempFilters3(filters3)
            setTempFilters4(filters4)
            setTempFilters5(filters5)
            setTempFilters6(filters6)
            setTempFilters7(filters7)
            setTempFilters8(filters8)

          
        }else{
            setSelectedFilters([...selectedFilters,selectedCategory])
            if(filters1.includes(selectedCategory)){
                setTempFilters([selectedCategory]); //selectedcategory filter1
            }
            if(filters2.includes(selectedCategory)){
                setTempFilters2([selectedCategory]);
            }
            if(filters3.includes(selectedCategory)){
                setTempFilters3([selectedCategory]); //selectedcategory filter1
            }
            if(filters4.includes(selectedCategory)){
                setTempFilters4([selectedCategory]);
            }
            if(filters5.includes(selectedCategory)){
                setTempFilters5([selectedCategory]); //selectedcategory filter1
            }
            if(filters6.includes(selectedCategory)){
                setTempFilters6([selectedCategory]);
            }
            if(filters7.includes(selectedCategory)){
                setTempFilters7([selectedCategory]); //selectedcategory filter1
            }
            if(filters8.includes(selectedCategory)){
                setTempFilters8([selectedCategory]);
            }

        }
        
    }

    const resetFilters = () => {
        setSelectedFilters([]); // Reset the selected filters
        setTempFilters(filters1)
        setTempFilters2(filters2)
        setTempFilters3(filters3)
        setTempFilters4(filters4)
        setTempFilters5(filters5)
        setTempFilters6(filters6)
        setTempFilters7(filters7)
        setTempFilters8(filters8)

    };

    const itemFilter = () => {
        if (selectedFilters.length > 0) {
            // Filter items where all selected filters must be present in the item's category
            let filteredList = items.filter(item =>
                selectedFilters.every(selectedCategory => 
                    item.category.includes(selectedCategory)
                )
            );
            setFilterItems(filteredList);
        } else {
            setFilterItems([...items]);
        }
    };

    // Use effect to trigger filter handler
    useEffect(()=> {
        itemFilter();
    },
    [selectedFilters])
    //------------------------------------------------------------------------------------------------------------//



    //----------------------------------------------Modal HANDLER-------------------------------------------------//
    //use effect for modal of 3D model with THREE.JS
    useEffect(() =>{
       
            if (modalOpen) {
            const scene = new THREE.Scene();
            const width = modalRef.current.clientWidth; // Get the width of the modal
            const height = modalRef.current.clientHeight; // Get the height of the modal

            const camera = new THREE.PerspectiveCamera(100, width/height, 0.1, 2000);
            const renderer = new THREE.WebGLRenderer();
            const gridHelper = new THREE.GridHelper(1000,1000)
            const axesHelper = new THREE.AxesHelper(1000); // You can adjust the size as needed
            const light = new THREE.AmbientLight(0x404040,1); // soft white light
            const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );

            scene.add( directionalLight );
            scene.add( light );
            //scene.add(axesHelper);
            //scene.add(gridHelper)

            renderer.setSize(width, height);
            modalRef.current.appendChild(renderer.domElement);
            
            
        
            //const geometry = new THREE.BoxGeometry();
            //const material = new THREE.MeshBasicMaterial({ color: 0x808080 });
            //const cube = new THREE.Mesh(geometry, material);
            //scene.add(cube);
            
            // Set the scene background color to white
            scene.background = new THREE.Color(0xffffff); // White background 0xffffff
            const controls = new OrbitControls( camera, renderer.domElement );
            camera.position.set(50, 300, 50); // Move the camera back and up
            //camera.lookAt(0, 5000, 0); // Look at the origin or adjust to the object's position
            controls.update();

            //controls.update() must be called after any manual changes to the camera's transform
            //camera.position.set(0,0,0);
            //controls.update();

            const loader = new GLTFLoader(); //Instantiate a loader
            loader.load(`/demo${ID+1}.glb`,
                    function(glb){
                        console.log("load successfullyyyyyyyyyy")
                        glb.scene.position.set(0, 0, 0);
                        scene.add(glb.scene)
                    },
                    function(error){
                    console.log('An error happened 111111111111' );
                }
            )
                

            const animate = () => {
                requestAnimationFrame(animate);
                //glb.rotation.x += 0.01;
                //glb.rotation.y += 0.01;
                controls.update();
                renderer.render(scene, camera);
            };
            animate();
        
            }

        
      }, [modalOpen]);
    //Modal handlers
    const handleModalOpen = (itemID) => {
        setModalOpen(true)
        setID(itemID)
        
    }

    const handleModalClose = () =>{
        setModalOpen(false)
    }
    //------------------------------------------------------------------------------------------------------------//


    //------------------------------------------------Product enties handlers ------------------------------------//

    // Single source of truth
const [cart, setCart] = useState([]);

// get quantity from cart directly
const getQuantity = (name) => {
  const item = cart.find((i) => i.name === name);
  return item ? item.quantity : 0;
};
const [inCart, setInCart] = useState(false);

  const handleClick = (item) => {
    if (inCart) {
      resetQuantity(item.name);
      setInCart(false);
    } else {
      increaseQuantity(item.name);
      setInCart(true);
    }
  };

// add to cart
const increaseQuantity = (name) => {
  const price = items.find((i) => i.name === name).price;
  const updated = [...cart];
  const idx = updated.findIndex(i => i.name === name);
  if (idx >= 0) {
    updated[idx].quantity += 1;
  } else {
    updated.push({ name, quantity: 1, price });
  }
  setCart(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
};

// decrease cart
const decreaseQuantity = (name) => {
  const updated = [...cart];
  const idx = updated.findIndex(i => i.name === name);
  if (idx >= 0) {
    updated[idx].quantity -= 1;
    if (updated[idx].quantity <= 0) updated.splice(idx, 1);
  }
  setCart(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
};

const resetQuantity = (name) => {
  const updated = cart.filter(i => i.name !== name); // remove the item completely
  setCart(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
};




    return (
        <>
        {device === 'pc' && (<div style={{height:"auto", width:"100vw",backgroundColor:"white"}}>
            {/*isLoggedIn&&<Loggout/>*/}

            {/*Swiper category section*/}
            <div className='px-[15vw] border-b border-blue-400 border-b-[5px]' style={{height:"200px"}}>
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
                                <Link href={`/${locale}/Product-login/Product1`}>
                                    <img className='h-32 hover:scale-105 transition-transform duration-200' 
                                    src="https://www.nieruf.de/thumbnail/9d/83/4a/1707834708/Manometer-Absperrventile_400x400.png?ts=1710263478">
                                    </img>
                                </Link>
                               
                            </div>
                                <div className='flex justify-center items-center text-gray-400'>
                                    Solenoid
                                </div>
                            </div>
                        </SwiperSlide>
                        
                        
                        <SwiperSlide>
                            <div>
                            <div className='flex justify-center cursor-pointer'>
                                <Link href={`/${locale}/Product-login/Product2`}>
                                    <img className='h-32 hover:scale-105 transition-transform duration-200' 
                                    src="https://www.nieruf.de/thumbnail/9d/83/4a/1707834708/Manometer-Absperrventile_400x400.png?ts=1710263478">
                                    </img>
                                </Link>
                               
                            </div>
                                <div className='flex justify-center items-center text-gray-400'>
                                    pressure-actuated
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
                                    cryogenic
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

            <Categorydsc/>

            {/*product filtering section*/}
            <div className="h-auto w-auto pb-[20px] shadow-lg mb-20">

                <div className="flex w-screen">
                    <div className="flex ml-[15.5%] mr-[20px] items-center pb-[18px]">
                    <div className="w-[100px] h-[4px]" style={{ backgroundColor: "var(--color-customBlue)" }}></div>
                    </div>

                    <div className="mr-[20px] mb-[20px] text-[25px] font-bold" style={{ color: "var(--color-lightBlue)" }}>
                    {t('finder')}
                    </div>

                    <div className="flex w-screen mr-[20px] items-center pb-[18px]">
                    <div className="w-[77.3%] h-[4px]" style={{ backgroundColor: "var(--color-customBlue)" }}></div>
                    </div>

                </div>


                <div className="flex justify-center ml-[4%]">
  <div>
    <div className="flex justify-center text-hind text-14px pb-20">

      <div className="flex flex-col w-[300px] mr-10">
        <div className="mb-2 pt-2 pb-2 bg-[#0F4C71] text-white rounded text-center">
          {t("Nennweite")}
        </div>
        <div className="overflow-y-auto h-[120px] w-[100%]">
          {tempFilters.map((category,id)=>(
            <label key={id} className="flex items-center mb-2">
              <input type="checkbox"
                     onChange={()=>handleSelect(category)} 
                     checked={selectedFilters.includes(category)}
                     className="mr-2" />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="text-hind w-[300px] mr-10">
        <div className="flex flex-col">
          <div className="w-[100%] mb-2 pt-2 pb-2 bg-[#0F4C71] text-white rounded text-center">
            {t("Baumform")}
          </div>
          {tempFilters2.map((category,id)=>(
            <label key={id} className="flex items-center mb-2">
              <input type="checkbox"
                     onChange={()=>handleSelect(category)} 
                     checked={selectedFilters.includes(category)}
                     className="mr-2" />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="overflow-y-auto w-[300px] mr-10">
        <div className="flex flex-col">
          <div className="w-[100%] mb-2 pt-2 pb-2 bg-[#0F4C71] text-white rounded text-center">
            {t("Spannung")}
          </div>
          {tempFilters3.map((category,id)=>(
            <label key={id} className="flex items-center mb-2 w-32">
              <input type="checkbox"
                     onChange={()=>handleSelect(category)} 
                     checked={selectedFilters.includes(category)}
                     className="mr-2" />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="overflow-y-auto w-[300px] mr-20">
        <div className="flex flex-col">
          <div className="w-[100%] mb-2 pt-2 pb-2 bg-[#0F4C71] text-white rounded text-center">
            {t("Material")}
          </div>
          {tempFilters4.map((category,id)=>(
            <label key={id} className="flex items-center mb-2">
              <input type="checkbox"
                     onChange={()=>handleSelect(category)} 
                     checked={selectedFilters.includes(category)}
                     className="mr-2" />
              {category}
            </label>
          ))}
        </div>
      </div>

    </div>

    <div className="flex justify-center text-hind text-14px">
      <div className="overflow-y-auto mr-10">
        <div className="flex flex-col w-[300px]">
          <div className="w-[100%] mb-2 pt-2 pb-2 bg-[#0F4C71] text-white rounded text-center">
            {t("Dichtung")}
          </div>
          {tempFilters5.map((category,id)=>(
            <label key={id} className="flex items-center mb-2">
              <input type="checkbox"
                     onChange={()=>handleSelect(category)} 
                     checked={selectedFilters.includes(category)}
                     className="mr-2" />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="overflow-y-auto mr-10">
        <div className="flex flex-col w-[300px]">
          <div className="w-[100%] mb-2 pt-2 pb-2 bg-[#0F4C71] text-white rounded text-center">
            {t("Schaltfunktion")}
          </div>
          {tempFilters6.map((category,id)=>(
            <label key={id} className="flex items-center mb-2">
              <input type="checkbox"
                     onChange={()=>handleSelect(category)} 
                     checked={selectedFilters.includes(category)}
                     className="mr-2" />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="mr-10">
        <div className="flex flex-col w-[300px]">
          <div className="w-[100%] mb-2 pt-2 pb-2 bg-[#0F4C71] text-white rounded text-center">
            {t("Steurung")}
          </div>
          {tempFilters7.map((category,id)=>(
            <label key={id} className="flex items-center mb-2">
              <input type="checkbox"
                     onChange={()=>handleSelect(category)} 
                     checked={selectedFilters.includes(category)}
                     className="mr-2" />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="mr-20">
        <div className="flex flex-col w-[300px]">
          <div className="w-[100%] mb-2 pt-2 pb-2 bg-[#0F4C71] text-white rounded text-center">
            {t("Druck")}
          </div>
          {tempFilters8.map((category,id)=>(
            <label key={id} className="flex items-center mb-2">
              <input type="checkbox"
                     onChange={()=>handleSelect(category)} 
                     checked={selectedFilters.includes(category)}
                     className="mr-2" />
              {category}
            </label>
          ))}
        </div>
      </div>

    </div>
  </div>
</div>
            
                {/*cancel button*/} 
                {selectedFilters.length > 0 &&(
                    <div className='flex justify-start ml-[15%] '>
                        <button onClick={() => resetFilters()} className="button">
                                    Cancel All
                        </button>
                    </div>
                )}

            </div>

            {/*Shopping cart icon on the middle right*/}
            <ShoppingCart cart={cart}/>
            
           
            {/*Product listing section*/}
            <div> 
                {filteredItems.map((item,idx)=>( 
                            <div key={`items-${idx}`} className="">
                                <div className="pb-[20px] pl-[10%] text-[25px] text-customBlue font-bold">
                                    {item.name}
                                </div>

                                <div  className='mb-40 px-[10%] h-[30vh] w-screen flex '>
                            
                                    <div  className='relative h-[30vh] w-screen flex items-center rounded-lg shadow-lg'>
                                        
                                        <div className="h-[100%] w-[20%] pl-[3%] shadow-lg">
                            
                                            <svg
                                                className="absolute mt-[10px] ml-[13%] hover:cursor-pointer"
                                                onClick={() => { handleModalOpen(idx); }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                x="0"
                                                y="0"
                                                viewBox="0 0 130 130"
                                                style={{ width: '60px', height: '60px' ,fill:"#87CEEB"}}
                                                xmlSpace="preserve"
                                            >
                                                <style type="text/css">
                                                    {`
                                                        .st0 { fill-rule:evenodd; clip-rule:evenodd; }
                                                    `}
                                                </style>
                                                <g><path className="st0" d="M13.37,31.32c-22.23,12.2,37.65,19.61,51.14,19.49v-7.44l11.21,11.2L64.51,65.79v-6.97 C37.4,59.85-26.41,42.4,11.97,27.92c0.36,1.13,0.8,2.2,1.3,3.2L13.37,31.32L13.37,31.32z M108.36,8.31c0-2.61,0.47-4.44,1.41-5.48 c0.94-1.04,2.37-1.56,4.3-1.56c0.92,0,1.69,0.12,2.28,0.34c0.59,0.23,1.08,0.52,1.45,0.89c0.38,0.36,0.67,0.75,0.89,1.15 c0.22,0.4,0.39,0.87,0.52,1.41c0.26,1.02,0.38,2.09,0.38,3.21c0,2.49-0.42,4.32-1.27,5.47c-0.84,1.15-2.29,1.73-4.36,1.73 c-1.15,0-2.09-0.19-2.8-0.55c-0.71-0.37-1.3-0.91-1.75-1.62c-0.33-0.51-0.59-1.2-0.77-2.07C108.45,10.34,108.36,9.38,108.36,8.31 L108.36,8.31z M26.47,10.49l-9-1.6c0.75-2.86,2.18-5.06,4.31-6.59C23.9,0.77,26.91,0,30.8,0c4.47,0,7.69,0.83,9.69,2.5 c1.99,1.67,2.98,3.77,2.98,6.29c0,1.48-0.41,2.82-1.21,4.01c-0.81,1.2-2.02,2.25-3.65,3.15c1.32,0.33,2.34,0.71,3.03,1.15 c1.14,0.7,2.02,1.63,2.65,2.77c0.63,1.15,0.95,2.51,0.95,4.1c0,2-0.52,3.91-1.56,5.75c-1.05,1.83-2.55,3.24-4.51,4.23 c-1.96,0.99-4.54,1.48-7.74,1.48c-3.11,0-5.57-0.37-7.36-1.1c-1.8-0.73-3.28-1.8-4.44-3.22c-1.16-1.41-2.05-3.19-2.67-5.33 l9.53-1.27c0.38,1.92,0.95,3.26,1.74,4.01c0.78,0.74,1.78,1.12,3,1.12c1.27,0,2.33-0.47,3.18-1.4c0.85-0.93,1.27-2.18,1.27-3.74 c0-1.59-0.41-2.82-1.22-3.69c-0.81-0.87-1.92-1.31-3.32-1.31c-0.74,0-1.77,0.18-3.07,0.56l0.49-6.81c0.52,0.08,0.93,0.12,1.22,0.12 c1.23,0,2.26-0.4,3.08-1.19c0.82-0.79,1.24-1.72,1.24-2.81c0-1.05-0.31-1.88-0.93-2.49c-0.62-0.62-1.48-0.93-2.55-0.93 c-1.12,0-2.02,0.34-2.72,1.01C27.19,7.62,26.72,8.8,26.47,10.49L26.47,10.49z M75.15,8.27l-9.48,1.16 c-0.25-1.32-0.66-2.24-1.24-2.78c-0.59-0.54-1.31-0.81-2.16-0.81c-1.54,0-2.74,0.77-3.59,2.33c-0.62,1.13-1.09,3.52-1.38,7.19 c1.14-1.16,2.31-2.01,3.5-2.56c1.2-0.55,2.59-0.83,4.16-0.83c3.06,0,5.64,1.09,7.75,3.27c2.11,2.19,3.17,4.96,3.17,8.31 c0,2.26-0.53,4.32-1.6,6.2c-1.07,1.87-2.55,3.29-4.44,4.25c-1.9,0.96-4.27,1.44-7.13,1.44c-3.43,0-6.18-0.58-8.25-1.76 c-2.07-1.17-3.73-3.03-4.97-5.59c-1.24-2.56-1.86-5.95-1.86-10.18c0-6.18,1.3-10.71,3.91-13.59C54.13,1.44,57.74,0,62.36,0 c2.73,0,4.88,0.31,6.46,0.94c1.58,0.63,2.9,1.56,3.94,2.76C73.81,4.92,74.61,6.44,75.15,8.27L75.15,8.27z M57.62,23.55 c0,1.86,0.47,3.31,1.4,4.36c0.94,1.05,2.08,1.58,3.44,1.58c1.25,0,2.3-0.48,3.14-1.43c0.84-0.95,1.26-2.37,1.26-4.26 c0-1.93-0.44-3.41-1.31-4.42c-0.88-1.01-1.96-1.52-3.26-1.52c-1.32,0-2.44,0.49-3.34,1.48C58.06,20.32,57.62,21.72,57.62,23.55 L57.62,23.55z M77.91,17.57c0-6.51,1.17-11.07,3.52-13.67C83.77,1.3,87.35,0,92.14,0c2.31,0,4.2,0.29,5.68,0.85 c1.48,0.57,2.69,1.31,3.62,2.22c0.94,0.91,1.68,1.87,2.21,2.87c0.54,1.01,0.97,2.18,1.3,3.52c0.64,2.55,0.96,5.22,0.96,8 c0,6.22-1.05,10.76-3.16,13.64c-2.1,2.88-5.72,4.32-10.87,4.32c-2.88,0-5.21-0.46-6.99-1.38c-1.78-0.92-3.23-2.27-4.37-4.05 c-0.82-1.26-1.47-2.98-1.93-5.17C78.14,22.64,77.91,20.22,77.91,17.57L77.91,17.57z M87.34,17.59c0,4.36,0.38,7.34,1.16,8.94 c0.77,1.6,1.89,2.39,3.36,2.39c0.97,0,1.8-0.34,2.51-1.01c0.71-0.68,1.23-1.76,1.56-3.22c0.34-1.47,0.5-3.75,0.5-6.85 c0-4.55-0.38-7.6-1.16-9.18c-0.77-1.56-1.93-2.35-3.47-2.35c-1.58,0-2.71,0.8-3.42,2.39C87.69,10.31,87.34,13.27,87.34,17.59 L87.34,17.59z M112.14,8.32c0,1.75,0.15,2.94,0.46,3.58c0.31,0.64,0.76,0.96,1.35,0.96c0.39,0,0.72-0.13,1.01-0.41 c0.28-0.27,0.49-0.7,0.63-1.29c0.13-0.59,0.2-1.5,0.2-2.74c0-1.82-0.15-3.05-0.46-3.68c-0.31-0.63-0.77-0.94-1.39-0.94 c-0.63,0-1.09,0.32-1.37,0.96C112.28,5.4,112.14,6.59,112.14,8.32L112.14,8.32z M109.3,30.23c10.56,5.37,8.04,12.99-10.66,17.62 c-5.3,1.31-11.29,2.5-17.86,2.99v6.05c7.31-0.51,14.11-2.19,20.06-3.63c28.12-6.81,27.14-18.97,9.36-25.83 C109.95,28.42,109.65,29.35,109.3,30.23L109.3,30.23z"/></g>
                                                </svg>

                                                <img 
                                                    src={item.src} 
                                                    alt="Description of image" 
                                                    className="w-[60%] h-[100%] object-fit hover:cursor-pointer"
                                                    onClick = {()=> {handleModalOpen(idx)}}
                                                />
                                        </div>

                                        <div className="w-[50%] h-[100%]  border-gray-500 bg-lightBlue shadow-lg text-white" style={{ transform: 'skewX(-10deg)' }}>
                                            <div className="text-hind text-[13px] pl-[15px] pt-[10px] pb-[10px] border-b-[5px] border-white">
                                                3/2 Wege NAMUR Magnetventil G 1/4" Zoll DN 8 aus Aluminium NBR Anschlußspannung 24V DC Druck 2,0 - 10,0 bar
                                            </div>

                                            <div className="w-full h-full">
                                                <div className="w-full h-1/4 border-b-[5px] border-white flex">
                                                    <div className="pl-[10px] pt-[5px] w-1/2 border-r-[5px] border-white">Nennweite:</div>
                                                    <div className="pl-[10px] pt-[5px] w-1/2 w-1/2 ">Spannung:</div>
                                                </div>

                                                <div className="w-full h-1/4 border-b-[5px] border-white flex">
                                                        <div className="pl-[10px] pt-[5px] w-1/2 w-1/2 border-r-[5px] border-white">Maximaler Druck:</div>
                                                        <div className="pl-[10px] pt-[5px] w-1/2 w-1/2  border-white">Schaltfunktion:</div>
                                                </div>

                                                <div className="w-full h-1/3 border-white flex">
                                                            <div className="w-1/2 border-r-[5px] border-white"></div>
                                                            <div className="w-1/2"></div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="w-[30%] h-[100%] z-10 pt-[1%]">
                                            <div className="pl-[20%]">
                                                {isLoggedIn && (
                                                    <div className="flex mb-4">
                                                        <div className="flex ">
                                                            <button
                                                            onClick={() => {
                                                            const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
                                                            const exists = storedCart.find(i => i.name === item.name);

                                                            if (exists) {
                                                                resetQuantity(item.name);
                                                            } else {
                                                                increaseQuantity(item.name);
                                                            }
                                                            }}
                                                            className={`w-[120px] h-[40px] rounded-lg font-medium text-sm transition-colors duration-200
                                                                        ${JSON.parse(localStorage.getItem("cart") || "[]").find(i => i.name === item.name)
                                                                        ? "bg-red-500 text-white hover:bg-red-600"
                                                                        : "bg-blue-400 text-white hover:bg-blue-700"}`}
                                                                                    >
                                                            {JSON.parse(localStorage.getItem("cart") || "[]").find(i => i.name === item.name)
                                                            ? "Remove item"
                                                            : "Add to Cart"}
                                                        </button>
                                                            </div>
                                                        </div>

                                                )}

        
                                                <div>
                                                    <div className="text-4xl mb-1">
                                                {/*<Link className="text-[20px]" href="/login">
                                                    LOGIN TO VIEW PRICE
                                                    </Link>*/}
                                                    {isLoggedIn ? `${item.price}` : 

                                                    <Link href={loginPath} className="text-[20px]">LOGIN TO VIEW PRICE</Link>
                                                    
                                                    }
                                                    </div>
                                                    <div className="text-gray-500">Exklusive 19 % Mehrwertsteuer</div>
                                                </div>

                                            </div>

                                            <div className="flex items-center pl-[20%]">
                                                    <div>
                                                        <div className="mt-4">
                                                            <span className="">Lieferzeit: </span><a href="#" className="text-blue-500">ab Lager</a>
                                                        </div>

                                                        <div className="mt-2 flex">
                                                            <span>Expressversand*:</span>
                                                            <svg className="w-5 h-5 text-blue-500 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>

                                                    </div>
                                            </div>

                                            <div className="mt-6 flex ">
                                                <Link className="flex justify-center w-3/5 bg-[#0F4C71] text-white rounded mb-2 mr-5" style={{ transform: 'skewX(-10deg)' }} href={`../Product-login/Product1/${idx}`} >
                                                    <button className="bg- text-white py-2">View on Detail page</button>
                                                </Link>
                                            
                                                <a href="https://www.nieruf.de/nieruf/datasheets/de_de/Absperrklappe-AK01-AK02.pdf">
                                                
                                                <button 
                                                    className="py-1 px-3 rounded flex justify-center items-center"
                                                    style={{ transform: 'skewX(-20deg)' }}
                                                    >
                                                    <img 
                                                        src="https://i.ibb.co/5sjDt0B/pdf.jpg" 
                                                        className="h-8 w-8" 
                                                        style={{ transform: 'skewX(10deg)' }} 
                                                    />
                                                    Datenblatt
                                                    </button>

                                                </a>
                                                
                                            </div>

                                        </div>

                            
                                    </div>

                                </div>
                            </div>
                        
                ))}
            </div>

            {/*Modal for 3D model viewing*/}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 h-5/6 flex flex-col items-center justify-center">
                        <button 
                            onClick={() => handleModalClose()}
                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 self-end"
                        >
                        Close
                        </button>
                            <div ref={modalRef} className="w-full h-full" style={{ position: 'relative' }}>
                            {/* Make sure to set styles for the canvas */}
                                 
                            </div>
                    </div>
                </div>
            )}

        </div>)}
        {device === 'mobile' && <MobileProductPage1/>}
        </>
    
    );
};

export default YourPage;



































 {/*    
    
          
            <div className="buttons-container  pb-40 mr-20">
                    {tempFilters2.map((category,id)=>(
                        <button className={`button ${
                        selectedFilters?.includes(category) ? "active" : ""
                        }`}
                        onClick={() => handleSelect(category)}
            >
                            {category}
                        </button>
                    ))}
                </div>
            
    
    <div className='mb-40 px-[10%] h-[30vh] w-screen flex'>
                <div className='border-gray-500 border-t-4 border-b-4 h-[30vh] w-screen flex items-center'>
                    <div className='w-[25%]'>

                    </div>

                    <div className="mt-[5%] w-[45%] h-[125%] border-l-2 border-r-2  border-gray-500" style={{ transform: 'skewX(-15deg)' }}>
                        
                    </div>

                    <div>
                        
                    </div>
                </div>

            </div>

            <div className='mb-40 px-[10%] h-[30vh] w-screen flex'>
                <div className='border-gray-500 border-t-4 border-b-4 h-[30vh] w-screen flex items-center'>
                    <div className='w-[25%]'>

                    </div>

                    <div className="mt-[5%] w-[45%] h-[125%] border-l-2 border-r-2  border-gray-500" style={{ transform: 'skewX(-15deg)' }}>
                        
                    </div>

                    <div>
                        
                    </div>
                </div>

            </div>*/}

 {/*

         <div className='mb-60 px-[10%] h-[30vh] w-screen flex '>
                <div className='h-[30vh] w-screen flex items-center rounded-lg shadow-lg'>

                    <div className="h-[100%] w-[20%] pl-[3%] shadow-lg">
                        <img 
                            src="https://i.ibb.co/fH6GNfN/unnamed.jpg" 
                            alt="Description of image" 
                            className="w-[60%] h-[100%] object-fit " 
                        />
                    </div>

                    <div className="w-[50%] h-[100%]  border-gray-500 bg-lightBlue shadow-lg text-white" style={{ transform: 'skewX(-20deg)' }}>
                    Innerhalb geschlossener Rohrleitungssysteme müssen unterschiedliche, teilweise auch aggressive Medien zuverlässig kontrolliert und geste
                    </div>

                    <div className="w-[30%] h-[100%] z-10 pt-[1%]">
                        <div className="pl-[20%]">
                            <div className="flex  mb-4">
                                <button className=" rounded-l px-2">-</button>
                                <input type="text" value="1" className="w-12 text-center border-t border-b"></input>
                                <button className=" rounded-r px-2">+</button>
                            </div>
                            <div>
                                <div className="text-4xl  mb-1">49,40 €*</div>
                                <div className="text-gray-500">58,79 € inkl. Mwst.</div>
                            </div>

                        </div>

                        <div className="flex items-center pl-[20%]">
                                <div>
                                    <div className="mt-4">
                                        <span className="">Lieferzeit: </span><a href="#" className="text-blue-500">ab Lager</a>
                                    </div>

                                    <div className="mt-2 flex">
                                        <span>Expressversand*:</span>
                                        <svg className="w-5 h-5 text-blue-500 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>

                                </div>
                        </div>

                        <div className="mt-6 ">
                            <button className="w-3/5 bg-blue-500 text-white py-2 rounded mb-2 " style={{ transform: 'skewX(-20deg)' }}>Jetzt bestellen</button>
                            <a href="https://www.nieruf.de/nieruf/datasheets/de_de/Absperrklappe-AK01-AK02.pdf">
                                <button className="w-1/3 border py-2 rounded" style={{ transform: 'skewX(-20deg)' }}>Datenblatt</button>
                            </a>
                            
                        </div>

                    </div>

        
                </div>


            
            </div>

            <div className='mb-40 px-[10%] h-[30vh] w-screen flex '>
                <div className='h-[30vh] w-screen flex items-center rounded-lg shadow-lg'>

                    <div className="w-[50%] h-[100%]  border-gray-500 bg-lightBlue shadow-lg text-white" style={{ transform: 'skewX(-20deg)' }}>
                    2Innerhalb geschlossener Rohrleitungssysteme müssen unterschiedliche, teilweise auch aggressive Medien zuverlässig kontrolliert und geste
                    </div>

                    <div className="pl-[4%] pt-[4%] h-full w-[15%] shadow-lg border-r-2 border-grey-500 " style={{ transform: 'skewX(-20deg)' }}>
                        <div style={{ transform: 'skewX(20deg)' }}>
                            <img 
                                src="https://i.ibb.co/2sspfd5/unnamed-4.jpg" 
                                alt="Description of image" 
                                className="w-[55%] h-[50%]" 
                            />
                        </div>
                     </div>

                     <div className="w-[30%] h-[100%] z-10 pt-[1%]">
                        <div className="pl-[30%]">
                            <div className="flex  mb-4">
                                <button className=" rounded-l px-2">-</button>
                                <input type="text" value="1" className="w-12 text-center border-t border-b"></input>
                                <button className=" rounded-r px-2">+</button>
                            </div>
                            <div>
                                <div className="text-4xl  mb-1">49,40 €*</div>
                                <div className="text-gray-500">58,79 € inkl. Mwst.</div>
                            </div>

                        </div>

                        <div className="flex items-center pl-[30%]">
                                <div>
                                    <div className="mt-4">
                                        <span className="">Lieferzeit: </span><a href="#" className="text-blue-500">ab Lager</a>
                                    </div>

                                    <div className="mt-2 flex">
                                        <span>Expressversand*:</span>
                                        <svg className="w-5 h-5 text-blue-500 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>

                                </div>
                        </div>

                        <div className="mt-6 pl-[15%]">
                            <button className="w-2/3 bg-blue-500 text-white py-2 rounded mb-2  " style={{ transform: 'skewX(-20deg)' }}>Jetzt bestellen</button>
                            <a href="https://i.ibb.co/n1gqRs9/unnamed-3.jpg">
                                <button className="w-1/3 border py-2 rounded" style={{ transform: 'skewX(-20deg)' }}>Datenblatt</button>
                            </a>
                            
                        </div>
                        
                    </div>
    
                </div>

            </div>

            <div className='mb-60 px-[10%] h-[30vh] w-screen flex '>
                <div className='h-[30vh] w-screen flex items-center rounded-lg shadow-lg'>

                    <div className="pl-[3%] h-[90%] w-[15%] shadow-lg">
                        <img 
                            src="https://i.ibb.co/2sspfd5/unnamed-4.jpg" 
                            alt="Description of image" 
                            className="w-auto h-full object-cover" 
                        />
                    </div>

                    <div className="w-[53%] h-[100%]  border-gray-500 bg-lightBlue shadow-lg text-white" style={{ transform: 'skewX(-20deg)' }}>
                    3Innerhalb geschlossener Rohrleitungssysteme müssen unterschiedliche, teilweise auch aggressive Medien zuverlässig kontrolliert und geste
                    </div>

                    <div className="w-[30%] h-[100%] z-10 pt-[1%]">
                        <div className="pl-[20%]">
                            <div className="flex  mb-4">
                                <button className=" rounded-l px-2">-</button>
                                <input type="text" value="1" className="w-12 text-center border-t border-b"></input>
                                <button className=" rounded-r px-2">+</button>
                            </div>
                            <div>
                                <div className="text-4xl  mb-1">49,40 €*</div>
                                <div className="text-gray-500">58,79 € inkl. Mwst.</div>
                            </div>

                        </div>

                        <div className="flex items-center pl-[20%]">
                                <div>
                                    <div className="mt-4">
                                        <span className="">Lieferzeit: </span><a href="#" className="text-blue-500">ab Lager</a>
                                    </div>

                                    <div className="mt-2 flex">
                                        <span>Expressversand*:</span>
                                        <svg className="w-5 h-5 text-blue-500 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>

                                </div>
                        </div>

                        <div className="mt-6 ">
                            <button className="w-3/5 bg-blue-500 text-white py-2 rounded mb-2 " style={{ transform: 'skewX(-20deg)' }}>Jetzt bestellen</button>
                            <a href="https://www.nieruf.de/nieruf/datasheets/de_de/Absperrklappe-AK01-AK02.pdf">
                                <button className="w-1/3 border py-2 rounded" style={{ transform: 'skewX(-20deg)' }}>Datenblatt</button>
                            </a>
                            
                        </div>
                        
                    </div>
                </div>

            </div>


            <div className='mb-60 px-[10%] h-[30vh] w-screen flex '>
                <div className='h-[30vh] w-screen flex items-center rounded-lg shadow-lg'>

                    <div className="h-[100%] w-[20%] pl-[3%] shadow-lg">
                        <img 
                            src="https://i.ibb.co/fH6GNfN/unnamed.jpg" 
                            alt="Description of image" 
                            className="w-[60%] h-[100%] object-fit " 
                        />
                    </div>

                    <div className="w-[50%] h-[100%]  border-gray-500 bg-lightBlue shadow-lg text-white" style={{ transform: 'skewX(-20deg)' }}>
                    Innerhalb geschlossener Rohrleitungssysteme müssen unterschiedliche, teilweise auch aggressive Medien zuverlässig kontrolliert und geste
                    </div>

                    <div className="w-[30%] h-[100%] z-10 pt-[1%]">
                        <div className="pl-[20%]">
                            <div className="flex  mb-4">
                                <button className=" rounded-l px-2">-</button>
                                <input type="text" value="1" className="w-12 text-center border-t border-b"></input>
                                <button className=" rounded-r px-2">+</button>
                            </div>
                            <div>
                                <div className="text-4xl  mb-1">49,40 €*</div>
                                <div className="text-gray-500">58,79 € inkl. Mwst.</div>
                            </div>

                        </div>

                        <div className="flex items-center pl-[20%]">
                                <div>
                                    <div className="mt-4">
                                        <span className="">Lieferzeit: </span><a href="#" className="text-blue-500">ab Lager</a>
                                    </div>

                                    <div className="mt-2 flex">
                                        <span>Expressversand*:</span>
                                        <svg className="w-5 h-5 text-blue-500 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>

                                </div>
                        </div>

                        <div className="mt-6 ">
                            <button className="w-3/5 bg-blue-500 text-white py-2 rounded mb-2 " style={{ transform: 'skewX(-20deg)' }}>Jetzt bestellen</button>
                            <a href="https://www.nieruf.de/nieruf/datasheets/de_de/Absperrklappe-AK01-AK02.pdf">
                                <button className="w-1/3 border py-2 rounded" style={{ transform: 'skewX(-20deg)' }}>Datenblatt</button>
                            </a>
                            
                        </div>

                    </div>

        
                </div>


            
            </div>

            <div className='mb-40 px-[10%] h-[30vh] w-screen flex '>
                <div className='h-[30vh] w-screen flex items-center rounded-lg shadow-lg'>

                    <div className="w-[50%] h-[100%]  border-gray-500 bg-lightBlue shadow-lg text-white" style={{ transform: 'skewX(-20deg)' }}>
                    2Innerhalb geschlossener Rohrleitungssysteme müssen unterschiedliche, teilweise auch aggressive Medien zuverlässig kontrolliert und geste
                    </div>

                    <div className="pl-[4%] pt-[4%] h-full w-[15%] shadow-lg border-r-2 border-grey-500 " style={{ transform: 'skewX(-20deg)' }}>
                        <div style={{ transform: 'skewX(20deg)' }}>
                            <img 
                                src="https://i.ibb.co/2sspfd5/unnamed-4.jpg" 
                                alt="Description of image" 
                                className="w-[55%] h-[50%]" 
                            />
                        </div>
                     </div>

                     <div className="w-[30%] h-[100%] z-10 pt-[1%]">
                        <div className="pl-[30%]">
                            <div className="flex  mb-4">
                                <button className=" rounded-l px-2">-</button>
                                <input type="text" value="1" className="w-12 text-center border-t border-b"></input>
                                <button className=" rounded-r px-2">+</button>
                            </div>
                            <div>
                                <div className="text-4xl  mb-1">49,40 €*</div>
                                <div className="text-gray-500">58,79 € inkl. Mwst.</div>
                            </div>

                        </div>

                        <div className="flex items-center pl-[30%]">
                                <div>
                                    <div className="mt-4">
                                        <span className="">Lieferzeit: </span><a href="#" className="text-blue-500">ab Lager</a>
                                    </div>

                                    <div className="mt-2 flex">
                                        <span>Expressversand*:</span>
                                        <svg className="w-5 h-5 text-blue-500 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>

                                </div>
                        </div>

                        <div className="mt-6 pl-[15%]">
                            <button className="w-2/3 bg-blue-500 text-white py-2 rounded mb-2  " style={{ transform: 'skewX(-20deg)' }}>Jetzt bestellen</button>
                            <a href="https://i.ibb.co/n1gqRs9/unnamed-3.jpg">
                                <button className="w-1/3 border py-2 rounded" style={{ transform: 'skewX(-20deg)' }}>Datenblatt</button>
                            </a>
                            
                        </div>
                        
                    </div>
    
                </div>

            </div>

            <div className='mb-60 px-[10%] h-[30vh] w-screen flex '>
                <div className='h-[30vh] w-screen flex items-center rounded-lg shadow-lg'>

                    <div className="pl-[3%] h-[90%] w-[15%] shadow-lg">
                        <img 
                            src="https://i.ibb.co/2sspfd5/unnamed-4.jpg" 
                            alt="Description of image" 
                            className="w-auto h-full object-cover" 
                        />
                    </div>

                    <div className="w-[53%] h-[100%]  border-gray-500 bg-lightBlue shadow-lg text-white" style={{ transform: 'skewX(-20deg)' }}>
                    3Innerhalb geschlossener Rohrleitungssysteme müssen unterschiedliche, teilweise auch aggressive Medien zuverlässig kontrolliert und geste
                    </div>

                    <div className="w-[30%] h-[100%] z-10 pt-[1%]">
                        <div className="pl-[20%]">
                            <div className="flex  mb-4">
                                <button className=" rounded-l px-2">-</button>
                                <input type="text" value="1" className="w-12 text-center border-t border-b"></input>
                                <button className=" rounded-r px-2">+</button>
                            </div>
                            <div>
                                <div className="text-4xl  mb-1">49,40 €*</div>
                                <div className="text-gray-500">58,79 € inkl. Mwst.</div>
                            </div>

                        </div>

                        <div className="flex items-center pl-[20%]">
                                <div>
                                    <div className="mt-4">
                                        <span className="">Lieferzeit: </span><a href="#" className="text-blue-500">ab Lager</a>
                                    </div>

                                    <div className="mt-2 flex">
                                        <span>Expressversand*:</span>
                                        <svg className="w-5 h-5 text-blue-500 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>

                                </div>
                        </div>

                        <div className="mt-6 ">
                            <button className="w-3/5 bg-blue-500 text-white py-2 rounded mb-2 " style={{ transform: 'skewX(-20deg)' }}>Jetzt bestellen</button>
                            <a href="https://www.nieruf.de/nieruf/datasheets/de_de/Absperrklappe-AK01-AK02.pdf">
                                <button className="w-1/3 border py-2 rounded" style={{ transform: 'skewX(-20deg)' }}>Datenblatt</button>
                            </a>
                            
                        </div>
                        
                    </div>
                </div>

            </div>*/}