import {
  Specialty,
  Doctor,
  Appointment,
  SlotHold,
  ScheduleBlock,
  AuditLog,
  NotificationRecord,
  ClinicConfig,
  SpecialtyId,
  AttendanceStatus,
  PaymentMethod,
} from '../types';

export const SPECIALTIES: Specialty[] = [
  {
    id: 'medicina_interna',
    name: 'Medicina Interna',
    tagline: 'Prevención, diagnóstico y seguimiento crónico de adultos',
    description:
      'Atención integral para adultos, enfocada en la prevención, el diagnóstico y el seguimiento de enfermedades y condiciones crónicas.',
    image: '/assets/aistudio/Consulta_moderna_de_medicina_interna-4_87ed239e.png',
    price: 50,
    currency: 'USD',
    durationMinutes: 30,
    iconName: 'Stethoscope',
  },
  {
    id: 'medicina_ocupacional',
    name: 'Medicina Ocupacional',
    tagline: 'Salud en el trabajo y prevención de riesgos laborales',
    description:
      'Cuidamos la salud en el trabajo mediante evaluaciones médicas, prevención de riesgos y seguimiento del bienestar de los trabajadores.',
    image: '/assets/aistudio/Toma_de_presi_n_en_medicina_ocupacional-5_82be5691.png',
    price: 45,
    currency: 'USD',
    durationMinutes: 30,
    iconName: 'Activity',
  },
  {
    id: 'nutricion',
    name: 'Nutrición',
    tagline: 'Orientación alimentaria y bienestar personalizado',
    description:
      'Mejora tus hábitos alimenticios con orientación personalizada para cuidar tu salud y bienestar en cada etapa de tu vida.',
    image: '/assets/aistudio/Consulta_nutricional_con_frutas_vibrantes-1_5b54f67f.png',
    price: 40,
    currency: 'USD',
    durationMinutes: 30,
    iconName: 'Salad',
  },
  {
    id: 'pediatria',
    name: 'Pediatría',
    tagline: 'Cuidado y desarrollo integral para tus hijos',
    description:
      'Atención cercana para cuidar la salud, el crecimiento y el desarrollo de tus hijos, desde sus primeros años.',
    image: '/assets/aistudio/Pediatra_atiende_a_ni_a_en_consultorio_colorido-2_5db68be9.png',
    price: 50,
    currency: 'USD',
    durationMinutes: 30,
    iconName: 'Baby',
  },
  {
    id: 'ginecologia',
    name: 'Ginecología',
    tagline: 'Salud femenina, controles preventivos y orientación',
    description:
      'Atención dedicada a tu salud ginecológica, con controles preventivos y orientación personalizada en cada etapa de tu vida.',
    image: '/assets/aistudio/Consulta_ginecol_gica_con_ecograf_a-6_51fd6a0a.png',
    price: 55,
    currency: 'USD',
    durationMinutes: 30,
    iconName: 'HeartHandshake',
  },
  {
    id: 'psiquiatria',
    name: 'Psiquiatría',
    tagline: 'Escucha profesional y acompañamiento en salud mental',
    description:
      'Un espacio de escucha y atención profesional para cuidar tu salud mental, comprender tus emociones y acompañar tu bienestar.',
    image: '/assets/aistudio/Psiquiatra_conversa_con_paciente_en_consulta-3_d20e32b8.png',
    price: 60,
    currency: 'USD',
    durationMinutes: 30,
    iconName: 'Brain',
  },
  {
    id: 'traumatologia',
    name: 'Traumatología',
    tagline: 'Evaluación articular, muscular y ósea para tu movilidad',
    description:
      'Evaluación y tratamiento de lesiones y molestias en huesos, músculos y articulaciones para cuidar tu movilidad con planes personalizados.',
    image: '/assets/aistudio/Consulta_de_rodilla_en_traumatolog_a_134fd713.png',
    price: 55,
    currency: 'USD',
    durationMinutes: 30,
    iconName: 'Bone',
  },
  {
    id: 'medicina_general',
    name: 'Medicina General',
    tagline: 'Evaluación médica integral de primer contacto',
    description:
      'Consulta médica preventiva, evaluación clínica primaria, orientación diagnóstica y derivación oportuna.',
    image: '/assets/aistudio/Consulta_moderna_de_medicina_interna-4_87ed239e.png',
    price: 40,
    currency: 'USD',
    durationMinutes: 30,
    iconName: 'UserCheck',
  },
];

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-grecia-osuna',
    name: 'Dra. Grecia Osuna',
    title: 'Médico Internista - Directora Médica GRESALUD',
    specialtyId: 'medicina_interna',
    specialtyName: 'Medicina Interna',
    email: 'dra.grecia@gresalud.com',
    phone: '+58 414-902-1100',
  },
  {
    id: 'doc-carlos-mendoza',
    name: 'Dr. Carlos Mendoza',
    title: 'Especialista en Traumatología y Cirugía Ortopédica',
    specialtyId: 'traumatologia',
    specialtyName: 'Traumatología',
    email: 'dr.mendoza@gresalud.com',
    phone: '+58 414-902-1101',
  },
  {
    id: 'doc-elena-vargas',
    name: 'Dra. Elena Vargas',
    title: 'Pediatra Puericultor - Atención Infantil',
    specialtyId: 'pediatria',
    specialtyName: 'Pediatría',
    email: 'dra.vargas@gresalud.com',
    phone: '+58 414-902-1102',
  },
  {
    id: 'doc-maria-perez',
    name: 'Lic. María Gabriela Pérez',
    title: 'Nutricionista Clínico y Dietoterapeuta',
    specialtyId: 'nutricion',
    specialtyName: 'Nutrición',
    email: 'lic.perez@gresalud.com',
    phone: '+58 414-902-1103',
  },
  {
    id: 'doc-sofia-ramirez',
    name: 'Dra. Sofía Ramírez',
    title: 'Ginecóloga Obstetra - Salud Femenina',
    specialtyId: 'ginecologia',
    specialtyName: 'Ginecología',
    email: 'dra.ramirez@gresalud.com',
    phone: '+58 414-902-1104',
  },
  {
    id: 'doc-andres-villalobos',
    name: 'Dr. Andrés Villalobos',
    title: 'Médico Psiquiatra - Salud Mental',
    specialtyId: 'psiquiatria',
    specialtyName: 'Psiquiatría',
    email: 'dr.villalobos@gresalud.com',
    phone: '+58 414-902-1105',
  },
  {
    id: 'doc-roberto-hernandez',
    name: 'Dr. Roberto Hernández',
    title: 'Especialista en Salud y Medicina Ocupacional',
    specialtyId: 'medicina_ocupacional',
    specialtyName: 'Medicina Ocupacional',
    email: 'dr.hernandez@gresalud.com',
    phone: '+58 414-902-1106',
  },
];

export const DEFAULT_CONFIG: ClinicConfig = {
  timezone: 'America/Caracas (GMT-4)',
  openWeekdayStart: '08:30',
  openWeekdayEnd: '18:00',
  openSaturdayStart: '09:00',
  openSaturdayEnd: '14:00',
  lunchStart: '12:00',
  lunchEnd: '13:00',
  slotDurationMinutes: 30,
  minAdvanceHours: 24,
  maxAdvanceDays: 30,
  reminderHoursBefore: 24,
  cancelWindowHoursBefore: 12,
  onlineHoldMinutes: 10,
  depositPercentage: 10,
  allowSameDayBookings: false,
  address: 'Centro Médico GRESALUD, Av. Principal, Piso 3, Consultorio 302',
  phoneWhatsapp: '+58 412-473-7258',
};

// Seed realistic initial appointments for demonstration of operational state
function getTomorrowDateString(addDays = 2): string {
  const d = new Date();
  d.setDate(d.getDate() + addDays);
  // Skip Sunday if hits it
  if (d.getDay() === 0) d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

const SEED_DATE = getTomorrowDateString(2);
const SEED_DATE_2 = getTomorrowDateString(4);

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'GRE-2026-1042',
    token: 'tok_8921_1042',
    specialtyId: 'medicina_interna',
    specialtyName: 'Medicina Interna',
    date: SEED_DATE,
    time: '09:30',
    durationMinutes: 30,
    doctorId: 'doc-grecia-osuna',
    doctorName: 'Dra. Grecia Osuna',
    patientName: 'Mariana',
    patientLastName: 'Colmenares',
    patientDocType: 'V',
    patientDocNumber: '19482910',
    patientPhone: '+58 414 123 4567',
    patientEmail: 'mariana.c@example.com',
    patientBirthDate: '1988-06-14',
    patientAge: 38,
    reason: 'Control de hipertensión y chequeo preventivo general.',
    isForMinorOrOther: false,
    consentDataProcessing: true,
    consentTermsAndDeposit: true,
    consentWhatsAppAlerts: true,
    priceTotal: 50,
    depositAmount: 5.0,
    balanceDue: 45.0,
    currency: 'USD',
    paymentMethod: 'transferencia_pago_movil',
    paymentStatus: 'abono_verificado',
    paymentReference: 'REF-00982341',
    paymentBank: 'Banesco',
    paymentProofDate: '2026-10-29 14:20',
    paymentVerifiedBy: 'Recepción (L. Gomez)',
    paymentVerifiedAt: '2026-10-29 15:00',
    status: 'confirmada',
    attendanceStatus: 'asistencia_confirmada',
    attendanceConfirmedAt: '2026-10-30 09:00',
    createdAt: '2026-10-29 14:15',
    updatedAt: '2026-10-29 15:00',
  },
  {
    id: 'GRE-2026-1043',
    token: 'tok_7734_1043',
    specialtyId: 'pediatria',
    specialtyName: 'Pediatría',
    date: SEED_DATE,
    time: '11:00',
    durationMinutes: 30,
    doctorId: 'doc-elena-vargas',
    doctorName: 'Dra. Elena Vargas',
    patientName: 'Santiago',
    patientLastName: 'Guzmán',
    patientDocType: 'V',
    patientDocNumber: '32984112',
    patientPhone: '+58 424 998 8776',
    patientEmail: 'mama.santiago@example.com',
    patientBirthDate: '2020-03-21',
    patientAge: 6,
    reason: 'Control de niño sano y evaluación de esquema de vacunas.',
    isForMinorOrOther: true,
    representativeName: 'Valeria Guzmán (Madre)',
    representativePhone: '+58 424 998 8776',
    representativeRelationship: 'Madre',
    consentDataProcessing: true,
    consentTermsAndDeposit: true,
    consentWhatsAppAlerts: true,
    priceTotal: 50,
    depositAmount: 5.0,
    balanceDue: 45.0,
    currency: 'USD',
    paymentMethod: 'en_linea',
    paymentStatus: 'abono_verificado',
    paymentReference: 'STRIPE_AUTH_98122',
    paymentVerifiedBy: 'Pasarela Online GRESALUD',
    paymentVerifiedAt: '2026-10-29 18:30',
    status: 'confirmada',
    attendanceStatus: 'pendiente_confirmacion',
    createdAt: '2026-10-29 18:25',
    updatedAt: '2026-10-29 18:30',
  },
  {
    id: 'GRE-2026-1044',
    token: 'tok_5541_1044',
    specialtyId: 'traumatologia',
    specialtyName: 'Traumatología',
    date: SEED_DATE_2,
    time: '14:30',
    durationMinutes: 30,
    doctorId: undefined,
    doctorName: undefined, // "Profesional por asignar"
    patientName: 'Alejandro',
    patientLastName: 'Rivas',
    patientDocType: 'V',
    patientDocNumber: '17234891',
    patientPhone: '+58 412 667 3344',
    patientEmail: 'arivas@example.com',
    patientBirthDate: '1984-11-03',
    patientAge: 42,
    reason: 'Dolor persistente en rodilla derecha tras práctica deportiva.',
    isForMinorOrOther: false,
    consentDataProcessing: true,
    consentTermsAndDeposit: true,
    consentWhatsAppAlerts: false,
    priceTotal: 55,
    depositAmount: 5.5,
    balanceDue: 49.5,
    currency: 'USD',
    paymentMethod: 'transferencia_pago_movil',
    paymentStatus: 'abono_pendiente_verificacion',
    paymentReference: 'PMOVIL-9921448',
    paymentBank: 'Mercantil',
    paymentProofDate: '2026-10-30 10:10',
    status: 'confirmada',
    attendanceStatus: 'pendiente_confirmacion',
    createdAt: '2026-10-30 10:05',
    updatedAt: '2026-10-30 10:10',
  },
];

const INITIAL_AUDITS: AuditLog[] = [
  {
    id: 'aud-1',
    timestamp: '2026-10-29 14:15',
    appointmentId: 'GRE-2026-1042',
    action: 'Reserva creada',
    details: 'Paciente Mariana Colmenares agendó Medicina Interna para ' + SEED_DATE + ' 09:30.',
    performedBy: 'Paciente',
  },
  {
    id: 'aud-2',
    timestamp: '2026-10-29 15:00',
    appointmentId: 'GRE-2026-1042',
    action: 'Abono verificado y médico asignado',
    details: 'Recepción verificó transferencia Banesco (REF-00982341) de $5.00 y asignó a Dra. Grecia Osuna.',
    performedBy: 'Recepción',
  },
  {
    id: 'aud-3',
    timestamp: '2026-10-29 18:30',
    appointmentId: 'GRE-2026-1043',
    action: 'Reserva y pago en línea confirmado',
    details: 'Abono en línea $5.00 completado para Pediatría. Médico asignado: Dra. Elena Vargas.',
    performedBy: 'Sistema GRESALUD',
  },
  {
    id: 'aud-4',
    timestamp: '2026-10-30 10:10',
    appointmentId: 'GRE-2026-1044',
    action: 'Comprobante recibido - Pendiente verificación',
    details: 'Paciente cargó referencia de pago móvil Mercantil (PMOVIL-9921448). Requiere validación de recepción.',
    performedBy: 'Paciente',
  },
];

const INITIAL_NOTIFICATIONS: NotificationRecord[] = [
  {
    id: 'notif-1',
    timestamp: '2026-10-29 14:16',
    appointmentId: 'GRE-2026-1042',
    recipient: 'Mariana Colmenares (+58 414 123 4567)',
    type: 'reserva_registrada',
    channel: 'WhatsApp',
    status: 'entregado',
    messageSummary: 'Confirmación de solicitud de cita GRE-2026-1042 en Medicina Interna.',
  },
  {
    id: 'notif-2',
    timestamp: '2026-10-29 15:02',
    appointmentId: 'GRE-2026-1042',
    recipient: 'Dra. Grecia Osuna (+58 414-902-1100)',
    type: 'medico_asignado',
    channel: 'WhatsApp',
    status: 'entregado',
    messageSummary: 'Nueva cita asignada para el ' + SEED_DATE + ' 09:30. Paciente: Mariana Colmenares.',
  },
  {
    id: 'notif-3',
    timestamp: '2026-10-30 10:11',
    appointmentId: 'GRE-2026-1044',
    recipient: 'Alejandro Rivas (+58 412 667 3344)',
    type: 'abono_pendiente',
    channel: 'WhatsApp',
    status: 'enviado',
    messageSummary: 'Comprobante registrado. Recepción de GRESALUD verificará su abono en breve.',
  },
];

// Persistent state class using browser LocalStorage with memory fallback
class ClinicStore {
  private appointments: Appointment[] = [];
  private doctors: Doctor[] = [];
  private blocks: ScheduleBlock[] = [];
  private holds: SlotHold[] = [];
  private audits: AuditLog[] = [];
  private notifications: NotificationRecord[] = [];
  private config: ClinicConfig = DEFAULT_CONFIG;
  private listeners: Array<() => void> = [];

  constructor() {
    this.loadState();
    // Periodically clean up expired holds
    setInterval(() => this.cleanupExpiredHolds(), 15000);
  }

  private loadState() {
    try {
      const storedAppts = localStorage.getItem('gresalud_appointments_v1');
      if (storedAppts) {
        this.appointments = JSON.parse(storedAppts);
      } else {
        this.appointments = INITIAL_APPOINTMENTS;
      }

      const storedDoctors = localStorage.getItem('gresalud_doctors_v1');
      this.doctors = storedDoctors ? JSON.parse(storedDoctors) : INITIAL_DOCTORS;

      const storedBlocks = localStorage.getItem('gresalud_blocks_v1');
      this.blocks = storedBlocks ? JSON.parse(storedBlocks) : [];

      const storedAudits = localStorage.getItem('gresalud_audits_v1');
      this.audits = storedAudits ? JSON.parse(storedAudits) : INITIAL_AUDITS;

      const storedNotifs = localStorage.getItem('gresalud_notifs_v1');
      this.notifications = storedNotifs ? JSON.parse(storedNotifs) : INITIAL_NOTIFICATIONS;

      const storedConfig = localStorage.getItem('gresalud_config_v1');
      this.config = storedConfig ? JSON.parse(storedConfig) : DEFAULT_CONFIG;
    } catch {
      this.appointments = INITIAL_APPOINTMENTS;
      this.doctors = INITIAL_DOCTORS;
      this.blocks = [];
      this.audits = INITIAL_AUDITS;
      this.notifications = INITIAL_NOTIFICATIONS;
      this.config = DEFAULT_CONFIG;
    }
  }

  private saveState() {
    try {
      localStorage.setItem('gresalud_appointments_v1', JSON.stringify(this.appointments));
      localStorage.setItem('gresalud_doctors_v1', JSON.stringify(this.doctors));
      localStorage.setItem('gresalud_blocks_v1', JSON.stringify(this.blocks));
      localStorage.setItem('gresalud_audits_v1', JSON.stringify(this.audits));
      localStorage.setItem('gresalud_notifs_v1', JSON.stringify(this.notifications));
      localStorage.setItem('gresalud_config_v1', JSON.stringify(this.config));
    } catch {
      // Ignore quota errors in restricted test environments
    }
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public getConfig(): ClinicConfig {
    return { ...this.config };
  }

  public updateConfig(newConfig: Partial<ClinicConfig>, performer = 'Recepción') {
    this.config = { ...this.config, ...newConfig };
    this.addAudit('Configuración actualizada', 'Parámetros del consultorio actualizados.', performer);
    this.saveState();
  }

  public getDoctors(): Doctor[] {
    return [...this.doctors];
  }

  public getAppointments(): Appointment[] {
    return [...this.appointments];
  }

  public getAudits(): AuditLog[] {
    return [...this.audits];
  }

  public getNotifications(): NotificationRecord[] {
    return [...this.notifications];
  }

  public getBlocks(): ScheduleBlock[] {
    return [...this.blocks];
  }

  public getActiveHolds(): SlotHold[] {
    this.cleanupExpiredHolds();
    return [...this.holds];
  }

  private cleanupExpiredHolds() {
    const now = Date.now();
    const prevLen = this.holds.length;
    this.holds = this.holds.filter((h) => h.expiresAt > now);
    if (this.holds.length !== prevLen) {
      this.notify();
    }
  }

  public addAudit(action: string, details: string, performedBy: string, appointmentId?: string) {
    const nowStr = new Date().toLocaleString('es-VE', { hour12: false });
    this.audits.unshift({
      id: 'aud-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      timestamp: nowStr,
      appointmentId,
      action,
      details,
      performedBy,
    });
    if (this.audits.length > 200) this.audits = this.audits.slice(0, 200);
  }

  public addNotification(
    appointmentId: string,
    recipient: string,
    type: NotificationRecord['type'],
    channel: NotificationRecord['channel'],
    messageSummary: string
  ) {
    const nowStr = new Date().toLocaleString('es-VE', { hour12: false });
    this.notifications.unshift({
      id: 'notif-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      timestamp: nowStr,
      appointmentId,
      recipient,
      type,
      channel,
      status: 'entregado', // Simulated verified response from gateway
      messageSummary,
    });
    if (this.notifications.length > 200) this.notifications = this.notifications.slice(0, 200);
  }

  /**
   * GLOBAL CAPACITY CALCULATION:
   * Returns all potential time slots for a given date, with 'available' flag based on:
   * 1. Operating hours (Mon-Fri 08:30-18:00, Sat 09:00-14:00, Sun closed)
   * 2. Lunch break exclusion (Mon-Fri 12:00-13:00)
   * 3. 24h min advance notice check
   * 4. 30 days max advance check
   * 5. STRICT GLOBAL ONE-PATIENT RULE: Is there ANY appointment booked or held for that slot?
   * 6. Reception blocks
   */
  public getAvailableSlotsForDate(
    dateStr: string,
    ignoreHoldId?: string
  ): { time: string; available: boolean; reason?: string }[] {
    this.cleanupExpiredHolds();

    const [year, month, day] = dateStr.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const dayOfWeek = dateObj.getDay(); // 0 is Sunday, 6 is Saturday

    // Sunday closed
    if (dayOfWeek === 0) {
      return [];
    }

    // Generate timeslots
    const times: string[] = [];
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      // Mon to Fri: 08:30 to 18:00. Consultations are 30 mins. Last appointment starts at 17:30.
      // Lunch is 12:00 - 13:00. Morning ends at 12:00 (last morning start 11:30).
      times.push('08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30');
      times.push('13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30');
    } else if (dayOfWeek === 6) {
      // Saturday: 09:00 to 14:00. Last appointment starts at 13:30.
      times.push('09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30');
    }

    const now = new Date();
    const minAdvanceMs = this.config.minAdvanceHours * 60 * 60 * 1000;
    const maxAdvanceMs = this.config.maxAdvanceDays * 24 * 60 * 60 * 1000;

    return times.map((time) => {
      const [h, m] = time.split(':').map(Number);
      const slotDateTime = new Date(year, month - 1, day, h, m, 0);

      // Check min advance unless same day allowed
      if (!this.config.allowSameDayBookings) {
        if (slotDateTime.getTime() - now.getTime() < minAdvanceMs) {
          return { time, available: false, reason: 'Anticipación mínima de 24h requerida' };
        }
      } else {
        if (slotDateTime.getTime() <= now.getTime()) {
          return { time, available: false, reason: 'Horario ya transcurrido' };
        }
      }

      // Check max advance (30 days)
      if (slotDateTime.getTime() - now.getTime() > maxAdvanceMs) {
        return { time, available: false, reason: 'Excede la anticipación máxima de 30 días' };
      }

      // Check reception blocks
      const isBlocked = this.blocks.some(
        (b) => b.date === dateStr && time >= b.startTime && time < b.endTime
      );
      if (isBlocked) {
        return { time, available: false, reason: 'Franja bloqueada por recepción' };
      }

      // Check GLOBAL one-patient capacity constraint across all specialties
      const activeAppointment = this.appointments.find(
        (a) =>
          a.date === dateStr &&
          a.time === time &&
          a.status !== 'cancelada'
      );
      if (activeAppointment) {
        return { time, available: false, reason: 'Cupo ocupado en el consultorio' };
      }

      // Check active temporary hold (10 mins)
      const activeHold = this.holds.find(
        (h) => h.date === dateStr && h.time === time && h.id !== ignoreHoldId
      );
      if (activeHold) {
        return { time, available: false, reason: 'Franja en retención temporal de pago' };
      }

      return { time, available: true };
    });
  }

  /**
   * ATOMIC HOLD CREATION:
   * Acquires a 10-minute hold on a slot for payment completion.
   */
  public acquireSlotHold(
    date: string,
    time: string,
    specialtyId: SpecialtyId,
    patientDocNumber: string
  ): { success: boolean; hold?: SlotHold; error?: string } {
    this.cleanupExpiredHolds();

    // Check availability
    const slots = this.getAvailableSlotsForDate(date);
    const targetSlot = slots.find((s) => s.time === time);

    if (!targetSlot) {
      return { success: false, error: 'Horario no válido para la fecha seleccionada.' };
    }

    if (!targetSlot.available) {
      return {
        success: false,
        error: targetSlot.reason || 'El cupo ya no se encuentra disponible. Por favor elige otro horario.',
      };
    }

    // Release any previous hold for this same document
    this.holds = this.holds.filter((h) => h.patientDocNumber !== patientDocNumber);

    const hold: SlotHold = {
      id: 'hld_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      date,
      time,
      specialtyId,
      patientDocNumber,
      expiresAt: Date.now() + this.config.onlineHoldMinutes * 60 * 1000,
    };

    this.holds.push(hold);
    this.saveState();
    return { success: true, hold };
  }

  public releaseSlotHold(holdId: string) {
    this.holds = this.holds.filter((h) => h.id !== holdId);
    this.saveState();
  }

  /**
   * CONFIRM BOOKING:
   * Final atomic commitment of an appointment with snapshot of price, 10% deposit, and notifications.
   */
  public confirmBooking(params: {
    holdId?: string;
    specialtyId: SpecialtyId;
    date: string;
    time: string;
    patientName: string;
    patientLastName: string;
    patientDocType: 'V' | 'E' | 'J' | 'P';
    patientDocNumber: string;
    patientPhone: string;
    patientEmail?: string;
    patientBirthDate?: string;
    patientAge?: number;
    reason: string;
    isForMinorOrOther: boolean;
    representativeName?: string;
    representativePhone?: string;
    representativeRelationship?: string;
    consentDataProcessing: boolean;
    consentTermsAndDeposit: boolean;
    consentWhatsAppAlerts: boolean;
    paymentMethod: PaymentMethod;
    paymentReference?: string;
    paymentBank?: string;
  }): { success: boolean; appointment?: Appointment; error?: string } {
    this.cleanupExpiredHolds();

    // Double check that no other finalized appointment has this global slot
    const conflict = this.appointments.find(
      (a) =>
        a.date === params.date &&
        a.time === params.time &&
        a.status !== 'cancelada'
    );

    if (conflict) {
      return {
        success: false,
        error:
          'Conflicto de cupo: Otro paciente acaba de confirmar esta franja simultáneamente. Por favor selecciona otro horario.',
      };
    }

    const specialty = SPECIALTIES.find((s) => s.id === params.specialtyId)!;
    const priceTotal = specialty.price;
    const depositAmount = Number(((priceTotal * this.config.depositPercentage) / 100).toFixed(2));
    const balanceDue = Number((priceTotal - depositAmount).toFixed(2));

    const nextNumber = 1000 + this.appointments.length + 1;
    const id = `GRE-2026-${nextNumber}`;
    const token = `tok_${Math.random().toString(36).substring(2, 10)}_${nextNumber}`;
    const nowStr = new Date().toLocaleString('es-VE', { hour12: false });

    // Payment status: if online, verified automatically; if transfer, pending verification
    const isOnline = params.paymentMethod === 'en_linea';
    const paymentStatus = isOnline ? 'abono_verificado' : 'abono_pendiente_verificacion';

    const newAppointment: Appointment = {
      id,
      token,
      specialtyId: params.specialtyId,
      specialtyName: specialty.name,
      date: params.date,
      time: params.time,
      durationMinutes: specialty.durationMinutes,
      // Default: Doctor is assigned later by reception unless assigned
      doctorId: undefined,
      doctorName: undefined,
      patientName: params.patientName,
      patientLastName: params.patientLastName,
      patientDocType: params.patientDocType,
      patientDocNumber: params.patientDocNumber,
      patientPhone: params.patientPhone,
      patientEmail: params.patientEmail,
      patientBirthDate: params.patientBirthDate,
      patientAge: params.patientAge,
      reason: params.reason,
      isForMinorOrOther: params.isForMinorOrOther,
      representativeName: params.representativeName,
      representativePhone: params.representativePhone,
      representativeRelationship: params.representativeRelationship,
      consentDataProcessing: params.consentDataProcessing,
      consentTermsAndDeposit: params.consentTermsAndDeposit,
      consentWhatsAppAlerts: params.consentWhatsAppAlerts,
      priceTotal,
      depositAmount,
      balanceDue,
      currency: specialty.currency,
      paymentMethod: params.paymentMethod,
      paymentStatus,
      paymentReference: params.paymentReference || (isOnline ? `STRIPE-${Date.now().toString().slice(-6)}` : undefined),
      paymentBank: params.paymentBank,
      paymentProofDate: !isOnline ? nowStr : undefined,
      paymentVerifiedBy: isOnline ? 'Pasarela Online GRESALUD' : undefined,
      paymentVerifiedAt: isOnline ? nowStr : undefined,
      status: 'confirmada',
      attendanceStatus: 'pendiente_confirmacion',
      createdAt: nowStr,
      updatedAt: nowStr,
    };

    // Release hold if was active
    if (params.holdId) {
      this.releaseSlotHold(params.holdId);
    }

    this.appointments.unshift(newAppointment);

    // Audit log
    this.addAudit(
      'Reserva registrada',
      `Paciente ${params.patientName} ${params.patientLastName} (${id}) agendó ${specialty.name} para ${params.date} ${params.time}. Abono: $${depositAmount} (${params.paymentMethod}).`,
      'Paciente',
      id
    );

    // Queue notification
    this.addNotification(
      id,
      `${params.patientName} ${params.patientLastName} (${params.patientPhone})`,
      'reserva_registrada',
      'WhatsApp',
      `Hola ${params.patientName}, tu reserva ${id} para ${specialty.name} el ${params.date} a las ${params.time} ha sido registrada. Estado de abono: ${paymentStatus === 'abono_verificado' ? 'Confirmado' : 'En verificación por recepción'}.`
    );

    this.saveState();
    return { success: true, appointment: newAppointment };
  }

  /**
   * LOOKUP APPOINTMENT BY CODE AND PHONE/DOCUMENT:
   * Protects privacy so arbitrary codes without verified contact cannot see details.
   */
  public findAppointmentSecure(code: string, contactVerify: string): Appointment | null {
    const cleanCode = code.trim().toUpperCase();
    const cleanVerify = contactVerify.trim().replace(/[\s\-\+]/g, '');

    const appt = this.appointments.find((a) => a.id.toUpperCase() === cleanCode);
    if (!appt) return null;

    const patientDoc = appt.patientDocNumber.replace(/[\s\-\+]/g, '');
    const patientPhone = appt.patientPhone.replace(/[\s\-\+]/g, '');
    const repPhone = (appt.representativePhone || '').replace(/[\s\-\+]/g, '');

    if (
      patientDoc.includes(cleanVerify) ||
      cleanVerify.includes(patientDoc) ||
      patientPhone.includes(cleanVerify) ||
      cleanVerify.includes(patientPhone) ||
      (repPhone && (repPhone.includes(cleanVerify) || cleanVerify.includes(repPhone)))
    ) {
      return { ...appt };
    }

    return null;
  }

  public getAppointmentById(id: string): Appointment | undefined {
    return this.appointments.find((a) => a.id === id);
  }

  // --- RECEPTION OPERATIONS ---

  public assignDoctor(appointmentId: string, doctorId: string, performer = 'Recepción'): boolean {
    const appt = this.appointments.find((a) => a.id === appointmentId);
    const doc = this.doctors.find((d) => d.id === doctorId);
    if (!appt || !doc) return false;

    const prevDoctor = appt.doctorName;
    appt.doctorId = doc.id;
    appt.doctorName = doc.name;
    appt.updatedAt = new Date().toLocaleString('es-VE', { hour12: false });

    this.addAudit(
      'Médico asignado',
      `Asignado a ${doc.name} (Anterior: ${prevDoctor || 'Sin asignar'}).`,
      performer,
      appt.id
    );

    // Notify doctor
    this.addNotification(
      appt.id,
      `${doc.name} (${doc.phone})`,
      'medico_asignado',
      'WhatsApp',
      `Nueva consulta asignada: ${appt.patientName} ${appt.patientLastName} el ${appt.date} a las ${appt.time}. Motivo: ${appt.reason}`
    );

    this.saveState();
    return true;
  }

  public verifyPayment(
    appointmentId: string,
    approved: boolean,
    notes = '',
    performer = 'Recepción'
  ): boolean {
    const appt = this.appointments.find((a) => a.id === appointmentId);
    if (!appt) return false;

    const nowStr = new Date().toLocaleString('es-VE', { hour12: false });
    if (approved) {
      appt.paymentStatus = 'abono_verificado';
      appt.paymentVerifiedBy = performer;
      appt.paymentVerifiedAt = nowStr;
      appt.notes = notes ? `${appt.notes || ''} [Abono aprobado: ${notes}]` : appt.notes;

      this.addAudit('Abono verificado', `Abono de $${appt.depositAmount} aprobado.`, performer, appt.id);
      this.addNotification(
        appt.id,
        `${appt.patientName} (${appt.patientPhone})`,
        'abono_recibido',
        'WhatsApp',
        `Tu abono del 10% para la reserva ${appt.id} ha sido verificado con éxito. Tu consulta está lista.`
      );
    } else {
      appt.paymentStatus = 'pendiente_pago';
      appt.notes = notes ? `${appt.notes || ''} [Abono rechazado: ${notes}]` : appt.notes;
      this.addAudit('Abono observado/rechazado', `Abono rechazado. Motivo: ${notes}`, performer, appt.id);
      this.addNotification(
        appt.id,
        `${appt.patientName} (${appt.patientPhone})`,
        'abono_pendiente',
        'WhatsApp',
        `Atención: No pudimos validar tu comprobante de abono para la cita ${appt.id}. Motivo: ${notes}. Comunícate con recepción.`
      );
    }

    appt.updatedAt = nowStr;
    this.saveState();
    return true;
  }

  public rescheduleAppointment(
    appointmentId: string,
    newDate: string,
    newTime: string,
    performer = 'Recepción'
  ): { success: boolean; error?: string } {
    const appt = this.appointments.find((a) => a.id === appointmentId);
    if (!appt) return { success: false, error: 'Cita no encontrada.' };

    // Check availability
    const slots = this.getAvailableSlotsForDate(newDate);
    const target = slots.find((s) => s.time === newTime);
    if (!target || !target.available) {
      return { success: false, error: target?.reason || 'El nuevo horario seleccionado no está disponible.' };
    }

    const oldDate = appt.date;
    const oldTime = appt.time;
    appt.date = newDate;
    appt.time = newTime;
    appt.status = 'reprogramada';
    appt.attendanceStatus = 'pendiente_confirmacion';
    appt.updatedAt = new Date().toLocaleString('es-VE', { hour12: false });

    this.addAudit(
      'Cita reprogramada',
      `Cambio de fecha y hora: de ${oldDate} ${oldTime} a ${newDate} ${newTime}.`,
      performer,
      appt.id
    );

    this.addNotification(
      appt.id,
      `${appt.patientName} (${appt.patientPhone})`,
      'reprogramacion',
      'WhatsApp',
      `Tu cita ${appt.id} ha sido reprogramada para el ${newDate} a las ${newTime}. Por favor recuerda confirmar tu asistencia.`
    );

    if (appt.doctorId) {
      const doc = this.doctors.find((d) => d.id === appt.doctorId);
      if (doc) {
        this.addNotification(
          appt.id,
          `${doc.name} (${doc.phone})`,
          'reprogramacion',
          'WhatsApp',
          `Aviso a médico: La cita de ${appt.patientName} ${appt.patientLastName} fue reprogramada para el ${newDate} a las ${newTime}.`
        );
      }
    }

    this.saveState();
    return { success: true };
  }

  public cancelAppointment(
    appointmentId: string,
    reason: string,
    performer = 'Paciente'
  ): { success: boolean; error?: string } {
    const appt = this.appointments.find((a) => a.id === appointmentId);
    if (!appt) return { success: false, error: 'Cita no encontrada.' };

    appt.status = 'cancelada';
    appt.notes = `${appt.notes || ''} [Cancelada: ${reason}]`;
    appt.updatedAt = new Date().toLocaleString('es-VE', { hour12: false });

    this.addAudit('Cita cancelada', `Cancelación registrada. Motivo: ${reason}`, performer, appt.id);

    this.addNotification(
      appt.id,
      `${appt.patientName} (${appt.patientPhone})`,
      'cancelacion',
      'WhatsApp',
      `Tu cita ${appt.id} en GRESALUD ha sido cancelada. Motivo: ${reason}. Consulta nuestras políticas de abono para más información.`
    );

    if (appt.doctorId) {
      const doc = this.doctors.find((d) => d.id === appt.doctorId);
      if (doc) {
        this.addNotification(
          appt.id,
          `${doc.name} (${doc.phone})`,
          'cancelacion',
          'WhatsApp',
          `Aviso a médico: La cita de ${appt.patientName} ${appt.patientLastName} para el ${appt.date} ha sido cancelada.`
        );
      }
    }

    this.saveState();
    return { success: true };
  }

  public confirmAttendance(appointmentId: string, performer = 'Paciente'): boolean {
    const appt = this.appointments.find((a) => a.id === appointmentId);
    if (!appt) return false;

    const nowStr = new Date().toLocaleString('es-VE', { hour12: false });
    appt.attendanceStatus = 'asistencia_confirmada';
    appt.attendanceConfirmedAt = nowStr;
    appt.updatedAt = nowStr;

    this.addAudit('Asistencia confirmada', 'El paciente confirmó que asistirá a la consulta.', performer, appt.id);
    this.saveState();
    return true;
  }

  public updateAttendanceByReception(
    appointmentId: string,
    status: AttendanceStatus,
    operationalStatus?: Appointment['status'],
    performer = 'Recepción'
  ): boolean {
    const appt = this.appointments.find((a) => a.id === appointmentId);
    if (!appt) return false;

    appt.attendanceStatus = status;
    if (operationalStatus) {
      appt.status = operationalStatus;
    }
    appt.updatedAt = new Date().toLocaleString('es-VE', { hour12: false });

    this.addAudit(
      'Estado de asistencia actualizado',
      `Nuevo estado: ${status}${operationalStatus ? ` / Operativo: ${operationalStatus}` : ''}`,
      performer,
      appt.id
    );

    this.saveState();
    return true;
  }

  public blockSlot(
    date: string,
    startTime: string,
    endTime: string,
    reason: string,
    performer = 'Recepción'
  ): { success: boolean; conflictCount: number; block?: ScheduleBlock } {
    // Check if any booked appointments fall inside this blocked time
    const conflicts = this.appointments.filter(
      (a) =>
        a.date === date &&
        a.time >= startTime &&
        a.time < endTime &&
        a.status !== 'cancelada'
    );

    const block: ScheduleBlock = {
      id: 'blk-' + Date.now(),
      date,
      startTime,
      endTime,
      reason,
      createdAt: new Date().toLocaleString('es-VE', { hour12: false }),
      createdBy: performer,
    };

    this.blocks.push(block);
    this.addAudit(
      'Franja horaria bloqueada',
      `Bloqueo para ${date} de ${startTime} a ${endTime}. Motivo: ${reason}. Citas en conflicto afectadas: ${conflicts.length}.`,
      performer
    );

    this.saveState();
    return { success: true, conflictCount: conflicts.length, block };
  }

  public unblockSlot(blockId: string, performer = 'Recepción'): boolean {
    const block = this.blocks.find((b) => b.id === blockId);
    if (!block) return false;

    this.blocks = this.blocks.filter((b) => b.id !== blockId);
    this.addAudit(
      'Bloqueo eliminado',
      `Se desbloqueó la franja del ${block.date} (${block.startTime}-${block.endTime}).`,
      performer
    );
    this.saveState();
    return true;
  }
}

export const clinicStore = new ClinicStore();
