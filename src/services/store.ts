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
      'Evaluación y tratamiento de lesiones y molestias en huesos, músculos y articulaciones para cuidar tu movilidad y calidad de vida.',
    image:
      'data:image/webp;base64,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',
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
];    email: 'dra.grecia@gresalud.com',
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
