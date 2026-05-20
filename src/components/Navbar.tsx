/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShoppingBag, Menu, X, Globe, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab, Currency } from '../types';

interface NavbarProps {
  currentTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  totalCartItems: number;
  onOpenCart: () => void;
}

export default function Navbar({
  currentTab,
  onTabChange,
  currency,
  onCurrencyChange,
  totalCartItems,
  onOpenCart,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Início' },
    { id: 'menu', label: 'Menu' },
    { id: 'reservations', label: 'Reservas' },
    { id: 'sommelier', label: 'The Sommelier' },
  ];

  const toggleCurrency = (cur: Currency) => {
    onCurrencyChange(cur);
    setShowCurrencyDropdown(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-brand-charcoal/80 backdrop-blur-md border-b border-white/5 transition-luxury">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo & Brand Name */}
          <div 
            onClick={() => onTabChange('home')}
            className="cursor-pointer select-none flex flex-col items-start"
          >
            <span className="font-serif text-xl md:text-2xl font-bold tracking-widest text-brand-brass uppercase antialiased hover:opacity-90 transition-opacity">
              L'Élite Culinaire
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#8e9192] -mt-1 block font-sans">
              Haute Gastronomie
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative px-1 py-2 text-sm uppercase tracking-widest font-sans transition-colors duration-300 ${
                  currentTab === item.id 
                    ? 'text-brand-brass font-medium' 
                    : 'text-[#c4c7c7] hover:text-white'
                }`}
              >
                {item.label}
                {currentTab === item.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-brass"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Actions: Currency & Cart Button */}
          <div className="flex items-center space-x-4">
            
            {/* Currency Custom Selector */}
            <div className="relative">
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-md border border-white/10 text-xs tracking-wider uppercase font-mono hover:bg-white/5 text-[#c4c7c7] transition-all"
                title="Alterar Moeda"
              >
                <Globe className="w-3.5 h-3.5 text-brand-brass/80" />
                <span>{currency}</span>
              </button>
              
              <AnimatePresence>
                {showCurrencyDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowCurrencyDropdown(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-32 glass-panel rounded-md shadow-2xl border border-brand-brass/20 p-1 z-50 font-mono text-xs"
                    >
                      {(['USD', 'EUR', 'BRL'] as Currency[]).map((cur) => (
                        <button
                          key={cur}
                          onClick={() => toggleCurrency(cur)}
                          className={`w-full text-left px-3 py-2 rounded-sm hover:bg-brand-brass hover:text-brand-deep transition-colors ${
                            currency === cur ? 'text-brand-brass border-l-2 border-brand-brass pl-2' : 'text-[#c4c7c7]'
                          }`}
                        >
                          {cur === 'USD' && '$ USD'}
                          {cur === 'EUR' && '€ EUR'}
                          {cur === 'BRL' && 'R$ BRL'}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full hover:bg-white/5 text-[#c4c7c7] hover:text-brand-brass transition-all duration-300"
              aria-label="Ver Carrinho"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {totalCartItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 bg-brand-brass text-brand-deep font-sans text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-brand-charcoal"
                  >
                    {totalCartItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-[#c4c7c7] hover:text-brand-brass transition-colors"
              aria-label="Abrir Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Slide Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Slide Navigation Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-brand-deep border-l border-white/10 p-6 z-50 flex flex-col justify-between md:hidden shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between mb-10">
                  <div className="flex flex-col">
                    <span className="font-serif text-lg font-bold text-brand-brass uppercase tracking-wider">
                      L'Élite
                    </span>
                    <span className="text-[8px] uppercase tracking-widest text-[#8e9192]">Culinaire</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-white/60 hover:text-brand-brass transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col space-y-6">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left font-serif text-xl tracking-wide py-1 text-white hover:text-brand-brass border-b border-white/5 pb-2 transition-all"
                    >
                      {item.label}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      onTabChange('menu');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left font-serif text-xl tracking-wide py-1 text-brand-brass italic transition-all"
                  >
                    Menu de Assinaturas
                  </button>
                </nav>
              </div>

              {/* Mobile Info Footer */}
              <div className="border-t border-white/5 pt-6 text-[#8e9192] text-xs space-y-2">
                <p className="font-serif italic text-brand-brass text-[13px]">L'Élite Culinaire</p>
                <p>124 Elite Avenue, Culinary District</p>
                <p>São Paulo, SP — Reservas Obrigatórias</p>
                <p className="text-[10px] tracking-wider uppercase font-mono mt-4">© 2026 L'Élite</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
