'use client'

import React from 'react'

export default function ApplicationMobile() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Mobile Hero */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
        <h1 className="text-5xl font-bold text-blue-700">APPLICATIONS</h1>
      </div>

      {/* Mobile Grid */}
      <div className="p-6 space-y-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl shadow-md group"
          >
            <div className="h-60 bg-gray-200 flex items-center justify-center text-xl text-gray-700">
              Application {i}
            </div>
            <div className="absolute inset-0 flex items-end bg-black/60 opacity-0 group-hover:opacity-100 transition p-4 text-white text-sm">
              Example description {i}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
