import React, { useState } from 'react';
import { Header } from './components/Header';
import { RevealHero } from './components/RevealHero';
import { BookingWizard } from './components/BookingWizard';
import { BookingLookup } from './components/BookingLookup';
import { LaboratorySection } from './components/LaboratorySection';
import { ReceptionPanel } from './components/ReceptionPanel';
import { DoctorPanel } from './components/DoctorPanel';
import { ShareQRModal } from './components/ShareQRModal';
import { Footer } from './components/Footer';
import { Appointment } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'agendar' | 'consultar' | 'laboratorio' | 'recepcion' | 'medico'>('agendar');
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [lookupInitialCode, setLookupInitialCode] = useState<string>('');

  const handleBookingCompleted = (appointment: Appointment) => {
    // When a booking completes, we can keep the user on the success screen
    setLookupInitialCode(appointment.id);
  };

  const handleGoToLookup = (code: string) => {
    setLookupInitialCode(code);
    setCurrentTab('consultar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartBooking = () => {
    setCurrentTab('agendar');
    // Scroll smoothly to booking wizard
    const wizardEl = document.getElementById('booking-wizard-section');
    if (wizardEl) {
      wizardEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Top Bar */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQR={() => setIsQRModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'agendar' && (
          <>
            {/* Interactive Reveal Hero (Cortina Divisoria requested by user) */}
            <RevealHero
              onStartBooking={handleStartBooking}
              onLookupBooking={() => setCurrentTab('consultar')}
              onOpenLab={() => setCurrentTab('laboratorio')}
            />

            {/* 4-Step Booking Wizard */}
            <section id="booking-wizard-section" className="pt-2 pb-12">
              <BookingWizard
                onBookingCompleted={handleBookingCompleted}
                onGoToLookup={handleGoToLookup}
              />
            </section>
          </>
        )}

        {currentTab === 'consultar' && (
          <BookingLookup
            initialCode={lookupInitialCode}
            onGoToBooking={() => setCurrentTab('agendar')}
          />
        )}

        {currentTab === 'laboratorio' && (
          <LaboratorySection
            onGoToBooking={() => setCurrentTab('agendar')}
          />
        )}

        {currentTab === 'recepcion' && (
          <ReceptionPanel />
        )}

        {currentTab === 'medico' && (
          <DoctorPanel />
        )}
      </main>

      {/* QR & NFC Share Modal */}
      <ShareQRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />

      {/* Professional Footer */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
