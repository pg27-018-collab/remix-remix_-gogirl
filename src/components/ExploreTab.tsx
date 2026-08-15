/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Star, ShieldCheck, Check, Search, BadgePercent, 
  Sparkles, SlidersHorizontal, ArrowUpRight, Gift, Home, Phone, X,
  Users, MessageSquare, Heart, Award, Send, ChevronLeft, ChevronRight, Utensils
} from 'lucide-react';
import { SafePlace, UserProfile } from '../types';
import { SAFE_PLACES } from '../data';

interface ExploreTabProps {
  userProfile?: UserProfile | null;
}

interface Companion {
  id: string;
  name: string;
  age: number;
  area: string;
  avatar: string;
  interests: string[];
  personality: 'Introvert' | 'Ambivert' | 'Extrovert';
  fridayNight: 'Cozy in' | 'Low-key out' | 'Out out';
  bio: string;
}

const ALL_COMPANIONS: Companion[] = [
  {
    id: 'c1',
    name: 'Ananya Roy',
    age: 23,
    area: 'Galleria Mall, Sector 28',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    interests: ['Books', 'Cafés', 'Wellness'],
    personality: 'Introvert',
    fridayNight: 'Cozy in',
    bio: 'Avid vintage novel reader looking to grab warm matcha and exchange bookmarks!'
  },
  {
    id: 'c2',
    name: 'Tanya Malik',
    age: 24,
    area: 'DLF CyberHub',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    interests: ['Fitness', 'Wellness', 'Travel'],
    personality: 'Ambivert',
    fridayNight: 'Low-key out',
    bio: 'Stretching & Pilates fan finding safe spots around Sector 29 for coffee walks.'
  },
  {
    id: 'c3',
    name: 'Priya Das',
    age: 22,
    area: 'Nirvana Courtyard, Sector 50',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200',
    interests: ['Art', 'Museums', 'Fashion'],
    personality: 'Extrovert',
    fridayNight: 'Out out',
    bio: 'Exhibition hopper looking for someone to try out the ceramic workshops.'
  },
  {
    id: 'c4',
    name: 'Diya Sen',
    age: 25,
    area: 'Connaught Place, Delhi',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200',
    interests: ['Startups', 'Tech', 'Cafés'],
    personality: 'Extrovert',
    fridayNight: 'Out out',
    bio: 'Software engineer who loves co-working spaces and swapping business strategies.'
  }
];

export default function ExploreTab({ userProfile }: ExploreTabProps) {
  const [places, setPlaces] = useState<SafePlace[]>(SAFE_PLACES);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [districtFilter, setDistrictFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [redeemedCodes, setRedeemedCodes] = useState<string[]>([]);
  
  // Modal image gallery state
  const [selectedModalImageIndex, setSelectedModalImageIndex] = useState(0);

  // Companion match state
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(null);
  const [companionActionSuccess, setCompanionActionSuccess] = useState(false);
  const [customIcebreakerText, setCustomIcebreakerText] = useState('');

  const districts = ['All', 'CyberHub', 'Connaught Place', 'Galleria', 'Sector 50'];

  const handleRedeemCode = (placeId: string) => {
    if (redeemedCodes.includes(placeId)) return;
    setRedeemedCodes([...redeemedCodes, placeId]);
  };

  const filteredPlaces = places.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.type.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesDistrict = districtFilter === 'All' || 
                            p.area.toLowerCase().includes(districtFilter.toLowerCase()) ||
                            p.address.toLowerCase().includes(districtFilter.toLowerCase());

    return matchesSearch && matchesDistrict;
  });

  const selectedPlace = places.find(p => p.id === selectedPlaceId);

  // Personalized score matching logic
  const getMatchScore = (comp: Companion) => {
    if (!userProfile) return 82; // fallback defaults
    let score = 65;
    
    // Check shared interests
    const userInterests = userProfile.interests || [];
    const shared = comp.interests.filter(item => userInterests.includes(item));
    score += shared.length * 10;

    // Check personality style alignment
    if (comp.personality === userProfile.personality) {
      score += 12;
    }

    // Friday preference check
    if (comp.fridayNight === userProfile.fridayNight) {
      score += 8;
    }

    return Math.min(score, 99);
  };

  // Get ranked matching companions based on current profile
  const rankedCompanions = [...ALL_COMPANIONS].map(comp => ({
    ...comp,
    score: getMatchScore(comp)
  })).sort((a, b) => b.score - a.score);

  const handleSendInvite = (compName: string) => {
    setCompanionActionSuccess(true);
    setTimeout(() => {
      setCompanionActionSuccess(false);
      setSelectedCompanion(null);
      setCustomIcebreakerText('');
    }, 3000);
  };

  return (
    <div className="flex flex-col h-full relative">
      
      {/* Search Input Bar */}
      <div className="px-2.5 pt-1 pb-3 flex-shrink-0 flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search safe venues, bookstores, and spaces..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs font-medium pl-9 pr-4 py-2.5 bg-white border border-gray-150 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-400 focus:bg-white text-gray-800"
          />
        </div>
      </div>

      {/* District Quick Filters */}
      <div className="flex gap-2 overflow-x-auto pb-3 flex-shrink-0 px-2.5 scrollbar-none">
        {districts.map((dist) => {
          const isSelected = districtFilter === dist;
          return (
            <button
              key={dist}
              onClick={() => setDistrictFilter(dist)}
              className={`text-[11px] px-3.5 py-1.8 rounded-full font-bold transition duration-200 flex-shrink-0 border cursor-pointer flex items-center gap-1 ${
                isSelected 
                  ? 'bg-coral-500 text-white border-coral-500 shadow-[0_4px_12px_rgba(212,90,37,0.22)]' 
                  : 'bg-white hover:bg-coral-50/50 hover:text-coral-600 border-neutral-100/90 text-gray-500 shadow-[0_2px_10px_rgba(0,0,0,0.01)]'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-coral-500'}`} />
              <span>{dist}</span>
            </button>
          )
        })}
      </div>

      {/* Main Scroll view */}
      <div className="flex-1 overflow-y-auto space-y-4 px-2.5 pb-24 scrollbar-none">
        
        {/* INTENTIONAL COMPANION DISCOVERY MODULE */}
        <div className="bg-gradient-to-br from-[#FAF6F0] to-[#F4ECE1] border border-[#E8DCCB] p-4 rounded-3xl shadow-xs text-left">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-1.5">
              <div className="p-1.5 bg-[#F4ECE1] text-[#800020] rounded-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#800020] animate-pulse" />
              </div>
              <span className="text-[10px] uppercase font-mono font-extrabold text-[#800020] tracking-wider">
                Companion Matching
              </span>
            </div>
            {userProfile && (
              <span className="text-[8.5px] bg-coral-100 text-coral-750 font-extrabold px-1.5 py-0.5 rounded-full">
                Style: {userProfile.personality}
              </span>
            )}
          </div>

          <h4 className="text-[13px] font-black text-gray-900 tracking-tight leading-snug">
            Community Members Nearby
          </h4>
          <p className="text-[10.5px] text-gray-500 mt-1 font-semibold leading-relaxed">
            Verified members who share your interests and location preferences. Send a message to connect.
          </p>

          {/* Peer Carousel Grid */}
          <div className="grid grid-cols-2 gap-2.5 mt-3">
            {rankedCompanions.slice(0, 2).map((comp) => (
              <div 
                key={comp.id}
                className="bg-white p-3 rounded-2xl border border-neutral-150 shadow-3xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="relative">
                      <img 
                        src={comp.avatar} 
                        alt={comp.name} 
                        className="w-8 h-8 rounded-full border border-white shadow-sm object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" title="Online" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-gray-800 block truncate">{comp.name}</span>
                      <span className="text-[8.5px] text-emerald-600 font-extrabold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="text-[8.5px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded-md font-semibold truncate max-w-full">
                      📍 {comp.area.split(',')[0]}
                    </span>
                    {comp.interests.slice(0, 2).map((interest, idx) => (
                      <span key={idx} className="text-[8.5px] bg-orange-50/60 text-coral-600 border border-coral-100/60 px-1.5 py-0.5 rounded-md font-bold">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedCompanion(comp)}
                  className="w-full mt-3 bg-coral-50 hover:bg-coral-100 border border-coral-200 text-coral-700 text-[10px] font-extrabold py-1.5 rounded-xl transition cursor-pointer text-center"
                >
                  Connect & Chat
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT UPDATES & OPENINGS SECTION */}
        <div className="bg-white rounded-2xl border border-neutral-150 p-3.5 shadow-xs text-left">
          <div className="flex justify-between items-center gap-2 mb-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-coral-100 text-coral-600 flex items-center justify-center font-bold text-xs shrink-0">
                ✨
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-black text-gray-900 leading-tight truncate">Recent Updates & Openings</h4>
                <span className="text-[9.5px] text-gray-500 font-semibold truncate block">Fresh safe spots & community news</span>
              </div>
            </div>
            <span className="text-[9.5px] bg-[#FAF6F0] text-[#800020] font-extrabold px-2.5 py-0.5 rounded-full border border-[#E8DCCB] whitespace-nowrap shrink-0">
              Updated Today
            </span>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-orange-50/50 border border-coral-100/70 flex items-start gap-2.5">
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=120" 
                alt="New Opening" 
                className="w-12 h-12 rounded-lg object-cover shrink-0" 
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-[8.5px] bg-coral-500 text-white font-extrabold px-1.5 py-0.2 rounded">NEW OPENING</span>
                  <span className="text-[9px] text-gray-400 font-bold">Sector 29</span>
                </div>
                <h5 className="text-[11.5px] font-bold text-gray-900 truncate mt-0.5">Artisan Matcha & Bakery Lounge</h5>
                <p className="text-[10px] text-gray-600 font-medium leading-tight line-clamp-1 mt-0.5">
                  100% all-female barista team, reserved solo-booths with panic alerts & free Wi-Fi.
                </p>
              </div>
            </div>
          </div>
        </div>

                {filteredPlaces.length === 0 ? (
          <div className="text-center py-12 bg-white/60 border border-dashed border-gray-200 rounded-2xl p-6">
            <span className="text-xs text-gray-400 font-bold block">No partner venues listed here yet.</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">We are constantly vetting restaurants in this area!</span>
          </div>
        ) : (
          filteredPlaces.map((place) => (
            <motion.div
              key={place.id}
              whileHover={{ y: -1 }}
              className="bg-white rounded-3xl border border-neutral-100/80 overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] cursor-pointer flex flex-col hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.06)] transition duration-300 text-left"
              onClick={() => {
                setSelectedPlaceId(place.id);
                setSelectedModalImageIndex(0);
              }}
            >
              {/* Main Picture thumbnail */}
              <div className="w-full h-40 relative overflow-hidden bg-gray-100">
                <img 
                  src={place.imageUrl} 
                  alt={place.name} 
                  className="w-full h-full object-cover transition duration-300 hover:scale-105" 
                  referrerPolicy="no-referrer"
                />
                
                {/* Safe badge and Rating */}
                <div className="absolute top-2.5 left-2.5 flex gap-1.5 z-10">
                  <span className="text-[8.5px] bg-stone-900/80 backdrop-blur-md text-stone-200 font-extrabold px-2 py-0.5 rounded-full border border-stone-700 flex items-center gap-1">
                    <Utensils className="w-2.5 h-2.5 text-coral-400" /> {place.type}
                  </span>
                </div>

                {/* Rating badge */}
                <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm text-[9.5px] font-bold text-gray-800">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {place.safetyRating}
                </div>

                {/* Discount Flag */}
                <div className="absolute bottom-2 left-2 right-2 bg-gradient-to-r from-coral-500 to-peach-550 text-white px-2.5 py-1.5 rounded-xl flex items-center justify-between text-[10.5px] font-extrabold shadow shadow-coral-500/25 border border-coral-400/20">
                  <span className="flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 fill-white/10" /> {place.discount}
                  </span>
                </div>
              </div>

              {/* RESTAURANT IMAGE GALLERY THUMBNAIL REEL */}
              {place.galleryImages && place.galleryImages.length > 0 && (
                <div className="bg-stone-50 p-2 border-b border-stone-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
                  <span className="text-[8.5px] font-mono font-black text-gray-400 uppercase tracking-widest shrink-0 pl-1">
                    📷 Photos:
                  </span>
                  {place.galleryImages.map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img} 
                      alt={`Gallery ${idx}`}
                      className="w-12 h-9 rounded-lg object-cover shrink-0 border border-gray-200 shadow-2xs hover:border-coral-400 transition"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              )}

              {/* Text content details */}
              <div className="p-3.5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] text-[#A26D57] font-extrabold uppercase tracking-widest">{place.type} • {place.area}</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-gray-900 leading-snug mt-0.5 flex items-center justify-between">
                    {place.name}
                    <ArrowUpRight className="w-4 h-4 text-gray-400 hover:text-coral-500" />
                  </h3>
                  <p className="text-[10.5px] text-gray-500 font-medium leading-normal mt-1 line-clamp-1">
                    {place.description}
                  </p>
                </div>

                {/* Safety Infrastructure Tags list */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {place.safetyFeatures.slice(0, 2).map((feat, idx) => (
                    <span 
                      key={idx} 
                      className="text-[9px] font-semibold text-stone-700 bg-stone-100 px-2 py-1.5 rounded-lg border border-stone-200 flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-coral-600 stroke-[3]" /> {feat}
                    </span>
                  ))}
                  {place.safetyFeatures.length > 2 && (
                    <span className="text-[9px] font-semibold text-gray-500 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-100">
                      +{place.safetyFeatures.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Place detail view modal */}
      <AnimatePresence>
        {selectedPlaceId && selectedPlace && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 z-30 flex items-end justify-center"
            onClick={() => setSelectedPlaceId(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white rounded-t-3xl w-full max-h-[85%] overflow-y-auto p-5 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedPlaceId(null)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer z-20"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex gap-1.5 items-center mb-1">
                <span className="text-[9px] bg-[#FAF6F0] border border-[#E8DCCB] text-[#800020] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                  District: {selectedPlace.area}
                </span>
              </div>

              <h2 className="text-base font-extrabold text-gray-900 mt-2 text-left">{selectedPlace.name}</h2>
              <p className="text-xs text-gray-500 leading-normal font-semibold mt-1 flex items-center gap-1 text-left">
                <MapPin className="w-3.5 h-3.5 text-coral-400" /> {selectedPlace.address}
              </p>

              {/* RESTAURANT MULTI-PHOTO GALLERY SLIDER */}
              {selectedPlace.galleryImages && selectedPlace.galleryImages.length > 0 ? (
                <div className="my-3 space-y-2">
                  <div className="w-full h-48 rounded-2xl overflow-hidden relative bg-stone-900 group">
                    <img 
                      src={selectedPlace.galleryImages[selectedModalImageIndex] || selectedPlace.imageUrl} 
                      alt="Restaurant View"
                      className="w-full h-full object-cover transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Image Counter Badge */}
                    <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[9.5px] font-bold flex items-center gap-1 border border-white/20">
                      📷 Photo {selectedModalImageIndex + 1} of {selectedPlace.galleryImages.length}
                    </div>

                    {/* Gallery Navigation Arrows */}
                    <button
                      onClick={() => setSelectedModalImageIndex((prev) => (prev - 1 + selectedPlace.galleryImages!.length) % selectedPlace.galleryImages!.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedModalImageIndex((prev) => (prev + 1) % selectedPlace.galleryImages!.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {selectedPlace.galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedModalImageIndex(idx)}
                        className={`relative rounded-xl overflow-hidden shrink-0 transition cursor-pointer border-2 ${
                          idx === selectedModalImageIndex ? 'border-coral-500 scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="thumb" className="w-14 h-11 object-cover" referrerPolicy="no-referrer" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full h-40 rounded-xl overflow-hidden shadow-inner my-3 relative">
                  <img src={selectedPlace.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}

              {/* RESTAURANT MENU & HIGHLIGHTS (Point 15) */}
              <div className="bg-amber-50/40 border border-amber-200/80 p-3.5 rounded-xl my-3 text-left">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    🍽️ Digital Menu & Chef Specials
                  </span>
                  <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-2 py-0.5 rounded-full">
                    Partner Restaurant
                  </span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-amber-100/80">
                    <span className="font-bold text-gray-800">Matcha Cold Brew & Artisan Croissant</span>
                    <span className="font-mono font-black text-coral-600">₹340</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-amber-100/80">
                    <span className="font-bold text-gray-800">Avocado Sourdough Toast & Eggs</span>
                    <span className="font-mono font-black text-coral-600">₹420</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-bold text-gray-800">Pink Hibiscus Sparkler (Non-Alcoholic)</span>
                    <span className="font-mono font-black text-coral-600">₹260</span>
                  </div>
                </div>

                <button 
                  onClick={() => alert(`Reserved a safe table at ${selectedPlace.name}! The restaurant manager has been notified of your GoGirl priority reservation.`)}
                  className="w-full mt-3 py-2.5 bg-gradient-to-r from-coral-500 to-rose-500 hover:from-coral-600 hover:to-rose-600 text-white font-black text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Reserve Table in Reserved Women Section</span>
                </button>
              </div>

              {/* Safety feature checklist details */}
              <div className="bg-emerald-50/50 border border-emerald-150 p-3.5 rounded-xl space-y-2 text-left">
                <span className="text-xs font-bold text-emerald-800 block uppercase tracking-wider">Safety Features & Amenities</span>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {selectedPlace.safetyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">✓</div>
                      <span className="text-[10px] text-emerald-800 font-bold leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPANION DETAILED CONNECTION DIALOGUE */}
      <AnimatePresence>
        {selectedCompanion && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 z-35 flex items-end justify-center"
            onClick={() => setSelectedCompanion(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white rounded-t-3xl w-full p-6 relative text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCompanion(null)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex gap-2 items-center mb-3">
                <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-150 font-bold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online Member
                </span>
              </div>

              <div className="flex items-center gap-3.5 mt-2">
                <div className="relative">
                  <img 
                    src={selectedCompanion.avatar} 
                    alt={selectedCompanion.name} 
                    className="w-12 h-12 rounded-full border-2 border-coral-200 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs" title="Online" />
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900 leading-none">
                    {selectedCompanion.name}, {selectedCompanion.age}
                  </h3>
                  <span className="text-[10.5px] font-medium text-gray-400 mt-1 block">
                    📍 {selectedCompanion.area}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5 mt-4 mb-3">
                <div>
                  <span className="text-[9.5px] text-gray-400 font-bold block uppercase tracking-wider">Social Alignment</span>
                  <span className="text-xs text-gray-800 font-bold block mt-0.5">Style: {selectedCompanion.personality}</span>
                </div>
                <div>
                  <span className="text-[9.5px] text-gray-400 font-bold block uppercase tracking-wider">interests</span>
                  <span className="text-xs text-gray-800 font-bold block mt-0.5 mt-0.5 truncate">{selectedCompanion.interests.join(', ')}</span>
                </div>
              </div>

              {/* Handcrafted Message Field */}
              <div className="border border-coral-150 rounded-2xl p-3 bg-gray-50/50 mt-2">
                <span className="text-[10px] uppercase font-bold text-coral-600 block mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-coral-500 animate-pulse" /> Say Hello
                </span>
                <textarea
                  className="w-full text-xs p-2.5 bg-white border border-neutral-150 rounded-xl focus:outline-none focus:ring-1 focus:ring-coral-400 resize-none font-semibold text-gray-700"
                  rows={2}
                  placeholder={`Hey ${selectedCompanion.name.split(' ')[0]}! Shared love for Books & Cafés, want to connect?`}
                  value={customIcebreakerText}
                  onChange={(e) => setCustomIcebreakerText(e.target.value)}
                />
                <button
                  onClick={() => handleSendInvite(selectedCompanion.name)}
                  disabled={companionActionSuccess}
                  className="w-full mt-2.5 py-3 bg-coral-500 hover:bg-coral-600 text-white text-xs font-bold rounded-xl shadow-[0_4px_12px_rgba(212,90,37,0.14)] flex items-center justify-center gap-2 cursor-pointer transition uppercase tracking-wider"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{companionActionSuccess ? 'Sending request...' : `Send Meetup Request`}</span>
                </button>
              </div>

              {companionActionSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mt-3.5 text-emerald-800 text-[10.5px] font-bold text-center flex items-center justify-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" /> Sent successfully! We will notify you when they respond.
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
