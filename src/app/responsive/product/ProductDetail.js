'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { items } from '../../[locale]/Product-login/Product1/items';

function Page({ params }) {
  const paramid = params.id;
  const [view, setView] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [totalValue, setTotalValue] = useState(items[paramid].priceNum);
  const containerRef = useRef(null);
  const quantityRef = useRef(quantity);

  useEffect(() => {
    quantityRef.current = quantity;
    setTotalValue((quantity * items[paramid].priceNum).toFixed(2));
  }, [quantity, paramid]);

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => Math.max(prev - 1, 1));

  // 3D Viewer
  useEffect(() => {
    if (view === "viewer" && containerRef.current) {
      const scene = new THREE.Scene();
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      const camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 2000);
      camera.position.set(50, 300, 50);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      scene.background = new THREE.Color(0xffffff);

      const light = new THREE.AmbientLight(0x404040, 1);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      scene.add(light, directionalLight);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.update();

      const loader = new GLTFLoader();
      loader.load(`/demo${parseInt(paramid) + 1}.glb`,
        glb => { 
          glb.scene.position.set(0,0,0); 
          scene.add(glb.scene); 
          animate(glb.scene); 
        },
        undefined,
        err => console.error(err)
      );

      const animate = mesh => {
        requestAnimationFrame(() => animate(mesh));
        mesh.rotation.y += 0.01;
        controls.update();
        renderer.render(scene, camera);
      };

      containerRef.current.appendChild(renderer.domElement);
    }
  }, [view, paramid]);

  const initialOptions = {
    clientId: "AVUCxrYI-UFeGL-HHLjmZBCTn5qt7vB7I6HuXcaujVesJ7e09O5F1ZrxfjJFmXA1nqXGOQ9dhc4xuPYC",
    currency: 'EUR',
  };

  function generateOrderNumber() {
    return `GoetValve-${Date.now()}-${Math.random().toString(36).substring(2,8).toUpperCase()}`;
  }

  return (
    <div className="bg-white w-full min-h-screen p-4 md:p-10">

      {/* Product Info */}
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="w-full md:w-2/3 flex flex-col space-y-4">
          <h1 className="text-2xl font-bold text-customBlue">{items[paramid].name}</h1>
          <p className="text-gray-500">Typ: {items[paramid].serialNum}</p>

          {/* Video */}
          <video className="w-full h-auto rounded-lg" controls muted>
            <source src={`/p${parseInt(paramid) + 1}.mp4`} type="video/mp4"/>
          </video>

          {/* Product Details */}
          {view === "description" && (
            <div className="bg-white shadow rounded-lg p-4 mt-4">
              <h2 className="font-semibold text-lg mb-2">Produktdetails</h2>
              <table className="w-full text-sm text-gray-700">
                <tbody>
                  {Object.entries(items[paramid])
                    .filter(([key]) => !['priceNum','src'].includes(key))
                    .map(([key,value]) => (
                      <tr key={key} className="border-b">
                        <td className="font-medium text-customBlue p-2">{key}</td>
                        <td className="p-2">{value}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 3D Viewer */}
          {view === "viewer" && (
            <div ref={containerRef} className="w-full h-96 rounded-lg shadow-md"></div>
          )}
        </div>

        {/* Sidebar / Buy Section */}
        <div className="w-full md:w-1/3 flex flex-col space-y-4 mt-6 md:mt-0">
          {/* Quantity */}
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <button onClick={handleDecrease} className="px-4 py-2 bg-white rounded shadow">-</button>
            <span className="text-lg font-medium">{quantity}</span>
            <button onClick={handleIncrease} className="px-4 py-2 bg-white rounded shadow">+</button>
          </div>

          {/* Price */}
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <span className="text-2xl font-bold">{totalValue} €</span>
            <p className="text-xs text-gray-500 mt-1">inkl. MwSt.</p>
          </div>

          {/* Buy Now */}
          <button onClick={() => setIsOpen(true)} className="w-full py-3 bg-gradient-to-r from-[#B0D6EC] to-[#E5F0F6] text-black font-semibold rounded-lg shadow hover:from-[#9AC9E3] hover:to-[#CFE6F1] transition">Buy Now</button>

          {/* PayPal */}
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              style={{ layout:'vertical', shape:'rect', label:'paypal', height:40 }}
              createOrder={(data, actions) => {
                const value = (quantityRef.current * items[paramid].priceNum).toFixed(2);
                return actions.order.create({ purchase_units:[{ amount:{ value } }] });
              }}
              onApprove={(data, actions) => actions.order.capture().then(details => alert('Transaction completed!'))}
            />
          </PayPalScriptProvider>
        </div>
      </div>

      {/* View Selector */}
      <div className="flex justify-center space-x-4 mt-6">
        {['description','viewer','download'].map(v => (
          <button key={v} onClick={()=>setView(v)} className={`px-4 py-2 rounded ${view===v ? 'bg-customBlue text-white' : 'bg-gray-200 text-black'}`}>{v}</button>
        ))}
      </div>

    </div>
  )
}

export default Page;
