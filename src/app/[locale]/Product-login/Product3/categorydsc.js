import React from 'react'

function categorydsc() {
  return (
    <div>
        <div className='relative mb-20' style={{ height: "40vh", width: "100vw", backgroundSize: "cover" , backgroundRepeat: "no-repeat",backgroundImage: "url('https://www.nieruf.de/thumbnail/14/3f/d1/1708518038/436_Category_800x800.png?ts=1711399957')" }}>
                <div className="absolute inset-x-0 top-0.4 h-full opacity-70" style={{ backgroundColor: "var(--color-customBlue)" }} />

                
                <div className='flex justify-center items-center h-full pr-[10%]'>
                    <div className="flex justify-center relative w-1/2  z-11 text-white">
                        <h1 className="text-4xl font-bold">Solenoid Valve</h1>
                        
                    </div>

                    <div className="flex justify-center relative w-1/2 z-11 text-white">
                        <div>
                            <p className="mt-2">Innerhalb geschlossener Rohrleitungssysteme müssen unterschiedliche, teilweise auch aggressive Medien zuverlässig kontrolliert und gesteuert werden. Absperrarmaturen aus dem Hause NieRuf nehmen in solch einem System eine zentrale Rolle ein, um den zuverlässigen Betrieb der Anlage zu gewährleisten. Absperrklappen werden dabei eingesetzt den Durchfluss innerhalb des Rohrleitungssystems komplett zum Erliegen zu bringen und dadurch die Anlage zu schützen, oder den ordnungsgemäßen Betrieb aufrecht zu erhalten. Da die Durchflussmenge je nach Rohrleitungssystem variiert, gibt es unsere Absperrklappen in den Nennweiten DN25 - DN600.</p>
                        </div>     
                    </div>
                </div>
                

            </div>
    </div>
  )
}

export default categorydsc