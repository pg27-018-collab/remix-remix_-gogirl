/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Upload, Camera, ToggleLeft, ToggleRight, 
  MapPin, AlertOctagon, Timer, Users, User, Check, AlertCircle,
  HelpCircle, Coffee, BookOpen, Star, Sparkles, Smile, ArrowRight, ArrowLeft,
  ShoppingBag, Flame, Target, Globe, Palette, Music, Library, Film, Cpu, Heart,
  Sun, Moon, Rocket, Plane, Dumbbell, Lock
} from 'lucide-react';
import { UserProfile, TrustedContact } from '../types';
import Logo from './Logo';
import CheckeredBackground from './CheckeredBackground';

interface OnboardingFlowProps {
  onComplete: (profile: UserProfile) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function OnboardingFlow({ onComplete, isDarkMode, toggleDarkMode }: OnboardingFlowProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  
  // Verification State
  const [idType, setIdType] = useState<'Aadhaar' | 'Passport' | 'Driver License'>('Aadhaar');
  const [idFile, setIdFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);
  
  // Face Verification State
  const [useCamera, setUseCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [faceVerified, setFaceVerified] = useState(false);
  const [faceVerifying, setFaceVerifying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Safety Toggles State
  const [toggles, setToggles] = useState({
    location: true,
    sos: true,
    checkIn: true,
    camera: true,
    contacts: true,
  });

  // Personality & Interests State (from survey specification)
  const [personality, setPersonality] = useState<'Introvert' | 'Ambivert' | 'Extrovert'>('Ambivert');
  const [fridayNight, setFridayNight] = useState<'Cozy in' | 'Low-key out' | 'Out out'>('Low-key out');
  const [interests, setInterests] = useState<string[]>(['Books', 'Fitness', 'Travel', 'Music']);
  const [schedulePreference, setSchedulePreference] = useState<'Morning' | 'Night'>('Night');
  const [groupSizePreference, setGroupSizePreference] = useState<'Small groups' | 'Big settings'>('Small groups');
  const [planningStyle, setPlanningStyle] = useState<'Spontaneous' | 'Planned'>('Planned');
  const [safeMeetupVibe, setSafeMeetupVibe] = useState<'Verified Cafés' | 'Group Activities' | 'Quiet Hubs' | 'Outdoor Walks'>('Verified Cafés');

  // Account Form & OTP Verification State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [age, setAge] = useState(23);
  const [userAvatar, setUserAvatar] = useState('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('4829');
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpError, setOtpError] = useState('');

  // Stop camera when step changes or on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      setUseCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.log('Camera error, fallback to simulation:', err);
      setUseCamera(false);
      // Trigger simulation
      setFaceVerifying(true);
      setTimeout(() => {
        setFaceVerifying(false);
        setFaceVerified(true);
      }, 2500);
    }
  };

  const handleCaptureFace = () => {
    setFaceVerifying(true);
    setTimeout(() => {
      setFaceVerifying(false);
      setFaceVerified(true);
      // Stop stream
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        setCameraStream(null);
      }
    }, 2000);
  };

  const triggerIdUpload = () => {
    // Simulate image upload
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setIdUploaded(true);
      setIdFile('simulated_id_uploaded.png');
    }, 1500);
  };

  const handleSendOtp = () => {
    if (!phone || phone.trim().length < 8) {
      alert('Please enter a valid phone number.');
      return;
    }
    setIsSendingOtp(true);
    setOtpError('');
    setTimeout(() => {
      setIsSendingOtp(false);
      setOtpSent(true);
      setOtpInput('4829');
    }, 800);
  };

  const handleVerifyOtp = () => {
    if (otpInput.trim() === '4829' || otpInput.trim().length === 4) {
      setOtpVerified(true);
      setOtpError('');
    } else {
      setOtpError('Invalid OTP code. Use code 4829.');
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Step 2 is page 2: Go Girl name, tagline, TAKE SURVEY CTA
      setStep(3);
    } else if (step === 3) {
      // Step 3 is page 3: Survey with 7 questions
      setStep(4);
    } else if (step === 4) {
      // Step 4 is verification (Aadhaar, OTP, Biometric, Terms)
      if (!name || !phone) {
        alert('Please enter your name and phone number.');
        return;
      }
      if (age < 14) {
        alert('You must be 14 years or older to join GoGirl.');
        return;
      }
      if (!otpVerified) {
        alert('Please complete phone OTP verification to confirm Aadhaar link genuineness.');
        return;
      }
      if (!idUploaded || !faceVerified) {
        alert('Please complete both ID upload and Face verification.');
        return;
      }
      if (!termsAgreed) {
        alert('Please accept the terms and conditions and promise to adhere to all guidelines.');
        return;
      }
      setStep(5);
    } else if (step === 5) {
      setStep(6);
    } else {
      // Step 6: Enter Go Girl Space
      onComplete({
        name,
        phone,
        age,
        idType,
        idNumber: '**** **** ' + Math.floor(1000 + Math.random() * 9000),
        isVerified: true,
        personality,
        fridayNight,
        interests,
        schedulePreference,
        groupSizePreference,
        planningStyle,
        avatar: userAvatar,
        trustedContacts: [
          { id: 'tc1', name: 'Mom', phone: '+91 99102 384XX', relation: 'Parent' },
          { id: 'tc2', name: 'Sneha (Flatmate)', phone: '+91 98451 028XX', relation: 'Friend' }
        ]
      });
    }
  };

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      if (interests.length >= 5) {
        alert('You can select up to 5 interests.');
        return;
      }
      setInterests([...interests, interest]);
    }
  };

  const allAvailableInterests = [
    'Cafés', 'Books', 'Fashion', 'Fitness', 'Startups', 'Travel', 'Art', 'Music', 'Wellness', 'Museums', 'Movies', 'Tech'
  ];

  return (
    <div className={`w-full max-w-md mx-auto h-[780px] rounded-[46px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-[12px] border-neutral-900 overflow-hidden relative flex flex-col justify-between p-6 isolate transition-all duration-300 ${
      step === 1 
        ? 'bg-gradient-to-br from-[#800020] via-[#6B0E1D] to-[#460610] text-white' 
        : isDarkMode 
          ? 'dark-theme bg-[#141210] text-stone-100' 
          : 'bg-gradient-to-tr from-[#FC8EAC]/10 via-[#FFFDFD] to-[#95C7C2]/15 text-gray-900'
    }`}>
      {step !== 1 && <CheckeredBackground opacity={isDarkMode ? 0.25 : 0.65} transparentBg={true} />}
      
      {/* Header bar */}
      <div className="flex justify-between items-center px-1 py-1 z-10">
        {step > 1 ? (
          <button 
            onClick={() => setStep((prev) => (prev - 1) as any)}
            className="w-8 h-8 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm shadow flex items-center justify-center text-gray-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800 transition cursor-pointer active:scale-95 border border-transparent dark:border-stone-850"
            aria-label="Previous step"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        ) : <div className="w-8 h-8" />}
        
        {/* Logo Icon (shown only after step 1) */}
        {step > 1 ? <Logo variant="header" /> : <div />}
        
        {/* Step indicator */}
        <div className="flex items-center gap-1.5">
          <div className={`text-[10px] font-mono border px-2 py-1.5 rounded-full font-semibold leading-none shadow-3xs backdrop-blur-sm ${
            step === 1 
              ? 'bg-white/20 border-white/30 text-white' 
              : 'bg-white/70 dark:bg-stone-900/70 border-gray-200/80 dark:border-stone-800/80 text-gray-600 dark:text-stone-300'
          }`}>
            0{step}/06
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto py-4 px-1 flex flex-col justify-center scrollbar-none z-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center text-center justify-center h-full py-4"
            >
              {/* Opening screen: Centered text logo with technical blueprint drawing animation */}
              <div className="my-auto flex flex-col items-center justify-center w-full select-none">
                
                {/* SVG Blueprint Animation Container - Clipped with overflow-hidden */}
                <div className="relative w-full max-w-[340px] h-32 flex items-center justify-center overflow-hidden">
                  <svg 
                    viewBox="0 0 500 120" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-full h-full overflow-hidden"
                  >
                    {/* SVG Drawn Text Logo - Centered and Enlarged */}
                    <motion.text
                      x="50%"
                      y="70"
                      textAnchor="middle"
                      className="stroke-white"
                      style={{ 
                        fontFamily: "var(--font-serif)",
                        strokeWidth: "1.5px",
                        fontSize: "68px",
                        fontWeight: "900"
                      }}
                      initial={{ 
                        strokeDasharray: 400, 
                        strokeDashoffset: 400, 
                        fill: "rgba(255, 255, 255, 0)" 
                      }}
                      animate={{ 
                        strokeDashoffset: 0, 
                        fill: "rgba(255, 255, 255, 1)" 
                      }}
                      transition={{
                        strokeDashoffset: { duration: 1.8, ease: "easeInOut", delay: 0.2 },
                        fill: { duration: 0.8, delay: 1.6, ease: "easeIn" }
                      }}
                    >
                      Go Girl
                    </motion.text>

                    {/* Subtitle - BY KANEISHA HARITASH locked right beneath Go Girl */}
                    <motion.text
                      x="50%"
                      y="92"
                      textAnchor="middle"
                      fill="rgba(255, 255, 255, 0.9)"
                      style={{ 
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: "900",
                        letterSpacing: "0.24em"
                      }}
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 92 }}
                      transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
                    >
                      BY KANEISHA HARITASH
                    </motion.text>
                  </svg>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col items-center justify-center text-center h-full my-auto py-8"
            >
              <div className="my-auto flex flex-col items-center justify-center w-full space-y-6">
                <Logo variant="animated" />
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 }}
                  className="text-xs font-semibold text-gray-500 max-w-[280px] leading-relaxed"
                >
                  Welcome to the exclusive community of Go Girl.
                </motion.p>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col h-full overflow-y-auto pr-1 scrollbar-none space-y-4 text-left py-1"
            >
              {/* Classic Serif Survey Title */}
              <div className="flex justify-between items-center px-1 py-1.5 mb-1 z-10">
                <div>
                  <h2 
                    className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Personalize Your Vibe
                  </h2>
                  <p className="text-[10.5px] text-gray-400 dark:text-stone-400 font-bold mt-0.5">Help us find your perfect connections</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#FC8EAC] bg-[#FC8EAC]/10 px-2.5 py-1 rounded-full border border-[#FC8EAC]/20 shrink-0">
                  7 Questions
                </span>
              </div>

              {/* Question 1: Personality Type */}
              <div className="bg-white/90 dark:bg-[#1C1A18]/65 backdrop-blur-md rounded-2xl border border-white/60 dark:border-stone-800/80 shadow-[0_4px_20px_-1px_rgba(252,142,172,0.03)] p-3.5 space-y-2.5 transition-all duration-300">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#FC8EAC]/10 to-[#FC8EAC]/20 text-[#FC8EAC] border border-[#FC8EAC]/30 flex items-center justify-center shrink-0 shadow-3xs">
                    <Smile className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-stone-100">1. Personality Type</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['Introvert', 'Ambivert', 'Extrovert'] as const).map((opt) => {
                    const isSel = personality === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setPersonality(opt)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition-all duration-250 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSel 
                            ? 'bg-[#FC8EAC] text-white shadow-md shadow-[#FC8EAC]/20 scale-[1.02] border border-[#FC8EAC]' 
                            : 'bg-white/60 dark:bg-stone-900/40 border border-gray-150/60 dark:border-stone-850 text-gray-700 dark:text-stone-300 hover:border-pink-200/40 dark:hover:border-pink-500/30 hover:bg-white dark:hover:bg-stone-850/60 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300'
                        }`}
                      >
                        {isSel && <Check className="w-3 h-3 stroke-[3]" />}
                        <span className="truncate">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 2: Ideal Friday Night */}
              <div className="bg-white/90 dark:bg-[#1C1A18]/65 backdrop-blur-md rounded-2xl border border-white/60 dark:border-stone-800/80 shadow-[0_4px_20px_-1px_rgba(252,142,172,0.03)] p-3.5 space-y-2.5 transition-all duration-300">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#95C7C2]/15 to-[#95C7C2]/25 text-[#3D7A72] dark:text-[#95C7C2] border border-[#95C7C2]/30 flex items-center justify-center shrink-0 shadow-3xs">
                    <Moon className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-stone-100">2. Ideal Friday Night</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['Cozy in', 'Low-key out', 'Out out'] as const).map((opt) => {
                    const isSel = fridayNight === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFridayNight(opt)}
                        className={`py-2 px-2.5 rounded-xl text-[11px] font-bold transition-all duration-250 active:scale-95 cursor-pointer flex items-center justify-center gap-1 ${
                          isSel 
                            ? 'bg-[#FC8EAC] text-white shadow-md shadow-[#FC8EAC]/20 scale-[1.02] border border-[#FC8EAC]' 
                            : 'bg-white/60 dark:bg-stone-900/40 border border-gray-150/60 dark:border-stone-850 text-gray-700 dark:text-stone-300 hover:border-pink-200/40 dark:hover:border-pink-500/30 hover:bg-white dark:hover:bg-stone-850/60 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300'
                        }`}
                      >
                        {isSel && <Check className="w-3 h-3 stroke-[3]" />}
                        <span className="truncate">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 3: Interests & Passions */}
              <div className="bg-white/90 dark:bg-[#1C1A18]/65 backdrop-blur-md rounded-2xl border border-white/60 dark:border-stone-800/80 shadow-[0_4px_20px_-1px_rgba(252,142,172,0.03)] p-3.5 space-y-2.5 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#FC8EAC]/10 to-[#FC8EAC]/20 text-[#FC8EAC] border border-[#FC8EAC]/30 flex items-center justify-center shrink-0 shadow-3xs">
                      <Heart className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <h3 className="text-xs font-bold text-gray-900 dark:text-stone-100">3. Interests & Passions</h3>
                  </div>
                  <span className="text-[10px] text-gray-400 dark:text-stone-400 font-extrabold font-mono">({interests.length}/5 selected)</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: 'Cafés', icon: Coffee },
                    { name: 'Books', icon: BookOpen },
                    { name: 'Fashion', icon: ShoppingBag },
                    { name: 'Fitness', icon: Dumbbell },
                    { name: 'Startups', icon: Rocket },
                    { name: 'Travel', icon: Plane },
                    { name: 'Art', icon: Palette },
                    { name: 'Music', icon: Music },
                    { name: 'Wellness', icon: Heart },
                  ].map(({ name, icon: Icon }) => {
                    const isSel = interests.includes(name);
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => toggleInterest(name)}
                        className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all duration-250 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSel 
                            ? 'bg-[#FC8EAC] text-white shadow-md shadow-[#FC8EAC]/20 scale-[1.02] border border-[#FC8EAC]' 
                            : 'bg-white/60 dark:bg-stone-900/40 border border-gray-150/60 dark:border-stone-850 text-gray-700 dark:text-stone-300 hover:border-pink-200/40 dark:hover:border-pink-500/30 hover:bg-white dark:hover:bg-stone-850/60 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isSel ? 'text-white' : 'text-gray-500'}`} />
                        <span className="truncate">{name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 4: Schedule Preference */}
              <div className="bg-white/90 dark:bg-[#1C1A18]/65 backdrop-blur-md rounded-2xl border border-white/60 dark:border-stone-800/80 shadow-[0_4px_20px_-1px_rgba(252,142,172,0.03)] p-3.5 space-y-2.5 transition-all duration-300">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-amber-100/60 to-amber-200/60 dark:from-amber-950/40 dark:to-amber-900/40 text-amber-600 dark:text-amber-400 border border-amber-300/30 dark:border-amber-800/30 flex items-center justify-center shrink-0 shadow-3xs">
                    <Sun className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-stone-100">4. Schedule Preference</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(['Morning', 'Night'] as const).map((opt) => {
                    const isSel = schedulePreference === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSchedulePreference(opt)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-250 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSel 
                            ? 'bg-[#FC8EAC] text-white shadow-md shadow-[#FC8EAC]/20 scale-[1.02] border border-[#FC8EAC]' 
                            : 'bg-white/60 dark:bg-stone-900/40 border border-gray-150/60 dark:border-stone-850 text-gray-700 dark:text-stone-300 hover:border-pink-200/40 dark:hover:border-pink-500/30 hover:bg-white dark:hover:bg-stone-850/60 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300'
                        }`}
                      >
                        {isSel && <Check className="w-3 h-3 stroke-[3]" />}
                        <span className="truncate">{opt === 'Morning' ? '🌅 Morning Person' : '🌙 Night Owl'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 5: Group Size Preference */}
              <div className="bg-white/90 dark:bg-[#1C1A18]/65 backdrop-blur-md rounded-2xl border border-white/60 dark:border-stone-800/80 shadow-[0_4px_20px_-1px_rgba(252,142,172,0.03)] p-3.5 space-y-2.5 transition-all duration-300">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-100/60 to-emerald-200/60 dark:from-emerald-950/40 dark:to-emerald-900/40 text-emerald-600 dark:text-emerald-400 border border-emerald-300/30 dark:border-emerald-800/30 flex items-center justify-center shrink-0 shadow-3xs">
                    <Users className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-stone-100">5. Group Size Preference</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(['Small groups', 'Big settings'] as const).map((opt) => {
                    const isSel = groupSizePreference === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setGroupSizePreference(opt)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-250 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSel 
                            ? 'bg-[#FC8EAC] text-white shadow-md shadow-[#FC8EAC]/20 scale-[1.02] border border-[#FC8EAC]' 
                            : 'bg-white/60 dark:bg-stone-900/40 border border-gray-150/60 dark:border-stone-850 text-gray-700 dark:text-stone-300 hover:border-pink-200/40 dark:hover:border-pink-500/30 hover:bg-white dark:hover:bg-stone-850/60 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300'
                        }`}
                      >
                        {isSel && <Check className="w-3 h-3 stroke-[3]" />}
                        <span className="truncate">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 6: Planning Style */}
              <div className="bg-white/90 dark:bg-[#1C1A18]/65 backdrop-blur-md rounded-2xl border border-white/60 dark:border-stone-800/80 shadow-[0_4px_20px_-1px_rgba(252,142,172,0.03)] p-3.5 space-y-2.5 transition-all duration-300">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-cyan-100/60 to-cyan-200/60 dark:from-cyan-950/40 dark:to-cyan-900/40 text-cyan-600 dark:text-cyan-400 border border-cyan-300/30 dark:border-cyan-800/30 flex items-center justify-center shrink-0 shadow-3xs">
                    <Sparkles className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-stone-100">6. Planning Style</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(['Spontaneous', 'Planned'] as const).map((opt) => {
                    const isSel = planningStyle === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setPlanningStyle(opt)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-250 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSel 
                            ? 'bg-[#FC8EAC] text-white shadow-md shadow-[#FC8EAC]/20 scale-[1.02] border border-[#FC8EAC]' 
                            : 'bg-white/60 dark:bg-stone-900/40 border border-gray-150/60 dark:border-stone-850 text-gray-700 dark:text-stone-300 hover:border-pink-200/40 dark:hover:border-pink-500/30 hover:bg-white dark:hover:bg-stone-850/60 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300'
                        }`}
                      >
                        {isSel && <Check className="w-3 h-3 stroke-[3]" />}
                        <span className="truncate">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 7: Preferred Safe Meetup Atmosphere */}
              <div className="bg-white/90 dark:bg-[#1C1A18]/65 backdrop-blur-md rounded-2xl border border-white/60 dark:border-stone-800/80 shadow-[0_4px_20px_-1px_rgba(252,142,172,0.03)] p-3.5 space-y-2.5 transition-all duration-300">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#FC8EAC]/10 to-[#FC8EAC]/20 text-[#FC8EAC] border border-[#FC8EAC]/30 flex items-center justify-center shrink-0 shadow-3xs">
                    <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-stone-100">7. Preferred Safe Meetup Vibe</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(['Verified Cafés', 'Group Activities', 'Quiet Hubs', 'Outdoor Walks'] as const).map((opt) => {
                    const isSel = safeMeetupVibe === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSafeMeetupVibe(opt)}
                        className={`py-2.5 px-2 rounded-xl text-[11.5px] font-bold transition-all duration-250 active:scale-95 cursor-pointer flex items-center justify-center gap-1 ${
                          isSel 
                            ? 'bg-[#FC8EAC] text-white shadow-md shadow-[#FC8EAC]/20 scale-[1.02] border border-[#FC8EAC]' 
                            : 'bg-white/60 dark:bg-stone-900/40 border border-gray-150/60 dark:border-stone-850 text-gray-700 dark:text-stone-300 hover:border-pink-200/40 dark:hover:border-pink-500/30 hover:bg-white dark:hover:bg-stone-850/60 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300'
                        }`}
                      >
                        {isSel && <Check className="w-3 h-3 stroke-[3]" />}
                        <span className="truncate">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col h-full overflow-y-auto pr-1 scrollbar-none space-y-3 text-left py-1"
            >
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Identity & Biometric Verification</h2>
              <p className="text-xs text-gray-600 mt-0.5 mb-2 leading-normal font-semibold">
                Government ID card authentication & live facial biometric match.
              </p>

              {/* Core Information form */}
              <div className="bg-white p-3 rounded-2xl border border-gray-150 shadow-xs mb-2 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Aditi Roy"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-gray-150 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#800020] font-semibold text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Age</label>
                    <input 
                      type="number" 
                      min="14" 
                      max="100" 
                      value={age}
                      onChange={(e) => setAge(parseInt(e.target.value) || 20)}
                      className="w-full text-xs p-2.5 rounded-xl border border-gray-150 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#800020] font-semibold text-gray-800"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Number & Genuine OTP Verification Card */}
              <div className="bg-white p-3 rounded-2xl border border-gray-150 shadow-xs mb-2">
                <div className="flex justify-between items-center mb-1.5 gap-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase truncate">Mobile Number & Aadhaar OTP Link</label>
                  {otpVerified && (
                    <span className="text-[9.5px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                      Authenticated
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <input 
                    type="tel" 
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setOtpVerified(false);
                      setOtpSent(false);
                    }}
                    className="flex-1 min-w-0 text-xs p-2.5 rounded-xl border border-gray-150 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#800020] font-semibold text-gray-800"
                  />
                  {!otpVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isSendingOtp}
                      className="bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs px-3 py-2.5 rounded-xl transition cursor-pointer shrink-0 flex items-center justify-center whitespace-nowrap active:scale-95 disabled:opacity-50"
                    >
                      {isSendingOtp ? (
                        <div className="w-3.5 h-3.5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                      ) : otpSent ? 'Resend OTP' : 'Send OTP'}
                    </button>
                  )}
                </div>

                {/* OTP Input section when sent */}
                {otpSent && !otpVerified && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2.5 pt-2.5 border-t border-gray-100 flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center gap-1">
                      <span className="text-[10px] font-bold text-gray-700 truncate">Enter 4-Digit Aadhaar OTP</span>
                      <span className="text-[9.5px] text-[#800020] font-mono font-bold bg-[#FAF6F0] px-2 py-0.5 rounded-md border border-[#E8DCCB] shrink-0">Code: 4829</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        maxLength={4}
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        placeholder="4829"
                        className="w-20 shrink-0 text-center text-xs tracking-widest font-mono py-2 px-1 rounded-xl border border-[#E8DCCB] bg-[#FAF6F0] focus:outline-none focus:ring-2 focus:ring-[#800020] font-bold"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="flex-1 min-w-0 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition cursor-pointer active:scale-95 py-2 px-2 shadow-xs whitespace-nowrap flex items-center justify-center"
                      >
                        Verify Code
                      </button>
                    </div>
                    {otpError && <p className="text-[10px] text-red-500 font-bold">{otpError}</p>}
                  </motion.div>
                )}

                {otpVerified && (
                  <div className="mt-2 p-2 bg-emerald-50/90 border border-emerald-200 rounded-xl flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-950 leading-tight">
                      Aadhaar Authenticated: Phone number verified via instant OTP link.
                    </span>
                  </div>
                )}
              </div>

              {/* ID Selector & upload block */}
              <div className="bg-white p-3 rounded-2xl border border-gray-150 shadow-xs mb-2">
                <div className="flex flex-col gap-1.5 mb-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Identification Document</label>
                  <div className="flex bg-gray-100 p-0.5 rounded-xl border border-gray-250">
                    {(['Aadhaar', 'Passport', 'Driver License'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => { setIdType(t); setIdUploaded(false); setIdFile(null); }}
                        className={`flex-1 text-[9px] py-1.5 rounded-lg font-bold transition-all duration-250 cursor-pointer ${idType === t ? 'bg-white text-gray-900 shadow-xs border border-gray-200' : 'text-gray-500 hover:text-gray-800'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {idUploaded ? (
                  <div className="bg-sage-50 border border-sage-200 p-2.5 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-sage-100 text-sage-600 rounded-full"><Check className="w-3.5 h-3.5 text-emerald-600" /></div>
                      <span className="text-xs font-bold text-sage-800">{idType} Document Uploaded</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => { setIdUploaded(false); setIdFile(null); }}
                      className="text-[10px] text-coral-600 font-extrabold hover:underline"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={triggerIdUpload}
                    disabled={isUploading}
                    className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl hover:border-coral-400 transition bg-gray-50/50 flex flex-col items-center justify-center cursor-pointer"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-coral-500 animate-spin mb-1" />
                        <span className="text-xs text-gray-500 font-bold">Verifying document...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-gray-400 mb-0.5" />
                        <span className="text-xs font-bold text-gray-700">Upload copy of {idType}</span>
                        <span className="text-[9px] text-gray-400 mt-0.5">Protected with 256-bit encryption.</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Biometric Face verification block */}
              <div className="bg-white p-3 rounded-2xl border border-gray-150 shadow-xs mb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1.5">Biometric Facial Scan</span>
                
                {faceVerified ? (
                  <div className="bg-sage-50 border border-sage-200 p-2.5 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-sage-100 text-sage-600 rounded-full"><Check className="w-3.5 h-3.5 text-emerald-600" /></div>
                      <span className="text-xs font-bold text-sage-800">Biometric Match Verified</span>
                    </div>
                    <div className="text-[9.5px] bg-[#EAF7ED] text-emerald-700 font-mono px-2 py-0.5 rounded font-extrabold border border-emerald-200">
                      Matched
                    </div>
                  </div>
                ) : faceVerifying ? (
                  <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-coral-500 animate-spin flex items-center justify-center mb-1">
                       <Camera className="w-4 h-4 text-coral-500 animate-pulse" />
                    </div>
                    <span className="text-xs text-gray-700 font-extrabold">Scanning facial biometric...</span>
                  </div>
                ) : useCamera ? (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black flex flex-col justify-end">
                    <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-20 h-28 border-2 border-dashed border-coral-400 rounded-[50%] animate-pulse" />
                    </div>
                    <div className="relative p-2 bg-gradient-to-t from-black/80 to-transparent flex justify-center z-10">
                      <button
                        type="button"
                        onClick={handleCaptureFace}
                        className="bg-coral-500 hover:bg-coral-600 text-white font-extrabold py-1 px-4 rounded-full text-[10.5px] shadow"
                      >
                        Take Scan Photo
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleStartCamera}
                    className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-gray-500" />
                    <span className="text-xs font-bold text-gray-700">Scan Face Biometric</span>
                  </button>
                )}
              </div>

              {/* Terms covenant checkbox */}
              <div 
                onClick={() => setTermsAgreed(!termsAgreed)}
                className={`flex items-start gap-3 p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                  termsAgreed 
                    ? 'bg-[#F4ECE1] border-coral-400/90' 
                    : 'bg-white/80 border-gray-150/70 hover:border-coral-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 mt-0.5 ${
                    termsAgreed 
                      ? 'bg-coral-500 border-coral-500 text-white' 
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {termsAgreed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="flex-1 text-left">
                  <span className="text-[11px] font-bold text-gray-950 block leading-none">Safety & Guidelines</span>
                  <p className="text-[10px] text-gray-600 leading-relaxed mt-1 font-semibold">
                    I accept the terms and conditions and promise to adhere to all guidelines.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col h-full overflow-y-auto pr-1 scrollbar-none space-y-4 text-left py-1"
            >
              {/* Header Title */}
              <div className="text-center px-2">
                <h2 className="text-xl font-black text-gray-900 tracking-tight leading-tight">
                  Safety Works Better Together.
                </h2>
                <p className="text-[11.5px] text-gray-500 font-medium leading-relaxed mt-1.5 max-w-[300px] mx-auto">
                  Enable location access to discover nearby meetups, trusted spaces, and real-time safety features.
                </p>
              </div>

              {/* Map/Radar Graphic */}
              <div className="relative w-full h-44 bg-[#FAF6F0] rounded-3xl border border-[#E8DCCB] overflow-hidden flex items-center justify-center shadow-xs">
                {/* Simulated Grid Road Lines */}
                <div className="absolute inset-0 opacity-15" style={{
                  backgroundImage: `
                    linear-gradient(90deg, #800020 1px, transparent 1px),
                    linear-gradient(0deg, #800020 1px, transparent 1px),
                    linear-gradient(45deg, #800020 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px, 40px 40px, 80px 80px',
                  backgroundPosition: 'center'
                }} />

                {/* Concentric Radar Rings */}
                <div className="absolute w-32 h-32 border border-emerald-500/20 rounded-full flex items-center justify-center animate-pulse" />
                <div className="absolute w-20 h-20 border border-emerald-500/35 rounded-full flex items-center justify-center" />
                <div className="absolute w-10 h-10 border border-emerald-500/50 rounded-full flex items-center justify-center" />
                <div className="absolute w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center animate-ping" />

                {/* User Center Pin (Radar Source) */}
                <div className="absolute z-10 w-7 h-7 bg-emerald-600 rounded-full border-2 border-white shadow flex items-center justify-center text-white">
                  <MapPin className="w-3.5 h-3.5 fill-white" />
                </div>

                {/* Off-Center Markers */}
                {/* Coffee Pin */}
                <div className="absolute top-6 right-12 w-8 h-8 bg-[#7A3D0E] text-white rounded-full border-2 border-white shadow flex items-center justify-center hover:scale-110 transition duration-200">
                  <Coffee className="w-4 h-4 text-white" />
                </div>

                {/* Users Pin */}
                <div className="absolute top-14 left-10 w-8 h-8 bg-coral-500 text-white rounded-full border-2 border-white shadow flex items-center justify-center hover:scale-110 transition duration-200">
                  <Users className="w-4 h-4 text-white" />
                </div>

                {/* Shopping Pin */}
                <div className="absolute bottom-8 right-8 w-8 h-8 bg-emerald-600 text-white rounded-full border-2 border-white shadow flex items-center justify-center hover:scale-110 transition duration-200">
                  <ShoppingBag className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Toggles Container Card */}
              <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-neutral-150 shadow-3xs p-4 space-y-3.5">
                
                {/* Toggle 1: Location Access */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 shrink-0">
                      <MapPin className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-800 block">Location Access</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setToggles({ ...toggles, location: !toggles.location })}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                      toggles.location ? 'bg-[#484E42]' : 'bg-gray-200'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                        toggles.location ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Toggle 2: Emergency SOS Access */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Rounded SOS Text Icon */}
                    <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-800 font-black text-[9px] font-mono tracking-tighter shrink-0">
                      SOS
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-800 block">Emergency SOS Access</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setToggles({ ...toggles, sos: !toggles.sos })}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                      toggles.sos ? 'bg-[#484E42]' : 'bg-gray-200'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                        toggles.sos ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Toggle 3: Safety Check-ins */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 shrink-0">
                      <ShieldCheck className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-800 block">Safety Check-ins</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setToggles({ ...toggles, checkIn: !toggles.checkIn })}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                      toggles.checkIn ? 'bg-[#484E42]' : 'bg-gray-200'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                        toggles.checkIn ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Toggle 4: Trusted Contact Sharing */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 shrink-0">
                      <Users className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-800 block">Trusted Contact Sharing</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setToggles({ ...toggles, contacts: !toggles.contacts })}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                      toggles.contacts ? 'bg-[#484E42]' : 'bg-gray-200'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                        toggles.contacts ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

              </div>

              {/* Action Button & Lock note */}
              <div className="pt-1.5 space-y-3">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-[#1C1A17] hover:bg-[#2C2925] active:scale-98 transition duration-200 text-white font-extrabold py-3.5 rounded-2xl text-xs tracking-wide shadow-md flex items-center justify-center cursor-pointer"
                >
                  Enable Safety Features
                </button>
                
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500 font-semibold">
                  <Lock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>You stay in control of what you share.</span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex flex-col h-full items-center justify-center text-center px-2 my-auto"
            >
              <div className="my-auto flex flex-col items-center justify-center max-w-[325px] py-6">
                {/* User DP (Display Picture) */}
                <div className="relative mb-3.5">
                  <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#800020] via-[#92192B] to-[#C2A78C] shadow-xl shadow-[#800020]/25">
                    <img
                      src={userAvatar}
                      alt={name || 'Aditi'}
                      className="w-full h-full rounded-full object-cover border-2 border-white"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full shadow-md border-2 border-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">
                  Welcome, {name || 'Aditi'}!
                </h2>
                <p className="text-xs font-black text-[#800020] mt-2.5 uppercase tracking-wider leading-snug">
                  STEP INTO YOUR SAFE SPACE
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Attribution line directly above bottom flex - ONLY on 6th page */}
      {step === 6 && (
        <div className="text-center pt-1 pb-1">
          <span className="text-[11.5px] font-bold tracking-wide font-serif text-stone-800">
            Go Girl by Kaneisha HaritasH
          </span>
        </div>
      )}

      {/* Button controls footer */}
      {step !== 5 && (
        <div className={`pt-2 pb-1 border-t flex flex-col gap-2 z-10 ${step === 1 ? 'border-white/20' : 'border-gray-150/50'}`}>
          <button
            onClick={handleNextStep}
            className={`w-full font-extrabold py-3.5 px-4 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 text-sm cursor-pointer ${
              step === 1 
                ? 'bg-white text-[#800020] hover:bg-[#FAF6F0] font-extrabold shadow-lg' 
                : 'bg-gradient-to-r from-coral-500 to-rose-500 hover:from-coral-600 hover:to-rose-600 text-white'
            }`}
          >
            {step === 2 && <Sparkles className="w-4 h-4 animate-pulse" />}
            <span>
              {step === 1 
                ? 'Get Started' 
                : step === 2
                  ? 'TAKE SURVEY'
                  : step === 3 
                    ? 'Submit Survey & Continue' 
                    : step === 4 
                      ? 'Verify Identity & Continue' 
                      : step === 6 
                        ? 'ENTER GO GIRL SPACE' 
                        : 'Continue'
              }
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
          {step === 1 && (
            <span className="text-[10px] text-[#F4ECE1] text-center uppercase tracking-wider font-semibold">
              Already verified? <span className="text-white font-bold underline hover:text-[#FAF6F0] cursor-pointer" onClick={() => setStep(6)}>Log In</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
