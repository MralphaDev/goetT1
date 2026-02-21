"use client"
import { useState } from 'react'
import React from 'react'
import { motion } from 'framer-motion'


function Calculator() {
  const [kvCard, setKvCard] = useState({ Q: '', rho: '', dp: '', result: null })
  const [flowCard, setFlowCard] = useState({ KV: '', rho: '', dp: '', result: null })
  const [dpCard, setDpCard] = useState({ KV: '', rho: '', Q: '', result: null })


  // Calculation handlers
  const calcKV = () => {
    const { Q, rho, dp } = kvCard
    if (Q && rho && dp) {
      const res = (Number(Q) * Math.sqrt(Number(rho) / 1000)) / Math.sqrt(Number(dp))
     setKvCard(prev => ({
  ...prev,
  result: res.toFixed(2)
}))

    }
  }

  const calcFlow = () => {
    const { KV, rho, dp } = flowCard
    if (KV && rho && dp) {
      const res = Number(KV) * Math.sqrt(Number(dp) / (Number(rho)/1000))
     setFlowCard(prev => ({
  ...prev,
  result: res.toFixed(2)
}))
    }
  }

  const calcDP = () => {
    const { KV, rho, Q } = dpCard
    if (KV && rho && Q) {
      const res = (Number(Q) * Math.sqrt(Number(rho)/1000)/Number(KV))**2
      setDpCard(prev => ({
  ...prev,
  result: res.toFixed(2)
}))

    }
  }
  return (
    <div>
                <div className="h-screen w-screen bg-[url('https://www.nieruf.de/media/fa/fc/75/1727169671/premium-news-background-blue-checked.svg?ts=1727169671')] bg-cover bg-center px-10 flex flex-col items-center justify-center">
              
              {/* Big white title */}
              <motion.h1 
                className="text-white text-5xl font-bold mb-12"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                KV Calculator
              </motion.h1>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full h-[60%]">
                
                {/* KV Card */}
                <motion.div 
                  className="bg-[#0F4C71]/60 text-white rounded-xl p-6 shadow-lg flex flex-col items-start"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-xl font-semibold mb-2">KV Value</h3>
                  <p className="mb-4 text-sm italic bg-white/10 p-2 rounded">
                    Formula: <span className="font-mono">KV = Q × √(ρ/1000) / √Δp</span>
                  </p>
                  <p className="text-sm mb-4">To calculate KV value, the flow Q, density ρ1 and pressure drop Δp must be known.</p>
                  <div className="space-y-3 w-full">
                    <div className='w-full'>
                       <input 
                      type="number" placeholder="Q (m³/h)" 
                      value={kvCard.Q} 
                      onChange={e => setKvCard({...kvCard, Q: e.target.value})}
                      className="w-[80%] p-3 rounded border border-white/50 bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-[#28A8DE]"
                    />
                    <span className="text-lg text-white/70 ml-2">m³/h</span>

                    </div>
                   
                    <div className='w-full'>  
                    <input 
                      type="number" placeholder="ρ1 (kg/m³)" 
                      value={kvCard.rho} 
                      onChange={e => setKvCard({...kvCard, rho: e.target.value})}
                      className="w-[80%] p-3 rounded border border-white/50 bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-[#28A8DE]"
                    />
                    <span className="text-lg text-white/70 ml-2">kg/m³</span>
                    </div>

                    <div className='w-full'>
                    <input 
                      type="number" placeholder="Δp (bar)" 
                      value={kvCard.dp} 
                      onChange={e => setKvCard({...kvCard, dp: e.target.value})}
                      className="w-[80%] p-3 rounded border border-white/50 bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-[#28A8DE]"
                    />
                    <span className="text-lg text-white/70 ml-2">bar</span>
                    </div>
                  </div>
                  <button 
                    onClick={calcKV}
                    className="mt-4 bg-[#28A8DE] hover:bg-[#1f7da8] text-white font-semibold py-2 px-4 rounded"
                  >
                    Calculate
                  </button>
                  {kvCard.result && <p className="mt-2 text-white font-bold">Result: {kvCard.result} m³/h</p>}
                </motion.div>

                {/* Flow Card */}
                <motion.div 
                  className="bg-[#0F4C71]/60 text-white rounded-xl p-6 shadow-lg flex flex-col items-start"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-xl font-semibold mb-2">Flow Q</h3>
                  <p className="mb-4 text-sm italic bg-white/10 p-2 rounded">
                    Formula: <span className="font-mono">Q = KV × √(Δp / (ρ/1000))</span>
                  </p>
                  <p className="text-sm mb-4">To calculate flow Q, KV value, density ρ1, and pressure drop Δp must be known.</p>
                  <div className="space-y-3 w-full">
                    <div className='w-full'>
                      <input 
                        type="number" placeholder="KV (m³/h)" 
                        value={flowCard.KV} 
                        onChange={e => setFlowCard({...flowCard, KV: e.target.value})}
                        className="w-[80%] p-3 rounded border border-white/50 bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-[#28A8DE]"
                      />
                      <span className="text-lg text-white/70 ml-2">m³/h</span>
                    </div>
                    <div className='w-full'>
                    <input 
                      type="number" placeholder="ρ1 (kg/m³)" 
                      value={flowCard.rho} 
                      onChange={e => setFlowCard({...flowCard, rho: e.target.value})}
                      className="w-[80%] p-3 rounded border border-white/50 bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-[#28A8DE]"
                    />
                    <span className="text-lg text-white/70 ml-2">kg/m³</span>
                    </div>
                    <div className='w-full'>

                    <input 
                      type="number" placeholder="Δp (bar)" 
                      value={flowCard.dp} 
                      onChange={e => setFlowCard({...flowCard, dp: e.target.value})}
                      className="w-[80%] p-3 rounded border border-white/50 bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-[#28A8DE]"
                    />
                    <span className="text-lg text-white/70 ml-2">bar</span>
                    </div>
                  </div>
                  <button 
                    onClick={calcFlow}
                    className="mt-4 bg-[#28A8DE] hover:bg-[#1f7da8] text-white font-semibold py-2 px-4 rounded"
                  >
                    Calculate
                  </button>
                  {flowCard.result && <p className="mt-2 text-white font-bold">Result: {flowCard.result} m³/h</p>}
                </motion.div>

                {/* Pressure Drop Card */}
                <motion.div 
                  className="bg-[#0F4C71]/60 text-white rounded-xl p-6 shadow-lg flex flex-col items-start"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="text-xl font-semibold mb-2">Pressure Drop Δp</h3>
                  <p className="mb-4 text-sm italic bg-white/10 p-2 rounded">
                    Formula: <span className="font-mono">Δp = (Q × √(ρ/1000) / KV)²</span>
                  </p>
                  <p className="text-sm mb-4">To calculate Δp, KV value, density ρ1, and flow Q must be known.</p>
                  <div className="space-y-3 w-full">
                    <div className='w-full'>
                    <input 
                      type="number" placeholder="KV (m³/h)" 
                      value={dpCard.KV} 
                      onChange={e => setDpCard({...dpCard, KV: e.target.value})}
                      className="w-[80%] p-3 rounded border border-white/50 bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-[#28A8DE]"
                    />
                    <span className="text-lg text-white/70 ml-2">m³/h</span>
                    </div>
                    <div className='w-full'>
                    <input 
                      type="number" placeholder="ρ1 (kg/m³)" 
                      value={dpCard.rho} 
                      onChange={e => setDpCard({...dpCard, rho: e.target.value})}
                      className="w-[80%] p-3 rounded border border-white/50 bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-[#28A8DE]"
                    />
                    <span className="text-lg text-white/70 ml-2">kg/m³</span>
                    </div>
                    <div className='w-full'>
                    <input 
                      type="number" placeholder="Q (m³/h)" 
                      value={dpCard.Q} 
                      onChange={e => setDpCard({...dpCard, Q: e.target.value})}
                      className="w-[80%] p-3 rounded border border-white/50 bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-[#28A8DE]"
                    />
                    <span className="text-lg text-white/70 ml-2">m³/h</span>
                    </div>
                  </div>
                  <button 
                    onClick={calcDP}
                    className="mt-4 bg-[#28A8DE] hover:bg-[#1f7da8] text-white font-semibold py-2 px-4 rounded"
                  >
                    Calculate
                  </button>
                  {dpCard.result && <p className="mt-2 text-white font-bold">Result: {dpCard.result} bar</p>}
                </motion.div>

              </div>
        </div>
    </div>
  )
}

export default Calculator