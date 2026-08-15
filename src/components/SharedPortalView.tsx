/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, MapPin, Calendar, Clock, Phone, Compass, Users, 
  CheckCircle, Sparkles, ShieldCheck, Sun, Moon, Volume2, Shield, X, AlertCircle, ArrowLeft
} from 'lucide-react';
import { STARTER_MEETUPS } from '../data';
import Logo from './Logo';

interface SharedPortalViewProps {
  sharedView: {
    type: 'tracker' | 'meetup';
    name?: string;
    reason?: string;
    meetupId?: string;
  };
  onExit: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function SharedPortalView({ sharedView, onExit, isDarkMode, toggleDarkMode }: SharedPortalViewProps) {
  const [alarmActive, setAlarmActive] = useState(false);
  const [assistingState, setAssistingState] = useState<'idle' | 'calling' | 'notified'>('idle');

  // Look up shared meetup if type is meetup
  const activeMeetup = sharedView.type === 'meetup' 
    ? STARTER_MEETUPS.find(m => m.id === sharedView.meetupId) || STARTER_MEETUPS[0]
    : null;

  const toggleSiren = () => {
    setAlarmActive(!alarmActive);
  };

  const startEmergencyCall = () => {
    setAssistingState('calling');
    setTimeout(() => {
      setAssistingState('notified');
    }, 2500);
  };

  return (
    <div className={`w-full h-[812px] rounded-[46px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-[12px] border-neutral-905 overflow-hidden relative flex flex-col justify-between isolate transition-all duration-300 ${isDarkMode ? 'dark-theme bg-stone-950 text-stone-105 border-stone-900' : 'bg-[#F8F5EE] text-gray-900 border-neutral-900'}`}>
      
      {/* Background noise grid patterns */}
      <div className="absolute inset-0 z-[-1] pointer-events-none opacity-20">
        <div className="w-full h-full bg-grid-beige bg-repeat" />
      </div>

      {/* Portal Top Header */}
      <div className="bg-white/85 backdrop-blur-md pt-6 pb-2.5 px-4 border-b border-gray-150/50 flex justify-between items-center z-20 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={onExit}
            aria-label="Go Back"
            title="Go Back"
            className="w-8 h-8 rounded-full bg-[#FAF6F0] border border-[#E8DCCB] flex items-center justify-center text-[#800020] hover:bg-[#F4ECE1] active:scale-95 transition cursor-pointer shadow-3xs"
            id="portal-back-btn"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
          <Logo variant="header" />
        </div>

        <div className="flex items-center gap-2">
          {/* Theme switcher */}
          <button
            onClick={toggleDarkMode}
            className="w-8 h-8 rounded-full bg-[#FAF6F0] border border-[#E8DCCB] flex items-center justify-center text-gray-700 hover:scale-105 active:scale-95 transition cursor-pointer"
            id="portal-theme-toggle"
          >
            {isDarkMode ? (
              <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-700 fill-slate-700/10" />
            )}
          </button>

          {/* Quick exit status banner */}
          <button 
            onClick={onExit}
            className="flex items-center gap-1 bg-coral-50 border border-coral-200 px-2.5 py-1 rounded-full text-[10px] font-extrabold text-coral-700 hover:bg-coral-100 transition cursor-pointer"
          >
            <X className="w-3 h-3" />
            <span>Close View</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-5 pb-8 scrollbar-none flex flex-col justify-between relative">
        <div className="space-y-4">
          
          {/* Share Category Label */}
          <div className="flex justify-between items-center">
            <span className="text-[10px] bg-coral-50 border border-coral-200 text-coral-600 font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {sharedView.type === 'tracker' ? '🛡️ GoGirl Live Security Radar' : '✉️ Community Gathering Invitation'}
            </span>
            <span className="text-[9.5px] text-sage-600 font-extrabold px-2 py-0.5 rounded-full bg-sage-50 border border-sage-150 flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3 text-sage-600" /> GoGirl Checked Link
            </span>
          </div>

          {/* Type 1: Safety Hub Coordinates Viewer Mode */}
          {sharedView.type === 'tracker' && (
            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-4.5 border border-gray-150/60 shadow-xs relative overflow-hidden">
                <div className="absolute right-3 top-3 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                
                <h2 className="text-sm font-black text-gray-905">{sharedView.name} is Sharing Live Coordinates</h2>
                <div className="mt-2.5 flex items-center gap-2 text-[11px] text-gray-500 font-semibold leading-relaxed">
                  <div className="w-7 h-7 rounded-full bg-coral-100/60 text-coral-600 flex items-center justify-center font-bold text-xs uppercase flex-shrink-0">
                    {sharedView.name ? sharedView.name.charAt(0) : 'S'}
                  </div>
                  <div>
                    <span className="text-gray-800 font-extrabold block">Location Live Broadcast</span>
                    <span className="block italic text-[10.5px] text-coral-750">"{sharedView.reason}"</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 border-t border-gray-100/80 pt-3 mt-3 text-[10.5px] font-semibold text-gray-500">
                  <div>
                    <span className="block text-[9.5px] text-gray-400 font-bold uppercase">Active Vibe</span>
                    <span className="text-gray-800 font-black">🛡️ Secured Mode</span>
                  </div>
                  <div>
                    <span className="block text-[9.5px] text-gray-400 font-bold uppercase">Beacon Updates</span>
                    <span className="text-emerald-600 font-black flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Every 4s
                    </span>
                  </div>
                </div>
              </div>

              {/* Vector Compass Mock Radar Location Map */}
              <div className="bg-white rounded-3xl p-1 border border-gray-150/60 shadow-inner h-[230px] overflow-hidden relative flex items-center justify-center">
                {/* Simulated Grid Radar Vector */}
                <div className="absolute inset-0 bg-[#FBF9F6]/40 dark:bg-stone-900/10 z-0 flex flex-col justify-between p-3.5 select-none font-mono text-[8px] text-gray-400">
                  <div className="flex justify-between">
                    <span>GPS 28.4595° N, 77.0266° E</span>
                    <span>HDOP 0.82</span>
                  </div>
                  
                  {/* Circular Radar Sweep */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-44 h-44 rounded-full border border-dashed border-coral-200/40 relative flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border border-dashed border-coral-200/50 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full border border-coral-300/60 flex items-center justify-center relative">
                          {/* Target Location Dot */}
                          <div className="absolute w-3.5 h-3.5 rounded-full bg-coral-500 flex items-center justify-center border-2 border-white shadow-md">
                          </div>
                        </div>
                      </div>
                      
                      {/* Sweeping radar radial sector */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-coral-100/10 to-coral-500/10 rounded-full animate-spin [animation-duration:8s]" />
                    </div>
                  </div>

                  <div className="flex justify-between leading-none items-end">
                    <span>GURGAON SECTOR 43 RADAR</span>
                    <span className="bg-sage-100 text-sage-800 px-1.5 py-0.5 rounded font-bold">LIVE TELEMETRY ACTIVE</span>
                  </div>
                </div>

                <div className="z-10 bg-white/95 border border-coral-150 p-2 rounded-xl text-center shadow-md max-w-[200px]">
                  <span className="text-[10px] font-black block text-gray-800 flex items-center gap-1 justify-center">
                    <MapPin className="w-3 h-3 text-coral-500" /> Sector 43 Hub Walkway
                  </span>
                  <span className="text-[9px] text-[#A26D57] block mt-0.5 font-bold">2.3km from Metro CyberHub</span>
                </div>
              </div>

              {/* Siren Alert Indicator Drawer */}
              <AnimatePresence>
                {alarmActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 rounded-2xl bg-red-50 text-red-950 border border-red-200 flex items-center gap-3"
                  >
                    <Volume2 className="w-8 h-8 text-red-650 animate-pulse flex-shrink-0" />
                    <div className="text-left">
                      <span className="text-xs font-bold block text-red-900 uppercase tracking-wide">📢 Loud Panic Siren Dispatched</span>
                      <span className="text-[10.5px] text-red-700 block font-semibold leading-tight">Sounds an audible alert alarm on the guardian console. Clear checking password required to stop signal.</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Emergency response console and alerts */}
              <div className="bg-white rounded-3xl p-5 border border-gray-150/60 text-left space-y-4">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Coordinated Guardianship Actions</span>

                {assistingState === 'idle' ? (
                  <button
                    onClick={startEmergencyCall}
                    className="w-full bg-coral-500 hover:bg-coral-600 text-white font-extrabold py-3.5 rounded-xl text-center text-xs tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition active:scale-98"
                  >
                    <Phone className="w-4 h-4 text-white" />
                    <span>EMERGENCY CALL SHELTER</span>
                  </button>
                ) : assistingState === 'calling' ? (
                  <div className="p-3.5 bg-yellow-50 text-yellow-805 rounded-xl border border-yellow-200 text-center font-bold text-xs animate-pulse">
                    🚨 CONNECTING EMERGENCY CONTACT SQUAD...
                  </div>
                ) : (
                  <div className="p-3.5 bg-[#FAF6F0] text-[#A26D57] rounded-xl border border-coral-200 text-center font-bold text-xs flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>ALERTS SENT TO POLICE & EMERGENCY SQUAD!</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={toggleSiren}
                    className={`py-3 rounded-xl text-[11px] font-black uppercase tracking-wider border text-center cursor-pointer transition ${
                      alarmActive 
                        ? 'bg-red-600 text-white border-red-500 hover:bg-red-700' 
                        : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                    }`}
                  >
                    {alarmActive ? '🔕 Mute Alarm' : '📢 Trigger Siren'}
                  </button>
                  <button
                    onClick={onExit}
                    className="py-3 rounded-xl text-[11px] font-bold text-gray-700 bg-[#FAF6F0] hover:bg-gray-105 border border-gray-200 text-center cursor-pointer"
                  >
                    Close & Leave
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Type 2: Meetups Coordinator Invitation Viewer Mode */}
          {sharedView.type === 'meetup' && activeMeetup && (
            <div className="space-y-4 text-left">
              
              <div className="bg-[#FCF8F2] p-5 rounded-3xl border border-coral-150 text-left space-y-4">
                <div className="flex gap-3 items-center">
                  <img src={activeMeetup.host.avatar} alt="host" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs" referrerPolicy="no-referrer" />
                  <div>
                    <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                      {activeMeetup.host.name} <CheckCircle className="w-3.5 h-3.5 text-sage-500 fill-white" />
                    </span>
                    <span className="text-[10.5px] text-gray-405 block font-bold">Invite you to Sunday Gathering Circle</span>
                  </div>
                </div>

                <div className="border-t border-coral-200/55 pt-3.5">
                  <span className="text-[9.5px] text-coral-600 block uppercase font-bold tracking-widest">{activeMeetup.category} • VIBE {activeMeetup.vibe}</span>
                  <h3 className="text-base font-black text-gray-950 mt-1 leading-snug">{activeMeetup.title}</h3>
                  <p className="text-xs text-gray-650 mt-2 leading-relaxed font-semibold">
                    {activeMeetup.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 border-t border-coral-200/55 pt-3 mt-3 text-gray-505 text-[10.5px] font-semibold">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-coral-405 flex-shrink-0" />
                    <span>{activeMeetup.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-coral-405 flex-shrink-0" />
                    <span>{activeMeetup.time}</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2 border-t border-[#FAF6F0] pt-2 mt-0.5">
                    <MapPin className="w-4 h-4 text-coral-500 flex-shrink-0" />
                    <span>{activeMeetup.locationName}, <span className="text-gray-400 font-medium">{activeMeetup.area}</span></span>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-white p-3 rounded-2xl border border-coral-100">
                  <span className="text-[10.5px] font-black text-[#A26D57]">Sisters committed:</span>
                  <div className="flex items-center gap-1.5">
                    <div className="flex -space-x-1.5">
                      {activeMeetup.currentMembers.slice(0, 3).map((avatar, idx) => (
                        <div key={idx} className="w-6 h-6 rounded-full border border-white overflow-hidden bg-gray-200 shadow-xs">
                          <img src={avatar} alt="member" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                    <span className="text-xs font-black text-gray-800">({activeMeetup.currentMembers.length}/{activeMeetup.maxMembers} filled)</span>
                  </div>
                </div>
              </div>

              {/* Sparkle banner description */}
              <div className="bg-gradient-to-r from-[#FAF6F0] to-[#F4ECE1] border border-[#E8DCCB] p-4.5 rounded-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#800020] animate-pulse" />
                  <span className="text-xs font-black text-gray-900">Community Safety Coordination</span>
                </div>
                <p className="text-[10px] text-[#800020] leading-relaxed font-semibold">
                  GoGirl coordinates real-time location sharing & emergency safety link dispatch on every meetup.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Promo and Launcher CTA */}
        <div className="mt-6 pt-5 border-t border-gray-150/50 space-y-3.5">
          <div className="text-center">
            <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Launch full sisterhood community app:</span>
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed max-w-[280px] mx-auto mt-0.5">Join GoGirl to coordinate safe tables, host your own meetings, read safe restaurant offers, and chat directly with verified members.</p>
          </div>

          <button
            onClick={onExit}
            className="w-full bg-gradient-to-r from-coral-500 to-peach-550 hover:from-coral-600 hover:to-coral-500 font-black text-xs text-white py-4 rounded-xl uppercase tracking-widest shadow-[0_4px_18px_rgba(212,90,37,0.22)] cursor-pointer text-center flex items-center justify-center gap-2 animate-pulse"
          >
            <Sparkles className="w-4 h-4 fill-white flex-shrink-0" />
            <span>Join Sisterhood Community</span>
          </button>
        </div>

      </div>

    </div>
  );
}
