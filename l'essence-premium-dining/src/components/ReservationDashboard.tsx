/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calendar, Trash2, Edit, Check, X, ShieldAlert, Sparkles, User, KeySquare, HelpCircle } from 'lucide-react';
import { Reservation } from '../types';
import { DINING_ZONES } from '../data';

interface ReservationDashboardProps {
  reservations: Reservation[];
  onCancel: (id: string) => void;
  onUpdateSpecialRequests: (id: string, text: string) => void;
}

export default function ReservationDashboard({ reservations, onCancel, onUpdateSpecialRequests }: ReservationDashboardProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleStartEdit = (res: Reservation) => {
    setEditingId(res.id);
    setEditText(res.specialRequests || '');
  };

  const handleSaveEdit = (id: string) => {
    onUpdateSpecialRequests(id, editText);
    setEditingId(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Dashboard Greetings */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h3 className="font-serif text-2xl text-brand-gold tracking-wide">Concierge Seating Ledger</h3>
        <p className="text-xs text-brand-cream-muted">
          Review, revise, or release your exclusive seating vectors. All details sync with your local machine.
        </p>
      </div>

      {reservations.length === 0 ? (
        <div className="border border-dashed border-brand-gold-muted/25 rounded p-12 text-center bg-brand-surface space-y-4">
          <Calendar className="w-12 h-12 text-brand-gold mx-auto animate-pulse" />
          <div className="space-y-1">
            <h4 className="font-serif font-medium text-lg text-brand-cream">No Registered Reservations Found</h4>
            <p className="text-xs text-brand-cream-muted max-w-sm mx-auto leading-relaxed">
              You do not have any tables registered on this device. Please head to our &ldquo;Book Table&rdquo; screen to lock yours.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {reservations.map((res) => {
            const isEditing = editingId === res.id;
            const zoneName = DINING_ZONES.find(z => z.id === res.zone)?.name || res.zone;

            return (
              <div
                key={res.id}
                className="bg-brand-surface border border-brand-gold-muted/20 rounded p-6 shadow-xl flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden"
              >
                {/* Visual glow backdrop decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/2 rounded-full blur-xl pointer-events-none" />

                {/* Left Side: Detail Matrix */}
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-bold text-brand-gold font-mono uppercase">
                      {res.id}
                    </span>
                    <span className="text-[10px] bg-brand-gold/15 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded font-sans uppercase font-bold tracking-wider">
                      Confirmed Seating
                    </span>
                    <span className="text-[10px] text-brand-cream-muted font-sans italic">
                      Booked {new Date(res.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                    <div>
                      <span className="text-[9px] text-brand-cream-muted uppercase tracking-wider block mb-0.5">Dining Chamber</span>
                      <p className="text-brand-cream font-semibold text-xs uppercase tracking-wide">{zoneName}</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-brand-cream-muted uppercase tracking-wider block mb-0.5">Date Coordinate</span>
                      <p className="text-brand-cream text-xs font-semibold">{res.date}</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-brand-cream-muted uppercase tracking-wider block mb-0.5">Chronos Hour</span>
                      <p className="text-brand-cream text-xs font-semibold">{res.timeSlot}</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-brand-cream-muted uppercase tracking-wider block mb-0.5">Seats Booked</span>
                      <p className="text-brand-cream text-xs font-semibold">{res.guestCount} Guest{res.guestCount > 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  {/* Special Requests Display / Interactive Form */}
                  <div className="border-t border-brand-gold-muted/10 pt-4 space-y-2">
                    <span className="text-[9px] text-brand-gold font-sans uppercase font-bold tracking-widest flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Sensory Adjustments
                    </span>

                    {isEditing ? (
                      <div className="flex gap-2 items-center animate-fade-in mt-1">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          placeholder="Update allergies, celebratory notes, vegan focus..."
                          className="flex-1 bg-brand-dark-deep focus:outline-none focus:border-brand-gold border border-brand-gold-muted/20 rounded px-3 py-2 text-xs text-brand-cream"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(res.id)}
                          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded focus:outline-none shrink-0"
                          title="Save Changes"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="bg-brand-dark hover:bg-brand-surface-highest text-brand-cream p-2 rounded border border-brand-gold-muted/20 focus:outline-none shrink-0"
                          title="Cancel Editing"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start gap-4 bg-brand-dark-deep border border-brand-gold-muted/10 p-3 rounded text-xs min-h-[42px] relative group leading-relaxed">
                        <p className="text-brand-cream-muted font-sans select-none truncate max-w-lg">
                          {res.specialRequests || 'No sensory adjustments registered yet.'}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleStartEdit(res)}
                          className="text-brand-gold hover:text-white flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider hover:underline focus:outline-none shrink-0"
                        >
                          <Edit className="w-3 h-3" />
                          Revise Note
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Host Coordinates & Actions */}
                <div className="sm:border-t md:border-t-0 md:border-l border-brand-gold-muted/10 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between shrink-0 md:w-60">
                  <div className="space-y-1.5 text-xs text-brand-cream-muted">
                    <p className="font-bold text-brand-cream flex items-center gap-1.5 font-sans">
                      <User className="w-3.5 h-3.5 text-brand-gold-muted" />
                      {res.contactName}
                    </p>
                    <p className="font-sans break-all">{res.contactEmail}</p>
                    <p className="font-sans">{res.contactPhone}</p>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => onCancel(res.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-950/20 px-4 py-2 border border-red-900/30 hover:border-red-600/40 rounded font-sans text-[10px] uppercase font-extrabold tracking-widest flex items-center gap-1.5 transition-all focus:outline-none"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Release Seating
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
