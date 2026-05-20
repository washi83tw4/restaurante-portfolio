/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Dish } from './types';

export const CURRENCY_CONFIGS = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  BRL: { symbol: 'R$', rate: 5.10 },
};

export const DISHES: Dish[] = [
  // Mains / Carnes
  {
    id: 'wagyu-ribeye',
    name: 'A5 Wagyu Ribeye',
    description: 'Miyazaki prefecture A5 Wagyu, smoked over premium binchotan charcoal, finished with smoked fleur de sel.',
    price: {
      USD: 185,
      EUR: 170,
      BRL: 940,
    },
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000',
    tags: ['GF', 'SIGNATURE'],
    sommelierPairing: {
      wine: 'Château Margaux 2015',
      description: 'The robust but ultra-refined tannins of Ch. Margaux slice perfectly through the intense marbled fat of the A5 Wagyu.',
      extraPrice: 150,
    },
    details: {
      ingredients: ['A5 Miyazaki Wagyu', 'Fleur de Sel', 'Aromatic Herbs', 'Binchotan Smoked Jus'],
      prepTime: '25 min',
      chefNote: 'Due to the purity of the fat of the A5 Wagyu, we serve this rare to custom medium-rare, letting the heat of your palate melt the marbled fat.',
    },
  },
  {
    id: 'wagyu-truffle-burger',
    name: 'The Wagyu Truffle',
    description: '200g of pure-cut Wagyu beef, double-aged white cheddar, black truffle aioli, and sweet caramelized shallots on custom golden brioche.',
    price: {
      USD: 38,
      EUR: 35,
      BRL: 120,
    },
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000',
    tags: ['SIGNATURE'],
    details: {
      ingredients: ['Wagyu beef blend', 'Black Winter Truffle', 'Artisanal Brioche', 'Aged Cheddar', 'Caramelized Onion'],
      prepTime: '15 min',
      chefNote: 'An elevated approach to comfort. Hand-minced daily, featuring actual shaved winter truffle within the aioli emulsion.',
    },
  },
  {
    id: 'elite-classic',
    name: 'L\'Élite Classic',
    description: 'Our signature ribeye & brisket blend patty, melted Gruyère cheese, crisp house pickles, Dijon whole grain mustard, butter lettuce.',
    price: {
      USD: 28,
      EUR: 26,
      BRL: 85,
    },
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1000',
    details: {
      ingredients: ['Signature beef blend', 'Cave-aged Gruyère', 'Cornichons', 'Dijon Mustard Emulsion'],
      prepTime: '12 min',
      chefNote: 'Minimalist with high-end execution. Cooked strictly medium for the signature juiciness L\'Élite is renowned for.',
    },
  },
  // Starters / Entradas
  {
    id: 'wagyu-tartare',
    name: 'Wagyu Tartare',
    description: 'A5 Kagoshima Wagyu, rich smoked bone marrow emulsion, pickled shallots, crisp capers, served with warm house-made sourdough crostini.',
    price: {
      USD: 48,
      EUR: 45,
      BRL: 230,
    },
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000',
    tags: ['GF', 'RAW', 'SIGNATURE'],
    sommelierPairing: {
      wine: '2015 Barolo "Bricco delle Viole"',
      description: 'Perfectly complements the complex richness of the marrow emulsion with high acidity and structured cherry/herbal notes.',
      extraPrice: 42,
    },
    details: {
      ingredients: ['A5 Kagoshima Beef', 'Bone Marrow Emulsion', 'Capers', 'Micro Herbs', 'House Sourdough'],
      prepTime: '10 min',
      chefNote: 'Hand-chopped individually per order. We recommend letting it sit at room temperature for 1 minute before your first bite to capture the full marrow expression.',
    },
  },
  {
    id: 'scallop-crudo',
    name: 'Hokkaido Scallop Crudo',
    description: 'Thinly sliced wild-caught scallops, yuzu kosho vinaigrette, premium finger lime caviar, sea grape, and a touch of organic shiso oil.',
    price: {
      USD: 42,
      EUR: 38,
      BRL: 195,
    },
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=1000',
    tags: ['GF', 'DF', 'RAW'],
    details: {
      ingredients: ['Hokkaido Sea Scallops', 'Finger Lime Caviar', 'Yuzu Kosho Extract', 'Sea Grapes', 'Organic Shiso Oil'],
      prepTime: '8 min',
      chefNote: 'A hyper-clean starter featuring fresh raw notes of lime, citrus, and saline sea grapes for texture.',
    },
  },
  // Sides / Acompanhamentos
  {
    id: 'truffle-puree',
    name: 'Truffle Purée',
    description: 'Robuchon-style silky potato purée heavily folded with French butter and fresh French black winter truffles.',
    price: {
      USD: 35,
      EUR: 32,
      BRL: 165,
    },
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000',
    tags: ['GF', 'VEG'],
    details: {
      ingredients: ['Yukon Gold Potatoes', 'Normandy Butter', 'Black Winter Truffle Shavings', 'Heavy Cream'],
      prepTime: '10 min',
      chefNote: 'Our purée uses a luxurious 1:1 potato to butter ratio, resulting in an exceptionally velvety mouthfeel.',
    },
  },
  // Desserts / Sobremesas
  {
    id: 'gold-fondant',
    name: 'Signature Gold Fondant',
    description: 'Valrhona dark chocolate fondant infused with high-altitude espresso, adorned with actual 24k gold leaf, with Tahitian vanilla bean gelato.',
    price: {
      USD: 48,
      EUR: 45,
      BRL: 230,
    },
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=1000',
    tags: ['VEG', 'SIGNATURE'],
    details: {
      ingredients: ['Valrhona 72% Equatorial Chocolate', 'Espresso Extract', '24k Gold Leaf', 'Tahitian Vanilla Gelato'],
      prepTime: '15 min',
      chefNote: 'Baked to order with an absolute liquid center. The gold leaf represents the pure opulence of this cacao masterpiece.',
    },
  },
  // Drinks / Bebidas
  {
    id: 'chateau-margaux',
    name: 'Château Margaux 2015',
    description: 'Premier Grand Cru Classé. An absolute legend of a vintage, showing magnificent complex notes of cassis, violets, cedar, and velvety tannins.',
    price: {
      USD: 1300,
      EUR: 1200,
      BRL: 6600,
    },
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1000',
    tags: ['GF', 'DF'],
    details: {
      ingredients: ['Cabernet Sauvignon', 'Merlot', 'Petit Verdot', 'Cabernet Franc blend'],
      prepTime: '5 min (Decanted)',
      chefNote: 'Decanted for 45 minutes prior to serving to unlock the complex aromatic tiers.',
    },
  },
];
