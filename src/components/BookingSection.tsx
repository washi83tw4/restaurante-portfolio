/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Clock, Users, Shield, Sparkles, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ReservationData } from '../types';

interface BookingSectionProps {
  onReservationComplete: (data: ReservationData) => void;
}

export default function BookingSection({ onReservationComplete }: BookingSectionProps) {
  const [formData, setFormData] = useState<ReservationData>({
    date: '2026-05-21',
    time: '20:00',
    guests: '2 Guests',
    experience: 'dining-room',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectExperience = (exp: 'dining-room' | 'chefs-enclave') => {
    setFormData((prev) => ({ ...prev, experience: exp }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert('Por favor, preencha todos os campos obrigatórios da seção Informações de Contato.');
      return;
    }

    // Generate simulated luxury reservation code
    const letters = 'ELITE';
    const num = Math.floor(1000 + Math.random() * 9000);
    setBookingCode(`${letters}-${num}`);
    
    setBookingConfirmed(true);
    onReservationComplete(formData);
  };

  const handleReset = () => {
    setFormData({
      date: '2026-05-21',
      time: '20:00',
      guests: '2 Guests',
      experience: 'dining-room',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: '',
    });
    setBookingConfirmed(false);
  };

  return (
    <div className="relative py-12 px-4 md:px-8 max-w-4xl mx-auto rounded-xl">
      
      {/* Background soft ambiance shadow */}
      <div className="absolute inset-x-0 top-0 h-96 bg-brand-brass/5 blur-[120px] rounded-full -z-10" />

      {/* Main Title Block */}
      <div className="text-center mb-10">
        <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-brand-brass font-bold inline-block mb-2">
          RESERVAS EXCLUSIVAS
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-white tracking-wide">
          Sua Mesa na Elite
        </h2>
        <p className="text-xs md:text-sm text-[#8e9192] max-w-lg mx-auto mt-2 leading-relaxed">
          Uma viagem culinária inesquecível espera por você. Forneça seus dados de reserva para garantir uma experiência impecável.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!bookingConfirmed ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 md:p-10 rounded-xl bg-white/[0.03] border border-white/10 shadow-2xl space-y-8"
          >
            {/* Step 1: Reservation Details */}
            <div>
              <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-4">
                <span className="font-mono text-xs text-brand-brass font-bold">1.</span>
                <h3 className="font-sans text-xs tracking-widest uppercase text-brand-brass font-semibold">
                  Detalhes da Reserva
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8e9192] font-mono block mb-2">
                    Data
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-brass/80" />
                    <input
                      required
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full bg-brand-deep border border-white/10 rounded-md py-3 pl-11 pr-4 text-xs font-mono text-white focus:border-brand-brass transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8e9192] font-mono block mb-2">
                    Horário (Jantar)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-brass/80" />
                    <select
                      required
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full bg-brand-deep border border-white/10 rounded-md py-3 pl-11 pr-4 text-xs font-mono text-white focus:border-brand-brass transition-all appearance-none cursor-pointer"
                    >
                      <option value="18:00">18:00 (Abertura)</option>
                      <option value="19:00">19:00</option>
                      <option value="19:30">19:30</option>
                      <option value="20:00">20:00 (Recomendado)</option>
                      <option value="21:00">21:00</option>
                      <option value="21:30">21:30</option>
                      <option value="22:00">22:00 (Último serviço)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8e9192] font-mono block mb-2">
                    Convidados
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-brass/80" />
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full bg-brand-deep border border-white/10 rounded-md py-3 pl-11 pr-4 text-xs font-mono text-white focus:border-brand-brass transition-all appearance-none cursor-pointer"
                    >
                      <option value="1 Guest">1 Convidado</option>
                      <option value="2 Guests">2 Convidados</option>
                      <option value="3 Guests">3 Convidados</option>
                      <option value="4 Guests">4 Convidados (Hold Policy)</option>
                      <option value="5 Guests">5 Convidados</option>
                      <option value="6 Guests">6 Convidados (Chef Enclave Max)</option>
                      <option value="8+ (Private Session)">Privativo (8+ Convidados)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: The Experience Selection */}
            <div>
              <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-4">
                <span className="font-mono text-xs text-brand-brass font-bold">2.</span>
                <h3 className="font-sans text-xs tracking-widest uppercase text-brand-brass font-semibold">
                  A Experiência
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Main Dining Room Card */}
                <div
                  onClick={() => handleSelectExperience('dining-room')}
                  className={`p-5 rounded-lg border cursor-pointer flex flex-col justify-between h-48 transition-luxury ${
                    formData.experience === 'dining-room'
                      ? 'bg-brand-brass/5 border-brand-brass'
                      : 'bg-brand-deep/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-serif text-md text-white font-medium">Salão Principal (Main Room)</h4>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center p-0.5 ${
                        formData.experience === 'dining-room' ? 'border-brand-brass' : 'border-[#8e9192]'
                      }`}>
                        {formData.experience === 'dining-room' && <div className="w-full h-full bg-brand-brass rounded-full" />}
                      </div>
                    </div>
                    <p className="text-xs text-[#8e9192] leading-relaxed font-light">
                      Mergulhe na atmosfera vibrante do nosso salão principal, cercado por detalhes arquitetônicos luxuosos e iluminação intimista.
                    </p>
                  </div>
                  
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#e2e2e2] bg-white/5 px-2 py-1 rounded w-max border border-white/5 mt-4">
                    À La Carte ou Tasting Menu
                  </span>
                </div>

                {/* Chef's Enclave Card */}
                <div
                  onClick={() => handleSelectExperience('chefs-enclave')}
                  className={`p-5 rounded-lg border cursor-pointer flex flex-col justify-between h-48 transition-luxury ${
                    formData.experience === 'chefs-enclave'
                      ? 'bg-brand-brass/5 border-brand-brass'
                      : 'bg-brand-deep/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-serif text-md text-white font-medium flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-brand-brass inline animate-gold-shimmer" />
                        Chef's Enclave
                      </h4>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center p-0.5 ${
                        formData.experience === 'chefs-enclave' ? 'border-brand-brass' : 'border-[#8e9192]'
                      }`}>
                        {formData.experience === 'chefs-enclave' && <div className="w-full h-full bg-brand-brass rounded-full" />}
                      </div>
                    </div>
                    <p className="text-xs text-[#8e9192] leading-relaxed font-light">
                      Um ambiente semiprivativo requintado com vista direta para a equipe de alta culinária. Inclui um brinde de boas-vindas com Champagne.
                    </p>
                  </div>
                  
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-brand-brass bg-brand-brass/10 px-2 py-1 rounded w-max border border-brand-brass/15 mt-4">
                    Exclusivo Tasting Menu Completo
                  </span>
                </div>

              </div>
            </div>

            {/* Step 3: Guest Contact Information */}
            <div>
              <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-4">
                <span className="font-mono text-xs text-brand-brass font-bold">3.</span>
                <h3 className="font-sans text-xs tracking-widest uppercase text-brand-brass font-semibold">
                  Informações de Contato / Guest Info
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
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
                    placeholder="e.g. Jean-Luc"
                    className="w-full bg-brand-deep border border-white/10 rounded-md py-3 px-4 text-xs text-white focus:border-brand-brass transition-all placeholder-white/20"
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
                    placeholder="e.g. Picard"
                    className="w-full bg-brand-deep border border-white/10 rounded-md py-3 px-4 text-xs text-white focus:border-brand-brass transition-all placeholder-white/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8e9192] font-mono block mb-1.5">
                    E-mail *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jean.picard@enterprise.com"
                    className="w-full bg-brand-deep border border-white/10 rounded-md py-3 px-4 text-xs text-white focus:border-brand-brass transition-all placeholder-white/20"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8e9192] font-mono block mb-1.5">
                    Telefone de Contato *
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+33 1 23 45 67 89"
                    className="w-full bg-brand-deep border border-white/10 rounded-md py-3 px-4 text-xs text-white focus:border-brand-brass transition-all placeholder-white/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#8e9192] font-mono block mb-1.5">
                  Pedidos Especiais ou Restrições Alimentares
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Por favor, informe-nos se houver alergias severas ou ocasiões especiais (aniversário, noivado)..."
                  className="w-full bg-brand-deep border border-white/10 rounded-md py-3 px-4 text-xs text-white focus:border-brand-brass transition-all placeholder-white/20 resize-none"
                />
              </div>
            </div>

            {/* Disclaimer and Submit Button */}
            <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="text-[10px] text-[#8e9192] leading-normal font-sans text-center md:text-left max-w-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-brass/60 flex-shrink-0" />
                Ao prosseguir, você concorda com nossa política de cancelamento. Uma pré-autenticação poderá ser solicitada a partir de 4 pessoas.
              </span>

              <button
                type="submit"
                className="w-full md:w-auto filter brightness-100 hover:brightness-105 bg-gradient-to-r from-[#d4af37] to-[#aa851d] text-brand-deep py-3.5 px-8 rounded-lg font-sans text-xs tracking-widest font-bold uppercase transition-luxury hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center justify-center gap-1.5"
              >
                Confirmar Reserva
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </motion.form>
        ) : (
          /* Confirmation Success Box Overlay */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 md:p-12 rounded-xl bg-white/[0.03] border border-brand-brass/30 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d4af37] via-brand-brass to-[#aa851d]" />
            
            <div className="w-16 h-16 bg-brand-brass/10 border border-brand-brass/30 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-brass">
              <CheckCircle2 className="w-8 h-8 " />
            </div>

            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-brass block mb-2 font-mono">
              CONFIRMAÇÃO DIGITAL PREMIUM
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-white font-medium mb-3">
              Mesa Confirmada com Sucesso!
            </h3>
            
            <p className="text-[#c4c7c7] text-sm leading-relaxed max-w-md mx-auto mb-8 font-light">
              Parabéns, <span className="text-white font-semibold">{formData.firstName} {formData.lastName}</span>. Sua imersão gastronômica está formalmente agendada no <span className="text-white italic font-serif">L'Élite Culinaire</span> para:
            </p>

            {/* Spec Card details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-lg bg-black/40 border border-white/5 text-center font-mono max-w-2xl mx-auto mb-8">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8e9192] block">Data</span>
                <span className="text-xs text-white font-bold mt-1 block">{formData.date}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8e9192] block">Horário</span>
                <span className="text-xs text-white font-bold mt-1 block">{formData.time}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8e9192] block">Pessoas</span>
                <span className="text-xs text-white font-bold mt-1 block">{formData.guests}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8e9192] block">Código Único</span>
                <span className="text-xs text-brand-brass font-bold mt-1 block">{bookingCode}</span>
              </div>
            </div>

            {/* Exp block */}
            <div className="mb-8 text-xs text-[#8e9192] max-w-md mx-auto">
              <span className="font-serif italic text-brand-brass text-sm block mb-1">
                {formData.experience === 'dining-room' ? 'Salão Principal • Experiência À La Carte' : 'Chef’s Enclave • Experiência de Degustação Exclusiva'}
              </span>
              <span>O brinde do Sommelier e seu assento estão reservados. Por favor, chegue com 10 minutos de antecedência. Solicitamos traje esporte fino.</span>
            </div>

            {/* Control buttons */}
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                onClick={handleReset}
                className="py-3 px-6 rounded-md font-sans text-xs tracking-widest font-semibold uppercase text-[#c4c7c7] border border-white/10 hover:border-white/20 transition-all"
              >
                Fazer nova Reserva
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
