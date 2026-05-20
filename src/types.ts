/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Currency = 'USD' | 'EUR' | 'BRL';

export interface CurrencyConfig {
  symbol: string;
  rate: number;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: {
    USD: number;
    EUR: number;
    BRL: number;
  };
  category: 'starters' | 'mains' | 'desserts' | 'sides' | 'drinks';
  image: string;
  tags?: ('GF' | 'DF' | 'RAW' | 'VEG' | 'SIGNATURE')[];
  sommelierPairing?: {
    wine: string;
    description: string;
    extraPrice: number;
  };
  details?: {
    ingredients: string[];
    prepTime: string;
    chefNote: string;
  };
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  withPairing: boolean;
}

export type ActiveTab = 'home' | 'menu' | 'reservations' | 'sommelier';

export interface ReservationData {
  date: string;
  time: string;
  guests: string;
  experience: 'dining-room' | 'chefs-enclave';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

export interface CheckoutDetails {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  date: string;
  time: string;
  paymentMethod: 'card' | 'applepay';
}
