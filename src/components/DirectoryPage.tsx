import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Search, MapPin, Globe, Mail, Phone, Plus, 
  ArrowLeft, CheckCircle2, Star, Briefcase, Filter, X, Sparkles, Share2
} from 'lucide-react';
import { Footer } from './Footer';
import asaeLogo from '../assets/images/asae_logo_1781797572399.jpg';

export interface Company {
  id: string;
  name: string;
  category: string;
  hqLocation: string; // e.g., 'Luanda, Angola' or 'Johannesburg, South Africa'
  originType: 'Angola' | 'Angola-SA'; // Based in Angola vs. Based in South Africa
  description: string;
  website: string;
  email: string;
  phone: string;
  featured?: boolean;
  registeredDate: string;
}

const DEFAULT_COMPANIES: Company[] = [
  {
    id: '1',
    name: 'Unitel Angola Limitada',
    category: 'Technology & Telecom',
    hqLocation: 'Luanda, Angola',
    originType: 'Angola',
    description: 'The largest telecommunications provider in Angola, delivering premium high-speed fiber solutions and mobile connectivity across the SADC region.',
    website: 'https://www.unitel.ao',
    email: 'corporate@unitel.ao',
    phone: '+244 923 100 100',
    featured: true,
    registeredDate: '2026-01-15'
  },
  {
    id: '2',
    name: 'Sonangol E.P.',
    category: 'Energy & Mining',
    hqLocation: 'Luanda, Angola',
    originType: 'Angola',
    description: 'The state-owned corporation that oversees petroleum and natural gas production in Angola, driving regional energy infrastructure investments.',
    website: 'https://www.sonangol.co.ao',
    email: 'info@sonangol.co.ao',
    phone: '+244 222 664 000',
    featured: true,
    registeredDate: '2025-11-20'
  },
  {
    id: '3',
    name: 'Ango-SA Trade Logistics',
    category: 'Import & Export',
    hqLocation: 'Johannesburg, South Africa',
    originType: 'Angola-SA',
    description: 'Premier logistical corridors transporting agricultural machinery and manufactured goods between Johannesburg dry ports and Luanda harbors.',
    website: 'https://www.angosatrade.co.za',
    email: 'operations@angosatrade.co.za',
    phone: '+27 11 482 1900',
    featured: true,
    registeredDate: '2026-03-02'
  },
  {
    id: '4',
    name: 'Kallango Private Equity',
    category: 'Finance & Advisory',
    hqLocation: 'Sandton, South Africa',
    originType: 'Angola-SA',
    description: 'Bespoke venture capital and wealth management advisory assisting Angolan HNWI and corporate giants in establishing South African operations.',
    website: 'https://www.kallango.com',
    email: 'partner@kallango.com',
    phone: '+27 11 904 2231',
    featured: false,
    registeredDate: '2026-04-10'
  },
  {
    id: '5',
    name: 'Banco de Fomento Angola (BFA)',
    category: 'Finance & Advisory',
    hqLocation: 'Luanda, Angola',
    originType: 'Angola',
    description: 'Leading private commercial bank in Angola, offering comprehensive bilateral financial services and sovereign trade transaction backing.',
    website: 'https://www.bfa.ao',
    email: 'institutional@bfa.ao',
    phone: '+244 222 694 400',
    featured: true,
    registeredDate: '2026-02-18'
  },
  {
    id: '6',
    name: 'Sodiam Diamond Brokerage',
    category: 'Energy & Mining',
    hqLocation: 'Luanda, Angola',
    originType: 'Angola',
    description: 'The national diamond marketing company of Angola, controlling and organizing all diamond sell-side pipelines and international valuations.',
    website: 'https://www.sodiam.co.ao',
    email: 'contact@sodiam.co.ao',
    phone: '+244 222 331 400',
    featured: false,
    registeredDate: '2026-05-25'
  },
  {
    id: '7',
    name: 'Mona-Liza Hospitality Group',
    category: 'Travel & Tourism',
    hqLocation: 'Cape Town, South Africa',
    originType: 'Angola-SA',
    description: 'Premium hospitality and curated diplomatic stays in Cape Town catering exclusively to Angolan state delegates, embassy personnel, and travel agents.',
    website: 'https://www.monalizagroup.co.za',
    email: 'stay@monalizagroup.co.za',
    phone: '+27 21 445 1121',
    featured: false,
    registeredDate: '2026-06-12'
  }
];

interface DirectoryPageProps {
  onNavigateHome: () => void;
}

export function DirectoryPage({ onNavigateHome }: DirectoryPageProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Angola' | 'Angola-SA'>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form Fields State
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Technology & Telecom');
  const [formHqLocation, setFormHqLocation] = useState('');
  const [formOriginType, setFormOriginType] = useState<'Angola' | 'Angola-SA'>('Angola');
  const [formDescription, setFormDescription] = useState('');
  const [formWebsite, setFormWebsite] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    // Load persisted companies or set default ones
    const saved = localStorage.getItem('asae_business_directory');
    if (saved) {
      try {
        setCompanies(JSON.parse(saved));
      } catch (err) {
        setCompanies(DEFAULT_COMPANIES);
      }
    } else {
      setCompanies(DEFAULT_COMPANIES);
      localStorage.setItem('asae_business_directory', JSON.stringify(DEFAULT_COMPANIES));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categories = ['All', 'Technology & Telecom', 'Energy & Mining', 'Finance & Advisory', 'Import & Export', 'Travel & Tourism'];

  const filteredCompanies = companies.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.hqLocation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesFilter = selectedFilter === 'All' || c.originType === selectedFilter;

    return matchesSearch && matchesCategory && matchesFilter;
  });

  const handleSubmitCompany = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formName || !formHqLocation || !formDescription || !formEmail) {
      setFormError('Please fill in all required fields marked with *');
      return;
    }

    const newCompany: Company = {
      id: 'COMP-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      name: formName,
      category: formCategory,
      hqLocation: formHqLocation,
      originType: formOriginType,
      description: formDescription,
      website: formWebsite || '#',
      email: formEmail,
      phone: formPhone || 'Not Specified',
      registeredDate: new Date().toISOString().split('T')[0],
      featured: false
    };

    const updated = [newCompany, ...companies];
    setCompanies(updated);
    localStorage.setItem('asae_business_directory', JSON.stringify(updated));

    setFormSuccess(true);
    setTimeout(() => {
      // Reset form
      setFormName('');
      setFormHqLocation('');
      setFormDescription('');
      setFormWebsite('');
      setFormEmail('');
      setFormPhone('');
      setFormSuccess(false);
      setIsFormOpen(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-dark text-ivory flex flex-col selection:bg-gold/30 selection:text-white">
      {/* Dynamic SADC Theme top strip */}
      <div className="h-[4px] w-full bg-gradient-to-r from-angola-red via-gold to-sa-green sticky top-0 z-50 shadow-md" />

      {/* Main Header */}
      <header className="border-b border-white/5 bg-dark/95 backdrop-blur-md sticky top-[4px] z-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={asaeLogo} 
              alt="ASAE Logo" 
              className="w-10 h-10 object-cover rounded-full border border-gold/30"
              referrerPolicy="no-referrer"
            />
            <div className="text-left">
              <span className="font-serif text-lg font-bold tracking-wider text-gold block leading-none">ASAE Directory</span>
              <span className="font-sans text-[9px] tracking-widest text-gold-pale/50 uppercase block mt-1">Bilateral Trade & Business Index</span>
            </div>
          </div>

          <button 
            onClick={onNavigateHome}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-xs font-bold font-sans tracking-wider hover:border-gold hover:text-gold hover:bg-gold/5 transition-all cursor-pointer group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            BACK TO PORTAL
          </button>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-dark-card to-dark border-b border-white/5 py-12 md:py-20 px-6 md:px-12 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 text-gold rounded-full text-[10px] font-mono uppercase tracking-widest">
            <Briefcase size={10} /> World Class Bilateral Directory
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-ivory">
            Angola & South Africa <br />
            <span className="text-gold">SADC Corporate Directory</span>
          </h1>
          <p className="text-xs md:text-sm text-dim leading-relaxed max-w-xl mx-auto">
            Discover and connect with premium Angolan corporations operating inside Angola and dual Angolan-founded operations scaled across South Africa.
          </p>
          
          <div className="pt-4 flex justify-center">
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-light text-dark font-sans text-xs font-black tracking-widest uppercase rounded-lg shadow-lg hover:shadow-gold/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Plus size={15} strokeWidth={2.5} />
              LIST YOUR COMPANY NOW
            </button>
          </div>
        </div>
      </section>

      {/* Directory Grid / Filtering Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 py-12">
        <div className="space-y-8">
          
          {/* Controls Bar: Search & Location Filter */}
          <div className="bg-dark-card border border-white/5 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Box */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" size={16} />
              <input
                type="text"
                placeholder="Search by company name, description, hq..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-dark border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs font-sans text-ivory placeholder-dim focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Location origin filters */}
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {[
                { key: 'All', label: 'All Companies' },
                { key: 'Angola', label: 'Angolan Companies based in Angola' },
                { key: 'Angola-SA', label: 'Angolan Companies based in SA' }
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setSelectedFilter(opt.key as any)}
                  className={`px-4 py-2 text-xs font-bold tracking-wider rounded-lg font-sans transition-all shrink-0 cursor-pointer ${
                    selectedFilter === opt.key 
                      ? 'bg-gold text-dark' 
                      : 'bg-white/5 hover:bg-white/10 text-dim border border-white/5'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none border-b border-white/5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-sans tracking-wide transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-gold/15 text-gold border border-gold/40' 
                    : 'bg-transparent text-dim hover:text-ivory'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Summary */}
          <div className="flex justify-between items-center text-xs font-sans text-dim">
            <p>Showing {filteredCompanies.length} Verified Bilateral Corporations</p>
            {selectedCategory !== 'All' || selectedFilter !== 'All' || searchTerm ? (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedFilter('All');
                }}
                className="text-gold hover:underline font-bold"
              >
                Clear all filters
              </button>
            ) : null}
          </div>

          {/* Company Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company, index) => (
                <div 
                  key={company.id || index}
                  className="bg-dark-card border border-white/10 hover:border-gold/35 rounded-2xl p-6 shadow-xl flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
                >
                  {/* Featured Badge Glow */}
                  {company.featured && (
                    <div className="absolute top-0 right-0 bg-gold text-dark text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl flex items-center gap-1">
                      <Star size={9} fill="currentColor" /> Verified Leader
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Header: Initial & Category */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-serif text-xl font-bold shrink-0">
                        {company.name ? company.name[0] : 'C'}
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-gold uppercase tracking-wider block">
                          {company.category}
                        </span>
                        <h3 className="font-serif text-base font-bold text-ivory group-hover:text-gold transition-colors block leading-tight mt-0.5">
                          {company.name}
                        </h3>
                      </div>
                    </div>

                    {/* Location Badge */}
                    <div className="flex items-center gap-1.5 text-xs text-dim">
                      <MapPin size={13} className="text-gold" />
                      <span>{company.hqLocation}</span>
                      <span className="mx-1.5 opacity-30">•</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        company.originType === 'Angola' 
                          ? 'bg-angola-red/10 text-angola-red border border-angola-red/20' 
                          : 'bg-sa-green/10 text-sa-green border border-sa-green/20'
                      }`}>
                        {company.originType === 'Angola' ? 'AO Registered' : 'AO • ZA Cross-Border'}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-dim leading-relaxed line-clamp-3">
                      {company.description}
                    </p>
                  </div>

                  {/* Actions / Contact Details */}
                  <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
                    <div className="flex flex-col gap-1.5 text-[10px] font-mono text-dim">
                      <div className="flex items-center gap-2">
                        <Mail size={11} className="text-gold/60" />
                        <span>{company.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={11} className="text-gold/60" />
                        <span>{company.phone}</span>
                      </div>
                    </div>

                    <a 
                      href={company.website}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full text-center block py-2.5 bg-white/5 hover:bg-gold hover:text-dark text-[10px] font-sans font-bold tracking-widest uppercase rounded-lg border border-white/5 hover:border-gold transition-all"
                    >
                      VISIT WEBSITE
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center space-y-4">
                <Building2 className="mx-auto text-dim/30" size={48} />
                <h3 className="font-serif text-lg font-bold text-ivory">No Companies Match Filters</h3>
                <p className="text-xs text-dim max-w-sm mx-auto">
                  Try adjusting your keywords, search criteria, or category tabs to discover registered bilateral SADC corporations.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedFilter('All');
                  }}
                  className="px-4 py-2 border border-gold/30 rounded-lg text-xs text-gold hover:bg-gold/5"
                >
                  RESET SEARCH
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ONLINE FORM DIALOG (MODAL OVERLAY) */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 bg-dark/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-dark-card border border-white/10 rounded-2xl w-full max-w-xl shadow-2xl relative overflow-hidden"
            >
              {/* Gold Top line */}
              <div className="h-[3px] bg-gold" />

              <div className="p-6 md:p-8 space-y-6">
                
                {/* Modal Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-ivory flex items-center gap-2">
                      <Plus size={18} className="text-gold" />
                      List Your Corporation
                    </h2>
                    <p className="text-xs text-dim mt-1">
                      Provide verified corporate details to publish directly inside the SADC registry index.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsFormOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-dim hover:text-ivory cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {formSuccess ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-sa-green/10 text-sa-green flex items-center justify-center mx-auto animate-bounce">
                      <CheckCircle2 size={30} />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-ivory">Company Listed Successfully!</h3>
                    <p className="text-xs text-dim">
                      Your business profile has been integrated and is now live on the SADC directory list.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitCompany} className="space-y-4">
                    
                    {formError && (
                      <div className="p-3 bg-angola-red/10 border border-angola-red/30 rounded-lg text-xs text-angola-red font-mono">
                        {formError}
                      </div>
                    )}

                    {/* Company Name */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-gold mb-1.5">Company Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Angola Diamond Logistics S.A."
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-dark border border-white/10 rounded-lg py-2.5 px-3 text-xs text-ivory focus:outline-none focus:border-gold placeholder-dim"
                      />
                    </div>

                    {/* Category Selector */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-gold mb-1.5">Industry Category *</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full bg-dark border border-white/10 rounded-lg py-2.5 px-3 text-xs text-ivory focus:outline-none focus:border-gold"
                      >
                        <option value="Technology & Telecom">Technology & Telecom</option>
                        <option value="Energy & Mining">Energy & Mining</option>
                        <option value="Finance & Advisory">Finance & Advisory</option>
                        <option value="Import & Export">Import & Export</option>
                        <option value="Travel & Tourism">Travel & Tourism</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* HQ City & Country */}
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-gold mb-1.5">HQ Location *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Luanda, Angola"
                          value={formHqLocation}
                          onChange={(e) => setFormHqLocation(e.target.value)}
                          className="w-full bg-dark border border-white/10 rounded-lg py-2.5 px-3 text-xs text-ivory focus:outline-none focus:border-gold placeholder-dim"
                        />
                      </div>

                      {/* Origin Filter Type */}
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-gold mb-1.5">Bilateral Presence *</label>
                        <select
                          value={formOriginType}
                          onChange={(e) => setFormOriginType(e.target.value as any)}
                          className="w-full bg-dark border border-white/10 rounded-lg py-2.5 px-3 text-xs text-ivory focus:outline-none focus:border-gold"
                        >
                          <option value="Angola">Angolan Company based in Angola</option>
                          <option value="Angola-SA">Angolan Company based in South Africa</option>
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-gold mb-1.5">Corporate Description *</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Provide a comprehensive profile of your cross-border services, regional trading weight, and SADC operations..."
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        className="w-full bg-dark border border-white/10 rounded-lg py-2.5 px-3 text-xs text-ivory focus:outline-none focus:border-gold placeholder-dim resize-none"
                      />
                    </div>

                    {/* Website */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-gold mb-1.5">Website URL</label>
                      <input
                        type="url"
                        placeholder="e.g. https://www.yourcompany.com"
                        value={formWebsite}
                        onChange={(e) => setFormWebsite(e.target.value)}
                        className="w-full bg-dark border border-white/10 rounded-lg py-2.5 px-3 text-xs text-ivory focus:outline-none focus:border-gold placeholder-dim"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-gold mb-1.5">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. contact@company.com"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          className="w-full bg-dark border border-white/10 rounded-lg py-2.5 px-3 text-xs text-ivory focus:outline-none focus:border-gold placeholder-dim"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-gold mb-1.5">Phone Number</label>
                        <input
                          type="text"
                          placeholder="e.g. +244 222 101 202"
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          className="w-full bg-dark border border-white/10 rounded-lg py-2.5 px-3 text-xs text-ivory focus:outline-none focus:border-gold placeholder-dim"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="w-1/3 py-3 border border-white/10 hover:bg-white/5 rounded-lg text-xs font-sans font-bold text-dim hover:text-ivory transition-colors cursor-pointer"
                      >
                        CANCEL
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 py-3 bg-gold hover:bg-gold-light text-dark font-sans text-xs font-black tracking-widest uppercase rounded-lg shadow-lg transition-colors cursor-pointer"
                      >
                        PUBLISH TO DIRECTORY
                      </button>
                    </div>

                  </form>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}
