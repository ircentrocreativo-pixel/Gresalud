export type SpecialtyId =
  | 'medicina_interna'
  | 'medicina_ocupacional'
  | 'nutricion'
  | 'pediatria'
  | 'ginecologia'
  | 'psiquiatria'
  | 'traumatologia'
  | 'medicina_general';

export interface Specialty {
  id: SpecialtyId;
  name: string;
  tagline: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  durationMinutes: number;
  iconName: string;
}

export type AppointmentStatus =
  | 'confirmada'
  | 'reprogramada'
  | 'cancelada'
  | 'en_espera_llegada'
  | 'en_consulta'
  | 'atendida'
  | 'inasistencia';

export type PaymentStatus =
  | 'abono_verificado'
  | 'abono_pendiente_verificacion'
  | 'pendiente_pago'
  | 'reembolsado';

export type AttendanceStatus =
  | 'pendiente_confirmacion'
  | 'asistencia_confirmada'
  | 'inasistencia_reportada';

export type PaymentMethod = 'en_linea' | 'transferencia_pago_movil';

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialtyId: SpecialtyId;
  specialtyName: string;
  photoUrl?: string;
  email: string;
  phone: string;
}

export interface Appointment {
  id: string; // GRE-2026-XXXX
  token: string; // secure lookup token
  specialtyId: SpecialtyId;
  specialtyName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  durationMinutes: number;
  
  // Doctor assignment
  doctorId?: string;
  doctorName?: string; // "Dra. Grecia Osuna" or undefined ("Profesional por asignar")
  
  // Patient info
  patientName: string;
  patientLastName: string;
  patientDocType: 'V' | 'E' | 'J' | 'P';
  patientDocNumber: string;
  patientPhone: string;
  patientEmail?: string;
  patientBirthDate?: string;
  patientAge?: number;
  reason: string; // max 300 chars
  
  // Third party / minor
  isForMinorOrOther: boolean;
  representativeName?: string;
  representativePhone?: string;
  representativeRelationship?: string;
  
  // Consents
  consentDataProcessing: boolean;
  consentTermsAndDeposit: boolean;
  consentWhatsAppAlerts: boolean;
  
  // Financials (preserved price snapshot)
  priceTotal: number;
  depositAmount: number; // 10%
  balanceDue: number; // 90%
  currency: string;
  
  // Payment info
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  paymentBank?: string;
  paymentProofDate?: string;
  paymentVerifiedBy?: string;
  paymentVerifiedAt?: string;
  
  // Operational statuses
  status: AppointmentStatus;
  attendanceStatus: AttendanceStatus;
  attendanceConfirmedAt?: string;
  
  // System metadata
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface SlotHold {
  id: string;
  date: string;
  time: string;
  specialtyId: SpecialtyId;
  patientDocNumber: string;
  expiresAt: number; // timestamp
}

export interface ScheduleBlock {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  createdAt: string;
  createdBy: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  appointmentId?: string;
  action: string;
  details: string;
  performedBy: string; // 'Recepción' | 'Sistema' | 'Paciente' | Doctor name
}

export interface NotificationRecord {
  id: string;
  timestamp: string;
  appointmentId: string;
  recipient: string; // Name & Phone/Email
  type: 'reserva_registrada' | 'abono_recibido' | 'abono_pendiente' | 'medico_asignado' | 'recordatorio_cita' | 'confirmacion_asistencia' | 'reprogramacion' | 'cancelacion';
  channel: 'WhatsApp' | 'Email' | 'SMS';
  status: 'entregado' | 'enviado' | 'pendiente' | 'fallido';
  messageSummary: string;
}

export interface ClinicConfig {
  timezone: string;
  openWeekdayStart: string; // 08:30
  openWeekdayEnd: string; // 18:00
  openSaturdayStart: string; // 09:00
  openSaturdayEnd: string; // 14:00
  lunchStart: string; // 12:00
  lunchEnd: string; // 13:00
  slotDurationMinutes: number; // 30
  minAdvanceHours: number; // 24
  maxAdvanceDays: number; // 30
  reminderHoursBefore: number; // 24
  cancelWindowHoursBefore: number; // 12
  onlineHoldMinutes: number; // 10
  depositPercentage: number; // 10
  allowSameDayBookings: boolean;
  address: string;
  phoneWhatsapp: string;
}
