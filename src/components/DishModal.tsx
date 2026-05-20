/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { X, Clock, HelpCircle, User, Sparkles, Plus, Minus, Star, Wine } from 'lucide-react';
import { motion } from 'motion/react';
import { Dish, Currency } from '../types';
import { CURRENCY_CONFIGS } from '../data';

interface DishModalProps {
  dish: Dish | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (dish: Dish, withPairing: boolean, qty: number) => void;
}

export default function DishModal({
  dish,
  currency,
  onClose,
  onAddToCart,
}: DishModalProps) {
  if (!dish) return null;

  const [quantity, setQuantity] = useState(1);
  const [includePairing, setIncludePairing] = useState(false);

  const currentCurrency = CURRENCY_CONFIGS[currency];
  
  const baseCost = dish.price[currency];
  const pairingCost = dish.sommelierPairing ? dish.sommelierPairing.extraPrice * (currency === 'BRL' ? 4.5 : 1) : 0;
  const singleItemCost = baseCost + (includePairing ? pairingCost : 0);
  const totalCost = singleItemCost * quantity;

  const formattedBaseCost = baseCost.toLocaleString(undefined, { minimumFractionDigits: 0 });
  const formattedPairingCost = pairingCost.toLocaleString(undefined, { minimumFractionDigits: 0 });
  const formattedTotal = totalCost.toLocaleString(undefined, { minimumFractionDigits: 0 });

  const handleMinus = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  const handleAdd = () => {
    onAddToCart(dish, includePairing, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Heavy translucent black backdrop blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-xl"
      />

      {/* Glassmorphic centering detail module */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="relative w-full max-w-4xl bg-[#111111] rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[90vh] flex flex-col md:flex-row z-10"
      >
        
        {/* Close Button Pin */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-brand-brass text-white hover:text-brand-deep rounded-full transition-all border border-white/10"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Photography Display */}
        <div className="w-full md:w-1/2 relative bg-brand-deep min-h-[300px] md:min-h-full">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Ambient shading on photo */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-deep/80 via-transparent to-transparent" />
          
          {/* High luxury signature tag */}
          {dish.tags?.includes('SIGNATURE') && (
            <div className="absolute bottom-6 left-6 bg-brand-brass/90 text-brand-deep text-[10px] font-bold tracking-widest px-3.5 py-1.5 rounded-sm uppercase flex items-center gap-1.5 shadow-xl">
              <Star className="w-3.5 h-3.5 fill-brand-deep" />
              Prato Assinatura do Chef
            </div>
          )}
        </div>

        {/* Right Side: Narrative and custom fields */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
          <div>
            {/* Header description */}
            <div className="border-b border-white/5 pb-4 mb-5">
              <span className="text-[10px] tracking-[0.2em] font-mono text-brand-brass uppercase block mb-1">
                L'Élite Culinaire — {dish.category}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-white font-medium">
                {dish.name}
              </h2>
              <div className="mt-2 text-xl font-serif text-brand-brass">
                {currentCurrency.symbol} {formattedBaseCost}
              </div>
            </div>

            {/* Introduction and context */}
            <p className="text-[#c4c7c7] text-sm leading-relaxed font-light mb-6">
              {dish.description}
            </p>

            {/* Preparation time & Chefs note tags */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1.5 text-xs text-[#8e9192] bg-white/5 px-2.5 py-1.5 rounded-md font-mono border border-white/5">
                <Clock className="w-3.5 h-3.5 text-brand-brass/80" />
                <span>Preparo: {dish.details?.prepTime || '15 min'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#8e9192] bg-white/5 px-2.5 py-1.5 rounded-md font-mono border border-white/5">
                <User className="w-3.5 h-3.5 text-brand-brass/80" />
                <span>Servido Individual</span>
              </div>
            </div>

            {/* Ingredients block and details */}
            {dish.details && (
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-widest text-[#8e9192] font-semibold mb-3">
                  Ingredientes Selecionados
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#c4c7c7]">
                  {dish.details.ingredients.map((ing, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-brass rounded-full" />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sommelier Pairing Experience Box */}
            {dish.sommelierPairing && (
              <div className="mb-6 p-4 rounded-lg bg-brand-wine/10 border border-brand-wine/30">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-brand-wine/25 rounded-md border border-brand-wine/40 text-brand-brass">
                    <Wine className="w-4 h-4 text-brand-brass" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-serif text-[14px] text-brand-brass italic font-medium">
                      Harmonização do Sommelier
                    </h5>
                    <p className="text-xs text-[#8e9192] mt-0.5 font-semibold">
                      {dish.sommelierPairing.wine} (+{currentCurrency.symbol}{formattedPairingCost})
                    </p>
                    <p className="text-xs text-[#c4c7c7]/80 mt-2 leading-relaxed">
                      "{dish.sommelierPairing.description}"
                    </p>
                    
                    {/* Add switch button */}
                    <button
                      type="button"
                      onClick={() => setIncludePairing(!includePairing)}
                      className={`mt-3 w-full py-2 px-3 rounded text-[11px] tracking-widest font-bold uppercase transition-all duration-300 flex items-center justify-center gap-1.5 ${
                        includePairing
                          ? 'bg-brand-wine text-white border border-brand-wine hover:bg-brand-wine/90'
                          : 'bg-transparent text-brand-brass hover:text-white border border-brand-brass/30 hover:border-brand-brass'
                      }`}
                    >
                      {includePairing ? '✓ Harmonização Incluída' : '+ Harmonizar este prato'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Chef note text details box */}
            {dish.details?.chefNote && (
              <div className="mb-6 p-4 rounded-lg bg-white/5 border border-white/5 text-xs">
                <span className="font-serif text-brand-brass italic block mb-1">Nota do Chef:</span>
                <p className="text-[#8e9192] leading-relaxed">
                  "{dish.details.chefNote}"
                </p>
              </div>
            )}
          </div>

          {/* Pricing Action Segment */}
          <div className="border-t border-white/5 pt-4 mt-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              
              {/* Counter Buttons */}
              <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 rounded-md p-1">
                <button
                  onClick={handleMinus}
                  disabled={quantity === 1}
                  className="p-1 px-2.5 rounded hover:bg-white/10 text-[#c4c7c7] disabled:opacity-30 transition-colors"
                  aria-label="Reduzir quantidade"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-mono font-bold text-sm text-white">
                  {quantity}
                </span>
                <button
                  onClick={handlePlus}
                  className="p-1 px-2.5 rounded hover:bg-white/10 text-[#c4c7c7] transition-colors"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Dynamic total cost reading */}
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-widest text-[#8e9192] block">
                  Custo Total
                </span>
                <span className="font-serif text-xl text-brand-brass font-semibold">
                  {currentCurrency.symbol} {formattedTotal}
                </span>
              </div>
            </div>

            {/* Direct ordering Action Trigger button */}
            <button
              onClick={handleAdd}
              className="w-full filter brightness-100 hover:brightness-105 bg-gradient-to-r from-[#d4af37] to-[#aa851d] text-brand-deep py-3.5 rounded-lg font-sans text-xs tracking-widest font-bold uppercase transition-luxury hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2"
            >
              Adicionar ao Pedido
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
