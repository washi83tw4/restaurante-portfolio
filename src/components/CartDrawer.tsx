/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Trash2, Plus, Minus, ShoppingBag, Wine, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Currency } from '../types';
import { CURRENCY_CONFIGS } from '../data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: Currency;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const currentCurrency = CURRENCY_CONFIGS[currency];

  // Calculate Subtotal (incorporating optional Sommelier Pairing prices)
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const basePrice = item.dish.price[currency];
      const pairingPrice = item.dish.sommelierPairing
        ? item.dish.sommelierPairing.extraPrice * (currency === 'BRL' ? 4.5 : 1)
        : 0;
      const itemCost = basePrice + (item.withPairing ? pairingPrice : 0);
      return acc + itemCost * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const serviceCharge = subtotal * 0.1; // 10% as shown in provided mocks
  const grandTotal = subtotal + serviceCharge;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      
      {/* Dark backdrop blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        
        {/* Slide-out glassmorphic panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className="w-screen max-w-md bg-[#0c0f0f] border-l border-white/10 flex flex-col justify-between shadow-2xl h-full relative"
        >
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-[22px] text-brand-brass font-medium">
                Sua Seleção
              </h3>
              <p className="text-xs text-[#8e9192] tracking-wider mt-0.5 font-light">
                Itens artesanais sob medida
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-brand-brass rounded-full hover:bg-white/5 transition-all"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence initial={false}>
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="p-4 bg-white/5 rounded-full mb-4 border border-white/5 text-brand-brass">
                    <ShoppingBag className="w-8 h-8 opacity-60" />
                  </div>
                  <p className="font-serif text-[#e2e2e2] text-lg">Seu carrinho está vazio.</p>
                  <p className="text-xs text-[#8e9192] mt-2 max-w-[240px] leading-relaxed">
                    Navegue pelos nossos pratos requintados para iniciar sua jornada gastronômica.
                  </p>
                </div>
              ) : (
                cartItems.map((item, index) => {
                  const basePrice = item.dish.price[currency];
                  const pairingPrice = item.dish.sommelierPairing
                    ? item.dish.sommelierPairing.extraPrice * (currency === 'BRL' ? 4.5 : 1)
                    : 0;
                  const itemUnitCost = basePrice + (item.withPairing ? pairingPrice : 0);
                  const itemTotalCost = itemUnitCost * item.quantity;

                  return (
                    <motion.div
                      key={`${item.dish.id}-${item.withPairing}-${index}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-4 rounded-lg bg-white/[0.03] border border-white/5 flex gap-4 hover:border-white/10 transition-colors relative group"
                    >
                      {/* Dish miniature */}
                      <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 bg-brand-deep">
                        <img
                          src={item.dish.image}
                          alt={item.dish.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Content block */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="font-serif text-sm text-white font-medium pr-4 leading-tight">
                              {item.dish.name}
                            </h4>
                            <span className="font-mono text-xs text-brand-brass font-bold whitespace-nowrap">
                              {currentCurrency.symbol} {itemTotalCost.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                            </span>
                          </div>

                          {/* Wine pairing label */}
                          {item.withPairing && item.dish.sommelierPairing && (
                            <div className="flex items-center gap-1 mt-1 text-[11px] text-brand-brass bg-brand-wine/10 border border-brand-wine/25 px-1.5 py-0.5 rounded w-max">
                              <Wine className="w-3 h-3 text-brand-brass" />
                              <span className="truncate max-w-[140px] italic">
                                c/ {item.dish.sommelierPairing.wine}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Adjust and Delete block */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-1 bg-black/40 border border-white/5 rounded-md p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                              className="p-0.5 px-2 rounded hover:bg-white/5 text-[#c4c7c7] text-xs"
                              aria-label="Subtrair"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center font-mono font-bold text-xs text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                              className="p-0.5 px-2 rounded hover:bg-white/5 text-[#c4c7c7] text-xs"
                              aria-label="Somar"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Trash button */}
                          <button
                            onClick={() => onRemoveItem(index)}
                            className="text-white/40 hover:text-[#d34231] p-1.5 transition-colors"
                            title="Remover Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

          {/* Pricing Summary Module & Proceed Button */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/45 space-y-4">
              
              <div className="space-y-2 text-xs font-sans">
                <div className="flex justify-between text-[#8e9192]">
                  <span>Subtotal</span>
                  <span className="font-mono">{currentCurrency.symbol} {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                
                <div className="flex justify-between text-[#8e9192]">
                  <span>Taxa de Serviço (10%)</span>
                  <span className="font-mono">{currentCurrency.symbol} {serviceCharge.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                
                <div className="h-px bg-white/5 my-1" />
                
                <div className="flex justify-between items-baseline text-white">
                  <span className="font-serif text-lg">Total</span>
                  <span className="font-serif text-xl font-bold text-brand-brass">
                    {currentCurrency.symbol} {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Secure secure billing indicators info */}
              <div className="flex items-center gap-1.5 justify-center text-[10px] text-[#8e9192] font-mono uppercase pb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-brass/80" />
                <span>Transação Rígida & Criptografada</span>
              </div>

              {/* Checkout proceeding execution button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full filter brightness-100 hover:brightness-105 bg-gradient-to-r from-[#d4af37] to-[#aa851d] text-brand-deep py-3.5 rounded-lg font-sans text-xs tracking-widest font-bold uppercase transition-luxury hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] text-center flex items-center justify-center gap-2"
              >
                Prosseguir para o Checkout
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
