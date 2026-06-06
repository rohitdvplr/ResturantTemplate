/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Search, Sparkles, Wine, ChevronRight, HelpCircle } from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';

interface InteractiveMenuProps {
  onAskSommelier: (foodName: string) => void;
}

export default function InteractiveMenu({ onAskSommelier }: InteractiveMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(MENU_ITEMS[0]);

  const categories = [
    { id: 'all', label: 'All Senses' },
    { id: 'signature', label: 'Signatures' },
    { id: 'appetizer', label: 'Appetizers' },
    { id: 'main', label: 'Mains' },
    { id: 'dessert', label: 'Desserts' },
  ];

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Search & Category Filter Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 focus:outline-none ${
                selectedCategory === cat.id
                  ? 'bg-brand-gold text-brand-dark'
                  : 'bg-brand-surface border border-brand-gold-muted/15 text-brand-cream/80 hover:border-brand-gold/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Input Scent Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ingredients, truffle, wagyu..."
            className="w-full bg-brand-surface focus:outline-none focus:border-brand-gold border border-brand-gold-muted/20 rounded pl-10 pr-4 py-3 text-sm text-brand-cream placeholder:text-brand-cream-muted/60"
          />
          <Search className="absolute left-3.5 top-3.5 text-brand-gold-muted w-4 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Master Culinary Grid */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => {
              const matchesSelection = selectedItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative bg-brand-surface rounded overflow-hidden cursor-pointer border transition-all duration-500 hover:scale-[1.01] ${
                    matchesSelection 
                      ? 'border-brand-gold shadow-[0_0_20px_rgba(242,202,80,0.15)]' 
                      : 'border-brand-gold-muted/10 hover:border-brand-gold-muted/40'
                  }`}
                >
                  {/* High Resolution Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
                    
                    {/* Corner Tag */}
                    {item.isSignature && (
                      <span className="absolute top-4 left-4 bg-brand-dark-deep/80 border border-brand-gold/40 text-brand-gold font-sans text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
                        Signature Design
                      </span>
                    )}

                    <span className="absolute bottom-4 right-4 text-xl font-serif text-brand-gold font-bold bg-brand-dark/85 px-3 py-1.5 rounded-sm">
                      ${item.price}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2 bg-brand-surface/90">
                    <h3 className="text-lg font-serif font-medium text-brand-cream group-hover:text-brand-gold transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-brand-cream-muted leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    <div className="pt-2 flex justify-between items-center text-[10px] text-brand-cream-muted uppercase tracking-widest border-t border-brand-gold-muted/5 font-semibold">
                      <span>Ingredients: {item.ingredients.length} items</span>
                      <span className="text-brand-gold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Examine details <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20 bg-brand-surface rounded border border-brand-gold-muted/10">
              <HelpCircle className="w-12 h-12 text-brand-gold-muted mx-auto mb-4 animate-bounce" />
              <h3 className="font-serif text-lg text-brand-cream">No dishes match your scent criteria</h3>
              <p className="text-xs text-brand-cream-muted max-w-sm mx-auto mt-2 leading-relaxed">
                Try searching for universal elements like &ldquo;truffle&rdquo;, &ldquo;Wagyu&rdquo;, &ldquo;asparagus&rdquo;, or &ldquo;cod&rdquo;.
              </p>
            </div>
          )}
        </div>

        {/* Selected MenuItem Showcase Panel */}
        <div className="lg:col-span-1">
          {selectedItem ? (
            <div className="sticky top-28 bg-brand-surface-high border border-brand-gold-muted/20 rounded p-6 space-y-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
              {/* Showcase Image */}
              <div className="relative aspect-[4/3] rounded overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-deep/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-brand-gold text-brand-dark text-[9px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded">
                    {selectedItem.category}
                  </span>
                </div>
              </div>

              {/* Title, Cost & Description */}
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-xl font-serif text-brand-gold tracking-wide leading-tight">
                    {selectedItem.name}
                  </h3>
                  <span className="text-2xl font-serif text-brand-cream font-extrabold shrink-0">
                    ${selectedItem.price}
                  </span>
                </div>
                <p className="text-xs text-brand-cream-muted leading-relaxed font-sans">
                  {selectedItem.description}
                </p>
              </div>

              {/* Ingredients List */}
              <div className="space-y-2 border-t border-brand-gold-muted/10 pt-4">
                <h4 className="text-[10px] text-brand-gold font-sans uppercase font-bold tracking-widest">
                  Structural Sourcing
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedItem.ingredients.map((ing, k) => (
                    <span
                      key={k}
                      className="text-[10px] bg-brand-dark border border-brand-gold-muted/10 text-brand-cream-muted px-2.5 py-1 rounded-sm"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dynamic Wine Pairing Section */}
              {selectedItem.winePairing && (
                <div className="bg-brand-dark-deep border border-brand-gold-muted/15 rounded p-4 space-y-2 shadow-inner">
                  <div className="flex items-center gap-2 text-brand-gold text-xs font-semibold tracking-wider uppercase">
                    <Wine className="w-4 h-4 text-brand-gold" />
                    <span>Head Sommelier Recommendation</span>
                  </div>
                  <p className="text-xs text-brand-cream font-medium italic">
                    &ldquo;{selectedItem.winePairing}&rdquo;
                  </p>
                  <p className="text-[10px] text-brand-cream-muted leading-relaxed">
                    Designed to emulsify the heavy lipids and augment the earthen truffle or black garlic minerals in this signature sequence.
                  </p>
                </div>
              )}

              {/* Action - Sommelier Chat Trigger */}
              <button
                type="button"
                onClick={() => onAskSommelier(selectedItem.name)}
                className="w-full bg-brand-dark hover:bg-brand-gold-muted/10 border border-brand-gold text-brand-gold uppercase tracking-widest font-bold text-[10px] py-3.5 rounded flex items-center justify-center gap-2 transition-all active:scale-95 duration-300 shadow-md focus:outline-none"
              >
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                Ask Head Sommelier About Pairings
              </button>
            </div>
          ) : (
            <div className="h-64 border border-dashed border-brand-gold-muted/25 rounded flex flex-col justify-center items-center text-center p-6">
              <Sparkles className="w-8 h-8 text-brand-gold-muted mb-2 animate-pulse" />
              <p className="text-xs text-brand-cream-muted">
                Select any culinary creation on the left to examine notes and wine pairings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
