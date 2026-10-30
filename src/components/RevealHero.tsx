import React, { useEffect } from 'react';
import { Calendar, Search, FlaskConical, ArrowRight } from 'lucide-react';

interface RevealHeroProps {
  onStartBooking: () => void;
  onLookupBooking: () => void;
  onOpenLab: () => void;
}

export const RevealHero: React.FC<RevealHeroProps> = ({
  onStartBooking,
  onLookupBooking,
  onOpenLab,
}) => {
  useEffect(() => {
    const hero = document.getElementById('revealHero');
    const mask = document.getElementById('revealMask');
    const line = document.getElementById('revealLine');

    if (!hero || !mask || !line) return;

    // Set initial 50% split position
    const rect = hero.getBoundingClientRect();
    const initialX = rect.width ? rect.width / 2 : 250;
    mask.style.clipPath = 'polygon(0 0, 50% 0, 50% 100%, 0 100%)';
    line.style.opacity = '1';
    line.style.transform = 'translate3d(' + initialX + 'px, 0, 0)';

    function update(clientX: number) {
      if (!hero || !mask || !line) return;
      const r = hero.getBoundingClientRect();
      const x = Math.max(0, Math.min(r.width, clientX - r.left));

      // Cortina que divide la pantalla horizontalmente
      mask.style.clipPath = 'polygon(0 0, ' + x + 'px 0, ' + x + 'px 100%, 0 100%)';
      line.style.opacity = '1';
      line.style.transform = 'translate3d(' + x + 'px, 0, 0)';
    }

    const onMouseMove = (e: MouseEvent) => {
      update(e.clientX);
    };

    const onMouseEnter = (e: MouseEvent) => {
      update(e.clientX);
    };

    const onMouseLeave = () => {
      // Regresa la cortina al centro al salir el mouse
      if (!hero || !mask || !line) return;
      mask.style.clipPath = 'polygon(0 0, 50% 0, 50% 100%, 0 100%)';
      const r = hero.getBoundingClientRect();
      line.style.opacity = '0.9';
      line.style.transform = 'translate3d(' + (r.width / 2) + 'px, 0, 0)';
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) update(e.touches[0].clientX);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) update(e.touches[0].clientX);
    };

    hero.addEventListener('mousemove', onMouseMove);
    hero.addEventListener('mouseenter', onMouseEnter);
    hero.addEventListener('mouseleave', onMouseLeave);
    hero.addEventListener('touchmove', onTouchMove, { passive: true });
    hero.addEventListener('touchstart', onTouchStart, { passive: true });

    return () => {
      hero.removeEventListener('mousemove', onMouseMove);
      hero.removeEventListener('mouseenter', onMouseEnter);
      hero.removeEventListener('mouseleave', onMouseLeave);
      hero.removeEventListener('touchmove', onTouchMove);
      hero.removeEventListener('touchstart', onTouchStart);
    };
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
      
      {/* ============================================================== */}
      {/* EFECTO DE REVELACIÓN: MODO EN LÍNEA (Cortina Divisoria)       */}
      {/* ============================================================== */}
      <div
        className="interactive-reveal-hero"
        id="revealHero"
        style={{
          position: 'relative',
          width: '100%',
          height: '520px',
          overflow: 'hidden',
          cursor: 'col-resize',
          userSelect: 'none',
          borderRadius: '1.25rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* IMAGEN 1: Capa Base (Fondo Permanente: Letrero GRESALUD en consultorio moderno) */}
        <img
          src="/assets/aistudio/Letrero_GRESALUD_en_consultorio_moderno_0c0b069b.png"
          alt="Base"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}
          referrerPolicy="no-referrer"
        />

        {/* IMAGEN 2: Capa Superior (Máscara en Cortina Horizontal: Doctora centrada en consultorio luminoso) */}
        <div
          id="revealMask"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
            pointerEvents: 'none',
            clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
            transition: 'clip-path 0.05s ease-out',
            willChange: 'clip-path',
          }}
        >
          <img
            src="/assets/aistudio/Doctora_centrada_en_consultorio_luminoso_68b65cc1.png"
            alt="Revelada"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* LÍNEA DIVISORIA VERTICAL CON MANIJA */}
        <div
          id="revealLine"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            zIndex: 3,
            pointerEvents: 'none',
            opacity: 1,
            transition: 'opacity 0.15s ease',
          }}
        >
          <div
            style={{
              width: '2px',
              height: '100%',
              background: '#fbbf24',
              boxShadow: '0 0 15px rgba(251, 191, 36, 0.85)',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#fbbf24',
                color: '#090b12',
                fontWeight: 'bold',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
              }}
            >
              ↔
            </div>
          </div>
        </div>

        {/* Subtle Dark Gradient Scrim to ensure action buttons are legible */}
        <div className="absolute inset-0 z-4 bg-gradient-to-t from-[#0B3E50]/90 via-[#0B3E50]/20 to-transparent pointer-events-none" />

        {/* Floating Callout Hint on Top Right */}
        <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs text-white/95 border border-white/20 pointer-events-none shadow-sm">
          <span>Desliza para revelar el consultorio y la doctora</span>
          <span className="text-[#fbbf24] font-bold">↔</span>
        </div>

        {/* HERO CONTENT OVERLAY */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:bottom-8 z-10 max-w-xl pointer-events-none">
          <div className="bg-[#0B3E50]/85 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-white/20 shadow-xl space-y-3 pointer-events-auto">
            <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-white text-[11px] font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#20AAA8]"></span>
              Agenda Médica Oficial
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight font-heading leading-tight">
              Selecciona tu especialidad
            </h1>

            <p className="text-xs sm:text-sm text-slate-100 font-normal leading-relaxed">
              Elige la atención que necesitas para consultar las fechas y horarios disponibles con la Dra. Grecia Osuna y su equipo médico.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <button
                onClick={onStartBooking}
                className="px-5 py-2.5 rounded-xl bg-[#20AAA8] hover:bg-[#18918f] text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer group active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar mi cita</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onLookupBooking}
                className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-medium text-xs sm:text-sm backdrop-blur-sm border border-white/30 transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <Search className="w-3.5 h-3.5 text-white" />
                <span>Consultar mi reserva</span>
              </button>

              <button
                onClick={onOpenLab}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900/80 text-[#20AAA8] hover:text-white font-medium text-xs backdrop-blur-sm border border-[#20AAA8]/40 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Laboratorio (Sin turno)</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 4 Steps Indicator Bar */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0B3E50] text-white font-bold text-xs flex items-center justify-center shrink-0">
            1
          </div>
          <div>
            <div className="text-xs font-semibold text-[#0B3E50]">Especialidad</div>
            <div className="text-[11px] text-slate-500">Elige tu servicio médico</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0B3E50]/10 text-[#0B3E50] font-bold text-xs flex items-center justify-center shrink-0">
            2
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-800">Fecha y hora</div>
            <div className="text-[11px] text-slate-500">Cupos reales disponibles</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0B3E50]/10 text-[#0B3E50] font-bold text-xs flex items-center justify-center shrink-0">
            3
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-800">Tus datos</div>
            <div className="text-[11px] text-slate-500">Información del paciente</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0B3E50]/10 text-[#0B3E50] font-bold text-xs flex items-center justify-center shrink-0">
            4
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-800">Abono y confirmación</div>
            <div className="text-[11px] text-slate-500">Abono 10% y número único</div>
          </div>
        </div>
      </div>

    </div>
  );
};
