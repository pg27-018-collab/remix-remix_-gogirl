/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Calendar, Clock, MapPin, Users, Heart, Share2, 
  Sparkles, CheckCircle, ShieldCheck, X, BadgeHelp, Coffee,
  SlidersHorizontal, ChevronRight, Check, BookOpen, Activity, Palette, Music, Film, MessageSquare, Send, Compass
} from 'lucide-react';
import { Meetup, UserProfile, ChatMessage } from '../types';
import { STARTER_MEETUPS } from '../data';

interface MeetupsTabProps {
  userProfile: UserProfile;
  onJoinMeetup: (meetupId: string) => void;
  joinedMeetups: string[];
}

interface SisterhoodCircle {
  id: string;
  name: string;
  description: string;
  category: 'Coffee' | 'Books' | 'Active' | 'Art' | 'Concert' | 'Tech';
  memberCount: number;
  avatars: string[];
  bannerUrl: string;
  recommendedFor: string;
}

const PREMIUM_CIRCLES: SisterhoodCircle[] = [
  {
    id: 'circle_macha',
    name: 'CyberHub Matcha Circle',
    description: 'A friendly collective for female founders, tech professionals, and weekend coffee walks.',
    category: 'Coffee',
    memberCount: 64,
    avatars: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400',
    recommendedFor: 'Matches your Coffee & Cafés preference!'
  },
  {
    id: 'circle_literature',
    name: 'Sector 56 Literature Lounge',
    description: 'Weekly book meetups, slow literature swaps, and safe poetry gatherings for introvert souls.',
    category: 'Books',
    memberCount: 48,
    avatars: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400',
    recommendedFor: 'Matches your Bookworm & Cozy vibe selection!'
  },
  {
    id: 'circle_fitness',
    name: 'Leisure Valley Yoga & Pilates Sisterhood',
    description: 'Permanent wellness cohort designed to sync peaceful outdoor workouts, morning jogs, and cold pressed juice walks.',
    category: 'Active',
    memberCount: 51,
    avatars: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=400',
    recommendedFor: 'Matches your Outdoor & Wellness setting!'
  }
];

export default function MeetupsTab({ userProfile, onJoinMeetup, joinedMeetups }: MeetupsTabProps) {
  const [meetups, setSetMeetups] = useState<Meetup[]>(STARTER_MEETUPS);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [showHostModal, setShowHostModal] = useState(false);
  const [selectedMeetupId, setSelectedMeetupId] = useState<string | null>(null);
  
  // Toggles between singular gatherings and permanent community circles
  const [communityTab, setCommunityTab] = useState<'gatherings' | 'circles'>('gatherings');

  // Load joined circles status
  const [joinedCircles, setJoinedCircles] = useState<string[]>(() => {
    const saved = localStorage.getItem('gogirl_joined_circles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (_) {}
    }
    return ['circle_macha']; // Default join the first cute Matcha club
  });

  // Group chats state synced to localStorage
  const [localChats, setLocalChats] = useState<{ [meetupId: string]: ChatMessage[] }>(() => {
    const saved = localStorage.getItem('gogirl_community_chats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (_) {}
    }
    return {
      m1: [
        { id: '1', sender: 'Riya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', text: 'Hey fellow bookworms! Welcome to our CyberHub coffee meeting chat room here.', timestamp: '11:02 AM' },
        { id: '2', sender: 'Sneha Roy', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', text: 'So happy to join this round. Planning to bring my favorite paperback!', timestamp: '11:05 AM' }
      ],
      m2: [
        { id: '1', sender: 'Aanya Sen', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', text: 'Good morning ladies! Looking forward to our Pilates session. Don\'t forget matching yoga mats!', timestamp: '08:15 AM' }
      ],
      circle_macha: [
        { id: '1', sender: 'Aditi Sengupta', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', text: 'Stunning sunset captured at modern co-working spot today!', timestamp: '04:12 PM' },
        { id: '2', sender: 'Meher Roy', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200', text: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=480', timestamp: '04:15 PM' }
      ],
      circle_literature: [
        { id: '1', sender: 'Riya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', text: 'Welcome to our permanent literature channel! Feel free to suggest books.', timestamp: 'Yesterday' }
      ]
    };
  });
  
  const [chatInput, setChatInput] = useState('');

  // Hosting Form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<'Coffee' | 'Books' | 'Concert' | 'Active' | 'Art'>('Coffee');
  const [newDate, setNewDate] = useState('Tomorrow, May 29');
  const [newTime, setNewTime] = useState('05:30 PM');
  const [newLoc, setNewLoc] = useState('Blue Tokai Galleria');
  const [newArea, setNewArea] = useState('Gurgaon Sector 28');
  const [newMax, setNewMax] = useState(6);
  const [newVibe, setNewVibe] = useState('Chill Conversation');

  const categories = ['All', 'Coffee', 'Books', 'Active', 'Art', 'Concert'];

  useEffect(() => {
    localStorage.setItem('gogirl_joined_circles', JSON.stringify(joinedCircles));
  }, [joinedCircles]);

  useEffect(() => {
    localStorage.setItem('gogirl_community_chats', JSON.stringify(localChats));
  }, [localChats]);

  const filteredMeetups = categoryFilter === 'All' 
    ? meetups 
    : meetups.filter(m => m.category.toLowerCase() === categoryFilter.toLowerCase());

  const handleCreateMeetup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc || !newLoc) {
      alert('Kindly complete the details including Title, Description, and Venue.');
      return;
    }

    const created: Meetup = {
      id: 'm_custom_' + Date.now(),
      title: newTitle,
      description: newDesc,
      host: {
        name: userProfile.name,
        avatar: userProfile.avatar,
        personality: userProfile.personality,
        verified: true
      },
      date: newDate,
      time: newTime,
      locationName: newLoc,
      area: newArea,
      category: newCategory,
      vibe: newVibe,
      maxMembers: newMax,
      currentMembers: [userProfile.avatar],
      tags: [userProfile.personality, newCategory]
    };

    setSetMeetups([created, ...meetups]);
    setShowHostModal(false);

    // Reset Form
    setNewTitle('');
    setNewDesc('');
    setNewCategory('Coffee');
    setNewDate('Tomorrow, May 29');
    setNewTime('05:30 PM');
    setNewLoc('');
    setNewMax(6);
    setNewVibe('Chill Conversation');
  };

  const handleJoinCircle = (circleId: string) => {
    if (joinedCircles.includes(circleId)) return;
    setJoinedCircles([...joinedCircles, circleId]);
  };

  const handleJoinAction = (meetupId: string) => {
    if (joinedMeetups.includes(meetupId)) return;
    
    setSetMeetups(prev => prev.map(m => {
      if (m.id === meetupId) {
        if (m.currentMembers.includes(userProfile.avatar)) return m;
        return {
          ...m,
          currentMembers: [...m.currentMembers, userProfile.avatar]
        };
      }
      return m;
    }));

    onJoinMeetup(meetupId);
  };

  const handleSendChatMessage = (meetupId: string) => {
    if (!chatInput.trim()) return;
    const newMessage: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: userProfile.name,
      avatar: userProfile.avatar,
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setLocalChats(prev => ({
      ...prev,
      [meetupId]: [...(prev[meetupId] || []), newMessage]
    }));
    setChatInput('');
  };

  const selectedMeetup = meetups.find(m => m.id === selectedMeetupId) || 
    // Fallback Mock representation to allow uniform circle chats!
    (PREMIUM_CIRCLES.find(c => c.id === selectedMeetupId) ? {
      id: selectedMeetupId!,
      title: PREMIUM_CIRCLES.find(c => c.id === selectedMeetupId)!.name,
      category: PREMIUM_CIRCLES.find(c => c.id === selectedMeetupId)!.category,
      description: PREMIUM_CIRCLES.find(c => c.id === selectedMeetupId)!.description,
      host: { name: 'GoGirl Lead Curator', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', personality: 'Ambivert', verified: true },
      date: 'Permanent',
      time: 'Always Active',
      locationName: 'GoGirl Virtual Hall',
      area: 'DLF Sector 24, Gurgaon',
      maxMembers: 100,
      currentMembers: PREMIUM_CIRCLES.find(c => c.id === selectedMeetupId)!.avatars,
      tags: ['Community', 'Circle']
    } : null);

  const renderCategoryIcon = (category: string, active: boolean) => {
    const iconClass = `w-3.5 h-3.5 ${active ? 'text-white' : 'text-[#A26D57]'}`;
    switch (category) {
      case 'All': return <Sparkles className={iconClass} />;
      case 'Coffee': return <Coffee className={iconClass} />;
      case 'Books': return <BookOpen className={iconClass} />;
      case 'Active': return <Activity className={iconClass} />;
      case 'Art': return <Palette className={iconClass} />;
      case 'Concert': return <Music className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      
      {/* Upper Navigation Tabs: Toggling betwen gatherings vs persistent Circles */}
      <div className="mx-2.5 mt-1.5 mb-2 bg-[#FCFAF7] border border-neutral-150 p-1.5 rounded-2xl flex gap-1.5 shadow-3xs flex-shrink-0 text-left">
        <button
          onClick={() => setCommunityTab('gatherings')}
          className={`flex-1 text-center py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 duration-150 ${
            communityTab === 'gatherings'
              ? 'bg-coral-500 text-white shadow-3xs'
              : 'text-gray-500 hover:text-coral-600 font-semibold'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Meetups</span>
        </button>
        <button
          onClick={() => setCommunityTab('circles')}
          className={`flex-1 text-center py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 duration-150 ${
            communityTab === 'circles'
              ? 'bg-coral-500 text-white shadow-3xs'
              : 'text-gray-500 hover:text-coral-600 font-semibold'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Community Circles</span>
        </button>
      </div>

      {/* Category Horizontal scroll */}
      {communityTab === 'gatherings' && (
        <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none flex-shrink-0 px-2 text-left">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`text-xs px-3.5 py-1.8 rounded-full font-bold transition duration-200 cursor-pointer flex-shrink-0 border flex items-center gap-1.5 ${
                categoryFilter === cat 
                  ? 'bg-coral-500 text-white border-coral-500 shadow-[0_4px_12px_rgba(212,90,37,0.22)] font-bold' 
                  : 'bg-white hover:bg-coral-50/50 hover:text-coral-600 border-neutral-100/90 text-gray-500 shadow-[0_2px_10px_rgba(0,0,0,0.01)]'
              }`}
            >
              {renderCategoryIcon(cat, categoryFilter === cat)}
              <span>{cat}</span>
            </button>
          ))}
        </div>
      )}

      {/* Meetups & Circles main scroll panel */}
      <div className="flex-1 overflow-y-auto space-y-4 px-2 pb-24 scrollbar-none text-left">
        {communityTab === 'circles' ? (
          /* PERSISTENT SISTERS CIRCLES COMPONENT FEED */
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-[#FAF6F0] to-[#F4ECE1] border border-[#E8DCCB] p-4 rounded-2xl">
              <span className="text-xs font-black text-gray-950 block">Community Circles</span>
              <p className="text-[11px] text-gray-500 font-semibold leading-relaxed mt-1">
                Local community hubs. Join a circle to stay in touch, organize plans, and participate in group chats.
              </p>
            </div>

            {PREMIUM_CIRCLES.map((circle) => {
              const hasJoined = joinedCircles.includes(circle.id);
              
              return (
                <motion.div
                  key={circle.id}
                  className="bg-white rounded-3xl border border-neutral-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col hover:shadow-sm"
                >
                  <div className="w-full h-24 relative bg-gray-100">
                    <img src={circle.bannerUrl} alt={circle.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute top-2.5 left-2.5 bg-emerald-500 text-white text-[8.5px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-400">
                      ✓ Community Circle
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9.5px] text-coral-600 font-extrabold uppercase tracking-wide">
                        {circle.category} • {circle.memberCount} members
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-gray-900 leading-snug">{circle.name}</h4>
                    <p className="text-[11px] text-gray-500 mt-1 font-semibold leading-relaxed">
                      {circle.description}
                    </p>

                    {/* Community note */}
                    <div className="mt-3 bg-[#FCFAF7] border border-neutral-150 rounded-xl p-2.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-coral-500" />
                      <span className="text-[9.5px] text-[#A26D57] font-bold leading-tight">
                        {circle.category} • Active Community Hub
                      </span>
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center -space-x-1.5">
                      {circle.avatars.map((ava, idx) => (
                        <img key={idx} src={ava} className="w-6 h-6 rounded-full border border-white" referrerPolicy="no-referrer" />
                      ))}
                      <span className="text-[9px] text-gray-400 font-bold pl-2.5">+{circle.memberCount - 3} sisters in Gurgaon</span>
                    </div>

                    {hasJoined ? (
                      <button
                        onClick={() => setSelectedMeetupId(circle.id)}
                        className="py-1.5 px-3.5 bg-sage-50 hover:bg-sage-100 text-emerald-800 border border-emerald-200 text-[10.5px] font-bold rounded-xl flex items-center gap-1 cursor-pointer transition"
                      >
                        <MessageSquare className="w-3 h-3 text-emerald-600" /> Circle Chat Room
                      </button>
                    ) : (
                      <button
                        onClick={() => handleJoinCircle(circle.id)}
                        className="py-1.5 px-4 bg-coral-500 hover:bg-coral-600 text-white text-[11px] font-extrabold rounded-xl shadow-3xs cursor-pointer transition"
                      >
                        Join & Unlock Chat
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          /* TEMPORARY LOCAL COHORTS / GATHERINGS FEED */
          <div className="space-y-4">
            
            {/* Active Gatherings Listing */}
            {filteredMeetups.length === 0 ? (
              <div className="text-center py-12 bg-white/65 backdrop-blur-sm rounded-3xl p-6 border border-dashed border-gray-200">
                <span className="text-sm text-gray-500 font-semibold block">No active gatherings in this category yet.</span>
                <span className="text-xs text-gray-400 block mt-1">Be the first to create one and invite fellow verified members!</span>
                <button 
                  onClick={() => setShowHostModal(true)}
                  className="mt-4 px-4 py-2 bg-coral-500 text-white text-xs font-bold rounded-xl shadow cursor-pointer hover:bg-coral-600 transition"
                >
                  Host a Circle
                </button>
              </div>
            ) : (
              filteredMeetups.map((meetup) => {
                const hasJoined = joinedMeetups.includes(meetup.id);
                const isFull = meetup.currentMembers.length >= meetup.maxMembers;
                return (
                  <motion.div
                    key={meetup.id}
                    layoutId={`meetup_card_${meetup.id}`}
                    className="bg-white rounded-3xl border border-neutral-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col hover:shadow-sm transition duration-300"
                  >
                    {/* Header Section */}
                    <div className="p-3.5 pb-2.5 flex justify-between items-center bg-gray-50/50 border-b border-gray-100/50">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <img 
                            src={meetup.host.avatar} 
                            alt={meetup.host.name} 
                            className="w-8 h-8 rounded-full border border-white shadow-sm object-cover" 
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white shadow-3xs" title="Online" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gray-805 flex items-center gap-1.5">
                            {meetup.host.name}
                            <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded-full border border-emerald-200 flex items-center gap-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
                            </span>
                          </span>
                          <span className="text-[9.5px] text-gray-400 block font-semibold">Community Style: {meetup.host.personality}</span>
                        </div>
                      </div>
                      
                      <span className="text-[10px] bg-coral-50 text-coral-600 font-bold px-2.5 py-0.5 rounded-full border border-coral-100 uppercase tracking-wide">
                        {meetup.category}
                      </span>
                    </div>

                    {/* Details Section */}
                    <div className="p-4 flex-1">
                      <h3 
                        onClick={() => setSelectedMeetupId(meetup.id)}
                        className="text-sm font-black text-gray-950 cursor-pointer hover:text-coral-500 transition leading-snug"
                      >
                        {meetup.title}
                      </h3>

                      {/* Schedule & Location Details */}
                      <div className="grid grid-cols-2 gap-2 mt-3 text-gray-600 text-[11px] font-semibold border-t border-gray-100/70 pt-2.5">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-coral-500 flex-shrink-0" />
                          <span className="truncate">{meetup.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-coral-500 flex-shrink-0" />
                          <span className="truncate">{meetup.time}</span>
                        </div>
                        <div className="col-span-2 flex items-center gap-1.5 mt-1 text-gray-700">
                          <MapPin className="w-3.5 h-3.5 text-coral-500 flex-shrink-0" />
                          <span className="truncate">{meetup.locationName}, <span className="text-gray-400 font-medium">{meetup.area}</span></span>
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="px-4 py-3 bg-[#FAF6F0]/65 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="flex -space-x-1.5">
                          {meetup.currentMembers.slice(0, 3).map((avatar, idx) => (
                            <div key={idx} className="w-6 h-6 rounded-full border border-white overflow-hidden bg-gray-200 shadow-xs">
                              <img src={avatar} alt="member" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                          ))}
                          {meetup.currentMembers.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-coral-100 border border-white flex items-center justify-center text-[8px] font-bold text-coral-700">
                              +{meetup.currentMembers.length - 3}
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-500 font-semibold">
                          Committed: <span className="text-gray-850 font-black">{meetup.currentMembers.length}</span>/{meetup.maxMembers}
                        </span>
                      </div>

                      {hasJoined ? (
                        <button
                          onClick={() => setSelectedMeetupId(meetup.id)}
                          className="text-[11px] font-bold py-1.5 px-3.5 rounded-xl bg-sage-50 text-sage-800 border border-sage-200 transition cursor-pointer flex items-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-sage-700" /> Unlock Chat Rooms
                        </button>
                      ) : (
                        <button
                          onClick={() => handleJoinAction(meetup.id)}
                          disabled={isFull}
                          className={`text-xs font-bold py-1.5 px-4 rounded-xl shadow-3xs transition cursor-pointer hover:scale-101 duration-150 ${
                            isFull 
                              ? 'bg-gray-150 text-gray-400 cursor-not-allowed border border-gray-200' 
                              : 'bg-coral-500 hover:bg-coral-600 text-white font-extrabold'
                          }`}
                        >
                          Request Seat
                        </button>
                      )}
                    </div>
                  </motion.div>
                )
              })
            )}
          </div>
        )}
      </div>

      {/* Hosting Floating action bar */}
      {communityTab === 'gatherings' && (
        <button
          onClick={() => setShowHostModal(true)}
          className="absolute bottom-28 right-2.5 w-12 h-12 bg-coral-500 hover:bg-coral-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer z-15"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Detailed Meetup View & Group Chats inside Drawer */}
      <AnimatePresence>
        {selectedMeetupId && selectedMeetup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 z-30 flex items-end justify-center"
            onClick={() => setSelectedMeetupId(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-3xl w-full max-h-[82%] overflow-y-auto p-5 relative flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <button 
                  onClick={() => setSelectedMeetupId(null)}
                  className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex gap-2 items-center mb-3">
                  <span className="text-[10px] bg-coral-50 border border-coral-200 text-coral-600 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                    {selectedMeetup.category} Circles
                  </span>
                  <span className="text-[10px] bg-[#FAF6F0] text-[#800020] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-[#E8DCCB]">
                    <Users className="w-3 h-3 text-[#800020]" /> Community Circle
                  </span>
                </div>

                <h2 className="text-base font-extrabold text-gray-950 leading-snug">{selectedMeetup.title}</h2>
                
                {/* Host Details */}
                <div className="my-3.5 bg-gray-50 p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={selectedMeetup.host.avatar} alt="host" className="w-10 h-10 rounded-full object-cover border border-white shadow-xs" referrerPolicy="no-referrer" />
                    <div>
                      <span className="text-xs font-bold text-gray-800 flex items-center gap-1">Curated by {selectedMeetup.host.name} <CheckCircle className="w-3.5 h-3.5 text-sage-500 fill-white" /></span>
                      <span className="text-[10px] text-gray-500 font-medium">Safe Host Ambassador</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9.5px] bg-white border border-gray-150 px-2.5 py-0.5 rounded-full font-bold text-gray-600">
                      Style: {selectedMeetup.host.personality}
                    </span>
                  </div>
                </div>

                {/* Schedule & Location Details */}
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 bg-gray-50 rounded-xl flex gap-2 items-start text-left">
                      <Calendar className="w-4 h-4 text-coral-405 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-[9.5px] font-bold text-gray-400 uppercase block">Date</span>
                        <span className="text-xs font-bold text-gray-700">{selectedMeetup.date}</span>
                      </div>
                    </div>
                    <div className="p-2.5 bg-gray-50 rounded-xl flex gap-2 items-start text-left">
                      <Clock className="w-4 h-4 text-coral-405 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-[9.5px] font-bold text-gray-400 uppercase block">Time</span>
                        <span className="text-xs font-bold text-gray-700">{selectedMeetup.time}</span>
                      </div>
                    </div>
                    <div className="col-span-2 p-2.5 bg-gray-50 rounded-xl flex gap-2 items-start text-left">
                      <MapPin className="w-4 h-4 text-coral-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-[9.5px] font-bold text-gray-400 uppercase block">Meetup Venue</span>
                        <span className="text-xs font-bold text-[#1E1E1E] block">{selectedMeetup.locationName}</span>
                        <span className="text-[10.5px] text-gray-505 font-medium">{selectedMeetup.area}</span>
                      </div>
                    </div>
                  </div>

                  {/* Joined Members List */}
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Committed Members ({selectedMeetup.currentMembers.length})</span>
                    <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none text-left">
                      {selectedMeetup.currentMembers.map((avatar, idX) => (
                        <div key={idX} className="flex flex-col items-center">
                          <div className="relative w-9 h-9 rounded-full border-2 border-white shadow-xs overflow-hidden bg-gray-100 flex-shrink-0">
                            <img src={avatar} className="object-cover w-full h-full" referrerPolicy="no-referrer" />
                          </div>
                          <span className="text-[8.5px] text-gray-500 font-bold mt-0.5 justify-center leading-none">
                            {idX === 0 ? 'Curator' : `Sister ${idX}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Group Chat Room (Unlocked upon joining) */}
                  {(joinedMeetups.includes(selectedMeetup.id) || joinedCircles.includes(selectedMeetup.id)) ? (
                    <div className="border border-coral-150 rounded-2xl overflow-hidden bg-[#FAF6F0]/40 mt-4 shadow-2xs">
                      {/* Chat Header explaining benefits */}
                      <div className="bg-gradient-to-r from-coral-50 to-orange-50/15 p-2.5 px-3.5 border-b border-coral-100 flex items-center gap-1.5 text-left">
                        <MessageSquare className="w-4 h-4 text-coral-500" />
                        <div>
                          <span className="text-xs font-bold text-[#A26D57] block">Group Chat</span>
                          <span className="text-[10px] text-gray-500 block leading-none font-medium">Discuss details, coordinate plans, and stay in touch.</span>
                        </div>
                      </div>

                      {/* Chat Feed */}
                      <div className="p-3.5 space-y-3 max-h-[190px] overflow-y-auto scrollbar-none bg-white/70">
                        {(localChats[selectedMeetup.id] || []).map((msg) => (
                          <div key={msg.id} className="flex items-start gap-2.5">
                            <img src={msg.avatar} alt="sender avatar" className="w-6 h-6 rounded-full object-cover mt-0.5 border border-gray-100" referrerPolicy="no-referrer" />
                            <div className="bg-gray-100 text-left rounded-b-2xl rounded-r-2xl p-2 px-3">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[9px] font-extrabold text-gray-805 leading-none">{msg.sender}</span>
                                <span className="text-[8px] text-gray-400 font-semibold">{msg.timestamp}</span>
                              </div>
                              
                              {/* Integrated Polaroid image render support in chat */}
                              {msg.text.startsWith('data:image/') || (msg.text.startsWith('http') && (msg.text.includes('unsplash.com') || msg.text.includes('photo'))) ? (
                                <div className="mt-1.5 bg-white p-1 rounded-sm border border-neutral-200 shadow-2xs max-w-[130px] aspect-square overflow-hidden flex items-center justify-center">
                                  <img src={msg.text} className="w-full h-full object-cover" alt="Captured Polaroid" referrerPolicy="no-referrer" />
                                </div>
                              ) : (
                                <p className="text-[11px] text-gray-650 mt-0.5 font-medium leading-normal">{msg.text}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Chat Input */}
                      <div className="p-2 bg-gray-50/70 border-t border-gray-150 flex gap-2">
                        <input
                          type="text"
                          placeholder="Type coordinating message..."
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage(selectedMeetup.id)}
                          className="flex-1 text-xs px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-coral-400 text-gray-800"
                        />
                        <button
                          onClick={() => handleSendChatMessage(selectedMeetup.id)}
                          className="p-2 bg-coral-500 hover:bg-coral-600 text-white rounded-xl transition flex items-center justify-center cursor-pointer active:scale-95 duration-100"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 border border-dashed border-gray-200 rounded-2xl text-center mt-3 animate-fade-in text-left">
                      <span className="text-xs text-gray-550 font-bold block flex items-center gap-1">
                        <Compass className="w-4 h-4 text-coral-500" /> Group Chat Locked
                      </span>
                      <p className="text-[10.5px] text-gray-404 mt-1 leading-normal font-semibold">
                        Become a member of this gathering or circle to view the active participants list and unlock direct chat messaging.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Booking trigger action panel */}
              <div className="mt-6 border-t border-gray-100 pt-4 flex gap-3 text-left">
                {(!joinedMeetups.includes(selectedMeetup.id) && !joinedCircles.includes(selectedMeetup.id)) ? (
                  <button
                    onClick={() => {
                      if (PREMIUM_CIRCLES.some(c => c.id === selectedMeetup.id)) {
                        handleJoinCircle(selectedMeetup.id);
                      } else {
                        handleJoinAction(selectedMeetup.id);
                      }
                    }}
                    className="flex-1 bg-coral-500 hover:bg-coral-600 font-extrabold text-xs text-white py-3.5 rounded-xl uppercase tracking-wider shadow-[0_4px_16px_rgba(212,90,37,0.18)] cursor-pointer text-center"
                  >
                    Join Hub & Chat
                  </button>
                ) : (
                  <span className="flex-1 bg-emerald-50 text-emerald-800 text-center py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-emerald-150">
                    ✓ Joined
                  </span>
                )}

                {/* Direct Invite/Share Link copy button */}
                <button
                  onClick={() => {
                    const shareUrl = `${window.location.origin}${window.location.pathname}?share=meetup&id=${selectedMeetup.id}`;
                    navigator.clipboard.writeText(shareUrl).then(() => {
                      alert("Gathering Invitation Link copied to your clipboard! Share this link with your friends to open directly. ✨");
                    }).catch(() => {});
                  }}
                  className="px-4 bg-[#FAF6F0] hover:bg-orange-50 text-coral-600 border border-coral-200 rounded-xl flex items-center justify-center cursor-pointer transition-all active:scale-95 duration-105"
                  title="Copy Direct Invitation Link"
                >
                  <Share2 className="w-4.5 h-4.5 text-coral-500" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hosting form modal */}
      <AnimatePresence>
        {showHostModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 z-35 flex items-end justify-center"
            onClick={() => setShowHostModal(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white rounded-t-3xl w-full max-h-[82%] overflow-y-auto p-5 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowHostModal(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-[10px] uppercase font-mono font-extrabold text-coral-600 block mb-1 text-left">
                Host a Safe Circle Invitation
              </span>
              <h3 className="text-base font-black text-gray-900 mb-4 text-left">Set up coordinates</h3>

              <form onSubmit={handleCreateMeetup} className="space-y-4">
                <div className="text-left">
                  <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Circle Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Literary coffee walk & matcha latte"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-150 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-coral-400 font-bold text-gray-850"
                  />
                </div>

                <div className="text-left">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase block">Detailed Description & Vibe</label>
                  </div>
                  <textarea
                    required
                    rows={3}
                    placeholder="e.g. Sharing translation notes, reading books, or drinking pour-overs casual walk..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-150 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-coral-400 font-semibold text-gray-850"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5 text-left">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Niche Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full text-xs p-2.5 rounded-xl border border-gray-150 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-coral-400 font-bold text-gray-700 cursor-pointer"
                    >
                      <option value="Coffee">Coffee & Connection</option>
                      <option value="Books">Books & Literary Lounge</option>
                      <option value="Active">Yoga, Fitness & Pilates</option>
                      <option value="Art">Creative Art & Ceramics</option>
                      <option value="Concert">Music & Indie Jams</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Community Alignment</label>
                    <input
                      type="text"
                      placeholder="e.g. Cozy Bookworms"
                      value={newVibe}
                      onChange={(e) => setNewVibe(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-gray-150 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-coral-400 font-bold text-gray-850"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5 text-left">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Meeting Date</label>
                    <input
                      type="text"
                      placeholder="e.g. Saturday, June 1"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-gray-150 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-coral-400 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Meeting Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 05:00 PM"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-gray-150 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-coral-400 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5 text-left">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Secure Meeting Venue</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Blue Tokai Galleria"
                      value={newLoc}
                      onChange={(e) => setNewLoc(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-gray-150 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-coral-400 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Cohort Capacity Limit</label>
                    <input
                      type="number"
                      required
                      min={2}
                      max={12}
                      value={newMax}
                      onChange={(e) => setNewMax(parseInt(e.target.value) || 6)}
                      className="w-full text-xs p-2.5 rounded-xl border border-gray-150 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-coral-400 font-extrabold"
                    />
                  </div>
                </div>

                <div className="bg-[#FAF6F0] p-3 rounded-xl border border-coral-200/40 text-[10.5px] text-gray-500 font-semibold text-center uppercase tracking-wide leading-none select-none">
                  🔒 ONLY ACTIVE GOVERNMENT VERIFIED MEMBERS MAY REQUEST ADMIT SEATS
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-coral-500 hover:bg-coral-600 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_4px_16px_rgba(212,90,37,0.325)] transition duration-200 cursor-pointer"
                >
                  Publish Safe Circle Invitation
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
