/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Wine, Sparkles, Plus, Award, ShieldAlert, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Currency, Dish } from '../types';
import { CURRENCY_CONFIGS, DISHES } from '../data';

interface SommelierTabProps {
  currency: Currency;
  onAddWineDirect: (dish: Dish) => void;
  onNavigateToTab: (tab: 'menu' | 'reservations') => void;
}

export default function SommelierTab({
  currency,
  onAddWineDirect,
  onNavigateToTab,
}: SommelierTabProps) {
  const currentCurrency = CURRENCY_CONFIGS[currency];
  
  // Custom curated cellars list:
  const wineCellar = [
    {
      id: 'chateau-margaux',
      name: 'Château Margaux 2015',
      region: 'Bordeaux, France',
      vintage: '2015 Vintage (Legendary 99pt)',
      description: 'Premier Grand Cru Classé. A monumentally balanced, deep ruby red showing complex aromatic tiers of candied violet, wild cassis, red currants, and toasted cedar wood.',
      priceMultiplier: 1, // Full price
      notes: 'Best paired with grilled A5 Wagyu Ribeye and highly marbled tenderloins.',
      isPremium: true,
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1000',
    },
    {
      id: 'barolo-bricco',
      name: '2015 Barolo "Bricco delle Viole"',
      region: 'Piedmont, Italy',
      vintage: '2015 Vintage (95pt)',
      description: 'G.D. Vajra classic Barolo. Piercing aromatics of crushed roses, macerated cherries, and damp soil. Highly structured tannins paired with exquisite carrying acidity.',
      priceMultiplier: 0.15, // Affordable premium
      notes: 'An absolute masterpiece when paired with rich bone-marrow Wagyu Tartare.',
      isPremium: false,
      image: 'https://images.unsplash.com/photo-1553072768-64638a1cb7d2?auto=format&fit=crop&q=80&w=1000',
    },
    {
      id: 'dom-perignon',
      name: 'Dom Pérignon Vintage 2012',
      region: 'Champagne, France',
      vintage: '2012 Vintage (97pt)',
      description: 'The epitome of luxurious effervescence. Notes of fresh ginger, toasted brioche, powdered white flowers, and a crystalline saline citrus finish.',
      priceMultiplier: 0.25,
      notes: 'Complements raw oysters, Hokkaido scallops, and yuzu ceviches.',
      isPremium: true,
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=1000',
    },
  ];

  const [selectedWineIdx, setSelectedWineIdx] = useState(0);
  const [successNotif, setSuccessNotif] = useState(false);

  const activeWine = wineCellar[selectedWineIdx];

  const handleAddBack = () => {
    // Look up wine from central DISHES list or create simulated wine dish
    const centralWine = DISHES.find(d => d.id === activeWine.id) || {
      id: activeWine.id,
      name: activeWine.name,
      description: activeWine.description,
      price: {
        USD: activeWine.id === 'chateau-margaux' ? 1300 : activeWine.id === 'dom-perignon' ? 380 : 180,
        EUR: activeWine.id === 'chateau-margaux' ? 1200 : activeWine.id === 'dom-perignon' ? 350 : 165,
        BRL: activeWine.id === 'chateau-margaux' ? 6600 : activeWine.id === 'dom-perignon' ? 1930 : 920,
      },
      category: 'drinks' as const,
      image: activeWine.image,
    };

    onAddWineDirect(centralWine);
    setSuccessNotif(true);
    setTimeout(() => setSuccessNotif(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      
      {/* Title block */}
      <div className="text-center mb-12">
        <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-brand-brass font-bold inline-block mb-2">
          CURADORIA DO EXPERT
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-white tracking-wide">
          A Adega do Sommelier
        </h2>
        <p className="text-xs md:text-sm text-[#8e9192] max-w-xl mx-auto mt-2 leading-relaxed">
          Nenhuma experiência culinária está completa sem o néctar correspondente. Nossos vinhos são conservados sob temperatura e umidade controladas na adega de pedra subterrânea do L'Élite.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Left column: Wine picker list */}
        <div className="md:col-span-5 flex flex-col space-y-4 justify-center">
          <span className="text-[10px] uppercase tracking-widest text-[#8e9192] font-mono px-1 block mb-1">
            Recomendações Exclusivas
          </span>
          {wineCellar.map((wine, idx) => (
            <div
              key={wine.id}
              onClick={() => setSelectedWineIdx(idx)}
              className={`p-4 rounded-lg border cursor-pointer transition-luxury relative overflow-hidden ${
                selectedWineIdx === idx
                  ? 'bg-brand-burgundy/15 border-brand-brass shadow-lg'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/10'
              }`}
            >
              {selectedWineIdx === idx && (
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-brand-brass" />
              )}
              
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded ${selectedWineIdx === idx ? 'bg-brand-wine/40 text-brand-brass' : 'bg-white/5 text-[#8e9192]'}`}>
                  <Wine className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm text-white group-hover:text-brand-brass transition-colors">
                    {wine.name}
                  </h4>
                  <p className="text-[11px] text-[#8e9192] mt-0.5">{wine.region}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Quick guide card */}
          <div className="p-4 rounded-lg bg-white/[0.01] border border-white/5 text-xs text-[#8e9192] leading-relaxed mt-4 space-y-2">
            <div className="flex items-center gap-1 text-brand-brass font-mono text-[10px] uppercase">
              <Award className="w-3.5 h-3.5" />
              <span>Garantia de Qualidade</span>
            </div>
            <p>Todas as garrafas acompanham certificado de procedência das vinícolas fundadoras e são decantadas individualmente pelo nosso sommelier oficial da casa.</p>
          </div>
        </div>

        {/* Right column: Active wine review */}
        <div className="md:col-span-7 bg-gradient-to-br from-[#1b0909] to-brand-charcoal border border-brand-burgundy/40 rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between relative">
          
          {/* Decorative faint pattern */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-deep/90 pointer-events-none" />

          {/* Top banner image representation */}
          <div className="relative h-44 bg-brand-deep">
            <img
              src={activeWine.image}
              alt={activeWine.name}
              className="w-full h-full object-cover opacity-60 filter brightness-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-transparent to-black/20" />
            
            <div className="absolute bottom-4 left-6">
              <span className="text-[10px] font-mono tracking-widest text-[#e2e2e2] bg-brand-wine/80 px-2 py-0.5 rounded border border-brand-wine">
                {activeWine.vintage}
              </span>
              <h3 className="font-serif text-xl md:text-2xl text-white font-bold mt-1.5 shadow-sm">
                {activeWine.name}
              </h3>
            </div>
          </div>

          <div className="p-6 md:p-8 flex-1 flex flex-col justify-between relative z-10">
            
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-mono text-brand-brass block mb-1">
                  Origem do Terroir
                </span>
                <p className="text-white text-sm font-semibold">{activeWine.region}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest font-mono text-[#8e9192] block mb-1">
                  Perfil de Sabor (Especialista)
                </span>
                <p className="text-[#c4c7c7] text-xs leading-relaxed font-light">
                  "{activeWine.description}"
                </p>
              </div>

              <div className="p-4 rounded bg-brand-wine/10 border border-brand-wine/25 text-xs text-[#c4c7c7] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-brand-brass mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-brand-brass block font-serif">A Harmonização Perfeita:</strong>
                  <p className="mt-0.5">{activeWine.notes}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions trigger */}
            <div className="border-t border-white/5 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-[9px] uppercase tracking-widest text-[#8e9192] block font-mono">
                  Garrafa Consolidada
                </span>
                <span className="font-serif text-2xl text-brand-brass font-bold">
                  {currentCurrency.symbol} {(activeWine.id === 'chateau-margaux' ? 1300 : activeWine.id === 'dom-perignon' ? 380 : 180 * (currency === 'BRL' ? 5.1 : 1)).toLocaleString(undefined, { minimumFractionDigits: 0 })}
                </span>
              </div>

              <div className="flex gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onNavigateToTab('menu')}
                  className="flex-1 sm:flex-none text-xs tracking-widest uppercase py-3.5 px-6 rounded-lg text-white/80 border border-white/10 hover:border-white/20 transition-all font-sans font-semibold text-center"
                >
                  Ver Pratos
                </button>
                
                <button
                  type="button"
                  onClick={handleAddBack}
                  className="flex-1 sm:flex-none filter brightness-100 hover:brightness-105 bg-gradient-to-r from-[#d4af37] to-[#aa851d] text-brand-deep py-3.5 px-6 rounded-lg font-sans text-xs tracking-widest font-bold uppercase transition-luxury hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  Adicionar Garrafa
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Success notification popup overlay */}
      <AnimatePresence>
        {successNotif && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-lg bg-black/95 text-white shadow-2xl border border-brand-brass/35 max-w-sm flex items-center gap-3.5"
          >
            <div className="w-10 h-10 bg-brand-brass/15 border border-brand-brass/30 text-brand-brass rounded-full flex items-center justify-center flex-shrink-0 animate-gold-shimmer">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-bold text-white">Adega Atualizada!</h5>
              <p className="text-xs text-[#8e9192] mt-0.5">O vinho selecionado foi adicionado com sucesso ao seu pedido.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
