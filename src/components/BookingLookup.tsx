import React, { useState } from 'react';
import { Appointment } from '../types';
import { clinicStore } from '../services/store';
import {
  Search,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  MapPin,
  CalendarPlus,
  Phone,
  RefreshCw,
  XCircle,
  UserCheck,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

interface BookingLookupProps {
  initialCode?: string;
  onGoToBooking: () => void;
}

export const BookingLookup: React.FC<BookingLookupProps> = ({
  initialCode = '',
  onGoToBooking,
}) => {
  const [code, setCode] = useState<string>(initialCode);
  const [verification, setVerification] = useState<string>('');
  const [searched, setSearched] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Reschedule modal state
  const [isRescheduling, setIsRescheduling] = useState<boolean>(false);
  const [newDate, setNewDate] = useState<string>('');
  const [newTime, setNewTime] = useState<string>('');
  const [cancelModal, setCancelModal] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<string>('');

  const config = clinicStore.getConfig();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setActionSuccessMsg(null);

    if (!code.trim() || !verification.trim()) {
      setErrorMsg('Por favor ingresa tanto el número de reserva como tu documento o teléfono para validar tu identidad.');
      return;
    }

    const res = clinicStore.findAppointmentSecure(code, verification);
    setSearched(true);
    if (!res) {
      setAppointment(null);
      setErrorMsg('No se encontró ninguna reserva activa que coincida con este código y dato de verificación.');
    } else {
      setAppointment(res);
    }
  };

  const handleConfirmAttendance = () => {
    if (!appointment) return;
    const ok = clinicStore.confirmAttendance(appointment.id, 'Paciente');
    if (ok) {
      const updated = clinicStore.getAppointmentById(appointment.id);
      if (updated) setAppointment(updated);
      setActionSuccessMsg('¡Muchas gracias! Tu asistencia ha sido confirmada con recepción.');
    }
  };

  const handleCancel = () => {
    if (!appointment || !cancelReason.trim()) return;
    const res = clinicStore.cancelAppointment(appointment.id, cancelReason, 'Paciente');
    if (res.success) {
      const updated = clinicStore.getAppointmentById(appointment.id);
      if (updated) setAppointment(updated);
      setCancelModal(false);
      setActionSuccessMsg('Tu cita ha sido cancelada correctamente.');
    } else {
      setErrorMsg(res.error || 'No se pudo cancelar la cita.');
    }
  };

  const handleRescheduleSubmit = () => {
    if (!appointment || !newDate || !newTime) return;
    const res = clinicStore.rescheduleAppointment(appointment.id, newDate, newTime, 'Paciente');
    if (res.success) {
      const updated = clinicStore.getAppointmentById(appointment.id);
      if (updated) setAppointment(updated);
      setIsRescheduling(false);
      setActionSuccessMsg('Tu cita fue reprogramada con éxito.');
    } else {
      setErrorMsg(res.error || 'No se pudo reprogramar la cita.');
    }
  };

  // Helper for WhatsApp contact
  const handleContactWhatsapp = () => {
    if (!appointment) return;
    const text = encodeURIComponent(
      `Hola GRESALUD, escribo respecto a mi reserva ${appointment.id} de ${appointment.specialtyName} para el ${appointment.date} a las ${appointment.time}. Mi nombre es ${appointment.patientName} ${appointment.patientLastName}.`
    );
    window.open(`https://wa.me/584124737258?text=${text}`, '_blank');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B3E50] font-heading">
          Consultar mi Reserva Médica
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Por privacidad y seguridad de tus datos médicos, ingresa tu número de reserva junto con tu documento o teléfono WhatsApp registrado.
        </p>
      </div>

      {/* Lookup Search Form */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm max-w-xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Número de Reserva <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ej. GRE-2026-1042"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#20AAA8] focus:outline-none text-sm font-mono uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Verificación de Contacto (Documento o Teléfono) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ej. 19482910 o +58 414 1234567"
              value={verification}
              onChange={(e) => setVerification(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#20AAA8] focus:outline-none text-sm"
            />
            <span className="text-[11px] text-slate-400">Protección de identidad: evita accesos no autorizados</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl bg-[#0B3E50] hover:bg-[#082e3b] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Consultar mi Cita</span>
          </button>
        </form>

        {errorMsg && (
          <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>{errorMsg}</div>
          </div>
        )}

        {actionSuccessMsg && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>{actionSuccessMsg}</div>
          </div>
        )}
      </div>

      {/* Search Result Box */}
      {searched && appointment && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 animate-fadeIn">
          
          {/* Header Card */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase">Reserva Médica</span>
              <div className="text-2xl font-extrabold text-[#0B3E50] font-mono">
                {appointment.id}
              </div>
              <div className="text-xs text-slate-500">
                Registrada el {appointment.createdAt}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  appointment.status === 'confirmada'
                    ? 'bg-emerald-100 text-emerald-800'
                    : appointment.status === 'reprogramada'
                    ? 'bg-blue-100 text-blue-800'
                    : appointment.status === 'cancelada'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                Cita: {appointment.status.toUpperCase()}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  appointment.paymentStatus === 'abono_verificado'
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                Abono: {appointment.paymentStatus === 'abono_verificado' ? 'Verificado (10%)' : 'Pendiente de verificación'}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  appointment.attendanceStatus === 'asistencia_confirmada'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                Asistencia: {appointment.attendanceStatus === 'asistencia_confirmada' ? 'Confirmada' : 'Pendiente'}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="space-y-1">
              <span className="text-slate-400 block text-xs">Paciente</span>
              <strong className="text-slate-800 font-semibold block text-base">
                {appointment.patientName} {appointment.patientLastName}
              </strong>
              <span className="text-slate-500 text-xs block">
                Doc: {appointment.patientDocType}-{appointment.patientDocNumber} · {appointment.patientPhone}
              </span>
              {appointment.isForMinorOrOther && (
                <span className="text-xs text-[#20AAA8] block font-medium">
                  Responsable: {appointment.representativeName} ({appointment.representativeRelationship})
                </span>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 block text-xs">Especialidad & Médico</span>
              <strong className="text-[#0B3E50] font-semibold block text-base">
                {appointment.specialtyName}
              </strong>
              <span className="text-slate-600 text-xs block font-medium">
                {appointment.doctorName ? (
                  <span className="text-emerald-700 font-semibold">Asignado: {appointment.doctorName}</span>
                ) : (
                  <span className="text-amber-700 italic">Profesional por asignar por recepción</span>
                )}
              </span>
              <span className="text-slate-400 text-xs block">Duración: {appointment.durationMinutes} min</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 block text-xs">Fecha y Hora</span>
              <strong className="text-slate-800 font-semibold block text-base flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#20AAA8]" />
                {appointment.date}
              </strong>
              <span className="text-slate-600 text-xs font-bold block flex items-center gap-1.5 font-mono">
                <Clock className="w-4 h-4 text-[#0B3E50]" />
                {appointment.time} ({config.timezone})
              </span>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs space-y-2">
            <div className="font-bold text-[#0B3E50]">Estado Económico y Tarifas:</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-slate-400 block">Precio Total Consulta:</span>
                <strong className="text-slate-800 font-mono text-sm">${appointment.priceTotal} USD</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Abono del 10%:</span>
                <strong className="text-emerald-700 font-mono text-sm">${appointment.depositAmount} USD</strong>
                <span className="text-[10px] text-slate-500 block">
                  ({appointment.paymentMethod === 'en_linea' ? 'En línea' : `Transferencia Ref: ${appointment.paymentReference || 'N/A'}`})
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Saldo Restante al Asistir (90%):</span>
                <strong className="text-[#0B3E50] font-mono text-sm">${appointment.balanceDue} USD</strong>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
            <span className="font-semibold text-slate-500">Motivo breve registrado:</span>
            <p className="text-slate-700 italic">"{appointment.reason}"</p>
          </div>

          {/* Location & Instructions */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Ubicación verificada:</span>
            </div>
            <p className="text-blue-900">{config.address}</p>
          </div>

          {/* ACTION BUTTONS (Confirm attendance, Reschedule, Cancel, WhatsApp) */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Confirm Attendance */}
            {appointment.attendanceStatus !== 'asistencia_confirmada' && appointment.status !== 'cancelada' && (
              <button
                onClick={handleConfirmAttendance}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Confirmar que asistiré</span>
              </button>
            )}

            {/* Reschedule Button */}
            {appointment.status !== 'cancelada' && (
              <button
                onClick={() => setIsRescheduling(true)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-slate-600" />
                <span>Solicitar reprogramación</span>
              </button>
            )}

            {/* Cancel Button */}
            {appointment.status !== 'cancelada' && (
              <button
                onClick={() => setCancelModal(true)}
                className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <XCircle className="w-4 h-4 text-rose-500" />
                <span>Cancelar cita</span>
              </button>
            )}

            {/* WhatsApp Contact */}
            <button
              onClick={handleContactWhatsapp}
              className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer ml-auto"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Contactar a Recepción por WhatsApp</span>
            </button>
          </div>

        </div>
      )}

      {/* Cancel Modal */}
      {cancelModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Confirmar cancelación de cita</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Recuerda que según la política de GRESALUD puedes cancelar con hasta 12 horas de anticipación. Por favor indícanos brevemente el motivo de la cancelación:
            </p>
            <textarea
              rows={2}
              required
              placeholder="Motivo de la cancelación..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#20AAA8] focus:outline-none"
            />
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCancelModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Volver
              </button>
              <button
                type="button"
                disabled={!cancelReason.trim()}
                onClick={handleCancel}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 rounded-lg shadow-xs cursor-pointer"
              >
                Confirmar Cancelación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {isRescheduling && appointment && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-[#0B3E50] flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-[#20AAA8]" />
              <span>Reprogramar Fecha y Hora</span>
            </h3>
            <p className="text-xs text-slate-600">
              Selecciona una nueva fecha y hora disponible para tu cita de {appointment.specialtyName}.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Nueva Fecha</label>
                <input
                  type="date"
                  value={newDate}
                  min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  onChange={(e) => {
                    setNewDate(e.target.value);
                    setNewTime('');
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                />
              </div>

              {newDate && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Nuevo Horario</label>
                  <div className="grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto p-1 border rounded-lg">
                    {clinicStore.getAvailableSlotsForDate(newDate).map((s) => (
                      <button
                        key={s.time}
                        disabled={!s.available}
                        onClick={() => setNewTime(s.time)}
                        type="button"
                        className={`py-1.5 text-xs font-mono font-bold rounded ${
                          newTime === s.time
                            ? 'bg-[#0B3E50] text-white'
                            : s.available
                            ? 'bg-slate-100 text-slate-800 hover:bg-[#20AAA8]/20'
                            : 'bg-slate-50 text-slate-300 cursor-not-allowed line-through'
                        }`}
                      >
                        {s.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsRescheduling(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={!newDate || !newTime}
                onClick={handleRescheduleSubmit}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#20AAA8] hover:bg-[#18918f] disabled:bg-slate-300 rounded-lg shadow-xs cursor-pointer"
              >
                Guardar Reprogramación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Direct link to start new booking */}
      <div className="text-center pt-8">
        <button
          onClick={onGoToBooking}
          className="text-xs font-semibold text-[#0B3E50] hover:text-[#20AAA8] inline-flex items-center gap-1.5 cursor-pointer"
        >
          <span>¿Deseas agendar una nueva consulta? Haz clic aquí</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
