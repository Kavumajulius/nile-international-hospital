/**
 * Landing page - Main entry point for Nile International Hospital
 * Replaces the previous "Dateline" dating coach landing page
 */
import { useState } from 'react';
import {
  Activity,
  Heart,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe,
  Mail,
  MessageCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { hospitalData } from '../data/hospitalData';
import { DepartmentCard } from '../components/DepartmentCard';
import { ServiceCard } from '../components/ServiceCard';
import { DepartmentModal } from '../components/DepartmentModal';
import { ServiceModal } from '../components/ServiceModal';
import { AboutSection } from '../components/AboutSection';
import { VideoSection } from '../components/VideoSection';
import { InsuranceSection } from '../components/InsuranceSection';
import { SpecialistsModal } from '../components/SpecialistsModal';
import { HighlightSection } from '../components/HighlightSection';
import { CTASection } from '../components/CTASection';

interface LandingPageProps {
  onGetStarted: () => void;
  onViewAllDepartments: () => void;
}

export const LandingPage = ({ onGetStarted, onViewAllDepartments }: LandingPageProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
  const [isSpecialistsModalOpen, setIsSpecialistsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const selectedDepartment = hospitalData.departments.find(d => d.id === selectedDepartmentId);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#f8f9fa] font-sans text-slate-800">

      {/* 1. HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-12 py-4">
        <div className="max-w-[1400px] mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-lg px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Nile International Hospital" className="w-12 h-12 object-contain rounded-lg" />
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight text-left hover:opacity-80 transition-opacity"
              >
                Nile International <span className="text-blue-600">Hospital</span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <button onClick={() => scrollToSection('what-we-do')} className="hover:text-blue-600 font-medium transition-colors">What We Do</button>
              <button onClick={() => scrollToSection('departments')} className="hover:text-blue-600 font-medium transition-colors">Departments</button>
              <button onClick={() => scrollToSection('services')} className="hover:text-blue-600 font-medium transition-colors">Services</button>
              <button onClick={() => scrollToSection('specialists')} className="hover:text-blue-600 font-medium transition-colors">Specialists</button>
              <button onClick={() => scrollToSection('insurance')} className="hover:text-blue-600 font-medium transition-colors">Insurance</button>
            </nav>

            {/* Contact / CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex flex-col items-end text-sm mr-2">
                <span className="font-bold text-slate-900">+256 706 202590</span>
                <span className="text-slate-500 font-medium">24/7 Emergency</span>
              </div>
              <button
                onClick={onGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                Contact Us
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden pt-4 pb-2 border-t mt-4 border-slate-100 flex flex-col gap-4">
              <button onClick={() => scrollToSection('what-we-do')} className="text-left py-2 font-medium">What We Do</button>
              <button onClick={() => scrollToSection('departments')} className="text-left py-2 font-medium">Departments</button>
              <button onClick={() => scrollToSection('services')} className="text-left py-2 font-medium">Services</button>
              <button onClick={() => scrollToSection('specialists')} className="text-left py-2 font-medium">Specialists</button>
              <button onClick={() => scrollToSection('insurance')} className="text-left py-2 font-medium">Insurance</button>
              <button onClick={() => scrollToSection('contact')} className="text-left py-2 font-bold text-blue-600">Contact Us</button>
            </div>
          )}
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 px-4 lg:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Text Content */}
          <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>Safety & Quality First</span>
            </div>

            {/* Large Text with Beautiful Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 flex flex-col gap-3 items-center lg:items-start"
            >
              {/* Card 1 - Access World-Class */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="bg-white/95 backdrop-blur-md px-5 md:px-6 py-3 md:py-4 rounded-2xl shadow-lg inline-flex w-fit"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-none whitespace-nowrap pr-2">
                  Access <span className="font-serif italic text-blue-600">World-Class</span>
                </h1>
              </motion.div>

              {/* Card 2 - Healthcare on Your Terms. */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                className="bg-white/95 backdrop-blur-md px-5 md:px-6 py-3 md:py-4 rounded-2xl shadow-lg inline-flex w-fit"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-none">
                  <span className="font-serif italic text-blue-600">Healthcare</span> Now

                </h1>
              </motion.div>
            </motion.div>
            {hospitalData.hero.subtitle && (
              <p className="text-lg md:text-xl text-slate-500 mb-8 font-light">
                {hospitalData.hero.subtitle}
              </p>
            )}
            <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
              {hospitalData.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-blue-600 text-white font-bold py-3.5 px-8 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                {hospitalData.hero.cta}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="bg-white text-slate-700 border border-slate-200 font-bold py-3.5 px-8 rounded-xl text-lg transition-all hover:bg-slate-50 flex items-center justify-center"
              >
                Our Services
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[350px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="absolute inset-0 bg-blue-900/10 z-10" />
            <img
              src="/hospital_hero.png"
              alt="Nile International Hospital Building"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1587351021759-3e566b9af923?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'; // Fallback
              }}
            />

            {/* Floating Stats Card */}
            <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl max-w-xs border border-white/50">
              <div className="flex gap-4 items-center">
                <div className="bg-green-100 p-2.5 rounded-full">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Emergency Service</p>
                  <p className="text-lg font-bold text-slate-900">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 HIGHLIGHT SECTION */}
      <HighlightSection />

      {/* 3. WHAT WE DO SECTION (Redesigned) */}
      <AboutSection onImageClick={onGetStarted} />

      {/* 4. VIDEO DEMO SECTION */}
      <VideoSection />

      {/* 4. DEPARTMENTS SECTION */}
      <section id="departments" className="py-24 bg-white px-4 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">Our Departments</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Discover our specialized centers of excellence, led by expert consultants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {hospitalData.departments.slice(0, 3).map((dept) => (
              <DepartmentCard
                key={dept.id}
                id={dept.id}
                name={dept.name}
                description={dept.description}
                details={dept.details}
                image={dept.image || '/hospital_hero.png'}
                onViewDetails={setSelectedDepartmentId}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={onViewAllDepartments}
              className="group inline-flex items-center gap-3 bg-white border-2 border-slate-900 text-slate-900 font-bold py-4 px-10 rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-lg hover:shadow-xl"
            >
              View All Departments
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-slate-50 px-4 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">Our Services</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Innovative medical solutions tailored to your unique healthcare needs.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {hospitalData.services.map((service, idx) => (
              <div key={idx} className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] xl:w-[calc(25%-2rem)] max-w-[520px]">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  image={service.image}
                  onViewDetails={() => setSelectedService(service)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR SPECIALISTS SECTION (Staggered Testimonial Style) */}
      <section id="specialists" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900">
              Meet Our Specialists
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Highly skilled professionals dedicated to your health and recovery.
            </p>
          </div>

          <div className="space-y-16 max-w-6xl mx-auto">
            {hospitalData.specialists.slice(0, 3).map((specialist, idx) => (
              <div
                key={specialist.id}
                className={`relative max-w-4xl ${idx === 1 ? 'ml-auto lg:mr-12' :
                  idx === 2 ? 'lg:ml-12' :
                    ''
                  }`}
              >
                <div
                  onClick={onGetStarted}
                  className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 cursor-pointer"
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className={`relative p-12 lg:p-14 flex flex-col justify-center ${idx === 1 ? 'lg:order-2' : ''}`}>
                      <div className="text-7xl font-serif text-slate-100 leading-none mb-4">"</div>

                      <p className="text-xl lg:text-2xl font-medium text-slate-800 mb-8 leading-relaxed italic">
                        {specialist.quote}
                      </p>

                      <div>
                        <p className="text-lg font-bold mb-1 text-slate-900">{specialist.name}</p>
                        <p className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-1">{specialist.role}</p>
                        <p className="text-sm text-slate-500 font-medium">{specialist.stat}</p>
                      </div>
                    </div>

                    <div className={`relative h-[400px] lg:h-auto ${idx === 1 ? 'lg:order-1' : ''}`}>
                      <img
                        src={specialist.image}
                        alt={specialist.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => setIsSpecialistsModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-900 font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-slate-100"
            >
              View all Specialists
              <Activity size={18} className="text-blue-600" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. INSURANCE PARTNERS */}
      <InsuranceSection onContactClick={onGetStarted} />

      {/* 9. CALL TO ACTION */}
      <CTASection onScheduleClick={onGetStarted} />


      <footer id="contact" className="bg-slate-950 text-slate-400 py-16 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* 1. Brand & Logo */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.jpg"
                alt="Nile International Hospital"
                className="w-12 h-12 rounded-lg object-cover bg-white"
              />
              <span className="text-xl font-bold text-white leading-tight">
                Nile International <br /> Hospital
              </span>
            </div>
            <p className="mb-6 leading-relaxed">
              Providing world-class healthcare services to Eastern Uganda and beyond. Committed to excellence in patient care.
            </p>
          </div>

          {/* 2. Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                <span>
                  Scott Road Plot 2-16 Walukuba<br />
                  Jinja-Uganda<br />
                  P.O Box 669 Jinja-Uganda
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                <span>+256-777 956162<br />+256-706 202590</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                <a href="mailto:info@nih.co.ug" className="hover:text-white transition-colors">info@nih.co.ug</a>
              </li>
              <li className="flex gap-3 items-center">
                <Globe className="w-5 h-5 text-blue-600 shrink-0" />
                <a href="https://www.nih.co.ug" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">www.nih.co.ug</a>
              </li>
            </ul>
          </div>

          {/* 3. Social Media */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Social Media</h4>
            <ul className="space-y-4">
              <li className="group">
                <a
                  href="https://wa.me/256709996699"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 items-center"
                >
                  <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 fill-green-500 group-hover:fill-white transition-colors"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.122.554 4.194 1.607 6.034L0 24l6.117-1.605a11.803 11.803 0 005.925 1.573h.005c6.632 0 12.03-5.394 12.033-12.03a11.75 11.75 0 00-3.526-8.51" />
                    </svg>
                  </div>
                  <span className="group-hover:text-white transition-colors">WhatsApp: +256 709-996699</span>
                </a>
              </li>
              <li className="group">
                <a
                  href="https://www.facebook.com/nihUganda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 items-center"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Facebook className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors" />
                  </div>
                  <span className="group-hover:text-white transition-colors">Facebook</span>
                </a>
              </li>
              <li className="group">
                <a
                  href="https://x.com/nihUganda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 items-center"
                >
                  <div className="w-8 h-8 rounded-full bg-sky-900/30 flex items-center justify-center group-hover:bg-sky-500 transition-colors">
                    <Twitter className="w-4 h-4 text-sky-500 group-hover:text-white transition-colors" />
                  </div>
                  <span className="group-hover:text-white transition-colors">Twitter</span>
                </a>
              </li>
              <li className="group">
                <a
                  href="https://www.instagram.com/nihuganda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 items-center"
                >
                  <div className="w-8 h-8 rounded-full bg-pink-900/30 flex items-center justify-center group-hover:bg-pink-600 transition-colors">
                    <Instagram className="w-4 h-4 text-pink-500 group-hover:text-white transition-colors" />
                  </div>
                  <span className="group-hover:text-white transition-colors">Instagram</span>
                </a>
              </li>
              <li className="group">
                <a
                  href="https://www.linkedin.com/in/nile-international-hospital-13b730225/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 items-center"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-900/30 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                    <Linkedin className="w-4 h-4 text-indigo-500 group-hover:text-white transition-colors" />
                  </div>
                  <span className="group-hover:text-white transition-colors">LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Working Hours */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Working Hours</h4>
            <ul className="space-y-4">
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>Emergency</span>
                <span className="text-white font-bold">24/7</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>Outpatient</span>
                <span className="text-white font-bold">8:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>

        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Nile International Hospital. All rights reserved.</p>
        </div>
      </footer>

      <DepartmentModal
        isOpen={!!selectedDepartment}
        onClose={() => setSelectedDepartmentId(null)}
        department={selectedDepartment}
        onBookAvailability={() => {
          setSelectedDepartmentId(null);
          onGetStarted();
        }}
      />

      <SpecialistsModal
        isOpen={isSpecialistsModalOpen}
        onClose={() => setIsSpecialistsModalOpen(false)}
      />

      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
        onBookAvailability={() => {
          setSelectedService(null);
          onGetStarted();
        }}
      />
    </main>
  );
};