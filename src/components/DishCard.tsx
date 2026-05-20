/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plus, Eye, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Dish, Currency } from '../types';
import { CURRENCY_CONFIGS } from '../data';

interface DishCardProps {
  key?: string | number;
  dish: Dish;
  currency: Currency;
  onAddToCart: (dish: Dish) => void;
  onOpenDetails: (dish: Dish) => void;
}

export default function DishCard({
  dish,
  currency,
  onAddToCart,
  onOpenDetails,
}: DishCardProps) {
  const currentCurrency = CURRENCY_CONFIGS[currency];
  const displayPrice = (dish.price[currency]).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-xl overflow-hidden glass-panel hover:border-brand-brass/40 transition-luxury shadow-lg"
    >
      {/* Upper culinary photo module */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-deep">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]"
          referrerPolicy="no-referrer"
        />
        
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-transparent to-black/10 opacity-80" />

        {/* Floating Exclusive/Signature Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
          {dish.tags?.includes('SIGNATURE') && (
            <span className="flex items-center gap-1 bg-brand-brass/90 text-brand-deep text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-sm uppercase font-sans animate-gold-shimmer shadow-lg">
              <Sparkles className="w-3 h-3" />
              Signature
            </span>
          )}
          {dish.tags?.filter(tag => tag !== 'SIGNATURE').map((tag) => (
            <span
              key={tag}
              className="bg-black/60 border border-white/20 text-white text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-sm font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Quick hovering icons overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-deep/30 backdrop-blur-[2px]">
          <button
            onClick={() => onOpenDetails(dish)}
            className="p-3 bg-brand-deep/90 hover:bg-brand-brass text-brand-brass hover:text-brand-deep rounded-full border border-brand-brass/30 transition-all shadow-xl hover:scale-110"
            title="Ver Detalhes do Prato"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Culinary and Pricing information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="mb-4">
          <div className="flex items-baseline justify-between gap-2">
            <h3 
              onClick={() => onOpenDetails(dish)}
              className="font-serif text-[19px] tracking-wide text-white group-hover:text-brand-brass transition-colors cursor-pointer"
            >
              {dish.name}
            </h3>
            <span className="font-serif text-[18px] text-brand-brass font-medium whitespace-nowrap">
              {currentCurrency.symbol} {displayPrice}
            </span>
          </div>

          <p className="mt-2 text-[#c4c7c7] text-xs font-sans font-light leading-relaxed line-clamp-2">
            {dish.description}
          </p>
        </div>

        {/* Buttons drawer */}
        <div className="flex gap-2.5">
          <button
            onClick={() => onOpenDetails(dish)}
            className="flex-1 py-2 rounded-md font-sans text-[11px] tracking-widest font-semibold uppercase text-white/80 border border-white/10 hover:border-brand-brass hover:text-white transition-luxury"
          >
            Detalhes
          </button>
          
          <button
            onClick={() => onAddToCart(dish)}
            className="flex-1 filter brightness-100 hover:brightness-110 bg-gradient-to-r from-[#d4af37] to-[#aa851d] text-brand-deep py-2 rounded-md font-sans text-[11px] tracking-widest font-bold uppercase transition-luxury hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            Adicionar
          </button>
        </div>
      </div>
    </motion.div>
  );
}
