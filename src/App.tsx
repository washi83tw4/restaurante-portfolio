/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Award, 
  ChevronRight, 
  Star, 
  Sparkles, 
  ChefHat, 
  Wine, 
  Check, 
  PhoneCall,
  Search,
  Mail,
  MessageSquare
} from 'lucide-react';

import { ActiveTab, Currency, CartItem, Dish, ReservationData } from './types';
import { DISHES, CURRENCY_CONFIGS } from './data';
import Navbar from './components/Navbar';
import DishCard from './components/DishCard';
import DishModal from './components/DishModal';
import CartDrawer from './components/CartDrawer';
import BookingSection from './components/BookingSection';
import CheckoutPanel from './components/CheckoutPanel';
import SommelierTab from './components/SommelierTab';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ActiveTab>('home');
  const [currency, setCurrency] = useState<Currency>('BRL');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showReservationNotify, setShowReservationNotify] = useState(false);
  
  // Menu filter States:
  const [menuSearch, setMenuSearch] = useState('');
  const [activeMenuCategory, setActiveMenuCategory] = useState<string>('ALL');

  const menuCategories = [
    { id: 'ALL', label: 'Todos os Pratos' },
    { id: 'starters', label: 'Entradas' },
    { id: 'mains', label: 'Carnes / Pratos' },
    { id: 'sides', label: 'Acompanhamentos' },
    { id: 'drinks', label: 'Bebidas Finas' },
    { id: 'desserts', label: 'Sobremesas' },
  ];

  const currentCurrency = CURRENCY_CONFIGS[currency];

  // Cart operations
  const handleAddToCart = (dish: Dish, withPairing: boolean = false, qty: number = 1) => {
    setCartItems((prevItems) => {
      // Check if item with exact pairing option already exists in cart
      const existingIdx = prevItems.findIndex(
        (item) => item.dish.id === dish.id && item.withPairing === withPairing
      );

      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += qty;
        return updated;
      }

      return [...prevItems, { dish, quantity: qty, withPairing }];
    });
  };

  const handleUpdateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prevItems) => {
      const updated = [...prevItems];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenDishDetails = (dish: Dish) => {
    setSelectedDish(dish);
  };

  const handleLaunchCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Filtered menu logic
  const filteredDishes = DISHES.filter((dish) => {
    const matchesCategory = activeMenuCategory === 'ALL' || dish.category === activeMenuCategory;
    const matchesSearch = dish.name.toLowerCase().includes(menuSearch.toLowerCase()) || 
                          dish.description.toLowerCase().includes(menuSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Showcase dishes for Home highlights
  const highlightedDishes = DISHES.filter(d => ['wagyu-ribeye', 'gold-fondant', 'wagyu-truffle-burger'].includes(d.id));

  return (
    <div className="min-h-screen bg-brand-charcoal text-[#e2e2e2] flex flex-col justify-between selection:bg-brand-brass selection:text-brand-deep">
      
      {/* Navbar overlay header */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setIsCheckoutOpen(false);
        }}
        currency={currency}
        onCurrencyChange={(cur) => setCurrency(cur)}
        totalCartItems={totalCartItems}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {isCheckoutOpen ? (
            /* Immersive Checkout workflow */
            <motion.div
              key="checkout"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              <CheckoutPanel
                cartItems={cartItems}
                currency={currency}
                onBackToCart={() => setIsCheckoutOpen(false)}
                onClearCart={handleClearCart}
                onOrderSuccess={() => {
                  setIsCheckoutOpen(false);
                  setCurrentTab('home');
                }}
              />
            </motion.div>
          ) : (
            /* Tab layouts */
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              {currentTab === 'home' && (
                <div className="space-y-24 pb-20">
                  
                  {/* Masterpieces of Fire & Flavor - Hero block */}
                  <div className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-brand-deep border-b border-white/5">
                    {/* Background food parallax styled design */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1800"
                        alt="Signature Wagyu Ribeye background cooking"
                        className="w-full h-full object-cover opacity-35 filter brightness-50 contrast-125"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/45 to-transparent" />
                    </div>

                    <div className="relative z-10 text-center px-6 max-w-4xl space-y-6">
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-mono text-brand-brass font-bold inline-block"
                      >
                        <ChefHat className="w-4 h-4 text-brand-brass inline mr-2 -mt-1" />
                        A Arte da Gastronomia
                      </motion.span>
                      
                      <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide text-white leading-tight"
                      >
                        Obras-Primas do <br/>
                        <span className="italic font-normal text-brand-brass">Fogo & Sabor</span>
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-xs md:text-sm text-[#c4c7c7] font-light max-w-xl mx-auto leading-relaxed"
                      >
                        Seleções curadas com os cortes mais nobres e ingredientes sublimes, minuciosamente preparados para elevar sua jornada sensorial na alta culinária.
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
                      >
                        <button
                          onClick={() => setCurrentTab('menu')}
                          className="filter brightness-100 hover:brightness-105 bg-gradient-to-r from-[#d4af37] to-[#aa851d] text-brand-deep py-3.5 px-8 rounded-lg font-sans text-xs tracking-widest font-bold uppercase transition-luxury hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] flex items-center justify-center gap-1.5"
                        >
                          Explorar Menu
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setCurrentTab('reservations')}
                          className="py-3.5 px-8 rounded-lg font-sans text-xs tracking-widest font-bold uppercase text-white border border-white/10 hover:border-brand-brass hover:text-white hover:bg-white/5 transition-all"
                        >
                          Reservar uma Mesa
                        </button>
                      </motion.div>
                    </div>
                  </div>

                  {/* Highlights Sections */}
                  <div className="max-w-7xl mx-auto px-6 space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-brand-brass font-mono font-bold block mb-1">
                          Curto e Exclusivo
                        </span>
                        <h2 className="font-serif text-2xl md:text-4xl text-white font-medium">
                          Destaques do Chef
                        </h2>
                      </div>
                      <p className="text-xs text-[#8e9192] italic mt-2 md:mt-0 font-light">
                        Pratos lendários encomendados pelas mentes mais refinadas do país.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {highlightedDishes.map((dish) => (
                        <DishCard
                          key={dish.id}
                          dish={dish}
                          currency={currency}
                          onAddToCart={() => handleAddToCart(dish)}
                          onOpenDetails={handleOpenDishDetails}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Atmosphere / Brand Sanctuary Info Block */}
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#0d0f0f] border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                      
                      <div className="lg:col-span-7 space-y-6">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-brand-brass block">
                          Santuário para os Sentidos
                        </span>
                        
                        <h3 className="font-serif text-3xl md:text-4xl text-white leading-snug">
                          Um refúgio suntuoso onde o tempo se desfaz em sabores.
                        </h3>

                        {/* Michelin quote box */}
                        <div className="border-l-2 border-brand-brass pl-5 py-2 my-6">
                          <p className="text-[#e2e2e2] text-sm md:text-base font-serif italic leading-relaxed">
                            "Uma experiência gastronômica sem paralelo. A atenção meticulosa aos detalhes nos pratos e na atmosfera coloca L'Élite entre a realeza culinária."
                          </p>
                          <span className="text-[10px] uppercase tracking-wider text-brand-brass font-mono font-bold block mt-2">
                            — GUIA MICHELIN, 2026
                          </span>
                        </div>

                        {/* Location details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs">
                          <div className="space-y-1">
                            <span className="text-[#8e9192] block font-mono">Endereço Nobre</span>
                            <span className="text-white font-light flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-brand-brass" />
                              Culinary District, SP
                            </span>
                          </div>
                          
                          <div className="space-y-1">
                            <span className="text-[#8e9192] block font-mono">Horário do Jantar</span>
                            <span className="text-white font-light flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-brand-brass" />
                              Ter-Dom: 18h às 00h
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[#8e9192] block font-mono font-bold">Reserva Prévia</span>
                            <span className="text-brand-brass font-bold flex items-center gap-1">
                              <Award className="w-3.5 h-3.5 text-brand-brass" />
                              Obrigatória
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Side preview image */}
                      <div className="lg:col-span-5 aspect-[4/3] rounded-xl overflow-hidden shadow-2xl bg-brand-deep border border-white/10 relative">
                        <img
                          src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800"
                          alt="Elite atmosphere dining room preview"
                          className="w-full h-full object-cover filter brightness-90 hover:scale-105 duration-700 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                    </div>
                  </div>

                </div>
              )}

              {currentTab === 'menu' && (
                <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
                  
                  {/* Menu header title */}
                  <div className="text-center space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-brand-brass font-bold inline-block">
                      MENU DE DEGUSTAÇÃO & À LA CARTE
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl text-white tracking-wide">
                      O Menu L'Élite
                    </h2>
                    <p className="text-xs text-[#8e9192] max-w-md mx-auto leading-relaxed">
                      Selecione refinados pratos individuais ou hambúrgueres icônicos elaborados com cortes de Wagyu Miyazaki.
                    </p>
                  </div>

                  {/* Search and Filters block */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-y border-white/5 py-6">
                    
                    {/* Horizontal category layout tabs */}
                    <div className="flex items-center space-x-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                      {menuCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setActiveMenuCategory(cat.id)}
                          className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap tracking-wider uppercase transition-all duration-300 ${
                            activeMenuCategory === cat.id
                              ? 'bg-brand-brass text-brand-deep'
                              : 'bg-white/5 text-[#c4c7c7] border border-white/5 hover:border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Search bar inside menu */}
                    <div className="relative w-full md:w-80">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-brass" />
                      <input
                        type="text"
                        value={menuSearch}
                        onChange={(e) => setMenuSearch(e.target.value)}
                        placeholder="Pesquisar pratos, vinhos..."
                        className="w-full bg-white/5 border border-white/10 rounded-md py-2.5 pl-10 pr-4 text-xs text-white placeholder-white/20 focus:border-brand-brass transition-all font-sans"
                      />
                    </div>

                  </div>

                  {/* Filtering results */}
                  {filteredDishes.length === 0 ? (
                    <div className="text-center py-20 bg-white/[0.01] rounded border border-white/5">
                      <p className="text-sm text-[#8e9192] font-mono">Nenhum prato gastronômico coincide com sua pesquisa.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {filteredDishes.map((dish) => (
                        <DishCard
                          key={dish.id}
                          dish={dish}
                          currency={currency}
                          onAddToCart={() => handleAddToCart(dish)}
                          onOpenDetails={handleOpenDishDetails}
                        />
                      ))}
                    </div>
                  )}

                </div>
              )}

              {currentTab === 'reservations' && (
                <div className="pb-20">
                  <BookingSection 
                    onReservationComplete={(data) => {
                      setShowReservationNotify(true);
                      setTimeout(() => setShowReservationNotify(false), 5000);
                    }} 
                  />
                </div>
              )}

              {currentTab === 'sommelier' && (
                <div className="pb-20">
                  <SommelierTab
                    currency={currency}
                    onNavigateToTab={(tab) => setCurrentTab(tab)}
                    onAddWineDirect={(wineDish) => handleAddToCart(wineDish)}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Exquisite Footer */}
      <footer className="bg-brand-deep border-t border-white/5 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/5">
            {/* Column 1: Brand details */}
            <div className="flex flex-col space-y-4 text-center md:text-left">
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-brand-brass uppercase tracking-widest leading-none">
                  L'Élite Culinaire
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#8e9192] mt-2 font-mono">
                  Alta Gastronomia • Experiências Singulares
                </span>
              </div>
              <p className="text-xs text-[#8e9192] leading-relaxed max-w-sm mx-auto md:mx-0">
                Uma fusão sublime de arte gastronômica, sommelieria premiada e hospitalidade de classe mundial para paladares verdadeiramente exigentes.
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="flex flex-col space-y-4 text-center md:text-left">
              <span className="font-sans text-[11px] tracking-widest font-bold uppercase text-brand-brass">
                Navegação
              </span>
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-[#8e9192] max-w-xs mx-auto md:mx-0">
                <button onClick={() => setCurrentTab('home')} className="hover:text-white transition-colors text-left flex items-center justify-center md:justify-start gap-1.5 cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-brass/60"></span>
                  Início
                </button>
                <button onClick={() => setCurrentTab('menu')} className="hover:text-white transition-colors text-left flex items-center justify-center md:justify-start gap-1.5 cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-brass/60"></span>
                  Menu
                </button>
                <button onClick={() => setCurrentTab('sommelier')} className="hover:text-white transition-colors text-left flex items-center justify-center md:justify-start gap-1.5 cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-brass/60"></span>
                  Sommelier
                </button>
                <button onClick={() => setCurrentTab('reservations')} className="hover:text-white transition-colors text-left flex items-center justify-center md:justify-start gap-1.5 cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-brass/60"></span>
                  Reservas
                </button>
              </div>
            </div>

            {/* Column 3: Contact details updated as requested */}
            <div className="flex flex-col space-y-4 text-center md:text-left">
              <span className="font-sans text-[11px] tracking-widest font-bold uppercase text-brand-brass">
                Informações de Contato
              </span>
              <div className="flex flex-col space-y-3.5 text-xs text-[#8e9192] items-center md:items-start">
                <div className="flex items-center md:items-start gap-2.5">
                  <ChefHat className="w-4 h-4 text-brand-brass shrink-0" />
                  <div className="text-left">
                    <p className="text-white font-medium">Washington Brum Teixeira</p>
                    <p className="text-[9px] uppercase tracking-wider text-brand-brass/60 font-mono">Desenvolvedor Principal</p>
                  </div>
                </div>
                <a href="mailto:washi.webdev@gmail.com" className="hover:text-white flex items-center gap-2.5 transition-colors group">
                  <Mail className="w-4 h-4 text-brand-brass group-hover:text-white transition-colors shrink-0" />
                  <span>washi.webdev@gmail.com</span>
                </a>
                <a 
                  href="https://wa.me/5551992686368" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white flex items-center gap-2.5 transition-colors group"
                >
                  <MessageSquare className="w-4 h-4 text-brand-brass group-hover:text-white transition-colors shrink-0" />
                  <span className="flex items-center gap-1 font-mono">
                    +55 (51) 99268-6368
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[10px] text-brand-brass/80">↗</span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer Section */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Disclaimer text (discreta com menor opacidade) */}
            <div className="max-w-2xl text-center md:text-left">
              <p className="text-[10px] leading-relaxed text-[#8e9192]/40 font-sans">
                Este é um projeto conceitual desenvolvido exclusivamente para fins de demonstração, testes técnicos e composição de portfólio de desenvolvimento web.
              </p>
            </div>

            {/* Copyright Moderno */}
            <div className="text-xs text-[#8e9192]/60 font-mono whitespace-nowrap text-center md:text-right">
              © 2026 Washington Brum. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>

      {/* Global Interactive Elements: Cart Drawer overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            currency={currency}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onProceedToCheckout={handleLaunchCheckout}
          />
        )}
      </AnimatePresence>

      {/* Global Interactive Elements: Dish Details modal */}
      <AnimatePresence>
        {selectedDish && (
          <DishModal
            dish={selectedDish}
            currency={currency}
            onClose={() => setSelectedDish(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      {/* Floating fast booking validation message */}
      <AnimatePresence>
        {showReservationNotify && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-lg bg-black/95 text-white shadow-2xl border border-brand-brass/40 max-w-sm flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-brand-brass/15 border border-brand-brass/30 text-brand-brass rounded-full flex items-center justify-center flex-shrink-0 animate-gold-shimmer">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-bold text-white">Reserva Confirmada!</h5>
              <p className="text-xs text-[#8e9192] mt-0.5">Seus assentos e brinde já foram consolidados no L'Élite.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
