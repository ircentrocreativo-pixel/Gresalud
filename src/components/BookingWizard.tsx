import React, { useState, useEffect, useMemo } from 'react';
import {
  Specialty,
  SpecialtyId,
  Appointment,
  PaymentMethod,
  SlotHold,
} from '../types';
import { SPECIALTIES, clinicStore } from '../services/store';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Building,
  Info,
  CalendarPlus,
  ArrowLeft,
  ChevronRight,
  Phone,
  FileText,
  AlertTriangle,
} from 'lucide-react';

const BIRTH_YEARS = Array.from({ length: 105 }, (_, i) => 2026 - i);
const BIRTH_DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const BIRTH_MONTHS = [
  { val: '01', label: '01 - Enero' },
  { val: '02', label: '02 - Febrero' },
  { val: '03', label: '03 - Marzo' },
  { val: '04', label: '04 - Abril' },
  { val: '05', label: '05 - Mayo' },
  { val: '06', label: '06 - Junio' },
  { val: '07', label: '07 - Julio' },
  { val: '08', label: '08 - Agosto' },
  { val: '09', label: '09 - Septiembre' },
  { val: '10', label: '10 - Octubre' },
  { val: '11', label: '11 - Noviembre' },
  { val: '12', label: '12 - Diciembre' },
];

interface BookingWizardProps {
  initialSpecialtyId?: SpecialtyId;
  onBookingCompleted: (appointment: Appointment) => void;
  onGoToLookup: (code: string) => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  initialSpecialtyId,
  onBookingCompleted,
  onGoToLookup,
}) => {
  // Step 1: Especialidad | Step 2: Fecha y Hora | Step 3: Tus Datos | Step 4: Abono y Confirmación | Step 5: Éxito
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty>(() => {
    return (
      SPECIALTIES.find((s) => s.id === initialSpecialtyId) ||
      SPECIALTIES.find((s) => s.id === 'medicina_interna') ||
      SPECIALTIES[0]
    );
  });

  // Schedule state
  const config = clinicStore.getConfig();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<{ time: string; available: boolean; reason?: string }[]>([]);
  const [slotsLoading, setSlotsLoading] = useState<boolean>(false);

  // Patient form state
  const [patientName, setPatientName] = useState<string>('');
  const [patientLastName, setPatientLastName] = useState<string>('');
  const [docType, setDocType] = useState<'V' | 'E' | 'J' | 'P'>('V');
  const [docNumber, setDocNumber] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientBirthDate, setPatientBirthDate] = useState<string>('');
  const [patientAgeInput, setPatientAgeInput] = useState<string>('');
  const [ageEntryMode, setAgeEntryMode] = useState<'manual_years' | 'quick_dropdown' | 'native_calendar'>('manual_years');
  const [birthDay, setBirthDay] = useState<string>('');
  const [birthMonth, setBirthMonth] = useState<string>('');
  const [birthYear, setBirthYear] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  // Minor / Third party
  const [isForMinor, setIsForMinor] = useState<boolean>(false);
  const [representativeName, setRepresentativeName] = useState<string>('');
  const [representativePhone, setRepresentativePhone] = useState<string>('');
  const [representativeRelationship, setRepresentativeRelationship] = useState<string>('Madre/Padre');

  // Consents
  const [consentData, setConsentData] = useState<boolean>(false);
  const [consentTerms, setConsentTerms] = useState<boolean>(false);
  const [consentWhatsApp, setConsentWhatsApp] = useState<boolean>(true);

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('en_linea');
  const [transferRef, setTransferRef] = useState<string>('');
  const [transferBank, setTransferBank] = useState<string>('Banesco');
  const [activeHold, setActiveHold] = useState<SlotHold | null>(null);
  const [holdSecondsLeft, setHoldSecondsLeft] = useState<number>(600); // 10 mins

  // Error & Submission
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Suggested minimum booking date (24 hours in the future)
  const minDateStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  const maxDateStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  }, []);

  // Set default date to 2 days ahead on initial load
  useEffect(() => {
    if (!selectedDate) {
      const d = new Date();
      d.setDate(d.getDate() + 2);
      if (d.getDay() === 0) d.setDate(d.getDate() + 1); // skip Sunday
      setSelectedDate(d.toISOString().split('T')[0]);
    }
  }, [selectedDate]);

  // Query slot availability when date or specialty changes
  useEffect(() => {
    if (!selectedDate) {
      setAvailableSlots([]);
      return;
    }
    setSlotsLoading(true);
    setSelectedTime(''); // Wipe selected time per rule 7
    setFormError(null);

    const timer = setTimeout(() => {
      const slots = clinicStore.getAvailableSlotsForDate(selectedDate, activeHold?.id);
      setAvailableSlots(slots);
      setSlotsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [selectedDate, selectedSpecialty.id, activeHold?.id]);

  // Hold countdown timer
  useEffect(() => {
    if (!activeHold) return;

    const interval = setInterval(() => {
      const remainingMs = activeHold.expiresAt - Date.now();
      if (remainingMs <= 0) {
        setActiveHold(null);
        setFormError('La retención temporal de 10 minutos ha expirado. Por favor selecciona el cupo nuevamente.');
        setCurrentStep(2);
      } else {
        setHoldSecondsLeft(Math.floor(remainingMs / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeHold]);

  // Specialty change handler (wipes time per rule 7 and scrolls to calendar on mobile)
  const handleSelectSpecialty = (s: Specialty) => {
    setSelectedSpecialty(s);
    setSelectedTime('');
    setFormError(null);
    setTimeout(() => {
      const calendarEl = document.getElementById('calendar-and-slots-section');
      if (calendarEl && window.innerWidth < 1024) {
        calendarEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Validation before going to Step 3
  const handleProceedToData = () => {
    if (!selectedDate) {
      setFormError('Por favor selecciona una fecha para tu consulta.');
      return;
    }
    if (!selectedTime) {
      setFormError('Por favor pulsa un horario disponible.');
      return;
    }
    setFormError(null);
    setCurrentStep(3);
  };

  // Validation before going to Step 4 (Hold acquisition)
  const handleProceedToPayment = () => {
    if (!patientName.trim() || !patientLastName.trim()) {
      setFormError('Por favor ingresa nombre y apellido del paciente.');
      return;
    }
    if (!docNumber.trim()) {
      setFormError('Por favor ingresa el documento de identidad.');
      return;
    }
    if (!patientPhone.trim() || patientPhone.trim().length < 8) {
      setFormError('Por favor ingresa un número de WhatsApp válido.');
      return;
    }
    if (!reason.trim()) {
      setFormError('Por favor indica brevemente qué te lleva a solicitar la consulta.');
      return;
    }
    if (reason.length > 300) {
      setFormError('El motivo de consulta no debe exceder los 300 caracteres.');
      return;
    }
    if (isForMinor && (!representativeName.trim() || !representativePhone.trim())) {
      setFormError('Por favor completa los datos de contacto del adulto responsable.');
      return;
    }
    if (!consentData) {
      setFormError('Debes aceptar el tratamiento de datos para gestionar la cita.');
      return;
    }
    if (!consentTerms) {
      setFormError('Debes aceptar las condiciones de reserva y la política de abono del 10%.');
      return;
    }

    setFormError(null);

    // Acquire 10-minute hold atomically
    const holdRes = clinicStore.acquireSlotHold(
      selectedDate,
      selectedTime,
      selectedSpecialty.id,
      docNumber.trim()
    );

    if (!holdRes.success) {
      setFormError(holdRes.error || 'No se pudo reservar el cupo temporal.');
      return;
    }

    setActiveHold(holdRes.hold || null);
    setHoldSecondsLeft(600);
    setCurrentStep(4);
  };

  // Final Confirmation
  const handleFinalSubmit = () => {
    setFormError(null);
    setIsSubmitting(true);

    if (paymentMethod === 'transferencia_pago_movil' && !transferRef.trim()) {
      setFormError('Por favor indica el número de referencia del pago móvil o transferencia.');
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      // Calculate age if direct manual age or birthdate provided
      let calculatedAge: number | undefined = undefined;
      const parsedManualAge = parseInt(patientAgeInput, 10);
      if (!isNaN(parsedManualAge) && parsedManualAge >= 0 && parsedManualAge <= 120) {
        calculatedAge = parsedManualAge;
      } else if (patientBirthDate) {
        const b = new Date(patientBirthDate);
        const ageDifMs = Date.now() - b.getTime();
        const ageDate = new Date(ageDifMs);
        calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      }

      const res = clinicStore.confirmBooking({
        holdId: activeHold?.id,
        specialtyId: selectedSpecialty.id,
        date: selectedDate,
        time: selectedTime,
        patientName: patientName.trim(),
        patientLastName: patientLastName.trim(),
        patientDocType: docType,
        patientDocNumber: docNumber.trim(),
        patientPhone: patientPhone.trim(),
        patientEmail: patientEmail.trim() || undefined,
        patientBirthDate: patientBirthDate || undefined,
        patientAge: calculatedAge,
        reason: reason.trim(),
        isForMinorOrOther: isForMinor,
        representativeName: isForMinor ? representativeName.trim() : undefined,
        representativePhone: isForMinor ? representativePhone.trim() : undefined,
        representativeRelationship: isForMinor ? representativeRelationship : undefined,
        consentDataProcessing: consentData,
        consentTermsAndDeposit: consentTerms,
        consentWhatsAppAlerts: consentWhatsApp,
        paymentMethod,
        paymentReference: transferRef.trim() || undefined,
        paymentBank: paymentMethod === 'transferencia_pago_movil' ? transferBank : undefined,
      });

      setIsSubmitting(false);

      if (!res.success || !res.appointment) {
        setFormError(res.error || 'Ocurrió un error al confirmar la cita.');
        return;
      }

      setConfirmedAppointment(res.appointment);
      onBookingCompleted(res.appointment);
      setCurrentStep(5);
    }, 600);
  };

  // Download .ics Calendar event
  const handleDownloadICS = () => {
    if (!confirmedAppointment) return;
    const { date, time, specialtyName, id } = confirmedAppointment;
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);

    const startDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

    const pad = (n: number) => (n < 10 ? '0' + n : n.toString());
    const formatICSDate = (d: Date) =>
      `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//GRESALUD//Agenda de Consultas Médicas//ES',
      'BEGIN:VEVENT',
      `UID:${id}@gresalud.com`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:Consulta Médica GRESALUD - ${specialtyName}`,
      `DESCRIPTION:Reserva ${id}. Dra. Grecia Osuna y equipo médico. Consultorio GRESALUD.`,
      `LOCATION:${config.address}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `GRESALUD_Cita_${id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 10% Deposit calculations
  const totalCost = selectedSpecialty.price;
  const deposit10 = Number(((totalCost * config.depositPercentage) / 100).toFixed(2));
  const balance90 = Number((totalCost - deposit10).toFixed(2));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Step Header with Back Button */}
      {currentStep < 5 && (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                onClick={() => {
                  setFormError(null);
                  setCurrentStep((prev) => prev - 1);
                }}
                className="p-2 text-slate-500 hover:text-[#0B3E50] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Volver al paso anterior"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <div className="text-xs font-semibold text-[#20AAA8] uppercase tracking-wider">
                Paso {currentStep} de 4
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B3E50] font-heading">
                {currentStep === 1 && 'Selecciona tu especialidad'}
                {currentStep === 2 && 'Elige fecha y horario disponible'}
                {currentStep === 3 && 'Completa los datos del paciente'}
                {currentStep === 4 && 'Abono del 10% y confirmación'}
              </h2>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400">Cupo único de consultorio</span>
            <div className="text-xs font-semibold text-[#0B3E50] flex items-center gap-1 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {config.timezone}
            </div>
          </div>
        </div>
      )}

      {/* Global Error Banner */}
      {formError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 animate-shake">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{formError}</div>
        </div>
      )}

      {/* ============================================================== */}
      {/* PASO 1 & 2: VISTA INTEGRADA DE ESPECIALIDADES Y CALENDARIO    */}
      {/* On desktop: Specialties on the left, Calendar on the right     */}
      {/* ============================================================== */}
      {currentStep <= 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: SPECIALTY CARDS */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-base font-bold text-[#0B3E50] flex items-center gap-2">
                <span>Especialidades Médicas</span>
                <span className="text-xs font-normal text-slate-500">({SPECIALTIES.length} disponibles)</span>
              </h3>
              <span className="text-xs text-slate-400">Selecciona una para consultar horas</span>
            </div>

            <div className="space-y-3">
              {SPECIALTIES.map((s) => {
                const isSelected = selectedSpecialty.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSpecialty(s)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all border flex gap-4 items-center cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? 'bg-white border-[#20AAA8] shadow-md ring-2 ring-[#20AAA8]/20'
                        : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    {/* Distinct Specialty Image with fallback */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative border border-slate-100">
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-[#0B3E50]/10" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <h4 className="text-sm sm:text-base font-bold text-[#0B3E50] font-heading leading-tight break-words">
                          {s.name}
                        </h4>
                        <div className="text-left sm:text-right shrink-0">
                          <span className="text-xs sm:text-sm font-extrabold text-[#0B3E50]">
                            ${s.price} {s.currency}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs font-semibold text-[#20AAA8] mt-0.5">
                        {s.tagline}
                      </p>

                      <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                        {s.description}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                        <span>Duración: {s.durationMinutes} min</span>
                        <span>·</span>
                        <span className="text-[#0B3E50] font-semibold">Abono 10%: ${(s.price * 0.1).toFixed(2)}</span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-white bg-[#20AAA8] px-2 py-0.5 rounded-full ml-auto">
                            ✓ Seleccionada
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Radio indicator */}
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'border-[#20AAA8] bg-[#20AAA8] text-white shadow-xs'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: CALENDAR AND TIME SLOTS */}
          <div
            id="calendar-and-slots-section"
            className="lg:col-span-6 bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm space-y-6 scroll-mt-24"
          >
            
            {/* Summary Header of Selected Specialty */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Especialidad Seleccionada
                </span>
                <div className="text-base font-bold text-[#0B3E50]">
                  {selectedSpecialty.name}
                </div>
                <div className="text-xs text-slate-500">
                  Consulta de {selectedSpecialty.durationMinutes} min · Precio total: ${selectedSpecialty.price} USD
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Abono de reserva</span>
                <div className="text-lg font-bold text-[#20AAA8]">
                  ${deposit10} <span className="text-xs font-normal text-slate-500">(10%)</span>
                </div>
              </div>
            </div>

            {/* Date Selection Control */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-[#0B3E50] flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#20AAA8]" />
                  <span>Selecciona una fecha</span>
                </label>
                <span className="text-xs text-slate-400">Lun-Sáb (Domingo cerrado)</span>
              </div>

              <input
                type="date"
                value={selectedDate}
                min={minDateStr}
                max={maxDateStr}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#20AAA8] focus:border-transparent text-slate-800 font-medium cursor-pointer bg-white"
              />

              <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                <span>Horarios: L-V 08:30–18:00 (Almuerzo 12:00–13:00)</span>
                <span>Sáb 09:00–14:00</span>
              </div>
            </div>

            {/* Time Slot Grid */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-[#0B3E50] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#20AAA8]" />
                  <span>Horarios disponibles ({selectedDate})</span>
                </label>
                {selectedTime && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                    {selectedTime} seleccionado
                  </span>
                )}
              </div>

              {slotsLoading ? (
                <div className="py-12 text-center text-slate-400 text-sm">
                  <div className="inline-block animate-spin w-6 h-6 border-2 border-[#20AAA8] border-t-transparent rounded-full mb-2"></div>
                  <p>Verificando disponibilidad en tiempo real...</p>
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="py-10 px-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                  <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
                  <p className="text-sm font-semibold text-slate-700">
                    Consultorio cerrado para esta fecha
                  </p>
                  <p className="text-xs text-slate-500">
                    GRESALUD no atiende domingos ni fuera de las franjas habilitadas. Por favor elige de lunes a sábado.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {availableSlots.map(({ time, available, reason }) => {
                    const isPicked = selectedTime === time;
                    return (
                      <button
                        key={time}
                        disabled={!available}
                        onClick={() => setSelectedTime(time)}
                        title={!available ? reason : `Pulsar para seleccionar ${time}`}
                        className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 border ${
                          isPicked
                            ? 'bg-[#0B3E50] text-white border-[#0B3E50] shadow-sm ring-2 ring-[#0B3E50]/20'
                            : available
                            ? 'bg-white hover:bg-[#20AAA8]/10 text-slate-800 border-slate-200 hover:border-[#20AAA8]'
                            : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through opacity-60'
                        }`}
                      >
                        <span className="text-sm font-bold font-mono">{time}</span>
                        <span className="text-[10px] font-normal">
                          {isPicked ? 'Elegido' : available ? 'Disponible' : 'Ocupado'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Global Notice of Single Shared Capacity */}
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Disponibilidad sincronizada:</strong> El consultorio mantiene un único cupo simultáneo compartido entre las especialidades para garantizar atención puntual y sin salas de espera saturadas.
              </div>
            </div>

            {/* Continue Button */}
            <div className="pt-2">
              <button
                disabled={!selectedDate || !selectedTime || slotsLoading}
                onClick={handleProceedToData}
                className="w-full py-3.5 px-6 rounded-xl bg-[#20AAA8] hover:bg-[#18918f] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continuar con mis datos</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* PASO 3: FORMULARIO DE DATOS DEL PACIENTE                       */}
      {/* ============================================================== */}
      {currentStep === 3 && (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          {/* Quick Recap Header */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-400">Especialidad:</span>{' '}
              <strong className="text-[#0B3E50]">{selectedSpecialty.name}</strong>
            </div>
            <div>
              <span className="text-slate-400">Fecha y Hora:</span>{' '}
              <strong className="text-[#0B3E50]">{selectedDate} a las {selectedTime}</strong>
            </div>
            <div>
              <span className="text-slate-400">Duración:</span>{' '}
              <strong className="text-[#0B3E50]">30 minutos</strong>
            </div>
          </div>

          {/* Emergency Warning */}
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong>Canal de citas programadas:</strong> Este servicio gestiona consultas médicas electivas. Si presentas una urgencia médica o emergencia vital, acude de inmediato a un centro hospitalario.
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#0B3E50] flex items-center gap-2">
              <User className="w-4 h-4 text-[#20AAA8]" />
              <span>Datos del Paciente</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Carmen"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#20AAA8] focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Apellido <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. González"
                  value={patientLastName}
                  onChange={(e) => setPatientLastName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#20AAA8] focus:outline-none text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tipo Doc. <span className="text-rose-500">*</span>
                </label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#20AAA8] focus:outline-none text-sm bg-white"
                >
                  <option value="V">V - Venezolano</option>
                  <option value="E">E - Extranjero</option>
                  <option value="P">P - Pasaporte</option>
                  <option value="J">J - Jurídico</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Número de Documento <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. 18234567"
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#20AAA8] focus:outline-none text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  WhatsApp con código de país <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ej. +58 412 1234567"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#20AAA8] focus:outline-none text-sm"
                />
                <span className="text-[11px] text-slate-400">Se usará para confirmación de la cita</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Correo electrónico (Opcional)
                </label>
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#20AAA8] focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Dual Age & Birth Date Selector */}
            <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/90 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <label className="block text-xs font-bold text-[#0B3E50]">
                  Edad del Paciente o Fecha de Nacimiento <span className="text-slate-400 font-normal">(Para historial clínico)</span>
                </label>

                {/* Segmented Mode Picker */}
                <div className="inline-flex bg-slate-200/90 p-0.5 rounded-lg text-xs font-medium self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setAgeEntryMode('manual_years')}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      ageEntryMode === 'manual_years'
                        ? 'bg-white text-[#0B3E50] font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    ✍️ Escribir edad
                  </button>

                  <button
                    type="button"
                    onClick={() => setAgeEntryMode('quick_dropdown')}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      ageEntryMode === 'quick_dropdown'
                        ? 'bg-white text-[#0B3E50] font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    📅 Elegir Año/Mes (1 clic)
                  </button>

                  <button
                    type="button"
                    onClick={() => setAgeEntryMode('native_calendar')}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      ageEntryMode === 'native_calendar'
                        ? 'bg-white text-[#0B3E50] font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Calendario
                  </button>
                </div>
              </div>

              {/* Modo 1: Escribir edad directamente en años */}
              {ageEntryMode === 'manual_years' && (
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative w-36">
                      <input
                        type="number"
                        min="0"
                        max="120"
                        placeholder="Ej. 34"
                        value={patientAgeInput}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPatientAgeInput(val);
                          const num = parseInt(val, 10);
                          if (!isNaN(num) && num >= 0 && num <= 120) {
                            const estY = 2026 - num;
                            setBirthYear(String(estY));
                            setBirthMonth('06');
                            setBirthDay('15');
                            setPatientBirthDate(`${estY}-06-15`);
                          } else if (!val) {
                            setPatientBirthDate('');
                          }
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#20AAA8] focus:outline-none text-sm font-semibold bg-white"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium pointer-events-none">
                        años
                      </span>
                    </div>

                    {patientAgeInput && parseInt(patientAgeInput, 10) >= 0 && (
                      <div className="text-xs text-emerald-800 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>
                          Registrado: <strong>{patientAgeInput} años</strong> (Año aprox. {2026 - parseInt(patientAgeInput, 10)})
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Escribe directamente la edad sin perder tiempo retrocediendo años en el calendario.
                  </p>
                </div>
              )}

              {/* Modo 2: Selector Rápido con Año, Mes y Día en lista desplegable */}
              {ageEntryMode === 'quick_dropdown' && (
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-lg">
                    {/* Año (primero para elegir rápidamente el año de nacimiento) */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Año</label>
                      <select
                        value={birthYear}
                        onChange={(e) => {
                          const y = e.target.value;
                          setBirthYear(y);
                          if (y) {
                            const m = birthMonth || '06';
                            const d = birthDay || '15';
                            const dateStr = `${y}-${m}-${d}`;
                            setPatientBirthDate(dateStr);
                            const b = new Date(dateStr);
                            const ageDifMs = Date.now() - b.getTime();
                            const calc = Math.abs(new Date(ageDifMs).getUTCFullYear() - 1970);
                            if (!isNaN(calc)) setPatientAgeInput(String(calc));
                          }
                        }}
                        className="w-full px-2.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-[#20AAA8] font-bold text-[#0B3E50]"
                      >
                        <option value="">-- Año --</option>
                        {BIRTH_YEARS.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>

                    {/* Mes */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Mes</label>
                      <select
                        value={birthMonth}
                        onChange={(e) => {
                          const m = e.target.value;
                          setBirthMonth(m);
                          if (birthYear && m) {
                            const d = birthDay || '15';
                            const dateStr = `${birthYear}-${m}-${d}`;
                            setPatientBirthDate(dateStr);
                            const b = new Date(dateStr);
                            const ageDifMs = Date.now() - b.getTime();
                            const calc = Math.abs(new Date(ageDifMs).getUTCFullYear() - 1970);
                            if (!isNaN(calc)) setPatientAgeInput(String(calc));
                          }
                        }}
                        className="w-full px-2.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-[#20AAA8]"
                      >
                        <option value="">-- Mes --</option>
                        {BIRTH_MONTHS.map((m) => (
                          <option key={m.val} value={m.val}>{m.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Día */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Día</label>
                      <select
                        value={birthDay}
                        onChange={(e) => {
                          const d = e.target.value;
                          setBirthDay(d);
                          if (birthYear && birthMonth && d) {
                            const dateStr = `${birthYear}-${birthMonth}-${d}`;
                            setPatientBirthDate(dateStr);
                            const b = new Date(dateStr);
                            const ageDifMs = Date.now() - b.getTime();
                            const calc = Math.abs(new Date(ageDifMs).getUTCFullYear() - 1970);
                            if (!isNaN(calc)) setPatientAgeInput(String(calc));
                          }
                        }}
                        className="w-full px-2.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-[#20AAA8]"
                      >
                        <option value="">-- Día --</option>
                        {BIRTH_DAYS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {patientAgeInput && (
                    <div className="text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        {birthDay ? `${birthDay}/` : ''}{birthMonth ? `${birthMonth}/` : ''}{birthYear} — <strong>{patientAgeInput} años</strong>
                      </span>
                    </div>
                  )}
                  <p className="text-[11px] text-slate-500">
                    Elige tu año de nacimiento en un solo clic sin tener que retroceder mes a mes.
                  </p>
                </div>
              )}

              {/* Modo 3: Calendario nativo del dispositivo */}
              {ageEntryMode === 'native_calendar' && (
                <div className="space-y-1.5">
                  <input
                    type="date"
                    value={patientBirthDate}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPatientBirthDate(val);
                      if (val) {
                        const parts = val.split('-');
                        if (parts.length === 3) {
                          setBirthYear(parts[0]);
                          setBirthMonth(parts[1]);
                          setBirthDay(parts[2]);
                        }
                        const b = new Date(val);
                        const ageDifMs = Date.now() - b.getTime();
                        const calc = Math.abs(new Date(ageDifMs).getUTCFullYear() - 1970);
                        if (!isNaN(calc)) setPatientAgeInput(String(calc));
                      }
                    }}
                    className="w-full sm:w-1/2 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#20AAA8] focus:outline-none text-sm bg-white"
                  />
                  {patientAgeInput && (
                    <span className="text-xs text-emerald-700 font-semibold block">
                      Edad calculada: {patientAgeInput} años
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Toggle: Minor or Third Party */}
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isForMinor}
                  onChange={(e) => setIsForMinor(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#20AAA8] focus:ring-[#20AAA8]"
                />
                <span className="text-xs font-semibold text-slate-800">
                  ¿La cita es para un menor de edad o familiar a tu cargo?
                </span>
              </label>
            </div>

            {/* Minor / Responsible Adult Fields */}
            {isForMinor && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
                <div className="text-xs font-bold text-[#0B3E50]">
                  Datos del Adulto Responsable / Contacto
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Nombre completo del responsable
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Valeria Guzmán"
                      value={representativeName}
                      onChange={(e) => setRepresentativeName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#20AAA8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Parentesco
                    </label>
                    <select
                      value={representativeRelationship}
                      onChange={(e) => setRepresentativeRelationship(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    >
                      <option value="Madre/Padre">Madre / Padre</option>
                      <option value="Tutor legal">Tutor legal</option>
                      <option value="Hijo/Hija">Hijo / Hija</option>
                      <option value="Cónyuge">Cónyuge</option>
                      <option value="Otro">Otro familiar</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Teléfono del responsable
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej. +58 424 998 8776"
                    value={representativePhone}
                    onChange={(e) => setRepresentativePhone(e.target.value)}
                    className="w-full sm:w-1/2 px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#20AAA8]"
                  />
                </div>
              </div>
            )}

            {/* Motivo de consulta (Brief, <= 300 chars) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Cuéntanos brevemente qué te lleva a solicitar la consulta <span className="text-rose-500">*</span>
                </label>
                <span className={`text-[11px] ${reason.length > 280 ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
                  {reason.length} / 300 caracteres
                </span>
              </div>
              <textarea
                rows={3}
                maxLength={300}
                required
                placeholder="Describe tus síntomas o el motivo principal en pocas palabras (no ingreses diagnósticos extensos)..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#20AAA8] focus:outline-none text-sm resize-none"
              />
            </div>

            {/* Separate Consents per Rule 8 */}
            <div className="pt-2 space-y-2.5 border-t border-slate-100">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                <input
                  type="checkbox"
                  required
                  checked={consentData}
                  onChange={(e) => setConsentData(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#20AAA8] focus:ring-[#20AAA8] mt-0.5"
                />
                <span>
                  Acepto el tratamiento de mis datos personales únicamente para la gestión médica y administrativa de la cita. <span className="text-rose-500">*</span>
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                <input
                  type="checkbox"
                  required
                  checked={consentTerms}
                  onChange={(e) => setConsentTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#20AAA8] focus:ring-[#20AAA8] mt-0.5"
                />
                <span>
                  Acepto las condiciones de reserva y el abono del 10% del valor de la consulta, con posibilidad de cancelar o reprogramar hasta 12 horas antes. <span className="text-rose-500">*</span>
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={consentWhatsApp}
                  onChange={(e) => setConsentWhatsApp(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#20AAA8] focus:ring-[#20AAA8] mt-0.5"
                />
                <span>
                  Autorizo el envío de recordatorios y avisos de confirmación de asistencia por WhatsApp. (Opcional)
                </span>
              </label>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Volver
              </button>

              <button
                type="button"
                onClick={handleProceedToPayment}
                className="px-6 py-3 rounded-xl bg-[#20AAA8] hover:bg-[#18918f] text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Continuar al Abono (Paso final)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* PASO 4: ABONO DEL 10% Y CONFIRMACIÓN                           */}
      {/* ============================================================== */}
      {currentStep === 4 && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          {/* 10-Minute Hold Active Banner */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>
                <strong>Cupo retenido por 10 minutos</strong> para completar tu abono.
              </span>
            </div>
            <div className="font-mono font-bold text-sm bg-amber-200/60 px-2.5 py-1 rounded-md text-amber-950">
              {Math.floor(holdSecondsLeft / 60)}:{('0' + (holdSecondsLeft % 60)).slice(-2)}
            </div>
          </div>

          {/* Pricing Breakdown Card */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Desglose de Consulta Médica
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Especialidad: {selectedSpecialty.name}</span>
              <span className="font-semibold text-slate-800">${totalCost.toFixed(2)} USD</span>
            </div>

            <div className="flex items-center justify-between text-sm pt-1 border-t border-slate-200">
              <span className="font-bold text-[#0B3E50] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#20AAA8]" />
                Abono a pagar hoy (10%)
              </span>
              <span className="font-bold text-lg text-[#20AAA8] font-mono">
                ${deposit10.toFixed(2)} USD
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Saldo restante al asistir a la consulta (90%):</span>
              <span className="font-semibold text-slate-700">${balance90.toFixed(2)} USD</span>
            </div>

            {/* MANDATORY TEXT PER SECTION 9 */}
            <div className="mt-3 p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 font-medium leading-relaxed italic">
              «El abono del 10 % forma parte del costo total de la consulta. El saldo restante se paga según las indicaciones de GRESALUD».
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-[#0B3E50] uppercase tracking-wider">
              Selecciona tu método de abono
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('en_linea')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  paymentMethod === 'en_linea'
                    ? 'border-[#20AAA8] bg-[#20AAA8]/5 shadow-xs ring-2 ring-[#20AAA8]/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <CreditCard className="w-5 h-5 text-[#20AAA8]" />
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                    Inmediato
                  </span>
                </div>
                <div className="text-sm font-bold text-[#0B3E50]">Tarjeta / Pasarela Online</div>
                <div className="text-xs text-slate-500 mt-1">
                  Validación instantánea en el servidor y confirmación automática.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('transferencia_pago_movil')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  paymentMethod === 'transferencia_pago_movil'
                    ? 'border-[#20AAA8] bg-[#20AAA8]/5 shadow-xs ring-2 ring-[#20AAA8]/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Building className="w-5 h-5 text-[#0B3E50]" />
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm">
                    Verificación manual
                  </span>
                </div>
                <div className="text-sm font-bold text-[#0B3E50]">Pago Móvil / Transferencia</div>
                <div className="text-xs text-slate-500 mt-1">
                  Carga el número de referencia para verificación por recepción.
                </div>
              </button>
            </div>
          </div>

          {/* Conditional Method Form */}
          {paymentMethod === 'en_linea' ? (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-[#0B3E50]">
                Procesamiento Seguro con Encriptación Médica
              </div>
              <p className="text-xs text-slate-600">
                Al pulsar confirmar, se procesará el abono de <strong>${deposit10.toFixed(2)} USD</strong> mediante nuestra pasarela certificada.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Cumple con estándares PCI-DSS de confidencialidad</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-[#0B3E50]">
                Datos Bancarios Oficiales GRESALUD
              </div>
              <div className="text-xs text-slate-700 space-y-1 bg-white p-3 rounded-lg border border-slate-200 font-mono">
                <div><strong>Banco:</strong> Banesco / Mercantil</div>
                <div><strong>Pago Móvil:</strong> 0412-3697465 / 0412-9601785 · CI: 19.482.910</div>
                <div><strong>Titular:</strong> Dra. Grecia Osuna (GRESALUD)</div>
                <div><strong>Monto del abono (10%):</strong> ${deposit10.toFixed(2)} USD (Tasa BCV del día)</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Banco Emisor
                  </label>
                  <select
                    value={transferBank}
                    onChange={(e) => setTransferBank(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                  >
                    <option value="Banesco">Banesco</option>
                    <option value="Mercantil">Mercantil</option>
                    <option value="Bancaribe">Bancaribe</option>
                    <option value="BBVA Provincial">BBVA Provincial</option>
                    <option value="Banco de Venezuela">Banco de Venezuela</option>
                    <option value="Zelle / Internacional">Zelle / Transferencia Internacional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Número de Referencia <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. REF-984210"
                    value={transferRef}
                    onChange={(e) => setTransferRef(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#20AAA8]"
                  />
                </div>
              </div>

              <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                Nota: El registro del comprobante se marca como <em>«Pendiente de verificación»</em> hasta que recepción confirme los fondos en cuenta.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-between gap-4">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Volver a Datos
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleFinalSubmit}
              className="px-6 py-3.5 rounded-xl bg-[#20AAA8] hover:bg-[#18918f] disabled:bg-slate-300 text-white font-semibold text-sm sm:text-base shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Confirmando reserva...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Realizar Abono y Agendar Cita</span>
                </>
              )}
            </button>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* PASO 5: RESERVA CONFIRMADA EXITOSA                             */}
      {/* ============================================================== */}
      {currentStep === 5 && confirmedAppointment && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="text-xs font-semibold text-[#20AAA8] uppercase tracking-wider">
              ¡Operación Registrada con Éxito!
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B3E50] font-heading">
              Tu cita médica ha sido agendada
            </h2>
            <p className="text-xs text-slate-500">
              Guarda tu número único de reserva para consultas y confirmación de asistencia.
            </p>
          </div>

          {/* Big Unique Reservation Code Box */}
          <div className="p-4 rounded-2xl bg-[#0B3E50] text-white text-center space-y-1 shadow-md">
            <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">
              Número Único de Reserva
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-wider text-[#20AAA8]">
              {confirmedAppointment.id}
            </div>
            <div className="text-[11px] text-slate-300">
              Registrado a nombre de: {confirmedAppointment.patientName} {confirmedAppointment.patientLastName}
            </div>
          </div>

          {/* Details Summary Grid */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 text-xs sm:text-sm">
            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200">
              <div>
                <span className="text-slate-400 block text-[11px]">Especialidad</span>
                <strong className="text-slate-800 font-semibold">{confirmedAppointment.specialtyName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Médico Asignado</span>
                <strong className="text-slate-800 font-semibold">
                  {confirmedAppointment.doctorName || 'Profesional por asignar (Recepción)'}
                </strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200">
              <div>
                <span className="text-slate-400 block text-[11px]">Fecha y Hora</span>
                <strong className="text-slate-800 font-semibold">
                  {confirmedAppointment.date} a las {confirmedAppointment.time}
                </strong>
                <span className="text-[10px] text-slate-500 block">({config.timezone})</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Duración estimada</span>
                <strong className="text-slate-800 font-semibold">{confirmedAppointment.durationMinutes} minutos</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200">
              <div>
                <span className="text-slate-400 block text-[11px]">Estado del Abono</span>
                <span
                  className={`inline-block font-semibold px-2 py-0.5 rounded text-xs ${
                    confirmedAppointment.paymentStatus === 'abono_verificado'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {confirmedAppointment.paymentStatus === 'abono_verificado'
                    ? 'Abono Verificado'
                    : 'Pendiente de Verificación por Recepción'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Abono / Saldo Restante</span>
                <span className="text-slate-800 font-medium">
                  Abonado: <strong>${confirmedAppointment.depositAmount} USD</strong> · Saldo en consulta: <strong>${confirmedAppointment.balanceDue} USD</strong>
                </span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-[11px]">Ubicación del Consultorio</span>
              <p className="text-slate-700 font-medium">
                {config.address}
              </p>
            </div>
          </div>

          {/* Arrival Instructions */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600" />
              <span>Instrucciones de llegada GRESALUD</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-blue-900/90 text-[11px]">
              <li>Llegar con 10 minutos de anticipación al Piso 3, Consultorio 302.</li>
              <li>Presentar documento de identidad original en el módulo de recepción.</li>
              <li>Traer informes médicos o exámenes previos relevantes para la consulta.</li>
              <li>Podrás confirmar tu asistencia o solicitar reprogramación hasta 12 horas antes.</li>
            </ul>
          </div>

          {/* Direct WhatsApp Notification Button to verify and send data to clinic */}
          <div className="pt-2">
            <a
              href={`https://wa.me/584123697465?text=${encodeURIComponent(
                `¡Hola GRESALUD! Acabo de registrar mi cita médica oficial:\n\n` +
                `📋 *Número de Reserva:* ${confirmedAppointment.id}\n` +
                `🩺 *Especialidad:* ${confirmedAppointment.specialtyName}\n` +
                `👤 *Paciente:* ${confirmedAppointment.patientName} ${confirmedAppointment.patientLastName}\n` +
                `🪪 *Cédula:* ${confirmedAppointment.patientDocType}-${confirmedAppointment.patientDocNumber}\n` +
                `📱 *Teléfono:* ${confirmedAppointment.patientPhone}\n` +
                `🗓️ *Fecha y Hora:* ${confirmedAppointment.date} a las ${confirmedAppointment.time}\n` +
                `💵 *Abono (10%):* $${confirmedAppointment.depositAmount} USD\n` +
                (confirmedAppointment.paymentReference
                  ? `💳 *Referencia de Pago:* ${confirmedAppointment.paymentReference} (${confirmedAppointment.paymentBank || 'Pago Móvil'})\n`
                  : '') +
                `\nPor favor confirmar recepción de los datos. ¡Muchas gracias!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer text-center group active:scale-[0.98]"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Enviar comprobante a GRESALUD por WhatsApp (0412-3697465)</span>
            </a>
            <span className="text-[11px] text-slate-500 text-center block mt-1.5">
              Haz clic para enviar todos los datos de tu reserva directamente al WhatsApp oficial de recepción.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleDownloadICS}
              className="py-3 px-4 rounded-xl bg-[#0B3E50] hover:bg-[#082d3b] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Añadir a mi Calendario (.ics)</span>
            </button>

            <button
              onClick={() => onGoToLookup(confirmedAppointment.id)}
              className="py-3 px-4 rounded-xl border border-[#20AAA8] text-[#0B3E50] hover:bg-[#20AAA8]/10 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#20AAA8]" />
              <span>Consultar mi Reserva</span>
            </button>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setConfirmedAppointment(null);
                setCurrentStep(1);
              }}
              className="text-xs text-slate-500 hover:text-[#0B3E50] underline cursor-pointer"
            >
              Agendar otra consulta médica
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
