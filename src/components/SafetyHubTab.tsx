/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, ShieldAlert, Users, Phone, MapPin, Play, Square, Timer, AlertOctagon, 
  Send, Compass, CheckCircle, BellRing, Lock, Shield, Sparkles, Volume2, Mic, Eye, FileAudio, X, AlertCircle
} from 'lucide-react';
import { UserProfile, TrustedContact } from '../types';

interface SafetyHubTabProps {
  userProfile: UserProfile;
}

export default function SafetyHubTab({ userProfile }: SafetyHubTabProps) {
  // SOS State
  const [sosTriggered, setSosTriggered] = useState(false);
  const [sosSlideProgress, setSosSlideProgress] = useState(0);
  const [sosStep, setSosStep] = useState<1 | 2 | 3>(1);

  // Check-In State
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(30 * 60); // 30 minutes default
  const [initialSeconds, setInitialSeconds] = useState(30 * 60);
  const [checkInReason, setCheckInReason] = useState('Walking back from CyberHub Metro');
  const [justCleared, setJustCleared] = useState(false);
  const [countdownExpired, setCountdownExpired] = useState(false);

  // Trusted contacts
  const [contacts, setContacts] = useState<TrustedContact[]>(userProfile.trustedContacts);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('');

  // Location share mock state
  const [isSharingLocation, setIsSharingLocation] = useState(true);
  const [pingSent, setPingSent] = useState(false);

  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerActive && timerSeconds > 0) {
      countdownIntervalRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(countdownIntervalRef.current!);
            setTimerActive(false);
            setCountdownExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    }

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [timerActive]);

  const startCheckIn = (minutes: number) => {
    setCountdownExpired(false);
    setJustCleared(false);
    setInitialSeconds(minutes * 60);
    setTimerSeconds(minutes * 60);
    setTimerActive(true);
  };

  const handleClearCheckIn = () => {
    setTimerActive(false);
    setJustCleared(true);
    setCountdownExpired(false);
    setTimeout(() => setJustCleared(false), 3000);
  };

  const formatTimer = (totSeconds: number) => {
    const mins = Math.floor(totSeconds / 60);
    const secs = totSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const triggerSOSDirect = () => {
    setSosTriggered(true);
    setSosStep(1);
    
    // Simulate progression of SOS command room
    setTimeout(() => setSosStep(2), 2000);
    setTimeout(() => setSosStep(3), 4500);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName || !newContactPhone) return;

    const added: TrustedContact = {
      id: 'tc_' + Date.now(),
      name: newContactName,
      phone: newContactPhone,
      relation: newContactRelation || 'Friend'
    };

    setContacts([...contacts, added]);
    setNewContactName('');
    setNewContactPhone('');
    setNewContactRelation('');
  };

  const handleSendLocationPing = () => {
    setPingSent(true);
    const shareUrl = `${window.location.origin}${window.location.pathname}?share=tracker&name=${encodeURIComponent(userProfile.name)}&reason=${encodeURIComponent(checkInReason)}`;
    navigator.clipboard.writeText(shareUrl).catch(() => {});
    setTimeout(() => setPingSent(false), 4500);
  };

  // Progress percentage for SVG ring in checkin
  const progressPercent = initialSeconds > 0 ? ((initialSeconds - timerSeconds) / initialSeconds) * 100 : 0;
  const radius = 50;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="flex flex-col h-full space-y-4 px-2 pb-24 overflow-y-auto scrollbar-none relative">
      
      {/* Massive Secure SOS Banner Trigger */}
      <div className="bg-gradient-to-br from-red-650 to-rose-600 rounded-3xl p-5 border border-red-500/30 shadow-md text-white">
        <div className="flex justify-between items-start">
          <div className="flex gap-2 items-center bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-extrabold border border-white/20">
            <AlertOctagon className="w-3 h-3 text-red-100 animate-pulse fill-red-105" /> Emergency SOS
          </div>
          <span className="text-[10px] font-mono text-red-100">Location Tracked</span>
        </div>
        <h2 className="text-base font-extrabold mt-3 leading-tight">Emergency SOS Signal</h2>
        <p className="text-[11px] text-red-100 max-w-[280px] leading-snug mt-1 font-medium">
          Double-tap the alert button below to sound an alarm and transmit your live location coordinates to trusted contacts.
        </p>

        {/* Double-tap SOS Activator Button */}
        <div className="mt-5 flex justify-center">
          <button
            onDoubleClick={triggerSOSDirect}
            className="w-20 h-20 bg-white hover:scale-102 active:scale-98 transition-all rounded-full flex flex-col items-center justify-center border-4 border-red-500 cursor-pointer shadow-xl relative"
          >
            {/* Pulsing glow surround ring */}
            <div className="absolute inset-0 bg-red-100 rounded-full scale-108 -z-10 animate-ping opacity-25" />
            <AlertOctagon className="w-8 h-8 text-red-600" />
            <span className="text-[9px] font-black text-red-600 uppercase tracking-widest mt-1">SOS</span>
          </button>
        </div>
        <div className="text-center text-[9px] text-red-200 mt-2 font-bold uppercase tracking-wider">
          Double-tap to activate
        </div>
      </div>

      {/* Dynamic automated safety check-ins container */}
      <div className="bg-white rounded-3xl border border-neutral-100/90 p-5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] relative">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Timer className="w-4 h-4 text-coral-500" /> Automated Safety Check-ins
          </span>
          {timerActive && (
            <span className="text-[9.5px] bg-amber-50 border border-amber-200 text-amber-700 font-extrabold px-2 py-0.5 rounded-full animate-pulse">
              Active Check-in
            </span>
          )}
        </div>

        {/* Visual Timer Progress Circle if running */}
        {timerActive ? (
          <div className="flex flex-col items-center py-3">
            <div className="relative w-28 h-28 flex items-center justify-center mb-2.5">
              <svg className="absolute w-full h-full transform -rotate-92">
                {/* Background Ring */}
                <circle
                  className="text-gray-100"
                  strokeWidth={stroke}
                  stroke="currentColor"
                  fill="transparent"
                  r={normalizedRadius}
                  cx={radius + 6}
                  cy={radius + 6}
                />
                {/* Progress Ring */}
                <circle
                  className="text-coral-500 transition-all duration-1000"
                  strokeWidth={stroke}
                  strokeDasharray={circumference + ' ' + circumference}
                  style={{ strokeDashoffset }}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r={normalizedRadius}
                  cx={radius + 6}
                  cy={radius + 6}
                />
              </svg>
              <div className="flex flex-col items-center">
                <span className="text-lg font-black text-gray-800 leading-none">{formatTimer(timerSeconds)}</span>
                <span className="text-[8.5px] text-gray-400 uppercase mt-1 font-bold">Remaining</span>
              </div>
            </div>

            <p className="text-[10.5px] text-gray-500 font-semibold mb-3.5 italic text-center max-w-[260px]">
              "{checkInReason || 'Grabbing quick latte outside'}"
            </p>

            {/* Quick checkout and simulate trigger button links */}
            <div className="flex gap-2 w-full">
              <button
                onClick={handleClearCheckIn}
                className="flex-1 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow hover:bg-emerald-700 cursor-pointer text-center"
              >
                I have Arrived Safely
              </button>
              <button
                onClick={() => setTimerSeconds(2)}
                className="py-2 px-3.5 rounded-xl border border-coral-200 text-coral-600 bg-coral-50/50 hover:bg-coral-100 text-[10.5px] font-bold"
              >
                Test Timeout
              </button>
            </div>
          </div>
        ) : countdownExpired ? (
          <div className="text-center py-4 bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col items-center">
            <ShieldAlert className="w-8 h-8 text-red-600 mb-2" />
            <h4 className="text-xs font-black text-red-900 uppercase">Timer Expired</h4>
            <p className="text-[10px] text-red-700 font-semibold max-w-[280px] mt-1 leading-relaxed">
              Your check-in timer has expired. Alerts have been sent to your listed trusted contacts.
            </p>
            <button
              onClick={() => setCountdownExpired(false)}
              className="mt-3.5 px-4 py-1.5 bg-red-600 text-white font-extrabold text-[10.5px] rounded-xl shadow cursor-pointer hover:bg-red-700"
            >
              Dismiss Alarm
            </button>
          </div>
        ) : justCleared ? (
          <div className="text-center py-6 bg-emerald-50 border border-emerald-250 rounded-xl p-4 flex flex-col items-center">
            <CheckCircle className="w-8 h-8 text-emerald-600 mb-1" />
            <h4 className="text-xs font-black text-emerald-900 uppercase">Check-In Cleared</h4>
            <p className="text-[10px] text-emerald-700 font-medium">
              We updated your trusted contacts that you have arrived safely.
            </p>
          </div>
        ) : (
          <div className="py-2.5">
            <div className="mb-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Check-in Reason / Plan</label>
              <input
                type="text"
                value={checkInReason}
                onChange={(e) => setCheckInReason(e.target.value)}
                placeholder="Where are you going?"
                className="w-full text-xs font-medium p-2.5 border border-gray-150 rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none"
              />
            </div>

            <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1.5">Launch Auto Guard Check-in Timer</label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 15, 30, 45].map((mins) => (
                <button
                  key={mins}
                  onClick={() => startCheckIn(mins)}
                  className="py-2 border border-coral-100 hover:border-coral-400 font-black text-xs text-coral-750 bg-coral-50/20 hover:bg-coral-50/60 rounded-xl transition cursor-pointer text-center"
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Live tracking location sharing console */}
      <div className="bg-white rounded-3xl border border-neutral-100/90 p-5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)]">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-emerald-500" /> Share Live Location
          </span>
          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 ${
            isSharingLocation 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-150' 
              : 'bg-gray-100 text-gray-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isSharingLocation ? 'bg-emerald-500' : 'bg-gray-400'}`} />
            {isSharingLocation ? 'Active' : 'Paused'}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50/60 rounded-xl border border-gray-100 mb-3.5">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-5 h-5 text-coral-500" />
            <div>
              <span className="text-xs font-extrabold block text-gray-800">Gurgaon Sector 43</span>
              <span className="text-[9.5px] text-gray-400 block font-semibold">Location tracking in background</span>
            </div>
          </div>
          <button
            onClick={() => setIsSharingLocation(!isSharingLocation)}
            className="text-[10px] font-black text-coral-600 hover:underline"
          >
            {isSharingLocation ? 'Pause' : 'Activate'}
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSendLocationPing}
            disabled={pingSent || !isSharingLocation}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition text-center flex items-center justify-center gap-2 cursor-pointer ${
              pingSent 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-coral-500 hover:bg-coral-600 text-white shadow'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{pingSent ? '📋 Copied Safety Tracker Link!' : 'Share Location Link'}</span>
          </button>
        </div>
      </div>

      {/* Trusted contacts list management inside hub */}
      <div className="bg-white rounded-3xl border border-neutral-100/90 p-5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)]">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-3">Guardian Network Contacts ({contacts.length})</span>
        
        <div className="space-y-2.5 mb-4">
          {contacts.map((tc) => (
            <div key={tc.id} className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              <div className="flex gap-2.5 items-center">
                <div className="w-8 h-8 rounded-full bg-coral-100/60 text-coral-600 flex items-center justify-center font-bold text-xs uppercase">
                  {tc.name.charAt(0)}
                </div>
                <div>
                  <span className="text-xs font-bold block text-gray-800">{tc.name} <span className="text-[9px] text-[#A26D57] font-bold bg-[#FAF6F0] px-1.5 py-0.2 rounded font-mono border border-coral-200 scale-90">{tc.relation}</span></span>
                  <span className="text-[10px] text-gray-400 font-semibold block">{tc.phone}</span>
                </div>
              </div>
              <button
                onClick={() => setContacts(contacts.filter(item => item.id !== tc.id))}
                className="text-xs text-red-500 hover:text-red-700 p-1"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Add Contact Form */}
        <form onSubmit={handleAddContact} className="p-3 bg-gray-50/50 rounded-xl border border-dashed border-gray-220">
          <span className="text-[9px] font-extrabold text-gray-505 uppercase tracking-wide block mb-2">Configure New Safety guardian</span>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Alias / Name"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-gray-200 bg-white"
              />
              <input
                type="text"
                placeholder="Relation, e.g. Sister"
                value={newContactRelation}
                onChange={(e) => setNewContactRelation(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-gray-200 bg-white"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="tel"
                required
                placeholder="Mobile phone (+91)"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
                className="flex-1 text-xs p-2 rounded-lg border border-gray-200 bg-white"
              />
              <button
                type="submit"
                className="bg-coral-500 text-white font-bold px-4 py-2 rounded-lg text-xs shadow cursor-pointer hover:bg-coral-600"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Immersive SOS emergency response command room Modal */}
      <AnimatePresence>
        {sosTriggered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-950 z-50 flex flex-col justify-between p-6 overflow-hidden select-none"
          >
            {/* Blinking emergency indicators */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle,rgba(220,38,38,0.15)_0%,transparent_80%)] animate-pulse" />

            <div className="z-10 flex justify-between items-center bg-black/20 p-3 rounded-full border border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold text-red-100 font-sans tracking-wide">BROADCASTING EMERGENCY SIGNAL</span>
              </div>
              <div className="text-[9px] font-sans font-bold text-red-200">LOCATION SECURED</div>
            </div>

            <div className="z-10 text-center my-auto space-y-6">
              <div className="w-24 h-24 bg-red-500/20 border-4 border-red-500 rounded-full mx-auto flex items-center justify-center animate-pulse">
                <ShieldAlert className="w-12 h-12 text-red-500" />
              </div>

              <div>
                <h2 className="text-xl font-black tracking-tight text-white uppercase">SOS Active</h2>
                <p className="text-xs text-red-200 font-semibold mt-1">Alerts have been broadcast to your listed contacts.</p>
              </div>

              {/* Status progression timeline */}
              <div className="max-w-[300px] mx-auto text-left bg-black/45 border border-red-900/40 p-4 rounded-2xl font-sans text-[11px] space-y-3.5 divide-y divide-red-950/40">
                <div className="flex items-start gap-2.5 pt-0">
                  <span className="text-emerald-400 font-black">✓</span>
                  <div>
                    <span className="text-white block font-bold leading-tight">Trusted Contacts Alerted</span>
                    <span className="text-red-300 text-[9.5px] block font-medium">Notifications dispatched successfully.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-3">
                  <span className="text-emerald-400 font-black">✓</span>
                  <div>
                    <span className="text-white block font-bold leading-tight">Live Location Stream</span>
                    <span className="text-red-300 text-[9.5px] block font-medium">Tracking currently active in the background.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-3">
                  {sosStep >= 3 ? (
                    <span className="text-emerald-450 text-emerald-400 font-black">✓</span>
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-t-transparent border-red-400 animate-spin flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className={`${sosStep >= 3 ? 'text-white' : 'text-gray-500'} block font-bold leading-tight`}>Response Center Notified</span>
                    <span className="text-red-350 text-[9.5px] block text-red-300 font-medium">
                      {sosStep >= 3 ? 'Awaiting acknowledgement from active contacts.' : 'Pending contact response...'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancel option requiring password mock */}
            <div className="z-10 pt-4 border-t border-red-900/40 flex flex-col items-center">
              <span className="text-[9px] text-red-300 uppercase tracking-wider font-extrabold mb-2.5 text-center">To end this alarm:</span>
              <button
                onClick={() => setSosTriggered(false)}
                className="w-full bg-white hover:bg-red-50 text-red-950 font-black py-3 px-4 rounded-xl text-center text-xs tracking-wider shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-red-900" /> Cancel Safety Alert
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
