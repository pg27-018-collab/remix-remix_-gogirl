import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, Siren, PhoneCall, MapPin, AlertTriangle, CheckCircle2, 
  Radio, Volume2, VolumeX, X, Send, UserCheck, Battery, Phone, ExternalLink
} from 'lucide-react';
import { UserProfile } from '../types';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
}

export default function EmergencySOSModal({ isOpen, onClose, userProfile }: EmergencySOSModalProps) {
  const [sirenPlaying, setSirenPlaying] = useState(false);
  const [dispatchStep, setDispatchStep] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  // Live dispatched details
  const locationAddress = "Connaught Place / Sector 29, Gurugram NCR";
  const gpsCoords = "28.4595° N, 77.0266° E";
  const userPhone = userProfile.phone || "+91 98765 43210";

  // Simulate progressive emergency dispatch steps
  useEffect(() => {
    if (isOpen) {
      setDispatchStep(1);
      const timer1 = setTimeout(() => setDispatchStep(2), 1200);
      const timer2 = setTimeout(() => setDispatchStep(3), 2500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isOpen]);

  // Audio Siren synthesizer toggle
  const toggleSiren = () => {
    if (!sirenPlaying) {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.5);
        osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 1.0);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        setAudioContext(ctx);
        setSirenPlaying(true);
      } catch (e) {
        setSirenPlaying(true);
      }
    } else {
      if (audioContext) {
        try { audioContext.close(); } catch (e) {}
      }
      setAudioContext(null);
      setSirenPlaying(false);
    }
  };

  const handleCopyLocation = () => {
    navigator.clipboard?.writeText(`EMERGENCY SOS ALERT! ${userProfile.name} needs help at ${locationAddress} (${gpsCoords}). Call phone: ${userPhone}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-sm bg-stone-900 text-white rounded-3xl border border-red-500/40 shadow-[0_0_50px_rgba(220,38,38,0.4)] overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Pulsing Emergency Top Header */}
          <div className="bg-gradient-to-r from-red-700 via-rose-600 to-red-800 p-3.5 relative overflow-hidden flex items-center justify-between border-b border-red-500/50">
            <div className="absolute inset-0 bg-red-500/20 animate-pulse pointer-events-none" />
            <div className="flex items-center gap-2.5 z-10">
              <div className="w-9 h-9 rounded-full bg-white text-red-600 flex items-center justify-center shadow-lg">
                <Siren className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-sm font-black text-white tracking-wider uppercase leading-tight">SOS EMERGENCY DISPATCH</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-red-100 font-extrabold tracking-wide">BROADCASTING LIVE LOCATION</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-black/30 text-white hover:bg-black/50 flex items-center justify-center transition cursor-pointer z-10"
              aria-label="Close SOS"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body with Scroll */}
          <div className="p-3.5 overflow-y-auto space-y-3.5 text-left text-xs scrollbar-none">
            
            {/* Live Dispatch Status Pill */}
            <div className="bg-stone-800/90 border border-red-500/30 p-2.5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                <div>
                  <div className="text-[10.5px] font-black text-red-300 uppercase">Emergency Alert Status</div>
                  <div className="text-[10px] text-stone-300 font-medium">
                    {dispatchStep === 1 && "Connecting to Delhi & Gurugram Control..."}
                    {dispatchStep === 2 && "Transmitting coordinates to Police & Helpline..."}
                    {dispatchStep >= 3 && "🚨 Dispatched to Police, Ambulance, and Women Helpline"}
                  </div>
                </div>
              </div>
              <span className="text-[9.5px] font-mono bg-red-950 text-red-200 border border-red-800 px-2 py-0.5 rounded-full font-bold">
                112 / 1091 Active
              </span>
            </div>

            {/* Transmitted User Details Card */}
            <div className="bg-stone-950/80 p-3 rounded-2xl border border-stone-800 space-y-2">
              <div className="flex justify-between items-center border-b border-stone-800 pb-1.5">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Transmitted User Profile</span>
                <span className="text-[9.5px] font-extrabold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800 flex items-center gap-1">
                  <UserCheck className="w-3 h-3" /> Aadhaar Verified
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                <div>
                  <span className="text-stone-500 text-[9px] block uppercase font-bold">Full Name</span>
                  <span className="font-extrabold text-stone-100">{userProfile.name}</span>
                </div>
                <div>
                  <span className="text-stone-500 text-[9px] block uppercase font-bold">Mobile Number</span>
                  <span className="font-mono font-extrabold text-stone-100">{userPhone}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-stone-500 text-[9px] block uppercase font-bold">Current Live Location</span>
                  <div className="flex items-start gap-1 mt-0.5 text-amber-300 font-bold leading-tight">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{locationAddress} <span className="font-mono text-[9.5px] text-stone-400 font-normal">({gpsCoords})</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Authorities & Helplines List (Delhi & Gurugram) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-[11px] font-black text-stone-200 uppercase tracking-wide flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                  Notified Helplines (Delhi & Gurugram)
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {/* Delhi & Gurugram Police */}
                <div className="bg-stone-800/80 p-2.5 rounded-2xl border border-stone-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-red-900/60 text-red-300 border border-red-700/50 flex items-center justify-center font-bold">
                      🚨
                    </div>
                    <div>
                      <div className="text-[11px] font-extrabold text-stone-100">Delhi & Gurugram Police Control</div>
                      <div className="text-[9.5px] text-stone-400 font-medium">Police Control Room (PCR 112 / 100) • Gurugram PCR: 0124-2334770</div>
                    </div>
                  </div>
                  <a
                    href="tel:112"
                    className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] rounded-xl flex items-center gap-1 transition active:scale-95 shadow-sm shrink-0"
                  >
                    <PhoneCall className="w-3 h-3" /> Call 112
                  </a>
                </div>

                {/* Women Safety Helpline Delhi & Gurugram */}
                <div className="bg-stone-800/80 p-2.5 rounded-2xl border border-stone-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-rose-900/60 text-rose-300 border border-rose-700/50 flex items-center justify-center font-bold">
                      🛡️
                    </div>
                    <div>
                      <div className="text-[11px] font-extrabold text-stone-100">Women Helpline (Delhi & Gurugram)</div>
                      <div className="text-[9.5px] text-stone-400 font-medium">Delhi Women Cell (1091 / 181) • Gurugram Safety Cell</div>
                    </div>
                  </div>
                  <a
                    href="tel:1091"
                    className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[10px] rounded-xl flex items-center gap-1 transition active:scale-95 shadow-sm shrink-0"
                  >
                    <PhoneCall className="w-3 h-3" /> Call 1091
                  </a>
                </div>

                {/* Ambulance & Medical Emergency */}
                <div className="bg-stone-800/80 p-2.5 rounded-2xl border border-stone-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-900/60 text-blue-300 border border-blue-700/50 flex items-center justify-center font-bold">
                      🚑
                    </div>
                    <div>
                      <div className="text-[11px] font-extrabold text-stone-100">Ambulance & Medical Dispatch</div>
                      <div className="text-[9.5px] text-stone-400 font-medium">CATS Delhi/NCR Ambulance (102 / 108)</div>
                    </div>
                  </div>
                  <a
                    href="tel:102"
                    className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] rounded-xl flex items-center gap-1 transition active:scale-95 shadow-sm shrink-0"
                  >
                    <PhoneCall className="w-3 h-3" /> Call 102
                  </a>
                </div>

                {/* Emergency Personal Contacts */}
                <div className="bg-stone-800/80 p-2.5 rounded-2xl border border-stone-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-900/60 text-amber-300 border border-amber-700/50 flex items-center justify-center font-bold">
                      👨‍👩‍👧
                    </div>
                    <div>
                      <div className="text-[11px] font-extrabold text-stone-100">Trusted Emergency Contacts</div>
                      <div className="text-[9.5px] text-stone-400 font-medium">
                        {userProfile.trustedContacts?.[0]?.name || 'Priya Sharma'} (+91 98112 XXXX) • SMS Sent
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyLocation}
                    className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-[10px] rounded-xl flex items-center gap-1 transition active:scale-95 shadow-sm shrink-0"
                  >
                    <Send className="w-3 h-3" /> {copiedLink ? 'Copied!' : 'Share SMS'}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Emergency Actions */}
            <div className="pt-1 grid grid-cols-2 gap-2">
              <button
                onClick={toggleSiren}
                className={`py-2.5 px-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 border transition active:scale-95 cursor-pointer ${
                  sirenPlaying 
                    ? 'bg-amber-500 text-black border-amber-300 animate-pulse' 
                    : 'bg-stone-800 text-stone-200 border-stone-700 hover:bg-stone-700'
                }`}
              >
                {sirenPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                <span>{sirenPlaying ? 'Stop Siren' : 'Loud Siren Alarm'}</span>
              </button>

              <button
                onClick={onClose}
                className="py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>I Am Safe (Dismiss)</span>
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
