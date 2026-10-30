import React from 'react';
import {
  FlaskConical,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  ArrowRight,
  Phone,
} from 'lucide-react';
import { clinicStore } from '../services/store';

interface LaboratorySectionProps {
  onGoToBooking: () => void;
}

export const LaboratorySection: React.FC<LaboratorySectionProps> = ({ onGoToBooking }) => {
  const config = clinicStore.getConfig();

  const commonStudies = [
    {
      category: 'Hematología y Coagulación',
      items: ['Hematología Completa / Hemograma', 'Plaquetas', 'PT y PTT (Tiempos de Coagulación)', 'VSG'],
    },
    {
      category: 'Química Sanguínea y Perfiles',
      items: ['Glicemia', 'Urea y Creatinina', 'Perfil Lipídico (Colesterol, Triglicéridos, HDL/LDL)', 'Ácido Úrico'],
    },
    {
      category: 'Inmunología y Hormonas',
      items: ['Perfil Tiroideo (TSH, T3, T4 Libre)', 'Prueba Inmunológica de Embarazo', 'Serologías'],
    },
    {
      category: 'Exámenes Generales',
      items: ['Examen General de Orina', 'Examen Coprológico / Heces', 'Cultivos Básicos'],
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Banner Notice */}
      <div className="p-4 rounded-2xl bg-[#20AAA8]/10 border border-[#20AAA8]/30 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[#0B3E50]">
        <div className="flex items-center gap-2.5">
          <FlaskConical className="w-5 h-5 text-[#20AAA8] shrink-0" />
          <span>
            <strong>Atención por orden de llegada:</strong> El Laboratorio Clínico GRESALUD funciona sin cita previa, no requiere turno en la agenda médica y no solicita abono anticipado.
          </span>
        </div>
        <button
          onClick={onGoToBooking}
          className="text-xs font-bold text-[#0B3E50] hover:text-[#20AAA8] flex items-center gap-1 underline cursor-pointer"
        >
          <span>¿Buscabas consulta médica con especialista? Haz clic aquí</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Grid: Info + Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#0B3E50]/10 text-[#0B3E50] px-3 py-1 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#20AAA8]"></span>
              Diagnóstico Clínico GRESALUD
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B3E50] tracking-tight font-heading">
              Laboratorio Clínico
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Equipos automatizados de alta precisión para exámenes de rutina y perfiles especializados. Servicio abierto tanto a pacientes de consultas médicas GRESALUD como a público general con orden médica.
            </p>
          </div>

          {/* Schedule & Location Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0B3E50] uppercase tracking-wider">
                <Clock className="w-4 h-4 text-[#20AAA8]" />
                <span>Horarios de Toma de Muestra</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1">
                <li><strong>Lunes a Viernes:</strong> 07:00 a 16:00</li>
                <li><strong>Sábados:</strong> 07:00 a 12:00</li>
                <li><strong>Domingos:</strong> Cerrado</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0B3E50] uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#20AAA8]" />
                <span>Ubicación y Módulo</span>
              </div>
              <p className="text-xs text-slate-600">
                {config.address}
              </p>
              <div className="text-[11px] text-[#20AAA8] font-semibold">
                Área de Toma de Muestras - Módulo 1
              </div>
            </div>
          </div>

          {/* Indicaciones Claras Oficiales */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
            <div className="font-bold text-[#0B3E50] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#20AAA8]" />
              <span>Indicaciones de atención</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Presentarse directamente en recepción en el horario de atención.</li>
              <li>Consignar cédula de identidad original o documento vigente del paciente.</li>
              <li>Presentar la orden médica emitida por su profesional tratante si la posee.</li>
              <li>Para consultas de costos de perfiles y entrega de resultados, contactar directamente al consultorio.</li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://wa.me/584124737258?text=Hola%20GRESALUD,%20deseo%20consultar%20sobre%20estudios%20en%20el%20Laboratorio%20Cl%C3%ADnico."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Consultar por WhatsApp con Recepción</span>
            </a>
          </div>

        </div>

        {/* Right Column: Independent Laboratory Image */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 relative">
            <img
              src="/src/assets/images/laboratorio_clinico_1793391067432.jpg"
              alt="Instalaciones del Laboratorio Clínico GRESALUD"
              className="w-full h-80 sm:h-96 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#20AAA8]">Área Diagnóstica</span>
              <div className="text-sm font-bold">Tecnología Automatizada GRESALUD</div>
              <div className="text-xs text-slate-300">Resultados confiables y trazabilidad en muestras clínicas</div>
            </div>
          </div>
        </div>

      </div>

      {/* Studies Directory (Without inventing medical requirements) */}
      <div className="pt-6">
        <div className="text-center max-w-xl mx-auto mb-6 space-y-1">
          <h3 className="text-xl font-bold text-[#0B3E50] font-heading flex items-center justify-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#20AAA8]" />
            <span>Estudios Frecuentes Disponibles</span>
          </h3>
          <p className="text-xs text-slate-500">
            Listado orientativo de pruebas de rutina procesadas en nuestras instalaciones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {commonStudies.map((cat) => (
            <div key={cat.category} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="text-xs font-bold text-[#0B3E50] border-b border-slate-100 pb-2">
                {cat.category}
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {cat.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#20AAA8] shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
