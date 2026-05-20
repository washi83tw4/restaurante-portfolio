/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, Calendar, Clock, CreditCard as CardIcon, ArrowLeft, CheckCircle2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Currency, CheckoutDetails } from '../types';
import { CURRENCY_CONFIGS } from '../data';

interface CheckoutPanelProps {
  cartItems: CartItem[];
  currency: Currency;
  onBackToCart: () => void;
  onOrderSuccess: () => void;
  onClearCart: () => void;
}

export default function CheckoutPanel({
  cartItems,
  currency,
  onBackToCart,
  onOrderSuccess,
  onClearCart,
}: CheckoutPanelProps) {
  const [formData, setFormData] = useState<CheckoutDetails>({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    date: '2026-05-21',
    time: '20:30',
    paymentMethod: 'card',
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const currentCurrency = CURRENCY_CONFIGS[currency];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSelect = (method: 'card' | 'applepay') => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  // Pricing math:
  const subtotal = cartItems.reduce((acc, item) => {
    const basePrice = item.dish.price[currency];
    const pairingPrice = item.dish.sommelierPairing
      ? item.dish.sommelierPairing.extraPrice * (currency === 'BRL' ? 4.5 : 1)
      : 0;
    const itemCost = basePrice + (item.withPairing ? pairingPrice : 0);
    return acc + itemCost * item.quantity;
  }, 0);

  const serviceCharge = subtotal * 0.1; // 10%
  const deliveryFee = currency === 'BRL' ? 50 : currency === 'EUR' ? 10 : 15; // White Glove Delivery Fee
  const grandTotal = subtotal + serviceCharge + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.address || !formData.phone) {
      alert('Por favor, preencha todos os campos do endereço e contato.');
      return;
    }

    // Generate simulated order receipt
    const letters = 'EL';
    const num = Math.floor(100000 + Math.random() * 900000);
    setOrderId(`${letters}-${num}`);

    setPaymentSuccess(true);
  };

  const handleFinish = () => {
    onClearCart();
    onOrderSuccess();
  };

  return (
    <div className="py-8 px-4 md:px-8 max-w-5xl mx-auto">
      
      {/* Back to Selection button */}
      {!paymentSuccess && (
        <button
          onClick={onBackToCart}
          className="flex items-center gap-2 text-xs font-mono text-[#8e9192] hover:text-brand-brass uppercase tracking-widest mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar para seleção
        </button>
      )}

      <AnimatePresence mode="wait">
        {!paymentSuccess ? (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form entries */}
            <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-xl p-6 md:p-8 space-y-8">
              
              {/* Delivery info segment */}
              <div>
                <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-4">
                  <Truck className="w-4 h-4 text-brand-brass" />
                  <h3 className="font-sans text-xs tracking-widest uppercase text-brand-brass font-semibold">
                    Entrega Premium "White Glove"
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8e9192] font-mono block mb-1.5">
                      Primeiro Nome *
                    </label>
                    <input
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Jean"
                      className="w-full bg-brand-deep border border-white/10 rounded-md py-3 px-4 text-xs text-white focus:border-brand-brass transition-all placeholder-white/25"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8e9192] font-mono block mb-1.5">
                      Sobrenome *
                    </label>
                    <input
                      required
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Picard"
                      className="w-full bg-brand-deep border border-white/10 rounded-md py-3 px-4 text-xs text-white focus:border-brand-brass transition-all placeholder-white/25"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-[10px] uppercase tracking-wider text-[#8e9192] font-mono block mb-1.5">
                    Endereço de Entrega *
                  </label>
                  <input
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Av. Paulista, 1000 - Apto 242A, Bela Vista, São Paulo - SP"
                    className="w-full bg-brand-deep border border-white/10 rounded-md py-3 px-4 text-xs text-white focus:border-brand-brass transition-all placeholder-white/25"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8e9192] font-mono block mb-1.5">
                    Celular para Contato / Delivery Updates *
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+55 11 99999-9999"
                    className="w-full bg-brand-deep border border-white/10 rounded-md py-3 px-4 text-xs text-white focus:border-brand-brass transition-all placeholder-white/25"
                  />
                </div>
              </div>

              {/* Delivery schedule parameters */}
              <div>
                <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-4">
                  <Calendar className="w-4 h-4 text-brand-brass" />
                  <h3 className="font-sans text-xs tracking-widest uppercase text-brand-brass font-semibold">
                    Agendamento de Entrega
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8e9192] font-mono block mb-1.5">
                      Data da Entrega
                    </label>
                    <input
                      required
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full bg-brand-deep border border-white/10 rounded-md py-3 px-4 text-xs font-mono text-white focus:border-brand-brass transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8e9192] font-mono block mb-1.5">
                      Horário Desejado
                    </label>
                    <input
                      required
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full bg-brand-deep border border-white/10 rounded-md py-3 px-4 text-xs font-mono text-white focus:border-brand-brass transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Payment details options representing Stitch screen */}
              <div>
                <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-4">
                  <CreditCard className="w-4 h-4 text-brand-brass" />
                  <h3 className="font-sans text-xs tracking-widest uppercase text-brand-brass font-semibold">
                    Seleção de Pagamento
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* Premium credit card selection */}
                  <div
                    onClick={() => handlePaymentSelect('card')}
                    className={`p-4 rounded-lg border cursor-pointer flex items-center justify-between transition-luxury ${
                      formData.paymentMethod === 'card'
                        ? 'bg-brand-brass/5 border-brand-brass'
                        : 'bg-brand-deep/50 border-white/10 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center p-0.5 ${
                        formData.paymentMethod === 'card' ? 'border-brand-brass' : 'border-[#8e9192]'
                      }`}>
                        {formData.paymentMethod === 'card' && <div className="w-full h-full bg-brand-brass rounded-full" />}
                      </div>
                      <span className="text-xs text-white font-medium uppercase tracking-wider">Cartão de Crédito Premium</span>
                    </div>

                    <div className="flex items-center space-x-2 text-[#8e9192]">
                      <span className="text-[9px] font-mono uppercase tracking-widest">Visa / Master / Amex</span>
                      <CardIcon className="w-4 h-4 text-brand-brass/60" />
                    </div>
                  </div>

                  {/* Apple Pay alternative */}
                  <div
                    onClick={() => handlePaymentSelect('applepay')}
                    className={`p-4 rounded-lg border cursor-pointer flex items-center justify-between transition-luxury ${
                      formData.paymentMethod === 'applepay'
                        ? 'bg-brand-brass/5 border-brand-brass'
                        : 'bg-brand-deep/50 border-white/10 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center p-0.5 ${
                        formData.paymentMethod === 'applepay' ? 'border-brand-brass' : 'border-[#8e9192]'
                      }`}>
                        {formData.paymentMethod === 'applepay' && <div className="w-full h-full bg-brand-brass rounded-full" />}
                      </div>
                      <span className="text-xs text-white font-medium uppercase tracking-wider">Apple Pay / Pay</span>
                    </div>

                    <span className="text-[10px] font-sans font-bold tracking-wider text-white">Apple Pay</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Order recap & action */}
            <div className="lg:col-span-5 bg-white/[0.03] border border-brand-brass/20 rounded-xl p-6 shadow-2xl space-y-6">
              <h4 className="font-serif text-lg text-brand-brass border-b border-white/5 pb-2">
                Resumo do Pedido
              </h4>

              {/* Items recap loop */}
              <div className="space-y-4 max-h-52 overflow-y-auto pr-2">
                {cartItems.map((item, index) => {
                  const basePrice = item.dish.price[currency];
                  const pairingPrice = item.dish.sommelierPairing
                    ? item.dish.sommelierPairing.extraPrice * (currency === 'BRL' ? 4.5 : 1)
                    : 0;
                  const itemCost = (basePrice + (item.withPairing ? pairingPrice : 0)) * item.quantity;

                  return (
                    <div key={index} className="flex justify-between items-start text-xs font-sans">
                      <div>
                        <span className="text-white font-medium">
                          {item.quantity}x {item.dish.name}
                        </span>
                        {item.withPairing && (
                          <span className="text-[10px] text-brand-brass block italic mt-0.5">
                            c/ Harmonização de Vinho
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-[#c4c7c7]">
                        {currentCurrency.symbol} {itemCost.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Order total lines details */}
              <div className="border-t border-white/5 pt-4 space-y-3.5 text-xs font-mono text-[#8e9192]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">{currentCurrency.symbol} {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Taxa de Serviço (10%)</span>
                  <span className="text-white">{currentCurrency.symbol} {serviceCharge.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    Entrega "White Glove"
                  </span>
                  <span className="text-white">{currentCurrency.symbol} {deliveryFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="h-px bg-white/5" />

                <div className="flex justify-between items-baseline text-white">
                  <span className="font-serif text-sm">Custo Consolidado</span>
                  <span className="font-serif text-lg font-bold text-brand-brass">
                    {currentCurrency.symbol} {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Security info disclaimer */}
              <div className="p-3.5 rounded bg-black/40 border border-white/5 text-[10px] text-[#8e9192] font-sans flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-brass mt-0.5 flex-shrink-0" />
                <span>
                  L'Élite reserva os ingredientes mais frescos e o veículo climatizado exclusivamente para o seu agendamento. Cancelamentos após faturamento não são admissíveis.
                </span>
              </div>

              {/* Process checkout Payment button */}
              <button
                type="submit"
                className="w-full filter brightness-100 hover:brightness-105 bg-gradient-to-r from-[#d4af37] to-[#aa851d] text-brand-deep py-4 rounded-lg font-sans text-xs tracking-widest font-bold uppercase transition-luxury hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] text-center block"
              >
                Confirmar & Pagar
              </button>
            </div>

          </form>
        ) : (
          /* Success visual box */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 md:p-12 rounded-xl bg-white/[0.03] border border-brand-brass/35 text-center shadow-2xl relative overflow-hidden max-w-2xl mx-auto"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d4af37] via-brand-brass to-[#aa851d]" />
            
            <div className="w-16 h-16 bg-brand-brass/10 border border-brand-brass/30 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-brass">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-brass block mb-2 font-mono">
              PAGAMENTO E PEDIDO CONFIRMADOS
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-white font-medium mb-3">
              Faturamento Concluído!
            </h3>
            
            <p className="text-[#c4c7c7] text-sm leading-relaxed max-w-md mx-auto mb-8 font-light">
              Obrigado, <span className="text-white font-semibold">{formData.firstName} {formData.lastName}</span>. Os ingredientes de altíssima qualidade do seu pedido já foram designados aos nossos chefs especialistas.
            </p>

            {/* Receipt metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-lg bg-black/40 border border-white/5 text-center font-mono max-w-xl mx-auto mb-8 text-xs">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8e9192] block">Data de Entrega</span>
                <span className="text-white font-bold mt-1 block">{formData.date}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8e9192] block">Horário</span>
                <span className="text-white font-bold mt-1 block">{formData.time}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8e9192] block">Código do Pedido</span>
                <span className="text-brand-brass font-bold mt-1 block">{orderId}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8e9192] block">Método</span>
                <span className="text-white font-bold mt-1 block uppercase">{formData.paymentMethod === 'card' ? 'Cartão' : 'Apple Pay'}</span>
              </div>
            </div>

            {/* Courier advisory info */}
            <div className="mb-8 text-xs text-[#8e9192] max-w-sm mx-auto leading-relaxed">
              <p className="font-serif italic text-brand-brass text-[13px] mb-1">
                Serviço de Entrega "White Glove"
              </p>
              Nosso mordomo gourmet entrará em contato 15 minutos antes da chegada. Os pratos são entregues acondicionados em louças técnicas aquecidas.
            </div>

            <button
              onClick={handleFinish}
              className="py-3 px-8 rounded-md filter brightness-100 hover:brightness-105 bg-gradient-to-r from-[#d4af37] to-[#aa851d] text-brand-deep font-sans text-xs tracking-widest font-bold uppercase transition-luxury"
            >
              Retornar ao Início
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
