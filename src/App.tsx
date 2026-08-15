/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, MapPin, Shield, Film, User, LogOut, CheckCircle, 
  MapIcon, BellRing, PhoneCall, Sparkles, ShieldCheck, Heart, Trash2,
  Sun, Moon, ArrowLeft, Siren, ShieldAlert, MessageSquare
} from 'lucide-react';

import OnboardingFlow from './components/OnboardingFlow';
import CheckeredBackground from './components/CheckeredBackground';
import Logo from './components/Logo';
import MeetupsTab from './components/MeetupsTab';
import ExploreTab from './components/ExploreTab';
import SafetyHubTab from './components/SafetyHubTab';
import PhotoBoothTab from './components/PhotoBoothTab';
import CommunityChatApp from './components/CommunityChatApp';
import AIAgentChat from './components/AIAgentChat';
import SharedPortalView from './components/SharedPortalView';
import EmergencySOSModal from './components/EmergencySOSModal';
import { UserProfile } from './types';

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'meet' | 'chat' | 'explore' | 'safety' | 'booth' | 'profile'>('meet');
  const [tabHistory, setTabHistory] = useState<('meet' | 'chat' | 'explore' | 'safety' | 'booth' | 'profile')[]>(['meet']);
  const [joinedMeetups, setJoinedMeetups] = useState<string[]>([]);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isSosOpen, setIsSosOpen] = useState(false);

  const handleTabSelect = (tab: 'meet' | 'chat' | 'explore' | 'safety' | 'booth' | 'profile') => {
    if (tab !== activeTab) {
      setTabHistory((prev) => [...prev, tab]);
      setActiveTab(tab);
    }
  };

  const handleBackNav = () => {
    if (isSosOpen) {
      setIsSosOpen(false);
      return;
    }
    if (isAIOpen) {
      setIsAIOpen(false);
      return;
    }
    if (tabHistory.length > 1) {
      const nextHist = [...tabHistory];
      nextHist.pop();
      setTabHistory(nextHist);
      setActiveTab(nextHist[nextHist.length - 1]);
    } else if (activeTab !== 'meet') {
      setActiveTab('meet');
      setTabHistory(['meet']);
    }
  };
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('gogirl_theme') === 'dark';
  });
  const [sharedView, setSharedView] = useState<{
    type: 'tracker' | 'meetup';
    name?: string;
    reason?: string;
    meetupId?: string;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const share = params.get('share');
    if (share === 'tracker') {
      setSharedView({
        type: 'tracker',
        name: params.get('name') || 'A GoGirl Member',
        reason: params.get('reason') || 'Walking home solo',
      });
    } else if (share === 'meetup') {
      setSharedView({
        type: 'meetup',
        meetupId: params.get('id') || 'm1',
      });
    }
  }, []);

  const toggleDarkMode = () => {
    const nextVal = !isDarkMode;
    setIsDarkMode(nextVal);
    localStorage.setItem('gogirl_theme', nextVal ? 'dark' : 'light');
  };
  
  const handleJoinMeetup = (meetupId: string) => {
    if (!joinedMeetups.includes(meetupId)) {
      setJoinedMeetups([...joinedMeetups, meetupId]);
    }
  };

  const handleResetApp = () => {
    if (window.confirm("Are you sure you want to test the onboarding experience from the beginning?")) {
      setUserProfile(null);
      setActiveTab('meet');
      setJoinedMeetups([]);
      localStorage.removeItem('gogirl_booth_photos');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden isolate">
      
      {/* Universal Checkered Canvas Background behind the phone mockup frame */}
      <CheckeredBackground />

      <div className="w-full max-w-md relative">
        
        {/* Shared View Link Mode vs standard App Mode */}
        {sharedView ? (
          <SharedPortalView 
            sharedView={sharedView} 
            onExit={() => {
              const url = new URL(window.location.href);
              url.searchParams.delete('share');
              url.searchParams.delete('name');
              url.searchParams.delete('reason');
              url.searchParams.delete('id');
              window.history.replaceState({}, '', url.pathname + url.hash);
              setSharedView(null);
            }} 
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        ) : !userProfile ? (
          <OnboardingFlow 
            onComplete={(profile) => setUserProfile(profile)} 
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        ) : (
          
          /* Main Application viewport container (simulating iPhone layout) */
          <div className={`w-full h-[812px] rounded-[46px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-[12px] border-neutral-900 overflow-hidden relative flex flex-col justify-between isolate transition-all duration-300 ${isDarkMode ? 'dark-theme bg-stone-950 text-stone-100' : 'bg-[#F8F5EE] text-gray-900'}`}>
            <CheckeredBackground opacity={isDarkMode ? 0.2 : 1} transparentBg={true} />
            
            {/* Top header status panel */}
            <div className="bg-white/80 backdrop-blur-md pt-6 pb-2.5 px-4 border-b border-gray-150/50 flex justify-between items-center z-20 flex-shrink-0">
              <div className="flex items-center gap-2">
                {(activeTab !== 'meet' || tabHistory.length > 1 || isAIOpen) && (
                  <button
                    onClick={handleBackNav}
                    aria-label="Go Back"
                    title="Go Back"
                    className="w-8 h-8 rounded-full bg-[#F4ECE1] border border-[#E8DCCB] flex items-center justify-center text-[#800020] hover:bg-[#EBDBC8] active:scale-95 transition cursor-pointer shadow-3xs"
                    id="app-top-left-back-btn"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                )}
                <Logo variant="header" />
              </div>

              <div className="flex items-center gap-2">
                {/* Status bar removed per request */}
              </div>
            </div>

            {/* Dynamic Viewport main scroll container */}
            <div className="flex-1 overflow-hidden relative p-4 pb-0 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18 }}
                  className="flex-1 overflow-hidden"
                >
                  {activeTab === 'meet' && (
                    <MeetupsTab 
                      userProfile={userProfile} 
                      onJoinMeetup={handleJoinMeetup} 
                      joinedMeetups={joinedMeetups} 
                    />
                  )}
                  {activeTab === 'chat' && <CommunityChatApp userProfile={userProfile} />}
                  {activeTab === 'explore' && <ExploreTab userProfile={userProfile} />}
                  {activeTab === 'safety' && <SafetyHubTab userProfile={userProfile} />}
                  {activeTab === 'booth' && <PhotoBoothTab userProfile={userProfile} joinedMeetups={joinedMeetups} />}
                  {activeTab === 'profile' && (
                    <div className="space-y-4 pb-24 overflow-y-auto h-full scrollbar-none pr-0.5">
                      {/* Identity Verification Summary Receipt card */}
                      <div className="bg-white rounded-2xl border border-gray-150 p-4 shadow-xs relative overflow-hidden">
                        
                        <div className="flex gap-3 items-center mb-3">
                          <div className="relative w-12 h-12 rounded-full border border-gray-150 bg-gray-50 shadow">
                            <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs" title="Online" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h2 className="text-sm font-extrabold text-gray-900 leading-none">{userProfile.name}</h2>
                              <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded-full flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online
                              </span>
                            </div>
                            <span className="text-[10.5px] text-gray-400 block mt-1">Age: <span className="font-extrabold text-gray-700">{userProfile.age}</span> • {userProfile.personality}</span>
                          </div>
                        </div>

                        <div className="space-y-2.5 border-t border-gray-100 pt-3">
                          <div className="flex justify-between text-[10.5px] font-semibold text-gray-500">
                            <span>Aadhaaar / Gov ID Document:</span>
                            <span className="font-mono text-gray-700">{userProfile.idType} ({userProfile.idNumber})</span>
                          </div>
                          <div className="flex justify-between text-[10.5px] font-semibold text-gray-500">
                            <span>ID Match Status:</span>
                            <span className="text-sage-750 text-sage-600 font-extrabold flex items-center gap-1">✓ 100% SECURE MATCH</span>
                          </div>
                          <div className="flex justify-between text-[10.5px] font-semibold text-gray-500">
                            <span>Contact Linked:</span>
                            <span className="text-gray-700 font-mono">{userProfile.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* AI Chatbot Assistant Section */}
                      <div className="text-left">
                        <AIAgentChat embedded={true} userName={userProfile.name} />
                      </div>

                      {/* Reset app state links for easy testing */}
                      <div className="pt-4 flex flex-col gap-2">
                        <button
                          onClick={handleResetApp}
                          className="w-full py-3 bg-white border border-red-200 text-red-600 font-bold text-xs rounded-xl shadow-inner hover:bg-red-50 hover:text-red-700 transition cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Reset Simulator & Retake Onboarding</span>
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom persistent Apple-inspired System-wide Tab bar viewports */}
            <div className="bg-white/90 backdrop-blur-md py-2 px-2 border-t border-gray-150/60 flex justify-between items-center z-25 relative flex-shrink-0">
              
              <button
                onClick={() => handleTabSelect('meet')}
                className={`flex-1 flex flex-col items-center justify-center py-1 transition cursor-pointer ${activeTab === 'meet' ? 'text-coral-500 scale-103 font-bold' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Users className="w-5 h-5" />
                <span className="text-[9px] mt-0.5 font-bold">Meetups</span>
              </button>

              <button
                onClick={() => handleTabSelect('chat')}
                className={`flex-1 flex flex-col items-center justify-center py-1 transition cursor-pointer ${activeTab === 'chat' ? 'text-[#008069] scale-103 font-bold' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <div className="relative">
                  <MessageSquare className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1.5 bg-[#25d366] text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    4
                  </span>
                </div>
                <span className="text-[9px] mt-0.5 font-bold">Chats</span>
              </button>

              <button
                onClick={() => handleTabSelect('explore')}
                className={`flex-1 flex flex-col items-center justify-center py-1 transition cursor-pointer ${activeTab === 'explore' ? 'text-coral-500 scale-103 font-bold' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <MapPin className="w-5 h-5" />
                <span className="text-[9px] mt-0.5 font-bold">Safe Ads</span>
              </button>

              <button
                onClick={() => handleTabSelect('safety')}
                className={`flex-1 flex flex-col items-center justify-center py-1 transition cursor-pointer ${activeTab === 'safety' ? 'text-coral-500 scale-103 font-bold' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {/* Visual badge highlight if Checkin active */}
                <div className="relative">
                  <Shield className="w-5 h-5" />
                  <div className={`absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 ring-2 ${isDarkMode ? 'ring-[#161412]' : 'ring-white'} animate-pulse`} />
                </div>
                <span className="text-[9px] mt-0.5 font-bold">Safety Hub</span>
              </button>

              <button
                onClick={() => handleTabSelect('booth')}
                className={`flex-1 flex flex-col items-center justify-center py-1 transition cursor-pointer ${activeTab === 'booth' ? 'text-coral-500 scale-103 font-bold' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Film className="w-5 h-5" />
                <span className="text-[9px] mt-0.5 font-bold">Fun Zone</span>
              </button>

              <button
                onClick={() => handleTabSelect('profile')}
                className={`flex-1 flex flex-col items-center justify-center py-1 transition cursor-pointer ${activeTab === 'profile' ? 'text-coral-500 scale-103 font-bold' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <User className="w-5 h-5" />
                <span className="text-[9px] mt-0.5 font-bold">Profile</span>
              </button>

            </div>

            {/* Apple Home Indicator line indicator */}
            <div className={`absolute bottom-1 left-12 right-12 h-1 rounded-full z-30 pointer-events-none opacity-85 transition-colors duration-300 ${isDarkMode ? 'bg-white/25' : 'bg-gray-950'}`} />

            {/* Floating SOS Emergency Trigger Button */}
            <div className="absolute bottom-18 right-4 z-28 pointer-events-auto">
              <div className="relative group">
                <button
                  onClick={() => setIsSosOpen(true)}
                  className="relative px-3.5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5 shadow-lg transition-all active:scale-95 cursor-pointer border border-red-500/40"
                  title="Emergency SOS Dispatch"
                  id="trigger-sos-emergency-btn"
                >
                  <Siren className="w-5 h-5 text-white shrink-0" />
                  <span className="text-xs font-black tracking-wider uppercase pr-0.5">SOS</span>
                </button>
              </div>
            </div>

            {/* Emergency SOS Dispatch Modal */}
            <EmergencySOSModal
              isOpen={isSosOpen}
              onClose={() => setIsSosOpen(false)}
              userProfile={userProfile}
            />

          </div>
        )}

      </div>
    </div>
  );
}
