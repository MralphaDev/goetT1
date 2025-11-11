"use client";
import React, { useState, useEffect, useRef } from 'react';
import { items } from "../../../app/[locale]/Product-login/Product1/items"; 
import Link from 'next/link';
import ShoppingCart from '../../../app/[locale]/Product-login/shoppingCart';
import Loggout from '../../../app/[locale]/Product-login/loggout';

const MobileProductPage1 = () => {
    const pathname = window?.location?.pathname || "";
    const locale = pathname.split("/")[1] || "de";
    const loginPath = `/${locale}/login`;

    // Filters
    const filters1 = ["DN25",'DN27','DN28','DN29','DN30','DN31','DN32'];
    const filters2 = ["2/2","3/2","5/2"];
    const filters3 = ["12V-DC","24V-DC","110V","230V"];
    const filters4 = ['Aluminium','PA','PP','PVC'];
    const filters5 = ['EPDM','FKM','FPM','NBR'];
    const filters6 = ['Federraumbelüftung','NC','NO'];
    const filters7 = ['direktgesteuert','servorgesteurt','zwanggesteuert'];
    const filters8 = ['0-10','10-20','20-30','30-40','40-50'];
    let filters9 = ['Solenoid','Pressure-actuated','liqnitro','liqnitrofilter','safetyValve']

    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState(items);

    const [tempFilters, setTempFilters] = useState(filters1);
    const [tempFilters2, setTempFilters2] = useState(filters2);
    const [tempFilters3, setTempFilters3] = useState(filters3);
    const [tempFilters4, setTempFilters4] = useState(filters4);
    const [tempFilters5, setTempFilters5] = useState(filters5);
    const [tempFilters6, setTempFilters6] = useState(filters6);
    const [tempFilters7, setTempFilters7] = useState(filters7);
    const [tempFilters8, setTempFilters8] = useState(filters8);
    const [tempFilters9,setTempFilters9] = useState(filters9)// Initialize with all filters9

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const modalRef = useRef(null);

    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const [inCart, setInCart] = useState(false);

    useEffect(() => {
    const stored = localStorage.getItem("loggedIn");
    const loggedIn = stored === null ? true : stored === "true";
    setIsLoggedIn(loggedIn);

    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
        /*const loggedIn = localStorage.getItem("loggedIn") === "true";
        setIsLoggedIn(loggedIn);
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(storedCart);*/
    }, []);

    const handleSelect = (category) => {
        if(selectedFilters.includes(category)){
            setSelectedFilters(selectedFilters.filter(c=>c!==category));
        } else {
            setSelectedFilters([...selectedFilters, category]);
        }
    };

    const resetFilters = () => {
        setSelectedFilters([]);
        setTempFilters(filters1);
        setTempFilters2(filters2);
        setTempFilters3(filters3);
        setTempFilters4(filters4);
        setTempFilters5(filters5);
        setTempFilters6(filters6);
        setTempFilters7(filters7);
        setTempFilters8(filters8);
        setTempFilters9(filters9);
    };

    useEffect(() => {
        if(selectedFilters.length > 0){
            setFilteredItems(items.filter(item =>
                selectedFilters.every(cat => item.category.includes(cat))
            ));
        } else setFilteredItems([...items]);
    }, [selectedFilters]);

    const handleModalOpen = (id) => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const increaseQuantity = (name) => {
        const price = items.find((i) => i.name === name)?.price || 0;
        const updated = [...cart];
        const idx = updated.findIndex(i => i.name === name);
        if (idx >= 0) updated[idx].quantity += 1;
        else updated.push({ name, quantity: 1, price });
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
        setInCart(true);
    };

    const resetQuantity = (name) => {
        const updated = cart.filter(i => i.name !== name);
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
        setInCart(false);
    };

    const handleCartClick = (item) => {
        const exists = cart.find(i => i.name === item.name);
        if(exists) resetQuantity(item.name);
        else increaseQuantity(item.name);
    };

    const allFilters = [
        {label: "Nennweite", items: tempFilters},
        {label: "Anzahl Wege", items: tempFilters2},
        {label: "Spannung", items: tempFilters3},
        {label: "Material", items: tempFilters4},
        {label: "Dichtung", items: tempFilters5},
        {label: "Funktion", items: tempFilters6},
        {label: "Steuerung", items: tempFilters7},
        {label: "Durchfluss", items: tempFilters8},
        {label:"Typ",items:tempFilters9}
    ];

    return (
        <div className="w-full min-h-screen">

            {/* First Hero Page */}
            <div 
                className="w-full h-screen flex flex-col items-center justify-center text-white text-center relative"
                style={{backgroundImage: `url(https://www.nieruf.de/media/fa/fc/75/1727169671/premium-news-background-blue-checked.svg?ts=1727169671)`, backgroundSize: 'cover', backgroundPosition: 'center'}}
            >
                <h1 className="text-5xl font-bold animate-fadeIn">PRODUCT </h1>
                <p className="mt-4 text-lg animate-fadeIn delay-300">High quality, premium valve solution</p>
                <div className="absolute bottom-20 animate-bounce">
                    <span className="text-2xl">&#x25BC;</span>
                </div>
            </div>

            <div className="w-full bg-white p-4">
                {/*isLoggedIn && <Loggout/>*/}

                {/* Mobile Filter Button */}
                <div className="w-full flex justify-center mb-4 mt-4">
                    <button
                        onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                        className="w-48 h-12 bg-blue-500 text-white rounded-lg"
                    >
                        {mobileFilterOpen ? 'Close Filters' : 'Open Filters'}
                    </button>
                </div>

                {/* Mobile Filter Panel */}
                {mobileFilterOpen && (
                    <div className="flex flex-col gap-4 mb-4">
                        {allFilters.map((group, i) => (
                            <div key={i} className="flex flex-col w-full">
                                <div className="mb-2 pt-2 pb-2 bg-[#0F4C71] text-white rounded text-center">{group.label}</div>
                                {group.items.map((cat, id) => (
                                    <label key={id} className="flex items-center mb-2">
                                        <input
                                            type="checkbox"
                                            onChange={() => handleSelect(cat)}
                                            checked={selectedFilters.includes(cat)}
                                            className="mr-2"
                                        />
                                        {cat}
                                    </label>
                                ))}
                            </div>
                        ))}
                        {selectedFilters.length > 0 && (
                            <button
                                onClick={resetFilters}
                                className="w-32 h-10 bg-red-500 text-white rounded-lg"
                            >
                                Cancel All
                            </button>
                        )}
                    </div>
                )}

                {/* Product list */}
                <div className="flex flex-col space-y-6 mt-4">
                    {filteredItems.map((item, idx) => (
                        <div key={idx} className="flex flex-col bg-gray-50 p-3 rounded shadow-md">
                            <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded mb-2">
                                <img src={item.src} className="object-contain w-full h-full" onClick={() => handleModalOpen(idx)} />
                            </div>
                            <div className="text-blue-600 font-bold">{item.name}</div>
                            <div className="flex justify-between mt-2">
                                <span>{isLoggedIn ? `${item.price}` : <Link href={loginPath}>Login to view</Link>}</span>
                                {isLoggedIn && (
                                    <button
                                        onClick={() => handleCartClick(item)}
                                        className={`w-32 h-10 rounded-lg text-white ${cart.find(i=>i.name===item.name) ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-400 hover:bg-blue-600'}`}
                                    >
                                        {cart.find(i=>i.name===item.name) ? 'Remove item' : 'Add to Cart'}
                                    </button>
                                )}
                            </div>
                            <Link href={`../Product-login/Product1/${idx}`} className="text-sm mt-2 text-blue-600">View Details</Link>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white w-11/12 h-4/5 rounded p-2 flex flex-col">
                            <button onClick={handleModalClose} className="self-end bg-red-500 text-white px-2 py-1 rounded">Close</button>
                            <div ref={modalRef} className="flex-1 w-full"></div>
                        </div>
                    </div>
                )}

                <ShoppingCart cart={cart} />
            </div>

            {/* Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                .animate-fadeIn { animation: fadeIn 1s ease forwards; }
                .delay-300 { animation-delay: 0.3s; }
                .animate-bounce { animation: bounce 1s infinite; }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
        </div>
    )
}

export default MobileProductPage1;
