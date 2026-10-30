import React, { useState, useEffect } from 'react';
import { Doctor, Appointment, NotificationRecord } from '../types';
import { clinicStore } from '../services/store';
import {
  Stethoscope,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  Bell,
  LogOut,
  ChevronRight,
  UserCheck,
} from 'lucide-react';

export const DoctorPanel: React.FC = () => {
  const doctors = clinicStore.getDoctors();
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(doctors[0]?.id || 'doc-grecia-osuna');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [viewMode, setViewMode] = useState<'dia' | 'semana'>('dia');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const update = () => {
      setAppointments(clinicStore.getAppointments());
      setNotifications(clinicStore.getNotifications());
    };
    update();
    const unsub = clinicStore.subscribe(update);
    return unsub;
  }, []);

  const activeDoctor = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];

  // STRICT PRIVACY: Doctor ONLY sees their own assigned patients!
  const doctorAppointments = appointments.filter((a) => a.doctorId === activeDoctor?.id);

  // Filtered by date view
  const visibleAppointments = doctorAppointments.filter((a) => {
    if (viewMode === 'dia') {
      return a.date === selectedDateFilter;
    }
    // Week: include all upcoming
    return a.status !== 'cancelada';
  });

  // Doctor notifications (assigned, changed, canceled)
  const doctorNotifications = notifications.filter(
    (n) => n.recipient.includes(activeDoctor?.name || '') || n.recipient.includes(activeDoctor?.phone || '')
  );

  const handleUpdateStatus = (apptId: string, opStatus: Appointment['status']) => {
    clinicStore.updateAttendanceByReception(apptId, 'asistencia_confirmada', opStatus, activeDoctor?.name);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn">
      
      {/* Doctor Header & Identity Switcher */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0B3E50] text-[#20AAA8] flex items-center justify-center font-bold text-xl shadow-sm">
            <Stethoscope className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#20AAA8] uppercase tracking-wider">
              Portal del Cuerpo Médico
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B3E50] font-heading">
              {activeDoctor.name}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {activeDoctor.title} · {activeDoctor.specialtyName}
            </p>
          </div>
        </div>

        {/* Change doctor profile */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <label className="block text-[10px] text-slate-400 uppercase font-semibold">
              Cambiar perfil médico:
            </label>
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 cursor-pointer"
            >
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.specialtyName})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Schedule on left, Notices on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: ASSIGNED APPOINTMENTS */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0B3E50]">Vista de Agenda:</span>
              <div className="flex rounded-lg border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setViewMode('dia')}
                  className={`px-3 py-1.5 font-semibold cursor-pointer ${
                    viewMode === 'dia' ? 'bg-[#0B3E50] text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Por Día
                </button>
                <button
                  onClick={() => setViewMode('semana')}
                  className={`px-3 py-1.5 font-semibold cursor-pointer ${
                    viewMode === 'semana' ? 'bg-[#0B3E50] text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Todas las Asignadas
                </button>
              </div>
            </div>

            {viewMode === 'dia' && (
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Fecha:</span>
                <input
                  type="date"
                  value={selectedDateFilter}
                  onChange={(e) => setSelectedDateFilter(e.target.value)}
                  className="px-2.5 py-1 rounded-lg border border-slate-300 bg-white"
                />
              </div>
            )}
          </div>

          {/* List of Patients */}
          <div className="space-y-3">
            {visibleAppointments.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-400 text-xs">
                No tienes pacientes asignados para este periodo.
              </div>
            ) : (
              visibleAppointments.map((a) => (
                <div
                  key={a.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3 hover:border-slate-300 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 text-[#0B3E50] font-mono font-bold text-sm">
                        {a.time}
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">{a.date} ({a.durationMinutes} min)</div>
                        <h4 className="text-base font-bold text-[#0B3E50]">
                          {a.patientName} {a.patientLastName}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          a.attendanceStatus === 'asistencia_confirmada'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {a.attendanceStatus === 'asistencia_confirmada' ? 'Asistencia Confirmada' : 'Asistencia Pendiente'}
                      </span>

                      <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-slate-100 text-slate-600">
                        {a.id}
                      </span>
                    </div>
                  </div>

                  {/* Patient Details & Clinical Brief */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Identificación & Edad</span>
                      <strong className="text-slate-700">
                        {a.patientDocType}-{a.patientDocNumber} · {a.patientAge ? `${a.patientAge} años` : 'Edad no especificada'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Contacto de Emergencia / Representante</span>
                      <span className="text-slate-700">
                        {a.isForMinorOrOther ? `${a.representativeName} (${a.representativeRelationship})` : a.patientPhone}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs space-y-1">
                    <span className="font-semibold text-slate-500">Motivo breve de consulta:</span>
                    <p className="text-slate-800 italic bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
                      "{a.reason}"
                    </p>
                  </div>

                  {/* Consultation Flow Controls */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 text-xs">
                    <div className="text-slate-500">
                      Estado actual: <strong className="text-[#0B3E50]">{a.status}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateStatus(a.id, 'en_consulta')}
                        className="px-3 py-1.5 rounded-lg bg-[#0B3E50] hover:bg-[#082e3b] text-white font-semibold cursor-pointer"
                      >
                        En Consulta
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(a.id, 'atendida')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer"
                      >
                        Consulta Finalizada
                      </button>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: DOCTOR'S NOTIFICATIONS AND ASSIGNMENT ALERTS */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Bell className="w-4 h-4 text-[#20AAA8]" />
            <h3 className="text-sm font-bold text-[#0B3E50]">
              Avisos y Asignaciones
            </h3>
          </div>

          <div className="space-y-2.5">
            {doctorNotifications.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No hay avisos recientes para este profesional.</p>
            ) : (
              doctorNotifications.map((n) => (
                <div key={n.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0B3E50]">{n.type.replace('_', ' ').toUpperCase()}</span>
                    <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{n.messageSummary}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
