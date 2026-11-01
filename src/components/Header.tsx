import React from 'react';
import { Calendar, Search, FlaskConical, ShieldCheck, QrCode, Instagram, Phone } from 'lucide-react';

interface HeaderProps {
  currentTab: 'agendar' | 'consultar' | 'laboratorio' | 'recepcion' | 'medico';
  onSelectTab: (tab: 'agendar' | 'consultar' | 'laboratorio' | 'recepcion' | 'medico') => void;
  onStartBooking?: () => void;
  onOpenQR: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab, onStartBooking, onOpenQR }) => {
  const handleBookingClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onStartBooking) {
      onStartBooking();
    } else {
      onSelectTab('agendar');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-20 sm:min-h-24 py-2 gap-4">
          
          {/* Zone 1: Brand Wordmark with original GRESALUD SVG Logo */}
          <div className="flex items-center gap-3 sm:gap-4 text-left">
            <button
              onClick={handleBookingClick}
              className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-2xl bg-white flex items-center justify-center p-1.5 border border-slate-200 shadow-sm overflow-hidden shrink-0 transition-transform hover:scale-105 cursor-pointer focus:outline-none"
              title="Ir a inicio de consultas"
            >
              <img
                src="/gresalud_icon.png"
                alt="Logo GRESALUD"
                className="w-full h-full object-contain"
              />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBookingClick}
                  className="text-2xl sm:text-3xl font-black tracking-tight text-[#0B3E50] font-heading hover:text-[#20AAA8] transition-colors cursor-pointer text-left focus:outline-none"
                >
                  GRESALUD
                </button>
                <button
                  type="button"
                  onClick={handleBookingClick}
                  className="inline-block text-[11px] sm:text-xs font-bold text-[#20AAA8] bg-[#20AAA8]/15 hover:bg-[#20AAA8]/25 px-2.5 py-0.5 rounded-md cursor-pointer transition-all shadow-2xs active:scale-95"
                  title="Ir a Consultas Médicas"
                >
                  Consultas Médicas
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-bold tracking-wider">
                DRA. GRECIA OSUNA
              </p>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={handleBookingClick}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                currentTab === 'agendar'
                  ? 'bg-[#20AAA8] btn-agendar-glow shadow-sm'
                  : 'text-slate-600 hover:text-[#0B3E50] hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Cita</span>
            </button>

            <button
              onClick={() => onSelectTab('consultar')}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
                currentTab === 'consultar'
                  ? 'bg-[#0B3E50] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0B3E50] hover:bg-slate-100'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Consultar mi Reserva</span>
            </button>

            <button
              onClick={() => onSelectTab('laboratorio')}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
                currentTab === 'laboratorio'
                  ? 'bg-[#20AAA8] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#20AAA8] hover:bg-slate-100'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>Laboratorio (Sin cita)</span>
            </button>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://wa.me/584123697465?text=Hola%20GRESALUD,%20deseo%20informaci%C3%B3n%20sobre%20consultas%20m%C3%A9dicas"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp GRESALUD: 0412-3697465"
              className="p-2 text-[#25D366] hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer border border-emerald-200 flex items-center gap-1"
            >
              <Phone className="w-4 h-4 fill-[#25D366]" />
              <span className="hidden lg:inline text-xs font-bold text-[#0B3E50]">0412-3697465</span>
            </a>

            <a
              href="https://www.instagram.com/tudrafavoritagrecia/"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram: @tudrafavoritagrecia"
              className="p-2 text-[#F26F5B] hover:text-[#0B3E50] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border border-slate-200"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenQR}
              title="Escanear QR o Compartir enlace"
              className="p-2.5 text-slate-600 hover:text-[#0B3E50] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border border-slate-200"
            >
              <QrCode className="w-4 h-4" />
            </button>

            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => onSelectTab('recepcion')}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'recepcion'
                    ? 'bg-white text-[#0B3E50] shadow-xs'
                    : 'text-slate-600 hover:text-[#0B3E50]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#20AAA8]" />
                <span className="hidden sm:inline">Panel</span> Recepción
              </button>

              <button
                onClick={() => onSelectTab('medico')}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  currentTab === 'medico'
                    ? 'bg-white text-[#0B3E50] shadow-xs'
                    : 'text-slate-600 hover:text-[#0B3E50]'
                }`}
              >
                Médicos
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
