import React from 'react';
import { Phone, Clock, Mail, ShieldCheck, Instagram } from 'lucide-react';
import { clinicStore } from '../services/store';

interface FooterProps {
  onSelectTab: (tab: 'agendar' | 'consultar' | 'laboratorio' | 'recepcion' | 'medico') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const config = clinicStore.getConfig();

  return (
    <footer className="bg-[#0B3E50] text-white pt-12 pb-8 border-t border-[#0B3E50]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs sm:text-sm">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-white flex items-center justify-center p-2 shadow-md shrink-0">
                <img
                  src="/gresalud_icon.png"
                  alt="Logo GRESALUD"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white block">
                  GRESALUD
                </span>
                <span className="text-xs sm:text-sm text-[#20AAA8] font-bold tracking-wider block">
                  DRA. GRECIA OSUNA
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Atención médica integral y personalizada. Agenda digital oficial con disponibilidad en tiempo real y asignación profesional garantizada.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#20AAA8]" />
              <span>Protección y confidencialidad médica</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#20AAA8]">
              Navegación Rápida
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onSelectTab('agendar')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Agendar Cita Médica
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('consultar')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Consultar Mi Reserva
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('laboratorio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Laboratorio Clínico (Sin Cita)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('recepcion')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Módulo de Recepción
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('medico')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Portal Médico
                </button>
              </li>
            </ul>
          </div>

          {/* Horarios */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#20AAA8]">
              Horarios del Consultorio
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#20AAA8] shrink-0 mt-0.5" />
                <div>
                  <strong>Lunes a Viernes:</strong>
                  <div className="text-[11px] text-slate-400">
                    08:30 – 18:00 (Almuerzo: 12:00 – 13:00)
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#20AAA8] shrink-0 mt-0.5" />
                <div>
                  <strong>Sábados:</strong>
                  <div className="text-[11px] text-slate-400">
                    09:00 – 14:00
                  </div>
                </div>
              </li>
              <li className="text-slate-400 text-[11px]">
                Domingos: Cerrado
              </li>
              <li className="text-slate-400 text-[11px] pt-1">
                Zona horaria oficial: {config.timezone}
              </li>
            </ul>
          </div>

          {/* Contacto & Redes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#20AAA8]">
              Contacto & Redes
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/584123697465?text=Hola%20GRESALUD,%20deseo%20informaci%C3%B3n%20sobre%20consultas%20m%C3%A9dicas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors flex items-center gap-1.5"
                  title="Abrir WhatsApp oficial GRESALUD"
                >
                  <span className="font-medium text-slate-200">0412-3697465</span>
                  <span className="text-[10px] bg-[#25D366]/20 text-[#25D366] px-1.5 py-0.5 rounded font-semibold">WhatsApp</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/584129601785?text=Hola%20GRESALUD,%20deseo%20informaci%C3%B3n%20sobre%20consultas%20m%C3%A9dicas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors flex items-center gap-1.5"
                  title="Abrir WhatsApp oficial GRESALUD"
                >
                  <span className="font-medium text-slate-200">0412-9601785</span>
                  <span className="text-[10px] bg-[#25D366]/20 text-[#25D366] px-1.5 py-0.5 rounded font-semibold">WhatsApp</span>
                </a>
              </li>
              <li className="flex items-center gap-2 pt-1">
                <Instagram className="w-4 h-4 text-[#F26F5B] shrink-0" />
                <a
                  href="https://www.instagram.com/tudrafavoritagrecia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#20AAA8] font-medium transition-colors inline-flex items-center gap-1"
                >
                  <span>@tudrafavoritagrecia</span>
                  <span className="text-[10px] text-slate-400 font-normal">(Instagram)</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#20AAA8] shrink-0" />
                <span>citas@gresalud.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer & Bottom */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} GRESALUD · Dra. Grecia Osuna. Todos los derechos reservados.
          </div>
          <div className="text-slate-400 max-w-md text-right">
            Este canal digital gestiona consultas programadas. No atiende emergencias ni prescribe tratamientos de urgencia.
          </div>
        </div>

      </div>
    </footer>
  );
};
