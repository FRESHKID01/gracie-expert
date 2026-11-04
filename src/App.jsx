import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { 
  BookOpen, Edit3, Sparkles, TrendingUp, Search, Layers, 
  Award, CheckCircle2, Star, Mail, ArrowRight, Menu, X, ChevronDown, Check, ExternalLink, Loader2 
} from 'lucide-react';

// Import your logo image
import logoImg from './assets/logo.jpeg';

// --- DATA STRUCTURES ---
const SERVICES_DATA = [
  {
    id: 'writing',
    category: 'Writing & Editing',
    title: 'Book Writing & Ghostwriting',
    description: 'Transform your vision, ideas, or manuscript drafts into a captivating, publish-ready book.',
    icon: BookOpen,
  },
  {
    id: 'developmental-editing',
    category: 'Writing & Editing',
    title: 'Developmental & Copy Editing',
    description: 'In-depth structural refinement, narrative pacing analysis, and precise grammar polishing.',
    icon: Edit3,
  },
  {
    id: 'formatting',
    category: 'Publishing',
    title: 'Formatting & Layout Design',
    description: 'Flawless print PDF layout design and reflowable eBook formatting for Kindle and EPUB.',
    icon: Layers,
  },
  {
    id: 'publishing',
    category: 'Publishing',
    title: 'Full Amazon & KDP Publishing',
    description: 'End-to-end setup on Amazon KDP, metadata optimization, pricing strategy, and copyright assistance.',
    icon: Sparkles,
  },
  {
    id: 'keywords',
    category: 'Marketing & SEO',
    title: 'Amazon Keywords Restructure',
    description: 'Algorithmic backend keyword optimization and category mapping to drive organic search rank.',
    icon: Search,
  },
  {
    id: 'marketing',
    category: 'Marketing & SEO',
    title: 'Book Promotion & Visibility Boost',
    description: 'Targeted marketing campaigns, author branding, arc team strategies, and sales conversions.',
    icon: TrendingUp,
  },
];

const PACKAGES_DATA = [
  {
    name: 'Essential Launch',
    price: 'Request for Quote',
    tagline: 'Ideal for first-time authors needing solid formatting and publishing prep.',
    features: [
      'eBook & Print Formatting',
      'Basic Amazon Metadata Setup',
      'Cover Design Optimization Check',
      'Amazon Keyword Restructure (5 Terms)',
      '1 Round of Proofreading'
    ],
    popular: false,
  },
  {
    name: 'Bestseller Accelerator',
    price: 'Request for Quote',
    tagline: 'Complete package for authors aiming for high ranking & strong visibility.',
    features: [
      'Full Developmental & Copy Editing',
      'Reflowable eBook & Print Formatting',
      'Amazon KDP Account Setup & Upload',
      'Advanced Amazon SEO & Category Restructure',
      '30-Day Targeted Book Promotion Campaign'
    ],
    popular: true,
  },
  {
    name: 'VIP Full-Service Suite',
    price: 'Request for Quote',
    tagline: 'Hands-off, premium ghostwriting to marketing pipeline.',
    features: [
      'Complete Book Ghostwriting / Co-writing',
      'Comprehensive Multi-pass Editing',
      'Custom Interior & Cover Formatting',
      'Full Amazon KDP + IngramSpark Publishing',
      '60-Day Full Marketing & Visibility Campaign'
    ],
    popular: false,
  },
];

const TESTIMONIALS_DATA = [
  {
    quote: "Lorena transformed my rough draft into an Amazon bestseller within 3 weeks of launch. Her keyword restructuring is pure magic!",
    author: "Sarah Jenkins",
    role: "Fiction Author",
    rating: 5.0,
  },
  {
    quote: "Working with Gracie ProExpert was seamless. The developmental editing gave my non-fiction book the exact structure it needed.",
    author: "Marcus Vance",
    role: "Business Consultant & Writer",
    rating: 4.8,
  },
  {
    quote: "7 years of experience really shows. She handled everything from formatting to full launch marketing on Amazon flawlessly.",
    author: "Elena Rostova",
    role: "Memoirist",
    rating: 5.0,
  },
  {
    quote: "The positioning review completely transformed how I marketed my second novel. Readers are finally finding and loving my work.",
    author: "David Vance",
    role: "Fantasy Author",
    rating: 4.6,
  },
  {
    quote: "Finding someone who genuinely understands Amazon KDP algorithms and editorial polish is rare. Lorena is top-tier.",
    author: "Julian Thorne",
    role: "Sci-Fi Author",
    rating: 4.9,
  },
  {
    quote: "From my rough notes to a fully formatted, beautifully positioned bestseller page—Lorena made the entire publishing journey effortless.",
    author: "Amara Okafor",
    role: "Self-Help & Wellness Writer",
    rating: 4.7,
  },
];

const FAQS_DATA = [
  {
    q: "How do we get started on my book project?",
    a: "You can select your package above or fill out the consultation form below with details about your manuscript genre, word count, and goals. We will review your priorities and outline a custom scope."
  },
  {
    q: "Do I retain full rights to my book?",
    a: "Yes, absolutely. All writing, editing, formatting, and publishing setups are done under your name and KDP account. You retain 100% of your publishing rights and royalties."
  },
  {
    q: "How long does a typical book marketing or publishing setup take?",
    a: "Timelines vary based on the scope. A positioning review takes about 3 to 5 business days, whereas full publishing preparation and marketing campaigns can span 2 to 4 weeks."
  },
  {
    q: "What is Amazon keyword restructuring and why do I need it?",
    a: "Amazon is a search engine for books. Keyword restructuring ensures your book appears in the most relevant sub-categories and search terms so high-intent readers can easily find your title."
  },
  {
    q: "Can you help if my book is only a rough draft or outline?",
    a: "Yes! Our services span full book writing, ghostwriting, and developmental editing to help take your core concepts from rough notes all the way to a reader-ready manuscript."
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedService, setSelectedService] = useState('');

  // Book Finder Widget State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTarget, setSearchTarget] = useState('amazon');

  // Formspree Hook with your ID
  const [state, handleSubmit] = useForm("mgaanozg");

  const categories = ['All', 'Writing & Editing', 'Publishing', 'Marketing & SEO'];

  const filteredServices = activeCategory === 'All' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(s => s.category === activeCategory);

  const handlePackageSelect = (pkgName) => {
    setSelectedService(pkgName);
    const formElement = document.getElementById('consultation-form');
    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const encoded = encodeURIComponent(searchQuery);
    const url = searchTarget === 'amazon' 
      ? `https://www.amazon.com/s?k=${encoded}&i=stripbooks`
      : `https://www.goodreads.com/search?q=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#070D18] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-900 overflow-x-hidden">
      
      {/* ---------------- NAVIGATION ---------------- */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 backdrop-blur-md bg-[#070D18]/85 border-b border-slate-800/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <motion.a href="#home" whileHover={{ scale: 1.03 }} className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-11 h-11 rounded-xl overflow-hidden bg-white p-0.5 shadow-lg shadow-amber-500/20 shrink-0 border border-amber-500/30"
            >
              <img src={logoImg} alt="Gracie Proexpert Logo" className="w-full h-full object-contain" />
            </motion.div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-wide text-white block leading-none">GRACIE PROEXPERT</span>
              <span className="text-[9px] tracking-widest text-amber-400 font-semibold uppercase">Academy & Consultancy</span>
            </div>
          </motion.a>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
            <a href="#services" className="hover:text-amber-400 transition-colors">Services</a>
            <a href="#packages" className="hover:text-amber-400 transition-colors">Packages</a>
            <a href="#finder" className="hover:text-amber-400 transition-colors">Book Finder</a>
            <a href="#testimonials" className="hover:text-amber-400 transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a>
            <motion.a 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold hover:brightness-110 transition-all shadow-md shadow-amber-500/15"
            >
              Get Started
            </motion.a>
          </nav>

          <button className="md:hidden text-slate-300 focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0F172A] border-b border-slate-800 px-4 pt-4 pb-6 space-y-3"
            >
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 py-2">About</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 py-2">Services</a>
              <a href="#packages" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 py-2">Packages</a>
              <a href="#finder" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 py-2">Book Finder</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 py-2">Testimonials</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 py-2">FAQ</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-center py-3 rounded-xl bg-amber-500 text-slate-950 font-bold">
                Get Started
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ---------------- HERO SECTION ---------------- */}
      <section id="home" className="relative pt-24 pb-20 overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" 
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg shadow-amber-500/5"
            >
              <Award size={14} /> Full-Service Book Marketing & Publishing
            </motion.span>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight max-w-5xl mx-auto">
              Turn Your Manuscript Into a <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">Bestselling Success</span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              Empower your author journey with end-to-end writing, editing, formatting, and Amazon keyword restructuring tailored for maximum reach.
            </p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a 
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:shadow-xl hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
              >
                Book Consultation <ArrowRight size={18} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="#finder" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Book Finder <Search size={16} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- INFINITE MARQUEE TICKER ---------------- */}
      <div className="py-6 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-slate-950 font-extrabold overflow-hidden whitespace-nowrap shadow-2xl rotate-[-1deg] scale-105 my-8">
        <div className="inline-block animate-[marquee_25s_linear_infinite] uppercase tracking-widest text-xs sm:text-sm">
          <span>★ AMAZON BESTSELLER STRATEGY</span>
          <span className="mx-6">✦</span>
          <span>7+ YEARS EXPERIENCE</span>
          <span className="mx-6">✦</span>
          <span>GHOSTWRITING & EDITING</span>
          <span className="mx-6">✦</span>
          <span>KEYWORD RESTRUCTURE</span>
          <span className="mx-6">✦</span>
          <span>KDP PUBLISHING EXPERT</span>
          <span className="mx-6">✦</span>
          <span>AMAZON BESTSELLER STRATEGY</span>
          <span className="mx-6">✦</span>
          <span>7+ YEARS EXPERIENCE</span>
          <span className="mx-6">✦</span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ---------------- ABOUT SECTION ---------------- */}
      <section id="about" className="py-24 bg-[#0B132B] border-y border-slate-800/80 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} 
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover={{ y: -5 }}
            className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-900/95 border border-amber-500/30 shadow-[0_20px_60px_rgba(245,158,11,0.15)] relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-white p-2.5 flex items-center justify-center shrink-0 shadow-2xl border-2 border-amber-500/40"
              >
                <img src={logoImg} alt="Gracie Proexpert Logo" className="w-full h-full object-contain rounded-xl" />
              </motion.div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl sm:text-4xl font-black text-white">Lorena Clowers</h2>
                  <span className="text-amber-400 font-bold text-xs px-3.5 py-1 bg-amber-400/15 rounded-full border border-amber-400/30 shadow-sm">Grace-Expert</span>
                </div>
                
                <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed font-normal italic">
                  "With 7+ years of experience, I empower authors through expert writing, editing, publishing, and strategic Amazon marketing to turn books into bestsellers."
                </p>

                <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold text-amber-300">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-amber-500/20"><CheckCircle2 size={14} className="text-amber-400" /> 7+ Years Experience</span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-amber-500/20"><CheckCircle2 size={14} className="text-amber-400" /> Countless Authors Helped</span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-amber-500/20"><CheckCircle2 size={14} className="text-amber-400" /> Amazon KDP Specialist</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- SERVICES SECTION ---------------- */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black text-white"
          >
            Full-Suite Book Services
          </motion.h2>
          <p className="text-slate-400 mt-3 text-base">From initial writing and editing to high-impact Amazon marketing.</p>

          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md ${
                  activeCategory === cat 
                    ? 'bg-amber-500 text-slate-950 shadow-amber-500/30' 
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/50'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -8, scale: 1.02, borderColor: 'rgba(245, 158, 11, 0.6)' }}
                  key={service.id}
                  className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl transition-all group relative overflow-hidden"
                >
                  <div className="absolute -right-12 -top-12 w-32 h-32 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/15 transition-all" />
                  
                  <div className="w-14 h-14 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-md">
                    <IconComponent size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ---------------- PACKAGES SECTION ---------------- */}
      <section id="packages" className="py-24 bg-[#0B132B] border-t border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-white">Custom Service Packages</h2>
            <p className="text-slate-400 mt-3 text-base">Choose the right tier to launch or scale your book.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PACKAGES_DATA.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between shadow-2xl transition-all ${
                  pkg.popular 
                    ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-[#121c38] border-2 border-amber-500 shadow-amber-500/20 lg:-translate-y-4' 
                    : 'bg-slate-900/60 border border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {pkg.popular && (
                  <motion.span 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg"
                  >
                    Most Popular
                  </motion.span>
                )}
                <div>
                  <h3 className="text-2xl font-black text-white">{pkg.name}</h3>
                  
                  <div className="mt-4">
                    <span className="inline-block px-3.5 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 font-extrabold text-sm tracking-wide shadow-sm">
                      {pkg.price}
                    </span>
                  </div>

                  <p className="mt-4 text-slate-400 text-sm leading-relaxed">{pkg.tagline}</p>

                  <ul className="mt-8 space-y-3.5">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                        <Check size={16} className="text-amber-400 shrink-0 mt-1 font-bold" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handlePackageSelect(pkg.name)}
                  className={`mt-10 w-full py-4 rounded-xl font-black transition-all shadow-lg ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-amber-500/30'
                      : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  Get Custom Quote
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- BOOK FINDER WIDGET SECTION (Requested Feature) ---------------- */}
      <section id="finder" className="py-24 bg-[#070D18] border-t border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#0B132B] border border-amber-500/30 shadow-2xl grid lg:grid-cols-2 gap-10 items-center"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">A Quick Way To Find A Book</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-4">Start with a book you have in mind.</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Enter a title, author, or ISBN, then choose Amazon or Goodreads. The selected site opens in a new tab, where you can browse its current listings and open the exact book page.
              </p>
              <p className="text-xs text-slate-500 italic">
                * Searches go directly to Amazon or Goodreads. This page does not collect or copy catalog results.
              </p>
            </div>

            <div className="bg-slate-950/80 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
              <form onSubmit={handleBookSearch} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Book title, author or ISBN</label>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Atomic Habits or James Clear" 
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Choose where to search</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setSearchTarget('amazon')}
                      className={`p-3.5 rounded-xl border text-left text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${searchTarget === 'amazon' ? 'border-amber-500 bg-amber-500/15 text-white shadow-md' : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'}`}
                    >
                      <span>Amazon Books</span>
                      <ExternalLink size={16} className="text-amber-400" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchTarget('goodreads')}
                      className={`p-3.5 rounded-xl border text-left text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${searchTarget === 'goodreads' ? 'border-amber-500 bg-amber-500/15 text-white shadow-md' : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'}`}
                    >
                      <span>Goodreads</span>
                      <ExternalLink size={16} className="text-amber-400" />
                    </button>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-extrabold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  Search <Search size={16} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS SECTION ---------------- */}
      <section id="testimonials" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white">Author Success Stories</h2>
          <p className="text-slate-400 mt-3 text-base">See what authors say about our marketing and publishing services.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-8 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between shadow-xl transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(Math.floor(t.rating))].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-xs font-extrabold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                    {t.rating} / 5.0
                  </span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">"{t.quote}"</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <p className="font-bold text-white text-sm">{t.author}</p>
                <p className="text-xs text-slate-500 mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- FAQ SECTION ---------------- */}
      <section id="faq" className="py-24 bg-[#0B132B] border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-white">Frequently Asked Questions</h2>
            <p className="text-slate-400 mt-3 text-base">Everything you need to know about our publishing and consultancy process.</p>
          </div>

          <div className="space-y-4">
            {FAQS_DATA.map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-lg"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left font-bold text-white flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown size={20} className={`text-amber-400 shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-6 pb-6 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-800/80 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CONSULTATION FORM SECTION ---------------- */}
      <section id="contact" className="py-24 bg-[#070D18] border-t border-slate-800 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-black text-white">Start Your Book Journey</h2>
            <p className="text-slate-400 mt-3 text-base">Send a query or select your package for a personalized action plan.</p>
          </div>

          <motion.div 
            id="consultation-form"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-amber-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            {state.succeeded ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-16"
              >
                <CheckCircle2 size={60} className="text-amber-400 mx-auto mb-4 animate-bounce" />
                <h3 className="text-3xl font-black text-white">Message Delivered!</h3>
                <p className="text-slate-400 mt-2 text-base">Thank you for reaching out. Lorena will review your message and get back to your inbox shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required 
                      placeholder="Jane Doe" 
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm shadow-inner"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs mt-1" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Your Email</label>
                    <input 
                      id="email"
                      type="email" 
                      name="email"
                      required 
                      placeholder="jane@example.com" 
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm shadow-inner"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Selected Service / Package</label>
                  <select 
                    name="service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm shadow-inner"
                  >
                    <option value="">Select service or package...</option>
                    <option value="Essential Launch">Package: Essential Launch (Request Quote)</option>
                    <option value="Bestseller Accelerator">Package: Bestseller Accelerator (Request Quote)</option>
                    <option value="VIP Full-Service Suite">Package: VIP Full-Service Suite (Request Quote)</option>
                    <option value="Custom Writing / Ghostwriting">Custom Writing / Ghostwriting</option>
                    <option value="Developmental Editing">Developmental Editing</option>
                    <option value="Amazon Keyword Restructure">Amazon Keyword Restructure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Project Details</label>
                  <textarea 
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your book genre, stage of completion, and goals..." 
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm shadow-inner"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  disabled={state.submitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-base hover:brightness-110 transition-all shadow-xl shadow-amber-500/25 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {state.submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending message...
                    </>
                  ) : (
                    'Send Consultation Request'
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="py-12 bg-[#040812] border-t border-slate-800 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-white text-base">GRACIE PROEXPERT Academy & Consultancy</p>
            <p className="text-xs text-slate-500 mt-1">Lorena Clowers (Grace-expert) • Professional Book Marketing & Full Services</p>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <Mail size={16} className="text-amber-400" />
            <a href="mailto:gracieproexpert@gmail.com" className="hover:text-amber-400 transition-colors">
              gracieproexpert@gmail.com
            </a>
          </div>

          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Gracie ProExpert. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}