/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, Calendar, Sparkles, Database } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  bookingCount: number;
}

export default function Header({ currentView, onViewChange, bookingCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Sensory Menu' },
    { id: 'reserve', label: 'Book Table' },
    { id: 'registry', label: 'My Bookings' },
    { id: 'assistant', label: 'Sommelier AI' },
  ];

  const handleNavClick = (viewId: string) => {
    onViewChange(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 border-b border-brand-gold-muted/20 bg-brand-dark/95 backdrop-blur-md">
      <div className="flex justify-between items-center px-6 md:px-16 py-4 max-w-7xl mx-auto w-full">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-2xl font-serif text-brand-gold uppercase tracking-[0.25em] hover:opacity-90 transition-opacity text-left focus:outline-none"
        >
          L'Essence
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-12 items-center">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 text-[13px] font-sans font-semibold uppercase tracking-widest transition-colors duration-300 focus:outline-none hover:text-brand-gold ${
                  isActive ? 'text-brand-gold font-bold' : 'text-brand-cream/70'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-gold" />
                )}
                {item.id === 'registry' && bookingCount > 0 && (
                  <span className="absolute -top-2 -right-4 px-1.5 py-0.5 bg-brand-gold text-brand-dark font-sans text-[9px] font-extrabold rounded-full animate-pulse">
                    {bookingCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* CTA Reserve Button */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => handleNavClick('reserve')}
            className="bg-brand-gold hover:bg-brand-gold-muted text-brand-dark font-sans text-xs uppercase font-extrabold tracking-widest px-6 py-3 rounded transition-all duration-300 active:scale-95 focus:outline-none flex items-center gap-2 shadow-[0_0_20px_rgba(242,202,80,0.1)] hover:shadow-[0_0_25px_rgba(242,202,80,0.25)]"
          >
            <Calendar className="w-3.5 h-3.5" />
            Reserve a Table
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-brand-gold p-1 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-brand-dark/98 border-b border-brand-gold-muted/20 animate-fade-in py-6">
          <nav className="flex flex-col space-y-5 px-6">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex justify-between items-center py-2 text-left text-sm uppercase tracking-wider font-semibold focus:outline-none ${
                    isActive ? 'text-brand-gold border-l-2 border-brand-gold pl-3' : 'text-brand-cream/80 pl-3'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 'registry' && bookingCount > 0 && (
                    <span className="px-2 py-0.5 bg-brand-gold text-brand-dark text-xs font-bold rounded-full">
                      {bookingCount}
                    </span>
                  )}
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick('reserve')}
              className="mt-4 w-full bg-brand-gold text-brand-dark uppercase tracking-widest font-bold text-xs py-3.5 rounded flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Reserve a Table
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
