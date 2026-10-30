import React, { useState, useEffect } from 'react';
import { Appointment, Doctor, AuditLog, NotificationRecord, ScheduleBlock, AttendanceStatus } from '../types';
import { clinicStore, SPECIALTIES } from '../services/store';
import {
  Calendar,
  Clock,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Filter,
  UserPlus,
  DollarSign,
  Ban,
  Activity,
  Bell,
  History,
  Settings,
  ArrowRight,
  Phone,
  Search,
  Check,
  X,
  AlertTriangle,
} from 'lucide-react';

export const ReceptionPanel: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'reservas' | 'bloqueos' | 'auditoria' | 'notificaciones' | 'ajustes'>('reservas');
  
  // State from store
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [audits, setAudits] = useState<AuditLog[]>([]);
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [blocks, setBlocks] = useState<ScheduleBlock[]>([]);
  const config = clinicStore.getConfig();

  // Filters
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');
  const [filterPayment, setFilterPayment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals / Actions
  const [selectedApptForDoctor, setSelectedApptForDoctor] = useState<Appointment | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  
  const [paymentModalAppt, setPaymentModalAppt] = useState<Appointment | null>(null);
  const [paymentNotes, setPaymentNotes] = useState<string>('');

  // Blocking form
  const [blockDate, setBlockDate] = useState<string>('');
  const [blockStart, setBlockStart] = useState<string>('08:30');
  const [blockEnd, setBlockEnd] = useState<string>('12:00');
  const [blockReason, setBlockReason] = useState<string>('');
  const [blockAlert, setBlockAlert] = useState<string | null>(null);

  // Sync with store
  useEffect(() => {
    const update = () => {
      setAppointments(clinicStore.getAppointments());
      setDoctors(clinicStore.getDoctors());
      setAudits(clinicStore.getAudits());
      setNotifications(clinicStore.getNotifications());
      setBlocks(clinicStore.getBlocks());
    };
    update();
    const unsub = clinicStore.subscribe(update);
    return unsub;
  }, []);

  // Real KPIs (No fictitious numbers)
  const todayStr = new Date().toISOString().split('T')[0];
  const apptsToday = appointments.filter((a) => a.date === todayStr && a.status !== 'cancelada');
  const unassignedDoctors = appointments.filter((a) => !a.doctorId && a.status !== 'cancelada');
  const pendingPayments = appointments.filter((a) => a.paymentStatus === 'abono_pendiente_verificacion');
  const pendingAttendance = appointments.filter((a) => a.attendanceStatus === 'pendiente_confirmacion' && a.status !== 'cancelada');

  // Filtered appointments list
  const filteredAppointments = appointments.filter((a) => {
    if (filterDate && a.date !== filterDate) return false;
    if (filterSpecialty !== 'all' && a.specialtyId !== filterSpecialty) return false;
    if (filterPayment !== 'all' && a.paymentStatus !== filterPayment) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = `${a.patientName} ${a.patientLastName}`.toLowerCase().includes(q);
      const matchCode = a.id.toLowerCase().includes(q);
      const matchDoc = a.patientDocNumber.includes(q);
      if (!matchName && !matchCode && !matchDoc) return false;
    }
    return true;
  });

  // Action handlers
  const handleAssignDoctor = () => {
    if (!selectedApptForDoctor || !selectedDoctorId) return;
    clinicStore.assignDoctor(selectedApptForDoctor.id, selectedDoctorId, 'Recepción');
    setSelectedApptForDoctor(null);
    setSelectedDoctorId('');
  };

  const handleVerifyPayment = (approved: boolean) => {
    if (!paymentModalAppt) return;
    clinicStore.verifyPayment(paymentModalAppt.id, approved, paymentNotes, 'Recepción');
    setPaymentModalAppt(null);
    setPaymentNotes('');
  };

  const handleAttendanceChange = (apptId: string, status: AttendanceStatus, opStatus?: Appointment['status']) => {
    clinicStore.updateAttendanceByReception(apptId, status, opStatus, 'Recepción');
  };

  const handleCreateBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockDate || !blockStart || !blockEnd || !blockReason.trim()) return;
    const res = clinicStore.blockSlot(blockDate, blockStart, blockEnd, blockReason.trim(), 'Recepción');
    if (res.conflictCount > 0) {
      setBlockAlert(`¡Atención! Se registraron ${res.conflictCount} citas existentes en la franja bloqueada. Las citas NO fueron eliminadas silenciosamente para permitir coordinar su reprogramación con los pacientes.`);
    } else {
      setBlockAlert('Franja horaria bloqueada con éxito sin conflictos de citas previas.');
    }
    setBlockReason('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-bold text-[#0B3E50] uppercase tracking-wider">
              Módulo Administrativo
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B3E50] font-heading">
            Panel de Recepción GRESALUD
          </h2>
          <p className="text-xs text-slate-500">
            Control integral de agenda médica, asignación de profesionales, validación de abonos y bloqueos.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex flex-wrap items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveSubTab('reservas')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeSubTab === 'reservas' ? 'bg-white text-[#0B3E50] shadow-xs' : 'text-slate-600 hover:text-[#0B3E50]'
            }`}
          >
            Reservas & Agenda
          </button>
          <button
            onClick={() => setActiveSubTab('bloqueos')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeSubTab === 'bloqueos' ? 'bg-white text-[#0B3E50] shadow-xs' : 'text-slate-600 hover:text-[#0B3E50]'
            }`}
          >
            Bloqueo de Franjas
          </button>
          <button
            onClick={() => setActiveSubTab('notificaciones')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeSubTab === 'notificaciones' ? 'bg-white text-[#0B3E50] shadow-xs' : 'text-slate-600 hover:text-[#0B3E50]'
            }`}
          >
            Avisos & Notificaciones
          </button>
          <button
            onClick={() => setActiveSubTab('auditoria')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeSubTab === 'auditoria' ? 'bg-white text-[#0B3E50] shadow-xs' : 'text-slate-600 hover:text-[#0B3E50]'
            }`}
          >
            Historial de Cambios
          </button>
        </div>
      </div>

      {/* REAL KPI CARDS (Section 11 requirement) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Citas Hoy ({todayStr})</span>
          <div className="text-2xl font-bold text-[#0B3E50] mt-1 font-mono tabular-nums">
            {apptsToday.length}
          </div>
          <span className="text-[11px] text-slate-500">Consultas programadas</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Pacientes por Asignar</span>
          <div className="text-2xl font-bold text-amber-600 mt-1 font-mono tabular-nums">
            {unassignedDoctors.length}
          </div>
          <span className="text-[11px] text-slate-500">Requieren asignación médica</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Abonos en Verificación</span>
          <div className="text-2xl font-bold text-teal-600 mt-1 font-mono tabular-nums">
            {pendingPayments.length}
          </div>
          <span className="text-[11px] text-slate-500">Comprobantes por validar</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Asistencia Pendiente</span>
          <div className="text-2xl font-bold text-blue-600 mt-1 font-mono tabular-nums">
            {pendingAttendance.length}
          </div>
          <span className="text-[11px] text-slate-500">Por responder confirmación</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SUBTAB 1: RESERVAS & AGENDA OPERATIVA                          */}
      {/* ============================================================== */}
      {activeSubTab === 'reservas' && (
        <div className="space-y-4">
          
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-3 text-xs">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar por paciente, cédula o código GRE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#20AAA8]"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-semibold">Fecha:</span>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
              />
              {filterDate && (
                <button
                  onClick={() => setFilterDate('')}
                  className="text-rose-600 hover:underline text-[11px]"
                >
                  Limpiar
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-semibold">Especialidad:</span>
              <select
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
              >
                <option value="all">Todas las especialidades</option>
                {SPECIALTIES.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-semibold">Pago:</span>
              <select
                value={filterPayment}
                onChange={(e) => setFilterPayment(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
              >
                <option value="all">Todos los estados</option>
                <option value="abono_verificado">Abono verificado</option>
                <option value="abono_pendiente_verificacion">Pendiente verificación</option>
              </select>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="py-3 px-4">Reserva & Fecha</th>
                    <th className="py-3 px-4">Paciente & Motivo</th>
                    <th className="py-3 px-4">Especialidad</th>
                    <th className="py-3 px-4">Médico Asignado</th>
                    <th className="py-3 px-4">Abono (10%)</th>
                    <th className="py-3 px-4">Asistencia</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-slate-400">
                        No hay citas registradas que coincidan con estos filtros.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                        
                        {/* Code & Date */}
                        <td className="py-3 px-4">
                          <strong className="text-[#0B3E50] font-mono block font-bold text-xs">
                            {a.id}
                          </strong>
                          <span className="text-slate-600 font-medium">
                            {a.date} · <span className="font-mono">{a.time}</span>
                          </span>
                        </td>

                        {/* Patient */}
                        <td className="py-3 px-4 max-w-[220px]">
                          <strong className="text-slate-800 block truncate">
                            {a.patientName} {a.patientLastName}
                          </strong>
                          <span className="text-slate-400 text-[11px] block">
                            {a.patientDocType}-{a.patientDocNumber} · {a.patientPhone}
                          </span>
                          <span className="text-slate-500 text-[11px] truncate block italic">
                            "{a.reason}"
                          </span>
                        </td>

                        {/* Specialty */}
                        <td className="py-3 px-4">
                          <span className="font-semibold text-[#0B3E50]">{a.specialtyName}</span>
                          <span className="text-[10px] text-slate-400 block">${a.priceTotal} USD</span>
                        </td>

                        {/* Doctor */}
                        <td className="py-3 px-4">
                          {a.doctorName ? (
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                                {a.doctorName}
                              </span>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedApptForDoctor(a);
                                setSelectedDoctorId(doctors.find((d) => d.specialtyId === a.specialtyId)?.id || doctors[0].id);
                              }}
                              className="text-[11px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-1 rounded border border-amber-200 cursor-pointer flex items-center gap-1"
                            >
                              <UserPlus className="w-3 h-3" />
                              <span>Asignar médico</span>
                            </button>
                          )}
                        </td>

                        {/* Payment */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                a.paymentStatus === 'abono_verificado'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              ${a.depositAmount} USD
                            </span>
                            {a.paymentStatus === 'abono_pendiente_verificacion' && (
                              <button
                                onClick={() => {
                                  setPaymentModalAppt(a);
                                  setPaymentNotes(`Comprobante ${a.paymentReference || ''} verificado.`);
                                }}
                                title="Verificar comprobante de pago"
                                className="p-1 rounded bg-[#20AAA8] text-white hover:bg-[#18918f] cursor-pointer"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {a.paymentMethod === 'en_linea' ? 'Online' : `Ref: ${a.paymentReference || 'N/A'}`}
                          </span>
                        </td>

                        {/* Attendance status */}
                        <td className="py-3 px-4">
                          <select
                            value={a.attendanceStatus}
                            onChange={(e) => handleAttendanceChange(a.id, e.target.value as AttendanceStatus)}
                            className="text-[11px] font-semibold px-2 py-1 rounded border border-slate-200 bg-white"
                          >
                            <option value="pendiente_confirmacion">Pendiente</option>
                            <option value="asistencia_confirmada">Confirmada</option>
                            <option value="inasistencia_reportada">Inasistencia</option>
                          </select>
                        </td>

                        {/* Operational quick buttons */}
                        <td className="py-3 px-4 text-right space-x-1">
                          <button
                            onClick={() => handleAttendanceChange(a.id, 'asistencia_confirmada', 'en_espera_llegada')}
                            title="Marcar llegada a recepción"
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 cursor-pointer"
                          >
                            Llegó
                          </button>
                          <button
                            onClick={() => handleAttendanceChange(a.id, 'asistencia_confirmada', 'atendida')}
                            title="Marcar consulta atendida"
                            className="p-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-50 text-emerald-700 cursor-pointer"
                          >
                            Atendido
                          </button>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUBTAB 2: BLOQUEO DE FRANJAS HORARIAS                          */}
      {/* ============================================================== */}
      {activeSubTab === 'bloqueos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* New Block Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#0B3E50] flex items-center gap-2">
              <Ban className="w-5 h-5 text-rose-600" />
              <span>Bloquear Franja Horaria</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inhabilita franjas completas para feriados, reuniones clínicas o mantenimiento. Si ya existen citas previas en la franja, el sistema te alertará de los conflictos para no borrarlas silenciosamente.
            </p>

            {blockAlert && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                {blockAlert}
              </div>
            )}

            <form onSubmit={handleCreateBlock} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fecha</label>
                <input
                  type="date"
                  required
                  value={blockDate}
                  min={todayStr}
                  onChange={(e) => setBlockDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hora Inicio</label>
                  <input
                    type="time"
                    required
                    value={blockStart}
                    onChange={(e) => setBlockStart(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hora Fin</label>
                  <input
                    type="time"
                    required
                    value={blockEnd}
                    onChange={(e) => setBlockEnd(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Motivo del Bloqueo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Sesión clínica / Feriado institucional"
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Ban className="w-4 h-4" />
                <span>Aplicar Bloqueo de Horario</span>
              </button>
            </form>
          </div>

          {/* Active Blocks List */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#0B3E50]">Bloqueos Activos</h3>
            {blocks.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No hay franjas bloqueadas en el consultorio.</p>
            ) : (
              <div className="space-y-2">
                {blocks.map((b) => (
                  <div key={b.id} className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <strong className="text-slate-800 font-semibold">{b.date}</strong>
                      <span className="text-slate-500 font-mono ml-2 font-bold">({b.startTime} - {b.endTime})</span>
                      <p className="text-slate-600 mt-0.5">Motivo: {b.reason}</p>
                    </div>
                    <button
                      onClick={() => clinicStore.unblockSlot(b.id, 'Recepción')}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                    >
                      Desbloquear
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUBTAB 3: HISTORIAL DE CAMBIOS Y AUDITORÍA                     */}
      {/* ============================================================== */}
      {activeSubTab === 'auditoria' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="text-base font-bold text-[#0B3E50] flex items-center gap-2">
              <History className="w-5 h-5 text-[#20AAA8]" />
              <span>Registro de Auditoría y Trazabilidad</span>
            </h3>
            <span className="text-xs text-slate-400">Total eventos: {audits.length}</span>
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto">
            {audits.map((item) => (
              <div key={item.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0B3E50]">{item.action}</span>
                    {item.appointmentId && (
                      <span className="px-1.5 py-0.2 rounded bg-[#0B3E50]/10 text-[#0B3E50] font-mono text-[10px]">
                        {item.appointmentId}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 leading-relaxed">{item.details}</p>
                </div>
                <div className="text-right shrink-0 text-[11px] text-slate-400">
                  <span className="font-medium text-slate-500 block">{item.performedBy}</span>
                  <span>{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SUBTAB 4: COLA DE NOTIFICACIONES                               */}
      {/* ============================================================== */}
      {activeSubTab === 'notificaciones' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="text-base font-bold text-[#0B3E50] flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#20AAA8]" />
              <span>Cola y Respuestas de Notificaciones (WhatsApp / Email)</span>
            </h3>
            <span className="text-xs text-slate-400">Total mensajes: {notifications.length}</span>
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto">
            {notifications.map((n) => (
              <div key={n.id} className="p-3.5 rounded-xl border border-slate-200 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                      {n.channel} · {n.type.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-slate-400 font-mono">{n.appointmentId}</span>
                  </div>
                  <p className="text-slate-700 font-medium">Destinatario: {n.recipient}</p>
                  <p className="text-slate-500 italic text-[11px]">"{n.messageSummary}"</p>
                </div>
                <div className="text-right shrink-0 space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                    {n.status}
                  </span>
                  <div className="text-[10px] text-slate-400">{n.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assign Doctor Modal */}
      {selectedApptForDoctor && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-[#0B3E50]">
              Asignar Médico a la Cita {selectedApptForDoctor.id}
            </h3>
            <p className="text-xs text-slate-600">
              Especialidad solicitada: <strong>{selectedApptForDoctor.specialtyName}</strong>
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Selecciona el profesional médico
              </label>
              <select
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white"
              >
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} — {d.specialtyName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedApptForDoctor(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleAssignDoctor}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#20AAA8] hover:bg-[#18918f] rounded-lg shadow-xs cursor-pointer"
              >
                Confirmar Asignación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Verification Modal */}
      {paymentModalAppt && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-[#0B3E50]">
              Validar Comprobante de Abono (10%)
            </h3>
            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
              <div><strong>Cita:</strong> {paymentModalAppt.id}</div>
              <div><strong>Paciente:</strong> {paymentModalAppt.patientName} {paymentModalAppt.patientLastName}</div>
              <div><strong>Monto del abono:</strong> ${paymentModalAppt.depositAmount} USD</div>
              <div><strong>Banco / Ref:</strong> {paymentModalAppt.paymentBank} — {paymentModalAppt.paymentReference}</div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Notas de verificación
              </label>
              <input
                type="text"
                value={paymentNotes}
                onChange={(e) => setPaymentNotes(e.target.value)}
                placeholder="Ej. Transferencia reflejada en cuenta Banesco..."
                className="w-full p-2 text-xs rounded-xl border border-slate-300"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setPaymentModalAppt(null)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cerrar
              </button>
              <button
                onClick={() => handleVerifyPayment(false)}
                className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg cursor-pointer"
              >
                Rechazar Abono
              </button>
              <button
                onClick={() => handleVerifyPayment(true)}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs cursor-pointer"
              >
                Aprobar Abono
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
