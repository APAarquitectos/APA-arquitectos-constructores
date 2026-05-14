/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Identity from "./components/sections/Identity";
import Portfolio from "./components/sections/Portfolio";
import BIMViewer from "./components/bim/BIMViewer";

export default function App() {
  return (
    <main className="bg-base-950 overflow-x-hidden">
      <Navbar />
      
      <div className="relative">
        <Hero />
        <Identity />
        
        <Portfolio />

        {/* Dynamic transition for BIM section */}
        <div id="bim-viewer" className="py-24 bg-gradient-to-b from-base-950 to-[#050505]">
          <div className="px-10 mb-12">
            <span className="text-[10px] uppercase tracking-[0.5em] text-technical">Central Técnica</span>
            <h2 className="text-4xl font-serif mt-4 underline underline-offset-8 decoration-petroleum/50">BIM Ecosystem</h2>
          </div>
          <BIMViewer />
        </div>

        <Footer />
      </div>

      {/* Global Background Overlays */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>
    </main>
  );
}
