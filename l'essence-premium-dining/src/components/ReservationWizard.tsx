/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Calendar, User, Clock, MapPin, CheckCircle, Info, Sparkles, AlertCircle } from 'lucide-react';
import { DINING_ZONES, TIME_SLOTS } from '../data';
import { DiningZone, Reservation } from '../types';

interface ReservationWizardProps {
  onSuccess: (reservation: Reservation) => void;
}

export default function ReservationWizard({ onSuccess }: ReservationWizardProps) {
  const [step, setStep] = useState(1);
  const [reservationDate, setReservationDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [guestCount, setGuestCount] = useState(2);
  const [timeSlot, setTimeSlot] = useState('19:00');
  const [selectedZone, setSelectedZone] = useState<DiningZone>('main-hall');
  
  // Contact details state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [ticket, setTicket] = useState<Reservation | null>(null);

  const activeZoneInfo = DINING_ZONES.find(z => z.id === selectedZone);

  const handleNextStep = () => {
    const errors: string[] = [];
    if (step === 1) {
      if (!reservationDate) errors.push('Please choose a dining date.');
      if (!timeSlot) errors.push('Please choose an available timing slot.');
      if (errors.length > 0) {
        setFormErrors(errors);
        return;
      }
      setFormErrors([]);
      setStep(2);
    } else if (step === 2) {
      if (!selectedZone) errors.push('Please select an atmosphere zone.');
      if (errors.length > 0) {
        setFormErrors(errors);
        return;
      }
      setFormErrors([]);
      setStep(3);
    }
  };

  const handleSubmitBooking = (e: FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];
    
    if (!contactName.trim()) errors.push('Guest Name is required for physical table mapping.');
    if (!contactEmail.trim() || !contactEmail.includes('@')) errors.push('A valid email is required for secure confirmations.');
    if (!contactPhone.trim()) errors.push('A reachability phone number is required.');

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);

    const newBooking: Reservation = {
      id: `RES-${Math.floor(100000 + Math.random() * 900000)}`,
      date: reservationDate,
      timeSlot,
      guestCount,
      zone: selectedZone,
      specialRequests,
      contactName,
      contactEmail,
      contactPhone,
      createdAt: new Date().toISOString()
    };

    setTicket(newBooking);
    onSuccess(newBooking);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setSpecialRequests('');
    setTicket(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-brand-surface border border-brand-gold-muted/20 rounded p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
      {/* Steps Indicator Tracker */}
      <div className="flex justify-between items-center mb-8 border-b border-brand-gold-muted/10 pb-6">
        {[
          { num: 1, name: 'Date & Seats' },
          { num: 2, name: 'Chamber Atmosphere' },
          { num: 3, name: 'Sensory Touches' },
          { num: 4, name: 'VIP Confirmed' }
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step === s.num
                  ? 'bg-brand-gold text-brand-dark'
                  : step > s.num
                  ? 'bg-green-600 text-white'
                  : 'bg-brand-surface-high border border-brand-gold-muted/20 text-brand-cream-muted'
              }`}
            >
              {s.num}
            </span>
            <span
              className={`text-xs font-semibold tracking-wider uppercase hidden sm:inline ${
                step === s.num ? 'text-brand-gold' : 'text-brand-cream-muted'
              }`}
            >
              {s.name}
            </span>
          </div>
        ))}
      </div>

      {formErrors.length > 0 && (
        <div className="mb-6 bg-red-950/40 border border-red-500/30 p-4 rounded text-red-100 flex gap-3 text-xs">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <ul className="list-disc pl-4 space-y-1">
            {formErrors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Step 1: Date & Guests */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-serif text-2xl text-brand-gold tracking-wide">Secure Gastronomic Seating</h3>
            <p className="text-xs text-brand-cream-muted">
              Select your dining coordinates. Same-day bookings require custom contact via our live sommelier interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Guest Count */}
            <div className="bg-brand-surface-high border border-brand-gold-muted/10 rounded p-5 space-y-3">
              <label className="text-[10px] text-brand-gold font-sans uppercase font-bold tracking-widest flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Table Party size
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 8, 10, 12].slice(0, 5).map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuestCount(num)}
                    className={`py-2 rounded font-sans text-xs font-bold transition-all ${
                      guestCount === num
                        ? 'bg-brand-gold text-brand-dark'
                        : 'bg-brand-dark hover:bg-brand-dark-deep border border-brand-gold-muted/15 text-brand-cream'
                    }`}
                  >
                    {num} Guest{num > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
              <div className="flex justify-between items-center text-[10px] text-brand-cream-muted/70 pt-2 border-t border-brand-gold-muted/5">
                <span>Party larger than 6 guests?</span>
                <button 
                  type="button"
                  onClick={() => setGuestCount(8)}
                  className="text-brand-gold hover:underline font-bold"
                >
                  Request Lounge (8+)
                </button>
              </div>
            </div>

            {/* Date Picker */}
            <div className="bg-brand-surface-high border border-brand-gold-muted/10 rounded p-5 space-y-3">
              <label className="text-[10px] text-brand-gold font-sans uppercase font-bold tracking-widest flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Select Dining Date
              </label>
              <input
                type="date"
                value={reservationDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setReservationDate(e.target.value)}
                className="w-full bg-brand-dark focus:outline-none focus:border-brand-gold border border-brand-gold-muted/20 rounded px-3 py-2 text-sm text-brand-cream font-medium"
              />
              <p className="text-[10px] text-brand-cream-muted/80 leading-normal">
                Tasting Menu reservations are updated seasonally with special flora allocations.
              </p>
            </div>

            {/* Time Slot Selector */}
            <div className="bg-brand-surface-high border border-brand-gold-muted/10 rounded p-5 space-y-3">
              <label className="text-[10px] text-brand-gold font-sans uppercase font-bold tracking-widest flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Chronological Seating Time
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {TIME_SLOTS.slice(0, 9).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-1.5 rounded font-sans text-xs font-semibold ${
                      timeSlot === slot
                        ? 'bg-brand-gold text-brand-dark'
                        : 'bg-brand-dark hover:bg-brand-dark-deep border border-brand-gold-muted/15 text-brand-cream-muted'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-brand-cream-muted text-center italic">
                Approximate sequence span: 2.5 hours.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-brand-gold hover:bg-brand-gold-muted text-brand-dark font-sans text-xs uppercase font-extrabold tracking-widest px-8 py-3.5 rounded transition-all active:scale-95 focus:outline-none flex items-center gap-2"
            >
              Continue to Chambers
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Dining Chamber Atmosphere Selection */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-serif text-2xl text-brand-gold tracking-wide">Atmosphere Orchestration</h3>
            <p className="text-xs text-brand-cream-muted">
              Choose your spatial coordinates. Each chamber hosts a distinct acoustic and lighting dynamic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DINING_ZONES.map((zone) => {
              const worksAsActive = selectedZone === zone.id;
              return (
                <div
                  key={zone.id}
                  onClick={() => setSelectedZone(zone.id)}
                  className={`cursor-pointer rounded border p-5 transition-all duration-300 relative flex flex-col justify-between ${
                    worksAsActive
                      ? 'bg-brand-surface-high border-brand-gold shadow-[0_0_20px_rgba(242,202,80,0.1)]'
                      : 'bg-brand-surface border-brand-gold-muted/10 hover:border-brand-gold-muted/30'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] text-brand-gold font-sans font-bold uppercase tracking-widest bg-brand-dark/80 border border-brand-gold-muted/10 px-2 py-0.5 rounded">
                        {zone.id.replace('-', ' ')}
                      </span>
                      {worksAsActive && <CheckCircle className="w-5 h-5 text-brand-gold" />}
                    </div>
                    <h4 className="font-serif font-semibold text-lg text-brand-cream">{zone.name}</h4>
                    <p className="text-xs text-brand-cream-muted leading-relaxed line-clamp-4">
                      {zone.description}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-brand-gold-muted/10 pt-3 space-y-1.5 text-[10px] text-brand-cream-muted">
                    <p className="flex items-center gap-1.5 font-sans font-semibold">
                      <User className="w-3.5 h-3.5 text-brand-gold-muted" />
                      {zone.capacityText}
                    </p>
                    <p className="flex items-center gap-1.5 font-sans">
                      <Info className="w-3.5 h-3.5 text-brand-gold-muted" />
                      {zone.depositText}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {activeZoneInfo && (
            <div className="bg-brand-dark-deep border border-brand-gold-muted/15 rounded p-4 flex gap-4 items-center">
              <MapPin className="w-8 h-8 text-brand-gold shrink-0" />
              <div className="space-y-1 text-xs">
                <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">Atmosphere Notes</span>
                <p className="text-brand-cream leading-relaxed font-sans italic">
                  &ldquo;{activeZoneInfo.ambiance}&rdquo;
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="border border-brand-gold-muted/30 hover:border-brand-gold text-brand-cream/80 font-sans text-xs uppercase font-extrabold tracking-widest px-8 py-3.5 rounded transition-all active:scale-95 focus:outline-none"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-brand-gold hover:bg-brand-gold-muted text-brand-dark font-sans text-xs uppercase font-extrabold tracking-widest px-8 py-3.5 rounded transition-all active:scale-95 focus:outline-none"
            >
              Next Step
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Contact & Special Touches */}
      {step === 3 && (
        <form onSubmit={handleSubmitBooking} className="space-y-6 animate-fade-in">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-serif text-2xl text-brand-gold tracking-wide">Sensory Integration Contact</h3>
            <p className="text-xs text-brand-cream-muted">
              Submit your coordinate access credentials. Secure end-to-end booking tickets are locally registered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Details Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] text-brand-gold font-sans uppercase font-bold tracking-widest mb-1.5">
                  Guest Host Name
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Jonathan Gold"
                  className="w-full bg-brand-dark-deep focus:outline-none focus:border-brand-gold border border-brand-gold-muted/20 rounded px-4 py-2.5 text-sm text-brand-cream"
                />
              </div>

              <div>
                <label className="block text-[10px] text-brand-gold font-sans uppercase font-bold tracking-widest mb-1.5">
                  Secure Guest Email
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="e.g. guest@culinary.com"
                  className="w-full bg-brand-dark-deep focus:outline-none focus:border-brand-gold border border-brand-gold-muted/20 rounded px-4 py-2.5 text-sm text-brand-cream"
                />
              </div>

              <div>
                <label className="block text-[10px] text-brand-gold font-sans uppercase font-bold tracking-widest mb-1.5">
                  Reachability Phone
                </label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="e.g. +1 (382) 593-9482"
                  className="w-full bg-brand-dark-deep focus:outline-none focus:border-brand-gold border border-brand-gold-muted/20 rounded px-4 py-2.5 text-sm text-brand-cream"
                />
              </div>
            </div>

            {/* Special Request Column */}
            <div className="flex flex-col h-full">
              <label className="block text-[10px] text-brand-gold font-sans uppercase font-bold tracking-widest mb-1.5">
                Special Culinary Notes, Allergies &amp; Occasions
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="List nut allergies, vegan adjustments, or if celebrating a bespoke milestone with our team..."
                className="w-full flex-1 bg-brand-dark-deep focus:outline-none focus:border-brand-gold border border-brand-gold-muted/20 rounded px-4 py-3 text-sm text-brand-cream placeholder:text-brand-cream-muted/50 min-h-[140px] resize-none"
              />
            </div>
          </div>

          <div className="bg-brand-surface-high border border-brand-gold-muted/10 rounded p-4 text-xs space-y-1.5 text-brand-cream-muted">
            <p className="font-bold text-brand-gold uppercase tracking-wider text-[9px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Guaranteed Satisfaction Protocol
            </p>
            <p className="font-sans leading-normal">
              By submitting this, you approve our 24-hour cancellation window. A host cell will lock your table within 15 minutes of validation.
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="border border-brand-gold-muted/30 hover:border-brand-gold text-brand-cream/80 font-sans text-xs uppercase font-extrabold tracking-widest px-8 py-3.5 rounded transition-all active:scale-95 focus:outline-none animate-fade-in"
            >
              Previous
            </button>
            <button
              type="submit"
              className="bg-brand-gold hover:bg-brand-gold-muted text-brand-dark font-sans text-xs uppercase font-extrabold tracking-widest px-8 py-3.5 rounded transition-all active:scale-95 focus:outline-none flex items-center gap-2 font-black shadow-lg"
            >
              Finalize Seating Access
            </button>
          </div>
        </form>
      )}

      {/* Step 4: Golden Confirm Ticket Display */}
      {step === 4 && ticket && (
        <div className="space-y-6 text-center py-6 animate-fade-in max-w-xl mx-auto">
          <div className="w-16 h-16 bg-brand-gold/10 border border-brand-gold/40 rounded-full flex items-center justify-center text-brand-gold mx-auto animate-bounce mb-2 shadow-md">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-3xl text-brand-gold tracking-wide">Access Locked Successfully</h3>
            <p className="text-xs text-brand-cream-muted">
              Present this golden sensory code to our concierge cell upon arrival tonight.
            </p>
          </div>

          {/* Luxury Ticket Card */}
          <div className="relative bg-brand-dark border border-brand-gold/40 rounded p-6 text-left space-y-6 overflow-hidden shadow-2xl">
            {/* Decors */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/3 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-gold/3 rounded-full blur-2xl pointer-events-none" />
            
            {/* Ticket Header */}
            <div className="border-b border-brand-gold-muted/20 pb-4 flex justify-between items-center">
              <div>
                <span className="text-[14px] font-serif font-bold text-brand-gold tracking-widest uppercase block">
                  L'ESSENCE
                </span>
                <span className="text-[8px] tracking-widest text-brand-cream-muted uppercase">
                  Premium Seating Ticket
                </span>
              </div>
              <div className="text-right">
                <span className="text-[12px] font-sans font-extrabold text-brand-gold block tracking-wider">
                  {ticket.id}
                </span>
                <span className="text-[8px] bg-brand-gold/10 border border-brand-gold/30 text-brand-gold px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  VIP LEVEL
                </span>
              </div>
            </div>

            {/* Core Ticket Metrics */}
            <div className="grid grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <span className="text-[9px] text-brand-cream-muted uppercase tracking-wider block mb-0.5">Guest Host</span>
                <p className="text-brand-cream font-semibold">{ticket.contactName}</p>
              </div>
              <div>
                <span className="text-[9px] text-brand-cream-muted uppercase tracking-wider block mb-0.5">Atmosphere</span>
                <p className="text-brand-gold font-bold uppercase tracking-wide">
                  {DINING_ZONES.find(z => z.id === ticket.zone)?.name || ticket.zone}
                </p>
              </div>
              <div>
                <span className="text-[9px] text-brand-cream-muted uppercase tracking-wider block mb-0.5">Date Chrono</span>
                <p className="text-brand-cream font-medium">{ticket.date}</p>
              </div>
              <div>
                <span className="text-[9px] text-brand-cream-muted uppercase tracking-wider block mb-0.5">Timing &amp; Party</span>
                <p className="text-brand-cream font-medium">
                  {ticket.timeSlot} &bull; {ticket.guestCount} Seat{ticket.guestCount > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Requests if available */}
            {ticket.specialRequests && (
              <div className="bg-brand-surface border border-brand-gold-muted/10 p-3 rounded text-[11px] leading-relaxed italic text-brand-cream-muted">
                &ldquo;{ticket.specialRequests}&rdquo;
              </div>
            )}

            {/*Concierge Micro notes */}
            <div className="border-t border-brand-gold-muted/15 pt-4 flex flex-col items-center justify-center space-y-2">
              {/* Mock Barcode */}
              <div className="w-full h-8 bg-brand-surface tracking-[0.25em] text-[10px] text-brand-cream-muted/70 flex items-center justify-center font-mono opacity-80 border border-brand-gold-muted/10 select-none">
                ||||| | ||||| | || ||||| || ||| | |||
              </div>
              <p className="text-[8px] uppercase tracking-widest text-brand-cream-muted/60">
                Concierge cell validated &bull; Please check email {ticket.contactEmail}
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="bg-brand-gold hover:bg-brand-gold-muted text-brand-dark font-sans text-xs uppercase font-extrabold tracking-widest px-8 py-3.5 rounded transition-all active:scale-95 focus:outline-none"
            >
              Book Another Table
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
