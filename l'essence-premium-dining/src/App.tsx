/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Star, ChevronRight, Calendar, ArrowRight, Table, Sparkles, MessageSquare, AlertTriangle, Check, BookOpen } from 'lucide-react';
import Header from './components/Header';
import InteractiveMenu from './components/InteractiveMenu';
import ReservationWizard from './components/ReservationWizard';
import ReservationDashboard from './components/ReservationDashboard';
import AntoineChatbot from './components/AntoineChatbot';
import { Reservation } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedFoodQuery, setSelectedFoodQuery] = useState<string>('');
  
  // Custom Elegant Confirmation Modal State
  const [cancelTargetId, setCancelTargetId] = useState<string | null>(null);
  const [isCanceledSuccess, setIsCanceledSuccess] = useState(false);

  // Initialize and load reservations from localStorage safely
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lessence_bookings');
      if (stored) {
        setReservations(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Local Storage reading error:", e);
    }
  }, []);

  // Sync mutations back to client storage
  const syncBookings = (updatedList: Reservation[]) => {
    setReservations(updatedList);
    try {
      localStorage.setItem('lessence_bookings', JSON.stringify(updatedList));
    } catch (e) {
      console.error("Local Storage writing error:", e);
    }
  };

  const handleCreateBooking = (newBooking: Reservation) => {
    const newList = [newBooking, ...reservations];
    syncBookings(newList);
    // Smooth delay before presenting registry dashboard
    setTimeout(() => {
      setCurrentView('registry');
    }, 1200);
  };

  const handleInitiateCancel = (id: string) => {
    setCancelTargetId(id);
  };

  const handleConfirmCancel = () => {
    if (!cancelTargetId) return;
    const newList = reservations.filter(res => res.id !== cancelTargetId);
    syncBookings(newList);
    setCancelTargetId(null);
    setIsCanceledSuccess(true);
    setTimeout(() => {
      setIsCanceledSuccess(false);
    }, 2500);
  };

  const handleUpdateSpecialRequests = (id: string, text: string) => {
    const newList = reservations.map(res => {
      if (res.id === id) {
        return { ...res, specialRequests: text };
      }
      return res;
    });
    syncBookings(newList);
  };

  // Cross-component seamless link trigger
  const handleAskSommelier = (foodName: string) => {
    setSelectedFoodQuery(foodName);
    setCurrentView('assistant');
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col justify-between selection:bg-brand-gold selection:text-brand-dark">
      {/* GLOBAL HEADER BAR */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        bookingCount={reservations.length}
      />

      {/* VIEW DECK BODY */}
      <main className="flex-grow pt-20">
        
        {/* VIEW 1: IMMERSIVE STORY HOME SCREEN */}
        {currentView === 'home' && (
          <div className="space-y-0 animate-fade-in">
            {/* HERO SEGMENT */}
            <section className="relative h-screen flex items-center justify-center -mt-20 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqsq5UI82mEDBCk7NvYcRw_p3D4R_SPCw9l7VQprNTscnQrYWWq7NFRrOPZDGIcxgRwPMV1wbVnYhQB1OtvgnZkZD5SuxUMW7gbjulHjqDuxrUKzDGDA8xVLv0qFoX5by6674AZrzfZ-JEb1vaMB9zZ8IzYorY7wKrWT21G_pGB7gyL7JklAi2_Xn6Pn54d9nJpJjIZvlJHcZzqSiSghQ1qMWpKOTk9xd9tW-gYFxjxM2tUwF6-ntNkpCq980uIUztMRZAQj3Kc3so"
                  alt="Seared Scallops Gastronomy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-50 scale-100 transition-transform duration-[12000ms] hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
              </div>

              <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-6">
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-cream tracking-tight leading-tight drop-shadow-xl animate-fade-in-up">
                  Culinary Artistry Redefined
                </h1>
                <p className="font-sans text-sm sm:text-base md:text-lg text-brand-cream-muted max-w-2xl mx-auto leading-relaxed drop-shadow">
                  An exploration of taste, texture, and time. Experience the pinnacle of modern gastronomy.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <button
                    onClick={() => setCurrentView('menu')}
                    className="bg-brand-gold hover:bg-brand-gold-muted text-brand-dark font-sans text-xs uppercase font-extrabold tracking-widest px-8 py-4 rounded transition-all active:scale-95 duration-300 shadow-[0_0_20px_rgba(242,202,80,0.15)] hover:shadow-[0_0_30px_rgba(242,202,80,0.3)] focus:outline-none"
                  >
                    View Menu
                  </button>
                  <button
                    onClick={() => setCurrentView('reserve')}
                    className="border border-brand-gold text-brand-gold hover:bg-brand-gold/10 font-sans text-xs uppercase font-extrabold tracking-widest px-8 py-4 rounded transition-all active:scale-95 duration-300 focus:outline-none"
                  >
                    Lock Seating Coordinates
                  </button>
                </div>
              </div>
            </section>

            {/* OUR STORY SEGMENT */}
            <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative group">
                  <div className="absolute -bottom-4 -right-4 w-48 h-48 border border-brand-gold/25 rounded z-[-1] transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 hidden md:block" />
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzjkuwHwmlfJFRUHaY2UMXq3xD64hEmzfHPnhlZvDtzWnDbRA9yl_nIPwYSdgQLUCtvLRXhLjF4TeH0-DwS9wIoczuRJwFi9NYCVW9-Nb0M108HakULAPfql2LFGJQEzDUN2aGdr-DpmW-n462hc6UY5OA-K_MzMqUpXmXuD1kZvAuKzeYXavtRKTpA5-ApOUtHrlck01UTVzR-EIvbLzGQD3Tgu2GgAmkSsjrCi1UwD8PAiP9YvJP3UblDOsK3Cgx1-Yul9jlPSsV"
                    alt="Elegant Restaurant Interior Atmosphere"
                    referrerPolicy="no-referrer"
                    className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] object-cover rounded shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-brand-gold-muted/10"
                  />
                </div>

                <div className="space-y-6">
                  <span className="text-xs text-brand-gold font-sans uppercase font-bold tracking-[0.2em] block">
                    Our Heritage
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-brand-cream leading-tight">
                    Our Story
                  </h2>
                  <div className="w-16 h-[1.5px] bg-brand-gold" />
                  <p className="text-sm text-brand-cream-muted leading-relaxed font-sans">
                    At L’Essence, we believe that dining is not merely sustenance, but a narrative woven through flavor and presentation. Founded on the principles of minimalist luxury, our kitchen focuses on the purest expression of each ingredient.
                  </p>
                  <p className="text-sm text-brand-cream-muted leading-relaxed font-sans">
                    Every dish is a carefully constructed dialogue between tradition and innovation, served in an atmosphere designed to strip away the noise of the outside world, leaving only the experience.
                  </p>
                  <button
                    onClick={() => setCurrentView('menu')}
                    className="text-brand-gold font-sans text-xs uppercase font-bold tracking-widest hover:text-brand-gold-muted transition-colors mt-6 flex items-center gap-2 group focus:outline-none"
                  >
                    DISCOVER MORE
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </section>

            {/* FEATURED CREATIONS BENTO GRID */}
            <section className="bg-brand-surface py-24 border-t border-b border-brand-gold-muted/15">
              <div className="max-w-7xl mx-auto px-6 md:px-16 w-full space-y-12">
                <div className="text-center max-w-xl mx-auto space-y-3">
                  <h2 className="font-serif text-3xl sm:text-4xl text-brand-gold tracking-wide">
                    Featured Creations
                  </h2>
                  <p className="text-xs text-brand-cream-muted uppercase tracking-widest font-semibold">
                    Signatures of L'Essence
                  </p>
                  <div className="w-12 h-[1px] bg-brand-gold/30 mx-auto" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[280px]">
                  {/* Large Risotto Bento Block (Takes 2 Columns, 2 Rows) */}
                  <div className="lg:col-span-2 lg:row-span-2 relative group overflow-hidden rounded border border-brand-gold-muted/15">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR4DWIpsa5Qu1VJU-SjtXBH0fQtY3eX3Bs-TgykvFZeE_pzs2ZnklfRxlcIjrwtg9W5YOBfG6M8PQaELMBgcoXFPRpozx6V8pS8X898HVjIsGkyZdvl8TtFqT8LBsCB2gguY-LN5iPk7McRdLDGet9DUcHwLqzH3BWeyEm1V7zrhv2Tsy6-rxuDCtnDvnExBBf1rlIGaruw0Fk_s6caxezrZIfxoSMCE8l6X1vUEelMEI__EJ7ypbGsutEE4zGGXAWbEThLSD_WREV"
                      alt="Truffle Risotto Masterpiece"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-brand-gold text-brand-dark text-[9px] uppercase tracking-widest font-extrabold px-3 py-1 rounded">
                        SIGNATURE MODEL
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                      <div className="flex justify-between items-end gap-6 flex-wrap md:flex-nowrap">
                        <div className="space-y-2">
                          <h3 className="font-serif text-2xl text-brand-cream font-medium">
                            Wild Mushroom &amp; Truffle Risotto
                          </h3>
                          <p className="text-xs text-brand-cream-muted leading-relaxed max-w-md font-sans">
                            Arborio rice, aged 36-month parmesan cheese, freshly shaved winter black truffles.
                          </p>
                        </div>
                        <span className="text-3xl font-serif text-brand-gold font-bold bg-brand-dark/90 px-4 py-2 rounded-sm shrink-0 border border-brand-gold-muted/20">
                          $45
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Small Wagyu Bento Block */}
                  <div className="relative group overflow-hidden rounded border border-brand-gold-muted/15 flex flex-col justify-end p-6">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtriw_MkWbv8ELO5Do_U4XTAlG1Scw2U_z7HQ0h5rKEMK4a_Tg2uNEKIzkkd50Xd_gkmAnFb53bw9xen_E17YJgKmNWKe2_85_yT-Kijc-Bqf2GDsFIa9tH3FoY7ZW5bi4jWaI59sTMftT3HfTj9nk7TGdt8KoGc8Vh1CC6AQ1g7ds-uWag4fPnTS0suLj0-WWC36LuT_c5xCh_Wes3K9c5nvwT8X8PO4B3CIAD-S1AEXB-i4Z-0nXNwhEUvnCENtwuB2_Zj9goDl7"
                      alt="Japanese A5 Wagyu Striploin"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent z-10" />
                    <div className="relative z-20 space-y-1.5">
                      <h3 className="font-serif text-lg text-brand-cream">A5 Japanese Wagyu Striploin</h3>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-brand-cream-muted">Black garlic puree essence.</span>
                        <span className="font-serif text-brand-gold font-semibold bg-brand-dark-deep/80 px-2 py-1 rounded border border-brand-gold-muted/10">$95</span>
                      </div>
                    </div>
                  </div>

                  {/* Small Cocoa Dessert Bento Block */}
                  <div className="relative group overflow-hidden rounded border border-brand-gold-muted/15 flex flex-col justify-end p-6">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLQAX3Z528CxCKutqZHd7o3lqSp4---LU0zUqSR-S-wp9wQiNrNC5A_1lVvZP17Ny6RcZS72ON36z23gs_zB1XngzZl-BTLwtXvK9hzWhQkKElPzMYfN1NacoJ0_kypdZMKcdiYr9W6wMKbJ5HakLt9AuMJWmG91nZJLES8c0Cbpz2UsNGRGYEmz9aEsNguQe5fQWsxcnRz-S78ZE92ZM_CEQjM2rfR8Lq0Tmns4BKOgfG5k0ewWE7tZ26dgcy145oaTrRkUR79MNN"
                      alt="Artisanal Dessert"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 z-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent z-10" />
                    <div className="relative z-20 space-y-1.5">
                      <h3 className="font-serif text-lg text-brand-cream">Dark Cocoa Sphere</h3>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-brand-cream-muted">Valrhona 70%, fresh raspberry.</span>
                        <span className="font-serif text-brand-gold font-semibold bg-brand-dark-deep/80 px-2 py-1 rounded border border-brand-gold-muted/10">$24</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-8">
                  <button
                    onClick={() => setCurrentView('menu')}
                    className="border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark font-sans text-xs uppercase font-extrabold tracking-widest px-8 py-4 rounded transition-all active:scale-95 duration-300 focus:outline-none"
                  >
                    EXPLORE FULL MENU
                  </button>
                </div>
              </div>
            </section>

            {/* CHEF'S SPECIAL (SEASONAL ASPARAGUS) */}
            <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto w-full">
              <div className="bg-brand-surface border border-brand-gold-muted/15 rounded p-8 md:p-16 relative overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-gold/2 rounded-full blur-3xl pointer-events-none" />
                
                <div className="space-y-6">
                  <span className="text-xs text-brand-gold font-sans uppercase font-bold tracking-widest block">
                    Seasonal Focus
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-brand-cream leading-tight">
                    Spring Awakening
                  </h2>
                  <p className="text-sm text-brand-cream-muted leading-relaxed font-sans">
                    Our current tasting menu highlights the ephemeral beauty of spring ingredients. Foraged ramps, delicate peas, and tender lamb are treated with reverence, resulting in a sequence of dishes that are light, vibrant, and unmistakably tied to the season.
                  </p>
                  
                  <div className="space-y-3 pt-4 border-t border-brand-gold-muted/10">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse shrink-0" />
                      <span className="text-xs text-brand-cream uppercase tracking-wide font-semibold font-sans">
                        Locally Foraged Botanicals
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse shrink-0" />
                      <span className="text-xs text-brand-cream uppercase tracking-wide font-semibold font-sans">
                        7-Course Structured Progression
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFcg1dmdglWKfkdi20y-Ibp1o0kKTJK6BSDInhq20UBDIAANDzvDpzdSQUBXG9VKfhJDhi2HMUNs09azhz7G9W7VeEEKQ007ewPlpsvVKMKPeBvdXjvCFP2Sc26RdbF6m9bXGptef1xnDaaZObRZWPdMTS3kxlEiyXElGa88byAN9mJLwOsj2XD7h9_juURphGUEseM5RBlXggHnDJacKYmo3DIL3eIfd7ObdN6Tgj7pHfpcU8ALajPHkLjAYWp5bzFxwoQhvpEwAU"
                    alt="Fine-dining Spring Ingredients Asparagus Layout"
                    referrerPolicy="no-referrer"
                    className="w-full aspect-square object-cover rounded shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-brand-gold-muted/15"
                  />
                </div>
              </div>
            </section>

            {/* TESTIMONIALS & REVIEWS SLOT */}
            <section className="py-24 bg-brand-surface border-t border-b border-brand-gold-muted/15">
              <div className="max-w-4xl mx-auto text-center px-6 space-y-6">
                <div className="flex justify-center gap-1 text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-brand-gold" />
                  ))}
                </div>
                <p className="font-serif text-xl sm:text-2xl md:text-3xl text-brand-cream font-medium italic leading-relaxed">
                  &ldquo;An unforgettable journey of flavors. L'Essence strips away the superfluous, leaving only absolute perfection on the plate. A triumph of minimalist gastronomy.&rdquo;
                </p>
                <div className="space-y-1 pt-4">
                  <span className="text-xs text-brand-gold font-sans font-extrabold uppercase tracking-widest block">
                    Jonathan Gold
                  </span>
                  <span className="text-[10px] text-brand-cream-muted uppercase font-sans tracking-wider">
                    Culinary Critic
                  </span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: SENSORY INTERACTIVE MENU EXPLORER */}
        {currentView === 'menu' && (
          <section className="py-12 px-6 md:px-16 max-w-7xl mx-auto w-full animate-fade-in space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs text-brand-gold font-sans uppercase font-bold tracking-widest">
                The Master Catalog
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-brand-cream font-medium">
                Our Gastronomic Palette
              </h2>
              <p className="text-xs text-brand-cream-muted max-w-md mx-auto leading-relaxed">
                Click any creation underneath to analyze organic ingredient sifting, allergen specifications, and sommelier vintages.
              </p>
            </div>
            <InteractiveMenu onAskSommelier={handleAskSommelier} />
          </section>
        )}

        {/* VIEW 3: RESERVATION WIZARD CARD */}
        {currentView === 'reserve' && (
          <section className="py-12 px-6 md:px-16 max-w-7xl mx-auto w-full animate-fade-in">
            <ReservationWizard onSuccess={handleCreateBooking} />
          </section>
        )}

        {/* VIEW 4: MY BOOKINGS RESERVATIONS DASHBOARD */}
        {currentView === 'registry' && (
          <section className="py-12 px-6 md:px-16 max-w-7xl mx-auto w-full animate-fade-in">
            <ReservationDashboard
              reservations={reservations}
              onCancel={handleInitiateCancel}
              onUpdateSpecialRequests={handleUpdateSpecialRequests}
            />
          </section>
        )}

        {/* VIEW 5: CHAT WITH HEAD SOMMELIER ANTOINE */}
        {currentView === 'assistant' && (
          <section className="py-12 px-6 md:px-16 max-w-7xl mx-auto w-full animate-fade-in space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs text-brand-gold font-sans uppercase font-bold tracking-widest">
                Direct Acoustic Access
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-brand-cream font-medium">
                Converse with Antoine
              </h2>
              <p className="text-xs text-brand-cream-muted max-w-md mx-auto leading-relaxed">
                Unlock cellars secrets or compose tasting courses guided by our Master AI Chef.
              </p>
            </div>
            <AntoineChatbot
              selectedFoodQuery={selectedFoodQuery}
              onClearFoodQuery={() => setSelectedFoodQuery('')}
            />
          </section>
        )}

      </main>

      {/* REVOLUTIONARY BOTTOM CHAT ACCELERATOR (FAB Helper button) */}
      {currentView !== 'assistant' && (
        <button
          onClick={() => setCurrentView('assistant')}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center rounded-full h-14 w-14 bg-brand-gold text-brand-dark shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-brand-gold hover:bg-brand-gold-muted hover:scale-110 active:scale-95 duration-300 transition-all focus:outline-none"
          title="Direct Sommelier helper"
          aria-label="Direct message Chef"
        >
          <MessageSquare className="w-6 h-6 shrink-0" />
        </button>
      )}

      {/* CUSTOM ELEGANT CONFIRMATION OVERLAY (Prevents native blocking popups error) */}
      {cancelTargetId && (
        <div className="fixed inset-0 bg-brand-dark-deep/90 backdrop-blur-sm flex items-center justify-center z-[100] p-6 animate-fade-in">
          <div className="bg-brand-surface border border-brand-gold-muted/40 max-w-md w-full rounded p-6 space-y-6 text-center shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
            <div className="w-12 h-12 rounded-full bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-xl font-medium text-brand-cream">
                Release Seating Assignment?
              </h4>
              <p className="text-xs text-brand-cream-muted leading-relaxed font-sans">
                Are you absolutely sure you want to release reservation <span className="text-brand-gold font-mono font-bold">{cancelTargetId}</span>? This seating inventory will revert back to the main pool instantly.
              </p>
            </div>

            <div className="flex gap-4 pt-1">
              <button
                type="button"
                onClick={() => setCancelTargetId(null)}
                className="flex-1 bg-brand-dark hover:bg-brand-surface-high border border-brand-gold-muted/30 text-brand-cream/80 uppercase font-sans text-xs tracking-wider py-3.5 rounded transition-all focus:outline-none"
              >
                Retain Seating
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="flex-1 bg-red-650 hover:bg-red-700 bg-red-650 hover:bg-red-700 text-white uppercase font-sans text-xs tracking-wider py-3.5 rounded transition-all focus:outline-none font-bold"
              >
                Release Seats
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CANCEL SUCCESS TOAST NOTIFICATE */}
      {isCanceledSuccess && (
        <div className="fixed bottom-10 left-10 z-[100] bg-brand-surface border border-brand-gold/40 px-5 py-4 rounded shadow-2xl flex items-center gap-3 animate-slide-in-left">
          <div className="w-6 h-6 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-brand-gold uppercase tracking-wider">Release Successful</p>
            <p className="text-[10px] text-brand-cream-muted">Concierge cell notified &bull; Table released</p>
          </div>
        </div>
      )}

      {/* BRANDED ANCIENT LUXURY FOOTER */}
      <footer className="border-t border-brand-gold-muted/10 bg-brand-dark-deep py-20 px-6 md:px-16 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 w-full text-brand-cream">
          {/* Col 1 */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-brand-gold uppercase tracking-widest">L'Essence</h3>
            <p className="text-xs text-brand-cream-muted/80 leading-relaxed font-sans">
              Elevating dining to an art form through minimalist elegance and uncompromising quality.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-4">
            <h4 className="text-[11px] text-brand-gold uppercase tracking-[0.15em] font-bold">Connect</h4>
            <ul className="space-y-2.5 text-xs text-brand-cream-muted/80 font-sans font-semibold">
              <li><button onClick={() => setCurrentView('assistant')} className="hover:text-brand-gold hover:underline focus:outline-none block transition-colors">Digital Newsletter</button></li>
              <li><a href="#" className="hover:text-brand-gold hover:underline block transition-colors">Instagram @lessence</a></li>
              <li><a href="#" className="hover:text-brand-gold hover:underline block transition-colors">Facebook Portal</a></li>
              <li><a href="#" className="hover:text-brand-gold hover:underline block transition-colors">TripAdvisor</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-4">
            <h4 className="text-[11px] text-brand-gold uppercase tracking-[0.15em] font-bold">Information</h4>
            <ul className="space-y-2.5 text-xs text-brand-cream-muted/80 font-sans font-semibold">
              <li><span className="block text-brand-cream">Closed Mondays</span></li>
              <li><span className="block">Tues - Sun: 17:30 - Late</span></li>
              <li><button onClick={() => setCurrentView('reserve')} className="hover:text-brand-gold hover:underline focus:outline-none block transition-colors">Private Dining Reservations</button></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-4">
            <h4 className="text-[11px] text-brand-gold uppercase tracking-[0.15em] font-bold">Location</h4>
            <p className="text-xs text-brand-cream-muted/80 leading-relaxed font-sans">
              Plaza de la Gastronomía, Suite 900A<br />
              Vanguardia Urban District
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-brand-gold-muted/5 text-center text-[10px] text-brand-cream-muted/50 uppercase tracking-widest font-semibold">
          <p>© 2026 L'Essence Culinary Arts. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
