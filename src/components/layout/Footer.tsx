import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#050505] py-32 px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
        <div className="md:col-span-2 space-y-12">
          <div className="flex flex-col">
            <span className="font-serif text-4xl tracking-tighter leading-none">APA</span>
            <span className="text-[10px] uppercase tracking-[0.4em] opacity-40">Arquitectos • Constructores</span>
          </div>
          <p className="text-xl font-serif italic max-w-sm">
            Diseñamos el futuro, modelamos la realidad.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] uppercase tracking-widest text-technical">Navegación</h4>
          <ul className="space-y-4 text-sm font-light opacity-60">
            <li><a href="#" className="hover:opacity-100 transition-opacity">El Estudio</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Proyectos</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">BIM Virtual</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Carreras</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] uppercase tracking-widest text-technical">Contacto</h4>
          <ul className="space-y-4 text-sm font-light opacity-60">
            <li><a href="mailto:andrsarchitects@gmail.com" className="hover:text-accent-orange transition-colors">andrsarchitects@gmail.com</a></li>
            <li><a href="tel:+573222720549" className="hover:text-accent-orange transition-colors">+57 3222720549</a></li>
            <li><a href="tel:+573228913488" className="hover:text-accent-orange transition-colors">+57 3228913488</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] uppercase tracking-widest text-technical">Síguenos</h4>
          <ul className="space-y-4 text-sm font-light opacity-60">
            <li><a href="https://www.facebook.com/share/17YWnxnHPy/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-accent-orange transition-colors">Facebook</a></li>
            <li><a href="https://www.instagram.com/apa_architects_builds?igsh=ZWZ2d2trZ3I5ZHY3" target="_blank" rel="noopener noreferrer" className="hover:text-accent-orange transition-colors">Instagram</a></li>
            <li><a href="https://www.tiktok.com/@apa_architects_builds" target="_blank" rel="noopener noreferrer" className="hover:text-accent-orange transition-colors">TikTok</a></li>
            <li><a href="https://www.youtube.com/@apa_architects_builds" target="_blank" rel="noopener noreferrer" className="hover:text-accent-orange transition-colors">YouTube</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] uppercase tracking-widest opacity-30">
        <p>© 2026 APA Arquitectos • Constructores. All rights reserved.</p>
        <p>BIM Strategy by APA Tech Division</p>
      </div>
    </footer>
  );
}
