import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Footer } from './Footer';
import { 
  ArrowLeft, Newspaper, BookOpen, Calendar, Mic2, ShieldAlert,
  ChevronRight, Sparkles, CheckCircle2, Globe, ArrowRight,
  Tv, Award, Users, MapPin, Plane, Clock, ShieldCheck, Mail, Phone,
  FileText, Play, Activity, Check, Heart, Trophy, Zap
} from 'lucide-react';
import asaeLogo from '../assets/images/asae_logo_1781797572399.jpg';

export type ServiceTab = 'journalism' | 'training' | 'management' | 'host' | 'protocol';

interface ServicesPageProps {
  initialService: ServiceTab;
  onNavigateHome: () => void;
}

export function ServicesPage({ initialService, onNavigateHome }: ServicesPageProps) {
  const [activeTab, setActiveTab] = useState<ServiceTab>(initialService);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({
    clearance: true,
    transport: true,
    hotel: false,
    lounge: false
  });

  useEffect(() => {
    setActiveTab(initialService);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialService]);

  const updateHashAndTab = (tab: ServiceTab) => {
    setActiveTab(tab);
    window.location.hash = `#services-${tab}`;
  };

  const servicesList = [
    { 
      id: 'journalism', 
      label: 'Journalism', 
      icon: Newspaper, 
      desc: 'Bilateral Press & Sovereign Reporting',
      tagline: 'Authoritative Bilateral Journalism & Executive Digests',
      longDesc: 'Delivering uncompromised, in-depth analytical journalism that chronicles the commercial, cultural, and political developments between Angola and South Africa. Our team of seasoned correspondents bridges the SADC region with reliable public logs, bilateral policy assessments, and exclusive winner spotlights.'
    },
    { 
      id: 'training', 
      label: 'Training Programs', 
      icon: BookOpen, 
      desc: 'Pan-African Leadership CURRICULUMS',
      tagline: 'Capacity Building & Elite Bilateral Executive Curriculums',
      longDesc: 'Nurturing the next generation of Pan-African champions. We offer specialized workshops, masterclasses in cross-border diplomacy, and bilateral business protocols developed in partnership with leading global academic advisors and trade authorities.'
    },
    { 
      id: 'management', 
      label: 'Event Management', 
      icon: Calendar, 
      desc: 'PRESTIGIOUS SUMMIT ORCHESTRATION',
      tagline: 'Bespoke Production & Production Logistics of Elite Assemblies',
      longDesc: 'End-to-end blueprinting, management, and execution of high-profile bilateral conferences, summits, and award galas. From secure VIP seating, stage production, world-class catering, to multi-angle digital live broadcast infrastructure.'
    },
    { 
      id: 'host', 
      label: 'Event Host', 
      icon: Mic2, 
      desc: 'Bilingual Ceremony Master OF FLOW',
      tagline: 'Multilingual Master of Ceremonies & High-Level Protocol MC',
      longDesc: 'Providing world-class, charismatic, bilingual (English & Portuguese) Masters of Ceremonies trained in formal diplomatic conventions. Our hosts ensure flawless verbal transitions, vibrant audience engagements, and impeccable stage poise.'
    },
    { 
      id: 'protocol', 
      label: 'Protocol Services', 
      icon: ShieldAlert, 
      desc: 'VIP logistics & diplomatic clearances',
      tagline: 'Elite Diplomatic Escort, Airport Clearances & Safe Havens',
      longDesc: 'Premium logistical hospitality and secure transport tailored for heads of state, embassy delegates, and business directors traveling between Angola and South Africa. We oversee expedited terminal clearances, elite convoys, and secure accommodation liaisons.'
    }
  ] as const;

  const currentService = servicesList.find(s => s.id === activeTab) || servicesList[0];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@asae.co.za');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  // Mock data for Journalism section
  const journalismDigests = [
    { title: 'The Rise of SADC Tech Corridors: Luanda to Johannesburg', category: 'Economy', date: 'July 12, 2026', readTime: '5 min read' },
    { title: 'Bilateral Trade Agreements: Opportunities in Agri-business', category: 'Trade', date: 'July 09, 2026', readTime: '8 min read' },
    { title: 'Exclusive: Interview with ASAE 2026 Lifetime Achievement Nominee', category: 'Interviews', date: 'June 28, 2026', readTime: '12 min read' }
  ];

  // Mock curriculum modules for Training
  const trainingModules = [
    { code: 'BTP-401', title: 'Bilateral Trade Protocols & Tariffs', duration: '4 Weeks', level: 'Executive' },
    { code: 'SCD-502', title: 'SADC Cross-Border Diplomacy', duration: '6 Weeks', level: 'Diplomatic Core' },
    { code: 'PEL-101', title: 'Pan-African Leadership & Public Ethics', duration: '2 Weeks', level: 'Youth Leaders' },
    { code: 'EDM-303', title: 'Economic Development Masterclass', duration: '3 Weeks', level: 'Corporate' }
  ];

  // Event production stages
  const productionStages = [
    { step: 'Stage 1: Vetting & Blueprints', desc: 'SADC safety checks, stage designs, and complete seating layouts.' },
    { step: 'Stage 2: Technical Rehearsal', desc: 'Bilingual audio balancing, multi-camera configuration, and timing.' },
    { step: 'Stage 3: Protocol Alignments', desc: 'Embassy coordination, secure route locks, and delegate credential keys.' },
    { step: 'Stage 4: Live Broadcast Transmission', desc: 'Ultra-low latency streaming to thousands of global virtual delegates.' }
  ];

  return (
    <div className="min-h-screen bg-dark text-ivory flex flex-col selection:bg-gold/30 selection:text-white">
      {/* SADC Theme border strip */}
      <div className="h-[4px] w-full bg-gradient-to-r from-angola-red via-gold to-sa-green sticky top-0 z-50 shadow-md" />

      {/* Header */}
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
              <span className="font-serif text-lg font-bold tracking-wider text-gold block leading-none">ASAE Services</span>
              <span className="font-sans text-[9px] tracking-widest text-gold-pale/50 uppercase block mt-1">Bilateral Operations Desk</span>
            </div>
          </div>

          <button 
            onClick={onNavigateHome}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg text-xs font-bold font-sans tracking-wider hover:border-gold hover:text-gold hover:bg-gold/5 transition-all cursor-pointer group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            BACK TO HOME
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* SIDEBAR NAVIGATION - 4 Columns */}
          <section className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-6">
              
              {/* Back card */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="font-serif text-base font-bold text-gold-pale mb-2">Our Mission</h3>
                <p className="text-xs text-dim leading-relaxed mb-4">
                  ASAE provides verified bilateral infrastructure, media distribution channels, and leadership frameworks dedicated to reinforcing strategic collaborations across the African continent.
                </p>
                <button 
                  onClick={onNavigateHome}
                  className="w-full py-3 bg-white/5 hover:bg-gold hover:text-dark text-xs font-bold tracking-wider rounded-lg border border-white/10 hover:border-gold transition-all text-center cursor-pointer font-sans"
                >
                  RETURN TO HOME PORTAL
                </button>
              </div>

              {/* Navigation Items */}
              <div className="bg-dark-card border border-white/5 rounded-2xl p-3 shadow-xl space-y-1">
                <div className="text-[10px] font-sans font-bold text-gold uppercase tracking-[2px] px-4 py-2 border-b border-white/5 mb-2">
                  EXPLORE SERVICES
                </div>
                {servicesList.map(item => {
                  const Icon = item.icon;
                  const isSelected = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => updateHashAndTab(item.id)}
                      className={`w-full flex items-start gap-4 p-4 rounded-xl text-left transition-all cursor-pointer border ${
                        isSelected 
                          ? 'bg-gold border-gold text-dark shadow-lg shadow-gold/15' 
                          : 'border-transparent text-dim hover:text-ivory hover:bg-white/5 hover:border-white/5'
                      }`}
                    >
                      <Icon size={18} className={`shrink-0 mt-0.5 ${isSelected ? 'text-dark' : 'text-gold'}`} />
                      <div>
                        <span className={`block font-serif text-sm font-bold ${isSelected ? 'text-dark font-black' : 'text-ivory'}`}>
                          {item.label}
                        </span>
                        <span className={`block text-[10px] ${isSelected ? 'text-dark/70 font-medium' : 'text-dim'} mt-0.5 leading-tight uppercase tracking-wider`}>
                          {item.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Support Card */}
              <div className="p-5 rounded-2xl bg-gold/5 border border-gold/15 space-y-3">
                <h4 className="font-serif text-sm font-bold text-gold flex items-center gap-2">
                  <Sparkles size={14} className="animate-pulse" /> Need Direct Engagement?
                </h4>
                <p className="text-[11px] text-dim leading-relaxed">
                  Submit a custom proposal or logistics brief directly to our diplomatic coordinators at the ASAE Secretariat.
                </p>
                <div className="bg-dark border border-white/5 p-3 rounded-lg flex items-center justify-between relative">
                  <span className="text-xs font-mono text-ivory">info@asae.co.za</span>
                  <button 
                    onClick={handleCopyEmail}
                    className="p-1 hover:text-gold transition-colors text-dim cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <span className="text-[10px] text-sa-green font-mono font-bold uppercase">Copied!</span> : <Check size={14} />}
                  </button>
                </div>
              </div>

            </div>
          </section>

          {/* MAIN DETAILS PANEL - 8 Columns */}
          <section className="lg:col-span-8 bg-dark-card border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Top design accent bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold/50 via-gold to-transparent" />
            <div className="absolute top-12 right-12 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-8"
              >
                {/* Title Section */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold rounded-full text-[10px] font-mono uppercase tracking-wider mb-3">
                    {React.createElement(currentService.icon, { size: 12 })}
                    ASAE Bilateral Pillars
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-ivory tracking-tight leading-tight">
                    {currentService.tagline}
                  </h2>
                  <p className="text-sm text-dim mt-4 leading-relaxed">
                    {currentService.longDesc}
                  </p>
                </div>

                {/* GRAPHIC AREA (State-driven interactive visualizers per service) */}
                <div className="border border-white/10 bg-dark rounded-2xl p-6 relative overflow-hidden group shadow-inner">
                  <div className="absolute top-0 right-0 bg-white/5 text-[9px] font-mono text-gold px-3 py-1 border-b border-l border-white/5 uppercase rounded-bl-xl tracking-wider">
                    Interactive Graphics Viewport
                  </div>
                  
                  {/* SERVICE 1: JOURNALISM GRAPHIC */}
                  {activeTab === 'journalism' && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="font-mono text-xs text-gold flex items-center gap-1.5 uppercase font-bold">
                          <Tv size={13} className="text-gold" /> Bilateral Press Feed
                        </span>
                        <span className="w-2.5 h-2.5 rounded-full bg-sa-green animate-pulse" />
                      </div>

                      {/* Mock Newspaper/Journalism scrolling card layout */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {journalismDigests.map((digest, index) => (
                          <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-gold/30 transition-all cursor-pointer flex flex-col justify-between group/card h-36">
                            <div>
                              <div className="flex items-center justify-between text-[9px] font-mono text-gold uppercase mb-2">
                                <span>{digest.category}</span>
                                <span>{digest.readTime}</span>
                              </div>
                              <h4 className="font-serif text-xs font-bold text-ivory line-clamp-3 group-hover/card:text-gold transition-colors">
                                {digest.title}
                              </h4>
                            </div>
                            <span className="text-[10px] text-dim font-mono">{digest.date}</span>
                          </div>
                        ))}
                      </div>

                      {/* Live Ticker Metric */}
                      <div className="bg-gold/5 p-3.5 rounded-xl border border-gold/15 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Zap size={14} className="text-gold" />
                          <span className="font-sans text-ivory/80">ASAE News Syndicate reach:</span>
                        </div>
                        <span className="font-mono font-bold text-gold">5.4M+ Annual Readers</span>
                      </div>
                    </div>
                  )}

                  {/* SERVICE 2: TRAINING PROGRAMS GRAPHIC */}
                  {activeTab === 'training' && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="font-mono text-xs text-gold flex items-center gap-1.5 uppercase font-bold">
                          <Award size={13} className="text-gold" /> Curriculum Syllabuses
                        </span>
                        <span className="text-[10px] text-dim font-mono">ASAE ACCREDITED</span>
                      </div>

                      {/* Interactive course path rendering */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {trainingModules.map((mod, index) => (
                          <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-gold/5 transition-all flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-mono text-xs font-bold shrink-0">
                              0{index + 1}
                            </div>
                            <div>
                              <span className="text-[9px] font-mono text-gold-pale/50 uppercase block">{mod.code} • {mod.level}</span>
                              <h4 className="font-serif text-xs font-bold text-ivory mt-0.5">{mod.title}</h4>
                              <span className="inline-block text-[10px] font-mono text-dim mt-1.5">Duration: {mod.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Training Badge */}
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center gap-4">
                        <div className="p-2.5 bg-gold/10 rounded-full text-gold shrink-0">
                          <Users size={16} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-ivory block">Approved Certification</span>
                          <span className="text-[10px] text-dim leading-snug block mt-0.5">Upon final module clearance, delegates obtain recognized ASAE Bilateral Diplomatic Core seals.</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SERVICE 3: EVENT MANAGEMENT GRAPHIC */}
                  {activeTab === 'management' && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="font-mono text-xs text-gold flex items-center gap-1.5 uppercase font-bold">
                          <Calendar size={13} className="text-gold" /> Production Timeline Orchestrator
                        </span>
                        <span className="text-[10px] text-dim font-mono">TAP TO TEST FLOW</span>
                      </div>

                      {/* Timeline steps with dynamic selector */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        {productionStages.map((stage, idx) => {
                          const isSelected = activeTimelineStep === idx;
                          return (
                            <button
                              key={idx}
                              onClick={() => setActiveTimelineStep(idx)}
                              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                                isSelected 
                                  ? 'bg-gold/10 border-gold shadow-lg shadow-gold/5' 
                                  : 'bg-white/5 border-white/5 hover:border-white/10'
                              }`}
                            >
                              <span className={`text-[10px] font-mono font-bold uppercase block ${isSelected ? 'text-gold' : 'text-dim'}`}>
                                {stage.step.split(':')[0]}
                              </span>
                              <span className="font-serif text-xs font-bold text-ivory block leading-tight">
                                {stage.step.split(':')[1]}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <h5 className="text-xs font-serif font-bold text-gold uppercase mb-1">Active Step Detail</h5>
                        <p className="text-xs text-dim leading-relaxed">
                          {productionStages[activeTimelineStep].desc}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* SERVICE 4: EVENT HOST GRAPHIC */}
                  {activeTab === 'host' && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="font-mono text-xs text-gold flex items-center gap-1.5 uppercase font-bold">
                          <Mic2 size={13} className="text-gold" /> Bilingual Waveform & Poise
                        </span>
                        <span className="text-[10px] text-sa-green font-mono uppercase font-bold animate-pulse">● BROADCAST ACTIVE</span>
                      </div>

                      {/* Speech waveform bouncing effect */}
                      <div className="h-20 bg-dark-card border border-white/5 rounded-xl flex items-center justify-center gap-1 px-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent pointer-events-none" />
                        {[3, 5, 8, 4, 9, 6, 2, 7, 5, 8, 4, 9, 3, 6, 7, 4, 8, 5, 3, 6, 8, 4, 9, 7].map((height, i) => (
                          <div 
                            key={i} 
                            className="w-1 bg-gold rounded-full transition-all duration-300 animate-pulse"
                            style={{ 
                              height: `${height * 6}px`,
                              animationDelay: `${i * 75}ms`
                            }} 
                          />
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-1.5">
                          <span className="text-[10px] font-mono text-gold uppercase">Linguistic Proficiency</span>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-ivory font-bold flex items-center gap-1"><Globe size={12} className="text-gold" /> English (Fluent)</span>
                            <span className="text-xs text-ivory font-bold flex items-center gap-1"><Globe size={12} className="text-gold" /> Portuguese (Fluent)</span>
                          </div>
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-1.5">
                          <span className="text-[10px] font-mono text-gold uppercase">Event Vibe Mastery</span>
                          <p className="text-[11px] text-dim leading-snug">Ensuring high dignity for formal diplomatic assemblies while capturing elegant enthusiasm during galas.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SERVICE 5: PROTOCOL SERVICES GRAPHIC */}
                  {activeTab === 'protocol' && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="font-mono text-xs text-gold flex items-center gap-1.5 uppercase font-bold">
                          <Plane size={13} className="text-gold" /> Diplomatic Clearance Checklist
                        </span>
                        <span className="text-[10px] text-dim font-mono">DIPLOMATIC SECURE PASS</span>
                      </div>

                      {/* Interactive Logistics checklist */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { key: 'clearance', label: 'Bilateral Port Clearance & Visas', desc: 'Pre-vetted express gates at OR Tambo & Luanda Quatro de Fevereiro.' },
                          { key: 'transport', label: 'VIP Secured Tactical Convoy', desc: 'Armored or high-luxury executive fleets with tactical guards.' },
                          { key: 'hotel', label: 'High-Liaison Sanctuary Accommodations', desc: 'Secure diplomatic hotel floors booked and vetted.' },
                          { key: 'lounge', label: 'Airport Diplomatic Lounge Keys', desc: 'Exclusive access to state protocol lounges during transit.' }
                        ].map((item) => {
                          const checked = checklistState[item.key];
                          return (
                            <button
                              key={item.key}
                              onClick={() => setChecklistState(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                                checked 
                                  ? 'bg-gold/5 border-gold/40 shadow-inner' 
                                  : 'bg-white/5 border-white/5 opacity-60 hover:opacity-100'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                checked ? 'bg-gold border-gold text-dark' : 'border-white/20'
                              }`}>
                                {checked && <Check size={12} strokeWidth={3} />}
                              </div>
                              <div>
                                <h4 className={`text-xs font-serif font-bold ${checked ? 'text-gold' : 'text-ivory'}`}>{item.label}</h4>
                                <p className="text-[10px] text-dim leading-snug mt-1">{item.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>

                {/* Sub-benefits / Details Column */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-4">
                    <h3 className="font-serif text-lg font-bold text-ivory">Core Service Deliverables</h3>
                    <div className="space-y-3">
                      {[
                        'Vetted by the ASAE Executive SADC Council',
                        'Fully bilingual (English & Portuguese) liaison support',
                        'Real-time transaction & scheduling audits',
                        'SADC-compliant safety and transparency guarantees'
                      ].map((benefit, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shrink-0 mt-0.5">
                            <CheckCircle2 size={11} />
                          </div>
                          <span className="text-xs text-dim leading-snug">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-dark border border-white/5 rounded-2xl flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider mb-2">Request Service Booking</h4>
                      <p className="text-[11px] text-dim leading-relaxed">
                        To engage our team for Journalism pieces, Training curriculums, event blueprints, or tactical diplomatic escorts, submit your brief below.
                      </p>
                    </div>
                    <a
                      href={`mailto:info@asae.co.za?subject=ASAE%20Service%20Engagement%20-%20${encodeURIComponent(currentService.label)}`}
                      className="mt-4 w-full py-3 bg-gold hover:bg-gold-light text-dark font-sans text-xs font-bold tracking-widest uppercase rounded-lg text-center transition-colors shadow-lg block cursor-pointer"
                    >
                      ENGAGE THE SECRETARIAT →
                    </a>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </section>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
