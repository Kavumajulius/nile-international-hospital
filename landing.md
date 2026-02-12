/**
 * Landing page - Main entry point for the application
 * 7-section high-converting layout for Dateline
 */
import { useState, useEffect } from 'react';
import { Play, Mic, TrendingUp, Users, Zap, CheckCircle2, ArrowRight, Star, MessageCircle, Apple, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from '../components/auth/AuthModal';

interface LandingPageProps {
  onGetStarted: () => void;
  onSelectPlan: (planId: string) => void; // trigger purchase flow when authed
  onPlanRequiresAuth: (planId: string) => void; // remember plan for post-auth
}

export const LandingPage = ({ onGetStarted, onSelectPlan, onPlanRequiresAuth }: LandingPageProps) => {
  const { isAuthenticated, openSignInModal, openSignUpModal, closeAuthModal } = useAuth();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<'signin' | 'signup'>('signin');

  // Close modal when user successfully authenticates
  useEffect(() => {
    if (isAuthenticated && authModalOpen) {
      setAuthModalOpen(false);
    }
  }, [isAuthenticated, authModalOpen]);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle sign in button click
  const handleSignIn = () => {
    setAuthModalType('signin');
    setAuthModalOpen(true);
    openSignInModal();
  };

  // Handle sign up button click
  const handleSignUp = () => {
    setAuthModalType('signup');
    setAuthModalOpen(true);
    openSignUpModal();
  };

  // Handle modal close
  const handleCloseModal = () => {
    setAuthModalOpen(false);
    closeAuthModal();
  };

  // Handle pricing plan click -> if authed, open purchase flow; else prompt auth
  const handlePlanClick = (planId: string) => {
    if (isAuthenticated) {
      onSelectPlan(planId);
      return;
    }
    // Remember desired plan and prompt auth
    onPlanRequiresAuth(planId);
    handleSignUp();
  };

  return (
    <main className="min-h-screen w-full" style={{ backgroundColor: '#EAE8E3' }}>
      {/* Floating Header - Reference image inspired */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 pt-8">
        <div className="max-w-[1400px] mx-auto bg-white/95 backdrop-blur-md rounded-full shadow-lg px-8 py-2.5">
          <div className="flex items-center justify-between">
            {/* Left: Dateline Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ebdb828c-6175-42d0-9e63-2d755ecfce7b/generated_images/minimalist-modern-logo-design-vector-ill-b5ba1990-20251110045418.jpg"
                alt="Dateline logo"
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="text-2xl font-bold" style={{ color: '#000000' }}>
                Dateline
              </div>
            </div>
            
            {/* Center: Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="hover:text-slate-600 font-medium text-base transition-colors" 
                style={{ color: '#000000' }}
              >
                How it works
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="hover:text-slate-600 font-medium text-base transition-colors" 
                style={{ color: '#000000' }}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="hover:text-slate-600 font-medium text-base transition-colors" 
                style={{ color: '#000000' }}
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('demo')}
                className="hover:text-slate-600 font-medium text-base transition-colors" 
                style={{ color: '#000000' }}
              >
                Demo
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="hover:text-slate-600 font-medium text-base transition-colors" 
                style={{ color: '#000000' }}
              >
                Pricing
              </button>
            </nav>
            
            {/* Right: Log in and Sign up */}
            <div className="flex items-center gap-4">
              <button 
                onClick={handleSignIn}
                className="hover:text-slate-600 font-semibold text-base transition-colors px-6 py-2" 
                style={{ color: '#000000' }}
              >
                Log in
              </button>
              <button
                onClick={handleSignUp}
                className="font-semibold py-3 px-7 rounded-full text-base transition-all shadow-md hover:shadow-lg text-white"
                style={{ backgroundColor: '#000000' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION - Reference image inspired layout */}
      <section className="relative min-h-screen overflow-hidden pt-32" style={{ backgroundColor: '#EAE8E3' }}>
        <div className="grid lg:grid-cols-2 gap-0 min-h-screen">
          {/* Left Column - Text Content */}
          <div className="relative z-10 flex flex-col justify-center px-6 lg:px-16 xl:px-24 py-16 lg:py-24">
            <div className="max-w-xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-[0.95]" style={{ color: '#000000' }}>
                Make them<br />want <span className="italic font-normal" style={{ fontFamily: 'Georgia, serif' }}>you</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                Practice conversations with AI coaches and speak with confidence on every date.
              </p>
              
              <button
                onClick={onGetStarted}
                className="text-white font-bold py-5 px-12 rounded-full text-lg transition-all shadow-lg hover:shadow-xl mb-8"
                style={{ backgroundColor: '#000000' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
              >
                Get in touch
              </button>
              
              <p className="text-slate-600 text-base mb-6 font-medium">
                or download our app
              </p>
              
              <div className="flex items-center gap-6">
                <button className="hover:opacity-80 transition-opacity">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
                    <Apple className="w-7 h-7 text-white" />
                  </div>
                </button>
                <button className="hover:opacity-80 transition-opacity">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none">
                      <path d="M3.609 3.609L13.5 13.5M13.5 13.5V6.75M13.5 13.5H6.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20.25 12.75V19.5a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V5.25a1.5 1.5 0 011.5-1.5h6.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Framed Image */}
          <div className="relative h-[50vh] lg:h-full flex items-center justify-center px-6 lg:px-12 py-12">
            <div className="relative w-full h-full max-w-2xl">
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ebdb828c-6175-42d0-9e63-2d755ecfce7b/generated_images/modern-hero-image-showing-a-confident-re-0d62f072-20251109061328.jpg"
                alt="People connecting and conversing"
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
              />
              {/* Blue fade-out effect at bottom for smooth blend */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-50 to-transparent rounded-b-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM / PAIN AMPLIFIER - Reference image inspired design */}
      <section className="py-24 lg:py-32 px-6 lg:px-12" style={{ backgroundColor: '#EAE8E3' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: '#000000' }}>
              Tired of awkward silences and missed chances?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              You're not alone. These are the most common dating struggles we help solve.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-[400px]">
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ebdb828c-6175-42d0-9e63-2d755ecfce7b/generated_images/portrait-photograph-of-a-person-looking--9b558331-20251110044238.jpg"
                  alt="Person looking uncertain"
                  className="w-full h-full object-cover"
                />
                {/* Gradient fade effect at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/60 to-transparent" />
              </div>
              <div className="p-8">
                <div className="text-5xl font-serif mb-4" style={{ color: '#000000' }}>"</div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>Don't know what to say</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Your mind goes blank when you need to make conversation flow naturally.
                </p>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-[400px]">
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ebdb828c-6175-42d0-9e63-2d755ecfce7b/generated_images/portrait-photograph-of-an-anxious-person-59393526-20251110044237.jpg"
                  alt="Person looking anxious"
                  className="w-full h-full object-cover"
                />
                {/* Gradient fade effect at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/60 to-transparent" />
              </div>
              <div className="p-8">
                <div className="text-5xl font-serif mb-4" style={{ color: '#000000' }}>"</div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>Freeze when nervous</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Anxiety kicks in and you can't think straight during important moments.
                </p>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-[400px]">
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ebdb828c-6175-42d0-9e63-2d755ecfce7b/generated_images/portrait-photograph-of-a-person-checking-df21c77b-20251110044238.jpg"
                  alt="Person checking phone disappointed"
                  className="w-full h-full object-cover"
                />
                {/* Gradient fade effect at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/60 to-transparent" />
              </div>
              <div className="p-8">
                <div className="text-5xl font-serif mb-4" style={{ color: '#000000' }}>"</div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>Lose momentum after a date</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  The connection fades because you struggle to keep the spark alive.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-8 max-w-4xl mx-auto mt-16" style={{ borderLeft: '4px solid #000000' }}>
            <div className="flex gap-4">
              <MessageCircle className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#000000' }} />
              <div>
                <p className="text-xl italic text-slate-700 mb-3 leading-relaxed">
                  "I used to overthink every text and conversation. Now I actually enjoy dating."
                </p>
                <p className="text-sm font-semibold" style={{ color: '#000000' }}>Sarah M.</p>
                <p className="text-sm text-slate-500">Dateline user</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS - Liquid glass cards with people images */}
      <section id="how-it-works" className="py-32 lg:py-40 px-6 lg:px-12 relative overflow-hidden" style={{ backgroundColor: '#EAE8E3' }}>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20 relative z-10">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight" style={{ color: '#000000' }}>
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Four simple steps to transform your dating confidence
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto relative z-10">
            {/* Card 1 - Choose Your Preferences */}
            <div className="relative rounded-[40px] overflow-hidden h-[380px] group">
              {/* Background Image */}
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ebdb828c-6175-42d0-9e63-2d755ecfce7b/generated_images/portrait-photograph-of-a-confident-perso-c6ecd4e7-20251111050431.jpg"
                alt="Person holding phone"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Liquid Glass Card Overlay with Backdrop Blur */}
              <div className="absolute left-8 right-8 bottom-8 bg-white/85 backdrop-blur-xl rounded-[32px] p-5 shadow-2xl border-[6px]" style={{ borderColor: '#D1CEC8' }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="inline-block px-4 py-1.5 text-white rounded-full text-sm font-bold" style={{ backgroundColor: '#000000' }}>
                        Step 1
                      </div>
                      <h3 className="text-xl font-bold leading-tight" style={{ color: '#000000' }}>
                        Choose Your Preferences
                      </h3>
                    </div>
                    
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">
                      Select the style of conversation you want to practice. Pick scenarios, personality types, and conversation topics.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Practice */}
            <div className="relative rounded-[40px] overflow-hidden h-[380px] group">
              {/* Background Image */}
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ebdb828c-6175-42d0-9e63-2d755ecfce7b/generated_images/portrait-photograph-of-a-person-engaged--a5fd8d02-20251111050432.jpg"
                alt="Person practicing conversation"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Liquid Glass Card Overlay with Backdrop Blur */}
              <div className="absolute left-8 right-8 bottom-8 bg-white/85 backdrop-blur-xl rounded-[32px] p-5 shadow-2xl border-[6px]" style={{ borderColor: '#D1CEC8' }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="inline-block px-4 py-1.5 text-white rounded-full text-sm font-bold" style={{ backgroundColor: '#000000' }}>
                        Step 2
                      </div>
                      <h3 className="text-xl font-bold leading-tight" style={{ color: '#000000' }}>
                        Practice
                      </h3>
                    </div>
                    
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">
                      Have real voice conversations with AI coaches. Speak naturally and practice until you feel confident.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - Get Ratings & Feedback */}
            <div className="relative rounded-[40px] overflow-hidden h-[380px] group">
              {/* Background Image */}
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ebdb828c-6175-42d0-9e63-2d755ecfce7b/generated_images/portrait-photograph-of-a-person-looking--83e13ac8-20251111050429.jpg"
                alt="Person reviewing ratings"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Liquid Glass Card Overlay with Backdrop Blur */}
              <div className="absolute left-8 right-8 bottom-8 bg-white/85 backdrop-blur-xl rounded-[32px] p-5 shadow-2xl border-[6px]" style={{ borderColor: '#D1CEC8' }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="inline-block px-4 py-1.5 text-white rounded-full text-sm font-bold" style={{ backgroundColor: '#000000' }}>
                        Step 3
                      </div>
                      <h3 className="text-xl font-bold leading-tight" style={{ color: '#000000' }}>
                        Get Ratings & Feedback
                      </h3>
                    </div>
                    
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">
                      Receive instant ratings on your performance. See metrics on tone, confidence, engagement, and conversation flow.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 - Improve */}
            <div className="relative rounded-[40px] overflow-hidden h-[380px] group">
              {/* Background Image */}
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ebdb828c-6175-42d0-9e63-2d755ecfce7b/generated_images/portrait-photograph-of-a-confident-perso-1ea6873b-20251111050430.jpg"
                alt="Person showing progress"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Liquid Glass Card Overlay with Backdrop Blur */}
              <div className="absolute left-8 right-8 bottom-8 bg-white/85 backdrop-blur-xl rounded-[32px] p-5 shadow-2xl border-[6px]" style={{ borderColor: '#D1CEC8' }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="inline-block px-4 py-1.5 text-white rounded-full text-sm font-bold" style={{ backgroundColor: '#000000' }}>
                        Step 4
                      </div>
                      <h3 className="text-xl font-bold leading-tight" style={{ color: '#000000' }}>
                        Improve on Subsequent Sessions
                      </h3>
                    </div>
                    
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">
                      Track your progress over time. Watch your confidence scores grow as you practice more conversations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE BENEFITS / FEATURES - Elevated cards with strong shadows */}
      <section id="features" className="py-24 lg:py-32 px-6 lg:px-12" style={{ backgroundColor: '#EAE8E3' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#000000' }}>
              What you'll get from every session
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real results that transform your dating confidence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Feature 1 - Real voice roleplay */}
            <div 
              className="relative bg-white rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500 group"
              style={{ 
                boxShadow: hoveredFeature === 1 
                  ? '0 40px 80px -20px rgba(0, 0, 0, 0.4), 0 20px 40px -10px rgba(0, 0, 0, 0.2)'
                  : '0 30px 60px -15px rgba(0, 0, 0, 0.25), 0 15px 30px -8px rgba(0, 0, 0, 0.15)'
              }}
              onMouseEnter={() => setHoveredFeature(1)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Image Section - 1/3 height with fade */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ebdb828c-6175-42d0-9e63-2d755ecfce7b/generated_images/close-up-photograph-of-a-person-speaking-ad146427-20251111042352.jpg"
                  alt="Voice roleplay"
                  className="w-full h-full object-cover"
                />
                {/* Gradient fade to white */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent" />
              </div>
              
              {/* Content Section */}
              <div className="relative z-10 p-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-black rounded-full mb-5">
                      <Mic className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-bold">Voice AI</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-black leading-tight">
                      Real voice roleplay
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Talk naturally, not just type. Practice with AI that responds like a real person.
                    </p>
                  </div>
                </div>
                
                {hoveredFeature === 1 && (
                  <div className="mt-6 p-6 bg-slate-50 rounded-2xl border-2 border-black/5 animate-in fade-in slide-in-from-bottom-3 duration-300">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      <strong className="text-black font-bold">Example:</strong> Practice asking someone out, handling rejection, or keeping conversation flowing during dinner.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Feature 2 - Personalized feedback */}
            <div 
              className="relative bg-white rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500 group"
              style={{ 
                boxShadow: hoveredFeature === 2
                  ? '0 40px 80px -20px rgba(0, 0, 0, 0.4), 0 20px 40px -10px rgba(0, 0, 0, 0.2)'
                  : '0 30px 60px -15px rgba(0, 0, 0, 0.25), 0 15px 30px -8px rgba(0, 0, 0, 0.15)'
              }}
              onMouseEnter={() => setHoveredFeature(2)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Image Section - 1/3 height with fade */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ebdb828c-6175-42d0-9e63-2d755ecfce7b/generated_images/abstract-visualization-of-sound-waves-an-340dd4f1-20251111042352.jpg"
                  alt="Personalized feedback"
                  className="w-full h-full object-cover"
                />
                {/* Gradient fade to white */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent" />
              </div>
              
              {/* Content Section */}
              <div className="relative z-10 p-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-black rounded-full mb-5">
                      <TrendingUp className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-bold">Analytics</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-black leading-tight">
                      Personalized feedback
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Tone, pacing, and emotional cues analyzed to help you improve instantly.
                    </p>
                  </div>
                </div>
                
                {hoveredFeature === 2 && (
                  <div className="mt-6 p-6 bg-slate-50 rounded-2xl border-2 border-black/5 animate-in fade-in slide-in-from-bottom-3 duration-300">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      <strong className="text-black font-bold">Example:</strong> Your tone was warm but you spoke too fast—slow down 20% to appear more confident.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Feature 3 - Choose characters & scenarios */}
            <div 
              className="relative bg-white rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500 group"
              style={{ 
                boxShadow: hoveredFeature === 3
                  ? '0 40px 80px -20px rgba(0, 0, 0, 0.4), 0 20px 40px -10px rgba(0, 0, 0, 0.2)'
                  : '0 30px 60px -15px rgba(0, 0, 0, 0.25), 0 15px 30px -8px rgba(0, 0, 0, 0.15)'
              }}
              onMouseEnter={() => setHoveredFeature(3)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Image Section - 1/3 height with fade */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ebdb828c-6175-42d0-9e63-2d755ecfce7b/generated_images/diverse-group-of-people-in-casual-conver-2a16bc48-20251111042353.jpg"
                  alt="Choose characters and scenarios"
                  className="w-full h-full object-cover"
                />
                {/* Gradient fade to white */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent" />
              </div>
              
              {/* Content Section */}
              <div className="relative z-10 p-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-black rounded-full mb-5">
                      <Users className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-bold">Scenarios</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-black leading-tight">
                      Choose characters & scenarios
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Practice with different personalities and situations to build versatile skills.
                    </p>
                  </div>
                </div>
                
                {hoveredFeature === 3 && (
                  <div className="mt-6 p-6 bg-slate-50 rounded-2xl border-2 border-black/5 animate-in fade-in slide-in-from-bottom-3 duration-300">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      <strong className="text-black font-bold">Example:</strong> Practice with an introverted bookworm, an adventurous extrovert, or a career-focused professional.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Feature 4 - Quick improvement loops */}
            <div 
              className="relative bg-white rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500 group"
              style={{ 
                boxShadow: hoveredFeature === 4
                  ? '0 40px 80px -20px rgba(0, 0, 0, 0.4), 0 20px 40px -10px rgba(0, 0, 0, 0.2)'
                  : '0 30px 60px -15px rgba(0, 0, 0, 0.25), 0 15px 30px -8px rgba(0, 0, 0, 0.15)'
              }}
              onMouseEnter={() => setHoveredFeature(4)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Image Section - 1/3 height with fade */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ebdb828c-6175-42d0-9e63-2d755ecfce7b/generated_images/upward-trending-graph-visualization-with-5d655643-20251111042352.jpg"
                  alt="Quick improvement loops"
                  className="w-full h-full object-cover"
                />
                {/* Gradient fade to white */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent" />
              </div>
              
              {/* Content Section */}
              <div className="relative z-10 p-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-black rounded-full mb-5">
                      <Zap className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-bold">Progress</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-black leading-tight">
                      Quick improvement loops
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Short sessions with measurable progress. See results after just 5 practice conversations.
                    </p>
                  </div>
                </div>
                
                {hoveredFeature === 4 && (
                  <div className="mt-6 p-6 bg-slate-50 rounded-2xl border-2 border-black/5 animate-in fade-in slide-in-from-bottom-3 duration-300">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      <strong className="text-black font-bold">Example:</strong> 10-minute sessions fit into your schedule. Track confidence scores session by session.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SOCIAL PROOF & TRUST - Reference image inspired testimonial cards */}
      <section id="testimonials" className="py-24 lg:py-32 px-6 lg:px-12" style={{ backgroundColor: '#EAE8E3' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#000000' }}>
              People are getting results
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real stories from users who transformed their dating confidence
            </p>
          </div>
          
          {/* Staggered Testimonial Cards - Reference image layout */}
          <div className="space-y-16 max-w-6xl mx-auto">
            {/* Card 1 - Top Left Aligned */}
            <div className="relative max-w-4xl">
              <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Left - Content */}
                  <div className="relative p-12 lg:p-14 flex flex-col justify-center">
                    {/* Large quotation mark */}
                    <div className="text-7xl font-serif text-slate-200 leading-none mb-4">"</div>
                    
                    <p className="text-xl lg:text-2xl font-medium text-slate-800 mb-8 leading-relaxed">
                      I was terrified of first dates. After 5 practice sessions, I went on a real date and felt SO much more comfortable. We're seeing each other again!
                    </p>
                    
                    <div>
                      <p className="text-lg font-bold mb-1" style={{ color: '#000000' }}>Jessica M.</p>
                      <p className="text-sm text-slate-500 font-medium">Booked 3 dates in 2 weeks</p>
                    </div>
                  </div>
                  
                  {/* Right - Portrait Image */}
                  <div className="relative h-[400px] lg:h-auto">
                    <img 
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ebdb828c-6175-42d0-9e63-2d755ecfce7b/generated_images/professional-headshot-portrait-photograp-4d315c52-20251111043131.jpg"
                      alt="Jessica M."
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Center Right Aligned */}
            <div className="relative max-w-4xl ml-auto lg:mr-12">
              <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Left - Content */}
                  <div className="relative p-12 lg:p-14 flex flex-col justify-center order-2 lg:order-1">
                    {/* Large quotation mark */}
                    <div className="text-7xl font-serif text-slate-200 leading-none mb-4">"</div>
                    
                    <p className="text-xl lg:text-2xl font-medium text-slate-800 mb-8 leading-relaxed">
                      The voice feedback is incredible. I learned I was speaking too fast when nervous. Now I'm way more aware and confident in conversations.
                    </p>
                    
                    <div>
                      <p className="text-lg font-bold mb-1" style={{ color: '#000000' }}>Michael A.</p>
                      <p className="text-sm text-slate-500 font-medium">+45% confidence score</p>
                    </div>
                  </div>
                  
                  {/* Right - Portrait Image */}
                  <div className="relative h-[400px] lg:h-auto order-1 lg:order-2">
                    <img 
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ebdb828c-6175-42d0-9e63-2d755ecfce7b/generated_images/professional-headshot-portrait-photograp-af3994cd-20251111043131.jpg"
                      alt="Michael A."
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - Bottom Left Aligned */}
            <div className="relative max-w-4xl lg:ml-12">
              <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Left - Content */}
                  <div className="relative p-12 lg:p-14 flex flex-col justify-center">
                    {/* Large quotation mark */}
                    <div className="text-7xl font-serif text-slate-200 leading-none mb-4">"</div>
                    
                    <p className="text-xl lg:text-2xl font-medium text-slate-800 mb-8 leading-relaxed">
                      As an introvert, this was perfect for me. I could practice without pressure and actually enjoy the process. Game changer!
                    </p>
                    
                    <div>
                      <p className="text-lg font-bold mb-1" style={{ color: '#000000' }}>Sarah L.</p>
                      <p className="text-sm text-slate-500 font-medium">Practiced 12 scenarios</p>
                    </div>
                  </div>
                  
                  {/* Right - Portrait Image */}
                  <div className="relative h-[400px] lg:h-auto">
                    <img 
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ebdb828c-6175-42d0-9e63-2d755ecfce7b/generated_images/professional-headshot-portrait-photograp-0620a217-20251111043131.jpg"
                      alt="Sarah L."
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 - Center Aligned */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Left - Content */}
                  <div className="relative p-12 lg:p-14 flex flex-col justify-center order-2 lg:order-1">
                    {/* Large quotation mark */}
                    <div className="text-7xl font-serif text-slate-200 leading-none mb-4">"</div>
                    
                    <p className="text-xl lg:text-2xl font-medium text-slate-800 mb-8 leading-relaxed">
                      I used to run out of things to say. The scenario practice taught me how to keep conversations flowing naturally. Worth every minute.
                    </p>
                    
                    <div>
                      <p className="text-lg font-bold mb-1" style={{ color: '#000000' }}>David K.</p>
                      <p className="text-sm text-slate-500 font-medium">10 successful conversations</p>
                    </div>
                  </div>
                  
                  {/* Right - Portrait Image */}
                  <div className="relative h-[400px] lg:h-auto order-1 lg:order-2">
                    <img 
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ebdb828c-6175-42d0-9e63-2d755ecfce7b/generated_images/professional-headshot-portrait-photograp-89624d0f-20251111043131.jpg"
                      alt="David K."
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Banner */}
          <div className="rounded-3xl p-12 lg:p-16 text-white shadow-2xl mt-20" style={{ backgroundColor: '#000000' }}>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <p className="text-6xl lg:text-7xl font-bold mb-3">10,000+</p>
                <p className="text-xl text-slate-300">Active users</p>
              </div>
              <div>
                <p className="text-6xl lg:text-7xl font-bold mb-3">+32%</p>
                <p className="text-xl text-slate-300">Avg. confidence uplift</p>
              </div>
              <div>
                <p className="text-6xl lg:text-7xl font-bold mb-3">4.8★</p>
                <p className="text-xl text-slate-300">User rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VISUAL DEMO / PRODUCT TOUR - White background */}
      <section id="demo" className="py-24 lg:py-32 px-6 lg:px-12" style={{ backgroundColor: '#EAE8E3' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#000000' }}>
              See a quick session — live demo
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Watch how easy it is to start improving your dating conversations
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-3xl p-8 lg:p-12 border border-slate-200">
            <div className="aspect-video rounded-2xl overflow-hidden relative group mb-8" style={{ backgroundColor: '#000000' }}>
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ebdb828c-6175-42d0-9e63-2d755ecfce7b/generated_images/mobile-phone-mockup-screenshot-showing-a-7f3a2f2e-20251109061327.jpg"
                alt="Interactive demo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={onGetStarted}
                  className="bg-white font-bold py-5 px-10 rounded-full text-lg hover:bg-slate-50 transition-all transform hover:scale-105 shadow-2xl flex items-center gap-3"
                  style={{ color: '#000000' }}
                >
                  <Play className="w-6 h-6" />
                  Play Demo
                </button>
              </div>
            </div>
            
            {/* Annotated hotspots */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-slate-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0" style={{ backgroundColor: '#000000' }}>1</div>
                  <span className="font-bold text-lg" style={{ color: '#000000' }}>Choose Character</span>
                </div>
                <p className="text-slate-600">Select personality type</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-slate-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0" style={{ backgroundColor: '#000000' }}>2</div>
                  <span className="font-bold text-lg" style={{ color: '#000000' }}>Tap Speak</span>
                </div>
                <p className="text-slate-600">Start voice conversation</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-slate-200">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0" style={{ backgroundColor: '#000000' }}>3</div>
                  <span className="font-bold text-lg" style={{ color: '#000000' }}>Get Feedback</span>
                </div>
                <p className="text-slate-600">View instant metrics</p>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={onGetStarted}
                className="text-white font-bold py-5 px-10 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-3"
                style={{ backgroundColor: '#000000' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
              >
                Try it now — no credit card
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="pt-24 lg:pt-32 pb-48 lg:pb-64 px-6 lg:px-12 relative" style={{ backgroundColor: '#EAE8E3' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#000000' }}>
              Pricing Plans
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-10">
              Get access to practice minutes with various dating AI coaches
            </p>
            
            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-white rounded-full p-1.5 shadow-md border border-slate-200">
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-8 py-2.5 rounded-full font-semibold text-sm transition-all ${
                  billingCycle === 'yearly'
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                style={billingCycle === 'yearly' ? { backgroundColor: '#000000' } : {}}
              >
                Yearly
              </button>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-8 py-2.5 rounded-full font-semibold text-sm transition-all ${
                  billingCycle === 'monthly'
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                style={billingCycle === 'monthly' ? { backgroundColor: '#000000' } : {}}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-200">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#000000' }}>Start</h3>
                <p className="text-slate-600 text-sm mb-6">
                  Perfect for trying out AI dating coaches
                </p>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold" style={{ color: '#000000' }}>
                      ${billingCycle === 'monthly' ? '15' : '12'}
                    </span>
                    <span className="text-slate-600 text-lg">/ per month</span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-sm text-green-600 font-semibold">Save 20% yearly</p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#000000' }} />
                    <span className="text-slate-700">Up to 60 practice minutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#000000' }} />
                    <span className="text-slate-700">Basic conversation tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#000000' }} />
                    <span className="text-slate-700">5 AI coach personalities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#000000' }} />
                    <span className="text-slate-700">Standard feedback reports</span>
                  </li>
                </ul>

                <button 
                  onClick={() => handlePlanClick('starter')}
                  className="w-full text-white font-bold py-4 px-6 rounded-full transition-all shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#000000' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
                >
                  Upgrade
                </button>
                <p className="text-center text-xs text-slate-500 mt-4">7 days free trial</p>
              </div>
            </div>

            {/* Growth Plan - Featured */}
            <div className="rounded-3xl p-8 shadow-2xl relative transform lg:scale-105 border-2" style={{ backgroundColor: '#000000', borderColor: '#333333' }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-white text-sm font-bold px-6 py-2 rounded-full shadow-lg" style={{ color: '#000000' }}>
                  best choice
                </span>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-3">Growth</h3>
                <p className="text-slate-300 text-sm mb-6">
                  For serious improvement and scaling conversations
                </p>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold text-white">
                      ${billingCycle === 'monthly' ? '39' : '32'}
                    </span>
                    <span className="text-slate-300 text-lg">/ per month</span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-sm text-green-400 font-semibold">Save 18% yearly</p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-white">Everything in Start</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-white">Unlimited practice minutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-white">Advanced conversation insights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-white">15+ AI coach personalities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-white">Real-time tone & pacing tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-white">Priority customer support 24/7</span>
                  </li>
                </ul>

                <button 
                  onClick={() => handlePlanClick('growth')}
                  className="w-full font-bold py-4 px-6 rounded-full transition-all shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#ffffff', color: '#000000' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                >
                  Manage
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">2 days until expiration</p>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-200">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#000000' }}>Enterprise</h3>
                <p className="text-slate-600 text-sm mb-6">
                  For dating coaches, companies, and teams
                </p>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold" style={{ color: '#000000' }}>
                      Custom pricing
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">Tailored to your needs</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#000000' }} />
                    <span className="text-slate-700">Everything in Growth</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#000000' }} />
                    <span className="text-slate-700">Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#000000' }} />
                    <span className="text-slate-700">Custom AI coach integrations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#000000' }} />
                    <span className="text-slate-700">Multi-user team permissions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#000000' }} />
                    <span className="text-slate-700">SLA-backed 24/7 support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#000000' }} />
                    <span className="text-slate-700">White-label options & API access</span>
                  </li>
                </ul>

                <button 
                  onClick={() => handlePlanClick('premium')}
                  className="w-full text-white font-bold py-4 px-6 rounded-full transition-all shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#000000' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
                >
                  Contact us
                </button>
                <p className="text-center text-xs text-slate-500 mt-4">Individual plan</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Blurry fade-out effect at bottom for seamless footer blend */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(234, 232, 227, 0) 0%, rgba(234, 232, 227, 0.3) 20%, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 1) 100%)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        />
      </section>

      {/* 7. FINAL CTA + RISK REDUCER */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 text-white relative overflow-hidden" style={{ backgroundColor: '#000000' }}>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            Ready to start speaking with confidence?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Free 3-session trial. Cancel anytime. No credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button
              onClick={onGetStarted}
              className="bg-white font-bold py-6 px-12 rounded-full text-xl transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
              style={{ color: '#000000' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
            >
              Start Free Trial
              <ArrowRight className="w-7 h-7" />
            </button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-base text-slate-300 mb-16">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
              <span>3 free sessions</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
              <span>Private & secure</span>
            </div>
          </div>
          
          {/* FAQ micro-links */}
          <div className="pt-12 border-t border-slate-700">
            <p className="text-base text-slate-400 mb-6 font-medium">Quick questions:</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <button className="text-white hover:text-slate-300 underline underline-offset-4 transition-colors">How does voice data work?</button>
              <button className="text-white hover:text-slate-300 underline underline-offset-4 transition-colors">Is this confidential?</button>
              <button className="text-white hover:text-slate-300 underline underline-offset-4 transition-colors">How long are sessions?</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative text-white py-16 px-6 lg:px-12" style={{ backgroundColor: '#000000' }}>
        {/* Fade-in effect at the top */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,1) 100%)' }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Tagline above big Dateline text */}
          <div className="text-center mb-12">
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Practice dating conversations. Build confidence. Connect deeply.
            </p>
          </div>
          
          {/* Large centered Dateline text */}
          <div className="text-center mb-12">
            <div className="text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-bold text-white leading-none">
              Dateline
            </div>
          </div>
          
          {/* Navigation links below big Dateline text */}
          <div className="flex justify-center gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Floating mobile CTA */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <button
          onClick={onGetStarted}
          className="text-white font-bold py-4 px-8 rounded-full shadow-2xl transition-all transform hover:scale-105 flex items-center gap-3"
          style={{ backgroundColor: '#000000' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
        >
          <Mic className="w-5 h-5" />
          Start Free Session
        </button>
      </div>

      {/* Authentication Modal */}
      <AuthModal 
        open={authModalOpen} 
        type={authModalType} 
        onClose={handleCloseModal} 
      />
    </main>
  );
};