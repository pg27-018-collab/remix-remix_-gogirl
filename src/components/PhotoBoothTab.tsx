/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, Film, Sparkles, Wand2, Download, Zap, Heart, Eye, 
  RotateCw, Share2, HelpCircle, ArrowRightLeft, Shuffle, Check, AlertCircle, Trash2, X, Clock,
  MessageSquare, SlidersHorizontal, Image as ImageIcon, Plus, Send, Smile, Grid2X2,
  Bookmark, MoreHorizontal, Flame, Layers, ChevronRight, ChevronLeft, Volume2, VolumeX,
  Upload, Tag, MapPin, ShieldCheck, CheckCircle2, Palette, Maximize2, Stamp, Scissors,
  Lightbulb, Quote, MessageCircle, BookOpen, Users
} from 'lucide-react';
import { IcebreakerCard, CustomPhoto, UserProfile } from '../types';
import { ICEBREAKERS } from '../data';

interface PhotoBoothTabProps {
  userProfile?: UserProfile | null;
  joinedMeetups?: string[];
}

export type FrameType = 'polaroid' | 'collage-2x2' | 'filmstrip' | 'split-duo' | 'minimal-white' | 'postcard';
export type FilterType = 'warm-vintage' | 'polaroid-retro' | 'classic-bw' | 'golden-hour' | 'vintage-rose' | 'vhs-90s' | 'grain-noir';
export type FrameColor = 'classic-white' | 'vintage-cream' | 'rose-blush' | 'noir-black' | 'maroon-luxe';

export interface StoryItem {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorHandle: string;
  location: string;
  imageUrl: string;
  filter: FilterType | string;
  frame: FrameType | string;
  frameColor?: FrameColor;
  caption?: string;
  sticker?: string;
  createdAt: number; // timestamp
  expiresAt: number; // timestamp (24h later)
  views: number;
  likes: number;
  hasLiked?: boolean;
  isMyStory?: boolean;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorHandle: string;
  location: string;
  imageUrl: string;
  filter: FilterType | string;
  frame: FrameType | string;
  frameColor?: FrameColor;
  caption: string;
  tags: string[];
  collageImages?: string[];
  createdAt: number;
  expiresAt: number; // 24 hours expiration
  likes: number;
  hasLiked?: boolean;
  saved?: boolean;
  comments: { id: string; author: string; avatar: string; text: string; time: string }[];
  isMyPost?: boolean;
}

// Initial preloaded Instagram-style 24-hour stories
const INITIAL_STORIES: StoryItem[] = [
  {
    id: 'story_1',
    authorName: 'Aditi Rao',
    authorHandle: '@aditi_r',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    location: 'Blue Tokai, Galleria Market',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600',
    filter: 'warm-vintage',
    frame: 'polaroid',
    frameColor: 'classic-white',
    caption: 'Matcha latte + quiet reading spot 🍵☕ Safe table with female staff!',
    sticker: '☕ Coffee Huddle',
    createdAt: Date.now() - 2 * 3600 * 1000,
    expiresAt: Date.now() + 22 * 3600 * 1000,
    views: 48,
    likes: 19
  },
  {
    id: 'story_2',
    authorName: 'Riya Sharma',
    authorHandle: '@riya_s',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    location: 'CyberHub Skywalk',
    imageUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=600',
    filter: 'golden-hour',
    frame: 'filmstrip',
    frameColor: 'noir-black',
    caption: 'Sunset stroll with the evening walking circle! ✨🌸',
    sticker: '✨ Sunset Magic',
    createdAt: Date.now() - 5 * 3600 * 1000,
    expiresAt: Date.now() + 19 * 3600 * 1000,
    views: 82,
    likes: 34
  },
  {
    id: 'story_3',
    authorName: 'Meher Roy',
    authorHandle: '@meher_yoga',
    authorAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
    location: 'Leisure Valley Park',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600',
    filter: 'vintage-rose',
    frame: 'minimal-white',
    frameColor: 'vintage-cream',
    caption: 'Outdoor Pilates session unlocked! Join us next Sunday 🧘‍♀️💪',
    sticker: '👯‍♀️ Besties',
    createdAt: Date.now() - 8 * 3600 * 1000,
    expiresAt: Date.now() + 16 * 3600 * 1000,
    views: 112,
    likes: 53
  },
  {
    id: 'story_4',
    authorName: 'Tanvi Malik',
    authorHandle: '@tanvi_art',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    location: 'The Clay Company Studio',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
    filter: 'warm-vintage',
    frame: 'postcard',
    frameColor: 'vintage-cream',
    caption: 'Pottery weekend workshop. So much fun shaping ceramic mugs! 🎨',
    sticker: '🌸 Gurgaon Girls',
    createdAt: Date.now() - 11 * 3600 * 1000,
    expiresAt: Date.now() + 13 * 3600 * 1000,
    views: 65,
    likes: 27
  }
];

// Initial preloaded Instagram-style 24-hour feed posts
const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post_1',
    authorName: 'Riya Sharma',
    authorHandle: '@riya_s',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    location: 'CyberHub, DLF Phase 2',
    imageUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=800',
    filter: 'warm-vintage',
    frame: 'polaroid',
    frameColor: 'classic-white',
    caption: 'Captured this instant Polaroid during our Sunday Coffee & Book Swap meetup. Love finding fellow thriller readers in Gurgaon! ☕📚✨',
    tags: ['#GoGirlMeetup', '#CyberHub', '#Sisterhood', '#24hMoments'],
    createdAt: Date.now() - 2 * 3600 * 1000,
    expiresAt: Date.now() + 22 * 3600 * 1000,
    likes: 42,
    hasLiked: false,
    saved: false,
    comments: [
      { id: 'c1', author: 'Aditi Rao', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', text: 'Such a fun morning! Loved the book recs!', time: '1h ago' },
      { id: 'c2', author: 'Meher Roy', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200', text: 'The polaroid frame looks so vintage and pretty ❤️', time: '30m ago' }
    ]
  },
  {
    id: 'post_2',
    authorName: 'Aanya Sen',
    authorHandle: '@aanya_s',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    location: 'Leisure Valley Park, Sector 29',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
    filter: 'golden-hour',
    frame: 'collage-2x2',
    frameColor: 'vintage-cream',
    collageImages: [
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=400'
    ],
    caption: 'Collage from our morning fitness & outdoor pilates session! Sunshine, stretches, and safe vibes. 🧘‍♀️☀️🌿',
    tags: ['#PilatesCrew', '#GurgaonFitness', '#WellnessCircles'],
    createdAt: Date.now() - 6 * 3600 * 1000,
    expiresAt: Date.now() + 18 * 3600 * 1000,
    likes: 58,
    hasLiked: true,
    saved: true,
    comments: [
      { id: 'c3', author: 'Simran Gill', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', text: 'Can I join next week? Looks amazing!', time: '3h ago' }
    ]
  },
  {
    id: 'post_3',
    authorName: 'Meher Roy',
    authorHandle: '@meher_yoga',
    authorAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
    location: 'Galleria Market, DLF Phase 4',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    filter: 'vintage-rose',
    frame: 'filmstrip',
    frameColor: 'noir-black',
    caption: 'Pottery Workshop with our vetted circle at Galleria! Nothing beats making handmade mugs with lovely humans. 🎨☕',
    tags: ['#PotteryCircle', '#GalleriaMarket', '#ArtWorkshops'],
    createdAt: Date.now() - 10 * 3600 * 1000,
    expiresAt: Date.now() + 14 * 3600 * 1000,
    likes: 31,
    hasLiked: false,
    saved: false,
    comments: []
  }
];

export default function PhotoBoothTab({ userProfile, joinedMeetups = [] }: PhotoBoothTabProps) {
  // Main view navigation: 'snapchat' (Filters/Camera/Collage) vs 'instagram' (Stories & Feed) vs 'games' (Icebreakers)
  const [activeZone, setActiveZone] = useState<'snapchat' | 'instagram' | 'games'>('snapchat');

  // Camera & Image state
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [useRealCamera, setUseRealCamera] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const [recentPhotos, setRecentPhotos] = useState<CustomPhoto[]>([]);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  
  // Custom Filters, Frames & Frame Color for Snapchat Studio
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('polaroid-retro');
  const [selectedFrame, setSelectedFrame] = useState<FrameType>('polaroid');
  const [selectedFrameColor, setSelectedFrameColor] = useState<FrameColor>('classic-white');
  const [selectedSticker, setSelectedSticker] = useState<string>('☕ Coffee Huddle');
  const [customCaption, setCustomCaption] = useState<string>('');
  const [collageShots, setCollageShots] = useState<string[]>([]);
  const [collageStep, setCollageStep] = useState<number>(0);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Instagram Stories & Posts State
  const [stories, setStories] = useState<StoryItem[]>(INITIAL_STORIES);
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_POSTS);
  const [postFeedFilter, setPostFeedFilter] = useState<'all' | 'my-posts' | 'meetup-moments'>('all');
  
  // Active Fullscreen Story Viewer
  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);
  const [storyProgress, setStoryProgress] = useState<number>(0);
  const [isStoryPaused, setIsStoryPaused] = useState<boolean>(false);
  const [storyReactionEmoji, setStoryReactionEmoji] = useState<string | null>(null);
  const [storyReplyText, setStoryReplyText] = useState<string>('');

  // Create Post Modal State
  const [isCreatePostOpen, setIsCreatePostOpen] = useState<boolean>(false);
  const [newPostImage, setNewPostImage] = useState<string>('');
  const [newPostCaption, setNewPostCaption] = useState<string>('');
  const [newPostLocation, setNewPostLocation] = useState<string>('DLF CyberHub, Gurgaon');
  const [newPostFilter, setNewPostFilter] = useState<FilterType>('polaroid-retro');
  const [newPostFrame, setNewPostFrame] = useState<FrameType>('polaroid');
  const [newPostFrameColor, setNewPostFrameColor] = useState<FrameColor>('classic-white');
  const [isPostingStory, setIsPostingStory] = useState<boolean>(false);

  // Comment Drawer State
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<string>('');

  // Double tap like animation state
  const [heartPopPostId, setHeartPopPostId] = useState<string | null>(null);

  // Icebreakers / Table Talk State
  const [icebreakers] = useState<IcebreakerCard[]>(ICEBREAKERS);
  const [currentIceIdx, setCurrentIceIdx] = useState(0);
  const [iceActiveCategory, setIceActiveCategory] = useState<string>('all');
  const [flipped, setFlipped] = useState(false);
  const [showAnswers, setShowAnswers] = useState<boolean>(true);
  const [userPollVotes, setUserPollVotes] = useState<Record<string, number>>({});
  const [customCardResponses, setCustomCardResponses] = useState<Record<string, string[]>>({});
  const [newCardAnswerInput, setNewCardAnswerInput] = useState<string>('');
  const [isAllCardsModalOpen, setIsAllCardsModalOpen] = useState<boolean>(false);

  // Group Sharing modal states
  const [selectedPhotoForShare, setSelectedPhotoForShare] = useState<CustomPhoto | null>(null);
  const [sharingSuccess, setSharingSuccess] = useState('');

  // Delete Confirmation Modal
  const [postToDelete, setPostToDelete] = useState<CommunityPost | null>(null);

  // References
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const exportCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Callback ref to dynamically bind media stream whenever the active video element mounts in any frame layout
  const handleVideoRef = (el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if (el && stream) {
      if (el.srcObject !== stream) {
        el.srcObject = stream;
      }
      el.play().catch(() => {});
    }
  };

  // Ensure camera stream remains seamlessly attached whenever switching frame styles, themes or filters
  useEffect(() => {
    if (useRealCamera && stream && videoRef.current) {
      if (videoRef.current.srcObject !== stream) {
        videoRef.current.srcObject = stream;
      }
      videoRef.current.play().catch(() => {});
    }
  }, [useRealCamera, stream, selectedFrame, selectedFrameColor, selectedFilter, collageStep, capturedPreview, activeZone]);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedPhotos = localStorage.getItem('gogirl_booth_photos');
    if (savedPhotos) {
      try { setRecentPhotos(JSON.parse(savedPhotos)); } catch (_) {}
    }

    const savedStories = localStorage.getItem('gogirl_community_stories');
    if (savedStories) {
      try { setStories(JSON.parse(savedStories)); } catch (_) {}
    }

    const savedPosts = localStorage.getItem('gogirl_community_posts_v2');
    if (savedPosts) {
      try { setPosts(JSON.parse(savedPosts)); } catch (_) {}
    }
  }, []);

  // Stop camera stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Story Auto-Advance Timer
  useEffect(() => {
    if (activeStoryIdx === null || isStoryPaused) return;

    const interval = setInterval(() => {
      setStoryProgress(prev => {
        if (prev >= 100) {
          if (activeStoryIdx < stories.length - 1) {
            setActiveStoryIdx(activeStoryIdx + 1);
            return 0;
          } else {
            setActiveStoryIdx(null);
            return 0;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeStoryIdx, isStoryPaused, stories.length]);

  const startWebcam = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(mediaStream);
      setUseRealCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.log('Camera access notice:', err);
      setUseRealCamera(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const loadedImg = event.target.result as string;
        setCapturedPreview(loadedImg);
        if (selectedFrame === 'collage-2x2') {
          // If in collage mode, fill with 4 variations of uploaded image or populate all slots
          setCollageShots([loadedImg, loadedImg, loadedImg, loadedImg]);
          setCollageStep(4);
        } else if (selectedFrame === 'split-duo') {
          setCollageShots([loadedImg, loadedImg]);
          setCollageStep(2);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const captureSingleFrame = (): string => {
    if (useRealCamera && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = 640;
        canvas.height = 640;
        const minDim = Math.min(video.videoWidth || 640, video.videoHeight || 640);
        const sx = ((video.videoWidth || 640) - minDim) / 2;
        const sy = ((video.videoHeight || 640) - minDim) / 2;
        ctx.scale(-1, 1);
        ctx.drawImage(video, sx, sy, minDim, minDim, -640, 0, 640, 640);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        return canvas.toDataURL('image/jpeg', 0.92);
      }
    }
    
    // Sample fallback images
    const samplePool = [
      'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800'
    ];
    return samplePool[Math.floor(Math.random() * samplePool.length)];
  };

  const handleCapturePhoto = () => {
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 220);

    if (selectedFrame === 'collage-2x2') {
      const shot = captureSingleFrame();
      const newShots = [...collageShots, shot];
      setCollageShots(newShots);
      
      if (newShots.length >= 4) {
        setCapturedPreview(newShots[0]);
        setCollageStep(4);
      } else {
        setCollageStep(newShots.length);
      }
    } else if (selectedFrame === 'split-duo') {
      const shot = captureSingleFrame();
      const newShots = [...collageShots, shot];
      setCollageShots(newShots);
      
      if (newShots.length >= 2) {
        setCapturedPreview(newShots[0]);
        setCollageStep(2);
      } else {
        setCollageStep(newShots.length);
      }
    } else {
      const shot = captureSingleFrame();
      setCapturedPreview(shot);
    }
  };

  // Instant 4-shot / 2-shot collage generator from single photo
  const handleGenerateInstantCollage = () => {
    const shot = captureSingleFrame();
    setCollageShots([shot, shot, shot, shot]);
    setCapturedPreview(shot);
    setCollageStep(4);
  };

  const handleSaveToRecent = (dataUrl: string) => {
    const processed: CustomPhoto = {
      id: 'photo_' + Date.now(),
      dataUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      filter: selectedFilter,
      frame: selectedFrame
    };

    const updated = [processed, ...recentPhotos].slice(0, 8);
    setRecentPhotos(updated);
    localStorage.setItem('gogirl_booth_photos', JSON.stringify(updated));
  };

  // Download Framed Photo as high-res PNG
  const handleDownloadFramedPhoto = async () => {
    if (!capturedPreview) return;
    setIsExporting(true);

    try {
      const canvas = exportCanvasRef.current || document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 900;
      canvas.height = 1100;

      // Draw background frame based on selectedFrameColor
      let bgColor = '#FFFFFF';
      if (selectedFrameColor === 'vintage-cream') bgColor = '#FAF6F0';
      else if (selectedFrameColor === 'rose-blush') bgColor = '#FFF1F3';
      else if (selectedFrameColor === 'noir-black') bgColor = '#181818';
      else if (selectedFrameColor === 'maroon-luxe') bgColor = '#2C181C';

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load main photo
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = capturedPreview;

      await new Promise((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(true);
      });

      // Frame specific drawing
      if (selectedFrame === 'polaroid') {
        // Polaroid photo area
        const photoX = 60;
        const photoY = 60;
        const photoW = 780;
        const photoH = 780;

        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(photoX, photoY, photoW, photoH);
        ctx.drawImage(img, photoX, photoY, photoW, photoH);

        // Polaroid bottom text
        ctx.fillStyle = selectedFrameColor === 'noir-black' || selectedFrameColor === 'maroon-luxe' ? '#F8F5EE' : '#2C181C';
        ctx.font = 'bold 36px sans-serif';
        ctx.textAlign = 'center';
        const displayCap = customCaption || 'GoGirl Sisterhood Meetup • DLF CyberHub';
        ctx.fillText(displayCap, canvas.width / 2, 920);

        ctx.font = '22px monospace';
        ctx.fillStyle = selectedFrameColor === 'noir-black' || selectedFrameColor === 'maroon-luxe' ? '#A8A29E' : '#78716C';
        ctx.fillText(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' • 100% Safe Space', canvas.width / 2, 970);

      } else if (selectedFrame === 'filmstrip') {
        // Filmstrip 35mm styling
        ctx.fillStyle = '#121212';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw sprocket holes top and bottom
        ctx.fillStyle = '#FFFFFF';
        for (let i = 40; i < canvas.width; i += 70) {
          ctx.fillRect(i, 25, 36, 45);
          ctx.fillRect(i, canvas.height - 70, 36, 45);
        }

        // Draw photo
        ctx.drawImage(img, 60, 100, 780, 780);

        // Film edge markings
        ctx.fillStyle = '#EAB308';
        ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('35MM • KODAK PORTRA 400 • GOGIRL GGN', 70, 950);
        ctx.fillText('▲ 04A', 750, 950);

      } else if (selectedFrame === 'collage-2x2') {
        const pSize = 380;
        const gap = 20;
        const startX = 50;
        const startY = 60;

        const shotsToUse = collageShots.length >= 4 ? collageShots : [capturedPreview, capturedPreview, capturedPreview, capturedPreview];

        for (let i = 0; i < 4; i++) {
          const row = Math.floor(i / 2);
          const col = i % 2;
          const x = startX + col * (pSize + gap);
          const y = startY + row * (pSize + gap);

          const slotImg = new Image();
          slotImg.crossOrigin = 'anonymous';
          slotImg.src = shotsToUse[i];
          await new Promise((res) => { slotImg.onload = () => res(true); slotImg.onerror = () => res(true); });

          ctx.drawImage(slotImg, x, y, pSize, pSize);
        }

        ctx.fillStyle = selectedFrameColor === 'noir-black' || selectedFrameColor === 'maroon-luxe' ? '#F8F5EE' : '#2C181C';
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(customCaption || 'Sisterhood 2x2 Photo Booth', canvas.width / 2, 940);
      } else {
        // Minimal / Postcard
        ctx.drawImage(img, 70, 70, 760, 800);
        ctx.strokeStyle = '#FC8EAC';
        ctx.lineWidth = 8;
        ctx.strokeRect(50, 50, 800, 840);

        ctx.fillStyle = '#2C181C';
        ctx.font = 'bold 30px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(customCaption || 'Gurgaon Sisterhood Moments', canvas.width / 2, 960);
      }

      // Overlaid Sticker
      if (selectedSticker) {
        ctx.fillStyle = '#FC8EAC';
        ctx.font = 'bold 28px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(selectedSticker, canvas.width - 80, 1020);
      }

      // Trigger Download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `GoGirl_SnapFrame_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      setSharingSuccess('📥 Downloaded framed snap to your device!');
      setTimeout(() => setSharingSuccess(''), 2500);
    } catch (err) {
      console.error('Download framed photo error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Publish from Snapchat directly as Instagram 24h Story
  const handlePublishAsStory = (imageUrl: string) => {
    const newStory: StoryItem = {
      id: 'story_' + Date.now(),
      authorName: userProfile?.name || 'You',
      authorHandle: '@' + (userProfile?.name ? userProfile.name.toLowerCase().replace(/\s+/g, '_') : 'you'),
      authorAvatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      location: 'DLF CyberHub, Gurgaon',
      imageUrl,
      filter: selectedFilter,
      frame: selectedFrame,
      frameColor: selectedFrameColor,
      caption: customCaption || 'Live from our safe meetup! ✨🌸',
      sticker: selectedSticker,
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 3600 * 1000,
      views: 1,
      likes: 0,
      isMyStory: true
    };

    const updated = [newStory, ...stories];
    setStories(updated);
    localStorage.setItem('gogirl_community_stories', JSON.stringify(updated));
    handleSaveToRecent(imageUrl);

    setSharingSuccess('✨ Published framed snap to 24h Story!');
    setTimeout(() => {
      setSharingSuccess('');
      setCapturedPreview(null);
      setCollageShots([]);
      setCollageStep(0);
      setActiveZone('instagram');
    }, 1200);
  };

  // Publish from Snapchat directly as Instagram 24h Feed Post
  const handlePublishAsFeedPost = (imageUrl: string) => {
    const newPost: CommunityPost = {
      id: 'post_' + Date.now(),
      authorName: userProfile?.name || 'You',
      authorHandle: '@' + (userProfile?.name ? userProfile.name.toLowerCase().replace(/\s+/g, '_') : 'you'),
      authorAvatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      location: newPostLocation || 'DLF CyberHub, Gurgaon',
      imageUrl,
      filter: selectedFilter,
      frame: selectedFrame,
      frameColor: selectedFrameColor,
      caption: customCaption || 'Captured with GoGirl Snap Studio! Safe sisterhood vibes in Gurgaon. ☕✨',
      tags: ['#GoGirlGurgaon', '#SafeSpaces', '#24hEphemeral'],
      createdAt: Date.now(),
      expiresAt: Date.now() + 24 * 3600 * 1000,
      likes: 1,
      hasLiked: true,
      saved: false,
      comments: [],
      isMyPost: true,
      collageImages: selectedFrame === 'collage-2x2' && collageShots.length === 4 ? collageShots : undefined
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem('gogirl_community_posts_v2', JSON.stringify(updated));
    handleSaveToRecent(imageUrl);

    setSharingSuccess('📸 Shared framed snap to Community Feed!');
    setTimeout(() => {
      setSharingSuccess('');
      setCapturedPreview(null);
      setCollageShots([]);
      setCollageStep(0);
      setActiveZone('instagram');
    }, 1200);
  };

  // Create Manual Instagram Post
  const handleCreateManualPost = () => {
    if (!newPostImage) return;

    if (isPostingStory) {
      const newStory: StoryItem = {
        id: 'story_' + Date.now(),
        authorName: userProfile?.name || 'You',
        authorHandle: '@' + (userProfile?.name ? userProfile.name.toLowerCase().replace(/\s+/g, '_') : 'you'),
        authorAvatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
        location: newPostLocation,
        imageUrl: newPostImage,
        filter: newPostFilter,
        frame: newPostFrame,
        frameColor: newPostFrameColor,
        caption: newPostCaption,
        sticker: selectedSticker,
        createdAt: Date.now(),
        expiresAt: Date.now() + 24 * 3600 * 1000,
        views: 1,
        likes: 0,
        isMyStory: true
      };
      const updated = [newStory, ...stories];
      setStories(updated);
      localStorage.setItem('gogirl_community_stories', JSON.stringify(updated));
    } else {
      const newPost: CommunityPost = {
        id: 'post_' + Date.now(),
        authorName: userProfile?.name || 'You',
        authorHandle: '@' + (userProfile?.name ? userProfile.name.toLowerCase().replace(/\s+/g, '_') : 'you'),
        authorAvatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
        location: newPostLocation,
        imageUrl: newPostImage,
        filter: newPostFilter,
        frame: newPostFrame,
        frameColor: newPostFrameColor,
        caption: newPostCaption || 'Enjoying our safe sisterhood meetup! ☕🌸',
        tags: ['#GoGirlMeetup', '#SafeSpaces', '#GurgaonGirls'],
        createdAt: Date.now(),
        expiresAt: Date.now() + 24 * 3600 * 1000,
        likes: 1,
        hasLiked: true,
        saved: false,
        comments: [],
        isMyPost: true
      };
      const updated = [newPost, ...posts];
      setPosts(updated);
      localStorage.setItem('gogirl_community_posts_v2', JSON.stringify(updated));
    }

    setIsCreatePostOpen(false);
    setNewPostImage('');
    setNewPostCaption('');
    setSharingSuccess('Published successfully with 24-hour safe auto-deletion!');
    setTimeout(() => setSharingSuccess(''), 2500);
  };

  // Like / Unlike Post with Heart Pop
  const handleLikePost = (postId: string) => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        const nextLiked = !p.hasLiked;
        if (nextLiked) {
          setHeartPopPostId(postId);
          setTimeout(() => setHeartPopPostId(null), 800);
        }
        return {
          ...p,
          likes: nextLiked ? p.likes + 1 : p.likes - 1,
          hasLiked: nextLiked
        };
      }
      return p;
    });
    setPosts(updated);
    localStorage.setItem('gogirl_community_posts_v2', JSON.stringify(updated));
  };

  // Double tap to like on image
  const handleDoubleTapImage = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post && !post.hasLiked) {
      handleLikePost(postId);
    } else {
      setHeartPopPostId(postId);
      setTimeout(() => setHeartPopPostId(null), 800);
    }
  };

  // Bookmark / Save Post
  const handleToggleSavePost = (postId: string) => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        return { ...p, saved: !p.saved };
      }
      return p;
    });
    setPosts(updated);
    localStorage.setItem('gogirl_community_posts_v2', JSON.stringify(updated));
  };

  // Add Comment
  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;
    const newComment = {
      id: 'c_' + Date.now(),
      author: userProfile?.name || 'You',
      avatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      text: commentInput.trim(),
      time: 'Just now'
    };

    const updated = posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    });

    setPosts(updated);
    localStorage.setItem('gogirl_community_posts_v2', JSON.stringify(updated));
    setCommentInput('');
  };

  // Delete Post
  const handleConfirmDeletePost = () => {
    if (!postToDelete) return;
    const updated = posts.filter(p => p.id !== postToDelete.id);
    setPosts(updated);
    localStorage.setItem('gogirl_community_posts_v2', JSON.stringify(updated));
    setPostToDelete(null);
    setSharingSuccess('🗑️ Post deleted securely.');
    setTimeout(() => setSharingSuccess(''), 2000);
  };

  // Delete Story
  const handleDeleteActiveStory = (storyId: string) => {
    const updated = stories.filter(s => s.id !== storyId);
    setStories(updated);
    localStorage.setItem('gogirl_community_stories', JSON.stringify(updated));
    setActiveStoryIdx(null);
    setSharingSuccess('🗑️ Story deleted.');
    setTimeout(() => setSharingSuccess(''), 2000);
  };

  // Send Story Quick Reaction
  const handleSendStoryReaction = (emoji: string) => {
    setStoryReactionEmoji(emoji);
    setTimeout(() => setStoryReactionEmoji(null), 1200);
    if (activeStoryIdx !== null) {
      const story = stories[activeStoryIdx];
      const updated = stories.map(s => s.id === story.id ? { ...s, likes: s.likes + 1, hasLiked: true } : s);
      setStories(updated);
      localStorage.setItem('gogirl_community_stories', JSON.stringify(updated));
    }
  };

  // Calculate Remaining Time from ExpiresAt
  const formatRemainingTime = (expiresAt: number) => {
    const diffMs = expiresAt - Date.now();
    if (diffMs <= 0) return 'Expired';
    const hours = Math.floor(diffMs / (3600 * 1000));
    const mins = Math.floor((diffMs % (3600 * 1000)) / (60 * 1000));
    return `${hours}h ${mins}m left`;
  };

  // CSS Filter Classes mapping
  const getFilterClasses = (filter: string) => {
    switch (filter) {
      case 'classic-bw': return 'grayscale contrast-125 brightness-95';
      case 'warm-vintage': return 'sepia-[0.4] brightness-95 saturate-[1.3] hue-rotate-[-10deg] contrast-105';
      case 'polaroid-retro': return 'sepia-[0.25] saturate-[1.25] brightness-[1.03] contrast-[1.1]';
      case 'golden-hour': return 'saturate-[1.65] brightness-[1.04] sepia-[0.15] contrast-[1.08] hue-rotate-[10deg]';
      case 'vintage-rose': return 'sepia-[0.2] saturate-[1.4] brightness-95 hue-rotate-[330deg] contrast-105';
      case 'vhs-90s': return 'contrast-[1.2] saturate-[1.5] brightness-[0.95] hue-rotate-[15deg]';
      case 'grain-noir': return 'grayscale contrast-[1.4] brightness-[0.9]';
      default: return '';
    }
  };

  // Frame Background Color CSS class
  const getFrameBgClass = (color?: FrameColor) => {
    switch (color) {
      case 'vintage-cream': return 'bg-[#FAF6F0] text-stone-900 border-[#E8DCCB]';
      case 'rose-blush': return 'bg-[#FFF0F3] text-stone-900 border-rose-200';
      case 'noir-black': return 'bg-[#181818] text-[#F8F5EE] border-stone-800';
      case 'maroon-luxe': return 'bg-[#2C181C] text-[#F8F5EE] border-[#800020]/50';
      case 'classic-white':
      default: return 'bg-white text-stone-900 border-stone-200';
    }
  };

  // Helper component to render any framed image consistently
  const renderFramedImage = (
    imageSrc: string,
    frame: FrameType | string,
    filter: FilterType | string,
    captionText?: string,
    stickerText?: string,
    collageImgs?: string[],
    color: FrameColor = 'classic-white',
    isLiveFeed: boolean = false
  ) => {
    const frameBg = getFrameBgClass(color);
    const filterClass = getFilterClasses(filter);
    const isDarkFrame = color === 'noir-black' || color === 'maroon-luxe';

    // 1. POLAROID FRAME
    if (frame === 'polaroid') {
      return (
        <div className={`w-full aspect-[3.4/4] ${frameBg} p-3 pb-8 rounded-2xl shadow-md border flex flex-col justify-between relative select-none transition-all`}>
          {/* Subtle tape corner sticker */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-amber-100/70 border border-amber-200/60 rounded-xs rotate-[-1deg] shadow-2xs z-20" />

          {/* Photo area */}
          <div className="relative w-full aspect-square bg-stone-950 rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
            {isLiveFeed ? (
              <video ref={handleVideoRef} autoPlay playsInline muted className={`w-full h-full object-cover transform -scale-x-100 ${filterClass}`} />
            ) : (
              <img src={imageSrc} alt="Polaroid Snap" className={`w-full h-full object-cover ${filterClass}`} referrerPolicy="no-referrer" />
            )}

            {stickerText && (
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-[#800020] text-[10px] font-black px-2 py-0.5 rounded-full shadow border border-white">
                {stickerText}
              </div>
            )}
          </div>

          {/* Polaroid Bottom Margin with Handwritten Caption & Date */}
          <div className="pt-2 px-1 text-center">
            <p className={`text-xs font-black tracking-tight line-clamp-1 ${isDarkFrame ? 'text-[#F8F5EE]' : 'text-stone-900'}`}>
              {captionText || 'GoGirl Sisterhood Meetup • DLF CyberHub'}
            </p>
            <div className={`flex items-center justify-between text-[8px] font-mono mt-1 ${isDarkFrame ? 'text-stone-400' : 'text-stone-500'}`}>
              <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span className="font-bold text-[#800020]">✓ 100% Safe Space</span>
            </div>
          </div>
        </div>
      );
    }

    // 2. 2x2 GRID COLLAGE FRAME
    if (frame === 'collage-2x2') {
      const shots = collageImgs && collageImgs.length >= 4 
        ? collageImgs 
        : [imageSrc, imageSrc, imageSrc, imageSrc];

      return (
        <div className={`w-full aspect-square ${frameBg} p-2.5 rounded-2xl shadow-md border flex flex-col justify-between relative select-none`}>
          <div className="grid grid-cols-2 gap-1.5 w-full aspect-square bg-stone-950 p-1.5 rounded-xl overflow-hidden">
            {shots.map((shot, idx) => (
              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-stone-900 shadow-2xs">
                {isLiveFeed && (idx === collageStep || (collageStep >= 4 && idx === 0)) ? (
                  <video ref={handleVideoRef} autoPlay playsInline muted className={`w-full h-full object-cover transform -scale-x-100 ${filterClass}`} />
                ) : (
                  <img 
                    src={shot || 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=800'} 
                    alt={`Collage shot ${idx + 1}`} 
                    className={`w-full h-full object-cover ${filterClass}`} 
                    referrerPolicy="no-referrer" 
                  />
                )}
                <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] font-mono px-1 rounded">
                  #{idx + 1}
                </span>
              </div>
            ))}
          </div>

          {captionText && (
            <div className="text-center pt-1.5">
              <span className={`text-[10px] font-bold ${isDarkFrame ? 'text-[#F8F5EE]' : 'text-stone-800'}`}>
                {captionText}
              </span>
            </div>
          )}
        </div>
      );
    }

    // 3. 35MM FILM STRIP FRAME
    if (frame === 'filmstrip') {
      return (
        <div className="w-full bg-[#121212] p-2.5 rounded-2xl shadow-lg border border-stone-800 flex flex-col justify-between select-none relative">
          {/* Top Film Sprocket Holes */}
          <div className="flex justify-between items-center px-1 mb-1.5 opacity-80">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2.5 h-3 bg-stone-100 rounded-xs border border-stone-400/30" />
            ))}
          </div>

          {/* Center Photo Area */}
          <div className="relative w-full aspect-square bg-stone-950 overflow-hidden rounded-xs border border-stone-800">
            {isLiveFeed ? (
              <video ref={handleVideoRef} autoPlay playsInline muted className={`w-full h-full object-cover transform -scale-x-100 ${filterClass}`} />
            ) : (
              <img src={imageSrc} alt="Film Strip Snap" className={`w-full h-full object-cover ${filterClass}`} referrerPolicy="no-referrer" />
            )}

            {stickerText && (
              <div className="absolute top-2 right-2 bg-amber-400 text-stone-950 text-[9.5px] font-black px-2 py-0.5 rounded-xs shadow">
                {stickerText}
              </div>
            )}
          </div>

          {/* Film Edge Markings */}
          <div className="flex justify-between items-center text-[8px] font-mono text-amber-400 font-bold px-1 my-1">
            <span>35MM • KODAK PORTRA 400</span>
            <span>▲ 04A • GOGIRL GGN</span>
          </div>

          {/* Bottom Film Sprocket Holes */}
          <div className="flex justify-between items-center px-1 opacity-80">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2.5 h-3 bg-stone-100 rounded-xs border border-stone-400/30" />
            ))}
          </div>
        </div>
      );
    }

    // 4. SPLIT DUO BOOTH FRAME
    if (frame === 'split-duo') {
      return (
        <div className={`w-full aspect-[3.5/4] ${frameBg} p-3 rounded-2xl shadow-md border flex flex-col justify-between relative select-none`}>
          <div className="grid grid-cols-2 gap-2 w-full flex-1 rounded-xl overflow-hidden bg-stone-950 p-1">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-stone-900">
              {isLiveFeed && collageStep === 0 ? (
                <video ref={handleVideoRef} autoPlay playsInline muted className={`w-full h-full object-cover transform -scale-x-100 ${filterClass}`} />
              ) : (
                <img 
                  src={collageImgs?.[0] || imageSrc || 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=800'} 
                  alt="Duo 1" 
                  className={`w-full h-full object-cover ${filterClass}`} 
                  referrerPolicy="no-referrer" 
                />
              )}
              <span className="absolute top-1 left-1 bg-black/60 text-white text-[8px] font-mono px-1 rounded">A</span>
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-stone-900">
              {isLiveFeed && (collageStep === 1 || collageStep >= 2) ? (
                <video ref={handleVideoRef} autoPlay playsInline muted className={`w-full h-full object-cover transform -scale-x-100 ${filterClass}`} />
              ) : (
                <img 
                  src={collageImgs?.[1] || (collageStep === 0 ? 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800' : imageSrc)} 
                  alt="Duo 2" 
                  className={`w-full h-full object-cover ${filterClass}`} 
                  referrerPolicy="no-referrer" 
                />
              )}
              <span className="absolute top-1 left-1 bg-black/60 text-white text-[8px] font-mono px-1 rounded">B</span>
            </div>
          </div>
          <div className="pt-2 text-center">
            <span className={`text-[10px] font-black ${isDarkFrame ? 'text-[#F8F5EE]' : 'text-stone-900'}`}>
              {captionText || 'Sisterhood Duo • DLF CyberHub'}
            </span>
          </div>
        </div>
      );
    }

    // 5. MINIMALIST LUXURY STUDIO FRAME
    if (frame === 'minimal-white') {
      return (
        <div className={`w-full aspect-square ${frameBg} p-4 rounded-3xl shadow-md border-2 border-[#800020]/20 flex flex-col justify-between relative select-none`}>
          <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-amber-300/40 shadow-inner flex items-center justify-center bg-stone-950">
            {isLiveFeed ? (
              <video ref={handleVideoRef} autoPlay playsInline muted className={`w-full h-full object-cover transform -scale-x-100 ${filterClass}`} />
            ) : (
              <img src={imageSrc} alt="Minimal Snap" className={`w-full h-full object-cover ${filterClass}`} referrerPolicy="no-referrer" />
            )}

            {stickerText && (
              <div className="absolute top-3 right-3 bg-white/95 text-[#800020] text-[10px] font-black px-2.5 py-0.5 rounded-full shadow border border-amber-200">
                {stickerText}
              </div>
            )}
          </div>
        </div>
      );
    }

    // 6. VINTAGE TRAVEL POSTCARD FRAME
    return (
      <div className={`w-full aspect-[3.5/4] ${frameBg} p-3.5 rounded-2xl shadow-md border-2 border-dashed border-[#800020]/40 flex flex-col justify-between relative select-none`}>
        {/* Postcard Stamp Header */}
        <div className="absolute top-2 right-2 flex items-center gap-1 z-20">
          <div className="w-9 h-10 bg-amber-50 border-2 border-dashed border-[#800020] rounded-xs flex flex-col items-center justify-center p-0.5 shadow-2xs rotate-2">
            <Stamp className="w-3.5 h-3.5 text-[#800020]" />
            <span className="text-[6.5px] font-bold text-[#800020] leading-none mt-0.5">GGN 2026</span>
          </div>
        </div>

        <div className="relative w-full aspect-square bg-stone-950 rounded-xl overflow-hidden shadow-inner mt-2">
          {isLiveFeed ? (
            <video ref={handleVideoRef} autoPlay playsInline muted className={`w-full h-full object-cover transform -scale-x-100 ${filterClass}`} />
          ) : (
            <img src={imageSrc} alt="Postcard Snap" className={`w-full h-full object-cover ${filterClass}`} referrerPolicy="no-referrer" />
          )}
        </div>

        <div className="pt-2 text-left px-1 flex items-center justify-between">
          <div>
            <span className="text-[10.5px] font-black text-stone-900 block">{captionText || 'Greetings from Gurgaon Meetup'}</span>
            <span className="text-[8px] font-mono text-stone-500">Airmail • Safe Sisterhood Circle</span>
          </div>
          <span className="text-xs">💌</span>
        </div>
      </div>
    );
  };

  // Filtered Posts
  const displayedPosts = posts.filter(p => {
    if (postFeedFilter === 'my-posts') return p.isMyPost;
    if (postFeedFilter === 'meetup-moments') return p.tags.some(t => t.toLowerCase().includes('meetup'));
    return true;
  });

  return (
    <div className="flex flex-col h-full space-y-3.5 px-2 pb-24 overflow-y-auto scrollbar-none text-left">
      
      {/* TOP NAVIGATION SEGMENTED SWITCHER */}
      <div className="bg-white rounded-2xl p-1.5 border border-[#E8DCCB] shadow-2xs grid grid-cols-3 gap-1">
        <button
          onClick={() => { setActiveZone('snapchat'); if (!useRealCamera) startWebcam(); }}
          className={`py-2 px-2 rounded-xl text-[11px] font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeZone === 'snapchat'
              ? 'bg-[#800020] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF6F0]'
          }`}
        >
          <Camera className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Snap Studio</span>
        </button>

        <button
          onClick={() => setActiveZone('instagram')}
          className={`py-2 px-2 rounded-xl text-[11px] font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeZone === 'instagram'
              ? 'bg-[#800020] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF6F0]'
          }`}
        >
          <Users className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Lounge</span>
        </button>

        <button
          onClick={() => setActiveZone('games')}
          className={`py-2 px-2 rounded-xl text-[11px] font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeZone === 'games'
              ? 'bg-[#800020] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF6F0]'
          }`}
        >
          <MessageCircle className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Table Talk</span>
        </button>
      </div>

      {/* GLOBAL NOTIFICATION BANNER */}
      <AnimatePresence>
        {sharingSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#2C181C] text-[#F8F5EE] border border-[#800020]/40 rounded-2xl p-3 shadow-md text-xs font-bold text-center flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{sharingSuccess}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 1. SNAPCHAT SNAP STUDIO (POLAROIDS, COLLAGES, RETRO FILTERS & FRAMES)     */}
      {/* ========================================================================= */}
      {activeZone === 'snapchat' && (
        <div className="bg-white rounded-3xl border border-[#E8DCCB] p-4 shadow-xs text-left space-y-4">
          
          {/* Studio Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#800020] text-white flex items-center justify-center shadow-2xs">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-black text-stone-900 uppercase tracking-wider">
                  Snap Studio & Frame Lens
                </h3>
                <span className="text-[9.5px] text-stone-500 font-semibold">
                  Live Polaroids, 2x2 Collages, Film Strips & Vintage Filters
                </span>
              </div>
            </div>

            <button
              onClick={startWebcam}
              className={`text-[9.5px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 transition cursor-pointer ${
                useRealCamera 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
              }`}
            >
              {useRealCamera ? '✓ Camera Active' : 'Start Camera'}
            </button>
          </div>

          {/* VIEWPORT / CAMERA / FRAMED PREVIEW */}
          <div className="relative w-full rounded-2xl bg-stone-950 overflow-hidden flex flex-col items-center justify-center p-3 border-4 border-[#FAF6F0] shadow-inner">
            
            {/* Shutter Flash Animation */}
            <AnimatePresence>
              {flashActive && (
                <motion.div 
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="absolute inset-0 bg-white z-40 pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* Frame Rendering Container */}
            <div className="w-full max-w-sm">
              {capturedPreview ? (
                /* 1. Captured State with Selected Frame */
                <div className="relative">
                  {renderFramedImage(
                    capturedPreview,
                    selectedFrame,
                    selectedFilter,
                    customCaption,
                    selectedSticker,
                    collageShots.length > 0 ? collageShots : undefined,
                    selectedFrameColor,
                    false
                  )}

                  {/* Top-Right Retake Button */}
                  <button
                    onClick={() => {
                      setCapturedPreview(null);
                      setCollageShots([]);
                      setCollageStep(0);
                    }}
                    className="absolute top-2 left-2 z-30 bg-black/70 hover:bg-black text-white p-2 rounded-full shadow-lg transition cursor-pointer"
                    title="Retake Shot"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>
              ) : selectedFrame === 'collage-2x2' && collageStep > 0 && collageStep < 4 ? (
                /* 2. In-Progress 2x2 Collage Viewport */
                <div className="relative w-full aspect-square bg-stone-900 rounded-2xl p-2 border border-stone-800 shadow-md">
                  <div className="grid grid-cols-2 gap-1.5 w-full h-full">
                    {[0, 1, 2, 3].map((slotIdx) => (
                      <div key={slotIdx} className="bg-stone-800 rounded-xl overflow-hidden flex items-center justify-center relative border border-stone-700">
                        {collageShots[slotIdx] ? (
                          <img src={collageShots[slotIdx]} alt={`Shot ${slotIdx + 1}`} className={`w-full h-full object-cover ${getFilterClasses(selectedFilter)}`} />
                        ) : slotIdx === collageStep && useRealCamera ? (
                          <video ref={handleVideoRef} autoPlay playsInline muted className={`w-full h-full object-cover transform -scale-x-100 ${getFilterClasses(selectedFilter)}`} />
                        ) : (
                          <div className="text-center p-2">
                            <Camera className={`w-5 h-5 mx-auto mb-1 ${slotIdx === collageStep ? 'text-amber-400 animate-bounce' : 'text-stone-600'}`} />
                            <span className="text-[9px] font-bold text-stone-400">
                              {slotIdx === collageStep ? 'Next Shot' : `Shot ${slotIdx + 1}`}
                            </span>
                          </div>
                        )}
                        <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] font-mono px-1 rounded">
                          #{slotIdx + 1}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="absolute top-3 left-3 bg-[#800020] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow">
                    Step {collageStep + 1} of 4
                  </div>
                </div>
              ) : useRealCamera ? (
                /* 3. Live Camera with Frame Overlay */
                <div className="relative">
                  {renderFramedImage(
                    '',
                    selectedFrame,
                    selectedFilter,
                    customCaption || 'Live Frame Preview',
                    selectedSticker,
                    undefined,
                    selectedFrameColor,
                    true
                  )}
                </div>
              ) : (
                /* 4. Default Lens Ready State */
                <div className="relative">
                  {renderFramedImage(
                    'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=800',
                    selectedFrame,
                    selectedFilter,
                    customCaption || 'GoGirl Sisterhood • DLF CyberHub',
                    selectedSticker,
                    undefined,
                    selectedFrameColor,
                    false
                  )}
                </div>
              )}
            </div>

            {/* Shutter Shoot & Controls (When Not Previewing) */}
            {!capturedPreview && (
              <div className="mt-3 flex items-center justify-center gap-3.5 z-20">
                {/* Upload from Gallery button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 flex items-center justify-center shadow-md hover:bg-white transition cursor-pointer active:scale-95"
                  title="Upload from Device"
                >
                  <Upload className="w-4 h-4" />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/*" 
                  className="hidden" 
                />

                {/* Main Shutter Trigger */}
                <button
                  onClick={handleCapturePhoto}
                  className="w-14 h-14 bg-white hover:scale-105 active:scale-95 transition-all rounded-full flex items-center justify-center shadow-xl border-4 border-[#800020] cursor-pointer"
                >
                  <div className="w-8 h-8 bg-[#800020] rounded-full" />
                </button>

                {/* Random Lens Shuffle */}
                <button
                  onClick={() => {
                    const filterList: FilterType[] = ['warm-vintage', 'polaroid-retro', 'classic-bw', 'golden-hour', 'vintage-rose', 'vhs-90s'];
                    const random = filterList[Math.floor(Math.random() * filterList.length)];
                    setSelectedFilter(random);
                  }}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 flex items-center justify-center shadow-md hover:bg-white transition cursor-pointer active:scale-95"
                  title="Surprise Filter"
                >
                  <Wand2 className="w-4 h-4 text-[#800020]" />
                </button>
              </div>
            )}

            {/* Hidden canvas for snapshot capture & export */}
            <canvas ref={canvasRef} className="hidden" />
            <canvas ref={exportCanvasRef} className="hidden" />
          </div>

          {/* CAPTURED ACTIONS (DOWNLOAD / POST TO STORY / FEED / CAPTION) */}
          {capturedPreview && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#FAF6F0] p-3.5 rounded-2xl border border-[#E8DCCB] space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-[#800020] tracking-wider flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600 stroke-[3]" /> Framed Snap Ready
                </span>
                <span className="text-[9px] text-[#800020] font-bold flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" /> 24 hrs
                </span>
              </div>

              {/* Caption text input */}
              <input 
                type="text"
                value={customCaption}
                onChange={(e) => setCustomCaption(e.target.value)}
                placeholder="Type a handwritten polaroid note or caption..."
                className="w-full bg-white border border-[#E8DCCB] text-xs font-semibold px-3 py-2 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#800020]"
              />

              {/* Action Buttons: Download + Post Story + Post Feed */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handleDownloadFramedPhoto}
                  disabled={isExporting}
                  className="py-2.5 bg-stone-900 hover:bg-black text-white font-black text-[11px] rounded-xl shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isExporting ? 'Saving...' : 'Download'}</span>
                </button>

                <button
                  onClick={() => handlePublishAsStory(capturedPreview)}
                  className="py-2.5 bg-gradient-to-r from-[#800020] to-rose-600 hover:opacity-95 text-white font-black text-[11px] rounded-xl shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>24h Story</span>
                </button>

                <button
                  onClick={() => handlePublishAsFeedPost(capturedPreview)}
                  className="py-2.5 bg-white border border-[#800020] text-[#800020] hover:bg-[#FAF6F0] font-black text-[11px] rounded-xl shadow-2xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Feed</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* 1. FRAME & COLLAGE LAYOUT SELECTOR */}
          <div className="space-y-3 pt-1">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  1. Select Snap Frame
                </span>
                <span className="text-[9px] font-bold text-[#800020] capitalize">
                  Active: {selectedFrame.replace('-', ' ')}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {([
                  { id: 'polaroid', label: 'Polaroid', icon: '📸' },
                  { id: 'collage-2x2', label: '2x2 Grid', icon: '🪟' },
                  { id: 'filmstrip', label: '35mm Film', icon: '🎞️' },
                  { id: 'split-duo', label: 'Split Duo', icon: '👯‍♀️' },
                  { id: 'minimal-white', label: 'Minimal', icon: '✨' },
                  { id: 'postcard', label: 'Postcard', icon: '💌' }
                ] as const).map((frm) => {
                  const isSel = selectedFrame === frm.id;
                  return (
                    <button
                      key={frm.id}
                      onClick={() => {
                        setSelectedFrame(frm.id);
                        if (frm.id === 'collage-2x2') {
                          if (capturedPreview) {
                            setCollageShots([capturedPreview, capturedPreview, capturedPreview, capturedPreview]);
                            setCollageStep(4);
                          } else {
                            setCollageShots([]);
                            setCollageStep(0);
                          }
                        }
                      }}
                      className={`py-2 px-1.5 rounded-xl border text-center transition-all font-bold flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        isSel
                          ? 'bg-[#FAF6F0] border-[#800020] text-[#800020] font-black shadow-2xs scale-102'
                          : 'bg-white border-[#E8DCCB] text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <span className="text-base leading-none">{frm.icon}</span>
                      <span className="text-[9.5px] truncate w-full">{frm.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Frame Color Swatches */}
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                2. Frame Color Theme
              </span>
              <div className="flex gap-2">
                {([
                  { id: 'classic-white', label: 'Classic White', color: '#FFFFFF', border: '#E2E8F0' },
                  { id: 'vintage-cream', label: 'Vintage Cream', color: '#FAF6F0', border: '#E8DCCB' },
                  { id: 'rose-blush', label: 'Blush Pink', color: '#FFF0F3', border: '#FECDD3' },
                  { id: 'noir-black', label: 'Studio Noir', color: '#181818', border: '#333333' },
                  { id: 'maroon-luxe', label: 'Mehroon', color: '#2C181C', border: '#800020' }
                ] as const).map((clr) => {
                  const isSel = selectedFrameColor === clr.id;
                  return (
                    <button
                      key={clr.id}
                      onClick={() => setSelectedFrameColor(clr.id)}
                      className={`flex-1 py-1.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                        isSel ? 'border-[#800020] bg-[#FAF6F0] ring-2 ring-[#800020]/30 font-black' : 'border-[#E8DCCB] bg-white'
                      }`}
                    >
                      <div 
                        className="w-4 h-4 rounded-full border shadow-2xs" 
                        style={{ backgroundColor: clr.color, borderColor: clr.border }} 
                      />
                      <span className="text-[8.5px] text-stone-700 font-bold truncate">{clr.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Profiles */}
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                3. Retro Camera Filter
              </span>
              <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
                {([
                  { id: 'polaroid-retro', label: '📸 Polaroid' },
                  { id: 'warm-vintage', label: '☕ Warm Sepia' },
                  { id: 'golden-hour', label: '✨ Golden Hour' },
                  { id: 'vintage-rose', label: '🌸 Blush Rose' },
                  { id: 'classic-bw', label: '🖤 Noir B&W' },
                  { id: 'vhs-90s', label: '📼 90s Cyber' }
                ] as const).map((filt) => {
                  const isSel = selectedFilter === filt.id;
                  return (
                    <button
                      key={filt.id}
                      onClick={() => setSelectedFilter(filt.id)}
                      className={`text-[9.5px] px-3.5 py-1.8 rounded-full font-bold transition flex-shrink-0 border uppercase tracking-wider flex items-center gap-1 cursor-pointer ${
                        isSel
                          ? 'bg-[#800020] border-[#800020] text-white shadow-xs'
                          : 'bg-[#FAF6F0] hover:bg-[#F4ECE1] border-[#E8DCCB] text-stone-600'
                      }`}
                    >
                      {isSel && <Check className="w-3 h-3 stroke-[3]" />}
                      <span>{filt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Snapchat Stickers */}
            <div>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                4. Community Stickers
              </span>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  '☕ Coffee Huddle', '🌸 Gurgaon Girls', '👯‍♀️ Besties', '🛡️ Safe Space', 
                  '✨ Sunset Magic', '🧘‍♀️ Pilates Zen', '📚 Book Club', '🎨 Pottery Day'
                ].map((stk) => (
                  <button
                    key={stk}
                    onClick={() => setSelectedSticker(selectedSticker === stk ? '' : stk)}
                    className={`text-[9.5px] px-3 py-1.5 rounded-full font-bold transition flex-shrink-0 border cursor-pointer ${
                      selectedSticker === stk
                        ? 'bg-[#2C181C] text-[#F8F5EE] border-[#800020]'
                        : 'bg-white text-stone-600 border-[#E8DCCB] hover:bg-[#FAF6F0]'
                    }`}
                  >
                    {stk}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RECENT SAVED FRAMED SNAPS */}
          {recentPhotos.length > 0 && (
            <div className="pt-3 border-t border-[#E8DCCB]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  Recent Saved Snaps ({recentPhotos.length})
                </span>
                <button 
                  onClick={() => { setRecentPhotos([]); localStorage.removeItem('gogirl_booth_photos'); }}
                  className="text-[9px] text-red-500 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {recentPhotos.map((photo) => (
                  <div key={photo.id} className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-24 aspect-[3.5/4] bg-white p-1.5 pb-4 rounded-xl border border-[#E8DCCB] shadow-2xs relative group">
                      <img 
                        src={photo.dataUrl} 
                        alt="Saved" 
                        className={`w-full aspect-square object-cover rounded-xs ${getFilterClasses(photo.filter)}`}
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[7.5px] font-mono text-stone-400 block text-center mt-1">
                        {photo.timestamp}
                      </span>
                    </div>

                    <div className="flex gap-1 mt-1.5">
                      <button
                        onClick={() => handlePublishAsStory(photo.dataUrl)}
                        className="text-[8.5px] font-bold px-2 py-0.5 bg-[#FAF6F0] text-[#800020] rounded-md border border-[#E8DCCB] hover:bg-[#F4ECE1] cursor-pointer"
                      >
                        + Story
                      </button>
                      <button
                        onClick={() => handlePublishAsFeedPost(photo.dataUrl)}
                        className="text-[8.5px] font-bold px-2 py-0.5 bg-[#800020] text-white rounded-md hover:bg-[#6B0E1D] cursor-pointer"
                      >
                        + Post
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. INSTAGRAM COMMUNITY LOUNGE (STORIES + FEED + 24H AUTO DELETE POSTS)   */}
      {/* ========================================================================= */}
      {activeZone === 'instagram' && (
        <div className="space-y-4">
          
          {/* INSTAGRAM 24H EPHEMERAL STORIES ROW */}
          <div className="bg-white rounded-3xl border border-[#E8DCCB] p-3.5 shadow-2xs">
            <div className="flex items-center justify-between mb-2.5 px-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-stone-900 tracking-tight">Story</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="text-[9.5px] font-extrabold text-[#800020] bg-[#FAF6F0] border border-[#E8DCCB] px-2 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" /> 24 hrs
              </span>
            </div>

            {/* Horizontal Story Avatar Bubbles */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1.5 scrollbar-none px-1">
              {/* "Your Story" / Add Story Bubble */}
              <div 
                onClick={() => {
                  setIsPostingStory(true);
                  setIsCreatePostOpen(true);
                }}
                className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
              >
                <div className="relative w-14 h-14 rounded-full p-0.5 bg-[#E8DCCB] group-hover:scale-105 transition-transform flex items-center justify-center">
                  <img 
                    src={userProfile?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'} 
                    alt="You" 
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 right-0 w-4.5 h-4.5 rounded-full bg-[#800020] text-white flex items-center justify-center border-2 border-white shadow-2xs">
                    <Plus className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>
                <span className="text-[10px] font-bold text-stone-700 truncate max-w-[60px]">Your Story</span>
              </div>

              {/* Community Story Bubbles with Gradient Rings */}
              {stories.map((story, idx) => (
                <div 
                  key={story.id}
                  onClick={() => {
                    setActiveStoryIdx(idx);
                    setStoryProgress(0);
                  }}
                  className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-full p-[2.5px] bg-gradient-to-tr from-[#800020] via-rose-500 to-amber-400 group-hover:scale-105 transition-transform flex items-center justify-center shadow-xs">
                    <img 
                      src={story.authorAvatar} 
                      alt={story.authorName} 
                      className="w-full h-full rounded-full object-cover border-2 border-white"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-stone-800 truncate max-w-[64px]">
                    {story.isMyStory ? 'You' : story.authorName.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CREATE POST PROMPT / ACTION CARD */}
          <div className="bg-[#FAF6F0] rounded-2xl border border-[#E8DCCB] p-3.5 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <img 
                src={userProfile?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'} 
                alt="User" 
                className="w-8 h-8 rounded-full object-cover border border-[#E8DCCB]"
                referrerPolicy="no-referrer"
              />
              <div 
                onClick={() => {
                  setIsPostingStory(false);
                  setIsCreatePostOpen(true);
                }}
                className="bg-white hover:bg-stone-50 border border-[#E8DCCB] text-stone-500 hover:text-stone-800 text-xs font-semibold px-3.5 py-2 rounded-xl flex-1 cursor-pointer transition truncate"
              >
                Share a framed moment or meetup snap...
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  setActiveZone('snapchat');
                  if (!useRealCamera) startWebcam();
                }}
                className="p-2 bg-white hover:bg-[#F4ECE1] text-[#800020] border border-[#E8DCCB] rounded-xl transition cursor-pointer shadow-3xs"
                title="Open Snap Studio"
              >
                <Camera className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsPostingStory(false);
                  setIsCreatePostOpen(true);
                }}
                className="px-3 py-2 bg-[#800020] hover:bg-[#6B0E1D] text-white text-[11px] font-black rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" /> Post
              </button>
            </div>
          </div>

          {/* FEED SUB-TABS (All / My Posts / Meetup Moments) */}
          <div className="flex items-center justify-between gap-1.5 px-1">
            <div className="flex gap-1.5">
              {(['all', 'meetup-moments', 'my-posts'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setPostFeedFilter(tab)}
                  className={`text-[10px] px-3 py-1.5 rounded-full font-bold transition capitalize cursor-pointer border ${
                    postFeedFilter === tab
                      ? 'bg-[#800020] border-[#800020] text-white shadow-2xs font-extrabold'
                      : 'bg-white hover:bg-[#FAF6F0] border-[#E8DCCB] text-stone-600'
                  }`}
                >
                  {tab === 'all' ? 'All Moments' : tab === 'meetup-moments' ? 'Meetup Circles' : 'My Posts'}
                </button>
              ))}
            </div>

            <span className="text-[9.5px] text-stone-500 font-bold">
              {displayedPosts.length} Active {displayedPosts.length === 1 ? 'Post' : 'Posts'}
            </span>
          </div>

          {/* INSTAGRAM-STYLE COMMUNITY POSTS FEED */}
          <div className="space-y-4">
            {displayedPosts.map((post) => {
              return (
                <div 
                  key={post.id}
                  className="bg-white rounded-3xl border border-[#E8DCCB] overflow-hidden shadow-xs relative"
                >
                  {/* Post Header */}
                  <div className="p-3.5 flex items-center justify-between border-b border-[#F4ECE1]">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-[#800020] to-amber-500">
                        <img 
                          src={post.authorAvatar} 
                          alt={post.authorName} 
                          className="w-full h-full rounded-full object-cover border border-white"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-stone-900 truncate">{post.authorName}</span>
                          <span className="text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-200 font-extrabold px-1.5 py-0.2 rounded-md">
                            Verified
                          </span>
                        </div>
                        <span className="text-[9.5px] text-[#800020] font-semibold flex items-center gap-1 truncate">
                          <MapPin className="w-2.5 h-2.5 shrink-0" /> {post.location}
                        </span>
                      </div>
                    </div>

                    {/* Expiry Pill + Delete Menu */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[9px] font-black text-rose-700 bg-rose-50 border border-rose-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-rose-600 animate-pulse" />
                        <span>{formatRemainingTime(post.expiresAt)}</span>
                      </span>

                      <button
                        onClick={() => setPostToDelete(post)}
                        className="p-1 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        title="Delete Post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Post Image Display with Framed Snapshot & Double Tap Like */}
                  <div 
                    onDoubleClick={() => handleDoubleTapImage(post.id)}
                    className="relative bg-stone-900 select-none overflow-hidden flex items-center justify-center p-3"
                  >
                    {/* Double Tap Heart Pop Animation */}
                    <AnimatePresence>
                      {heartPopPostId === post.id && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1.3, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ type: "spring", damping: 15 }}
                          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
                        >
                          <Heart className="w-20 h-20 text-rose-500 fill-rose-500 drop-shadow-xl animate-pulse" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Render exact frame structure */}
                    <div className="w-full max-w-sm">
                      {renderFramedImage(
                        post.imageUrl,
                        post.frame as FrameType,
                        post.filter as FilterType,
                        undefined,
                        undefined,
                        post.collageImages,
                        post.frameColor || 'classic-white',
                        false
                      )}
                    </div>
                  </div>

                  {/* Post Action Bar (Like, Comment, Share, Save) */}
                  <div className="p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        {/* Like Button */}
                        <button
                          onClick={() => handleLikePost(post.id)}
                          className={`flex items-center gap-1.5 text-xs font-black transition cursor-pointer active:scale-90 ${
                            post.hasLiked ? 'text-rose-600' : 'text-stone-600 hover:text-rose-600'
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${post.hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                          <span>{post.likes}</span>
                        </button>

                        {/* Comment Button */}
                        <button
                          onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#800020] transition cursor-pointer"
                        >
                          <MessageSquare className="w-5 h-5" />
                          <span>{post.comments.length}</span>
                        </button>

                        {/* Share to Chat */}
                        <button
                          onClick={() => setSelectedPhotoForShare({
                            id: post.id,
                            dataUrl: post.imageUrl,
                            timestamp: 'Just now',
                            filter: post.filter,
                            frame: post.frame
                          })}
                          className="text-stone-600 hover:text-[#800020] transition cursor-pointer"
                          title="Share to Group Chat"
                        >
                          <Share2 className="w-4.5 h-4.5" />
                        </button>
                      </div>

                      {/* Bookmark / Save */}
                      <button
                        onClick={() => handleToggleSavePost(post.id)}
                        className={`transition cursor-pointer ${post.saved ? 'text-[#800020]' : 'text-stone-400 hover:text-stone-700'}`}
                      >
                        <Bookmark className={`w-5 h-5 ${post.saved ? 'fill-[#800020]' : ''}`} />
                      </button>
                    </div>

                    {/* Caption & Tags */}
                    <div>
                      <p className="text-xs text-stone-800 leading-relaxed font-medium">
                        <span className="font-black mr-1.5 text-stone-950">{post.authorName}</span>
                        {post.caption}
                      </p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {post.tags.map((t, idx) => (
                            <span key={idx} className="text-[10px] font-bold text-[#800020] hover:underline cursor-pointer">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Expandable Comments Section */}
                    {activeCommentPostId === post.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="pt-2 border-t border-[#F4ECE1] space-y-2"
                      >
                        {post.comments.length > 0 ? (
                          <div className="space-y-1.5 max-h-36 overflow-y-auto scrollbar-none pr-1">
                            {post.comments.map((c) => (
                              <div key={c.id} className="text-[11px] flex items-start gap-2 bg-[#FAF6F0] p-2 rounded-xl">
                                <img src={c.avatar} alt={c.author} className="w-5 h-5 rounded-full object-cover mt-0.5" referrerPolicy="no-referrer" />
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-stone-900">{c.author}</span>
                                    <span className="text-[8.5px] text-stone-400">{c.time}</span>
                                  </div>
                                  <p className="text-stone-700 font-normal leading-tight mt-0.5">{c.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[10px] text-stone-400 italic block py-1">No comments yet. Be the first sister to comment!</span>
                        )}

                        {/* Add Comment Input */}
                        <div className="flex items-center gap-1.5 pt-1">
                          <input 
                            type="text"
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(post.id); }}
                            placeholder="Add a friendly comment..."
                            className="flex-1 bg-[#FAF6F0] border border-[#E8DCCB] text-xs px-3 py-1.5 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#800020]"
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            className="p-1.5 bg-[#800020] text-white rounded-xl hover:bg-[#6B0E1D] transition cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* View Comments count button if closed */}
                    {activeCommentPostId !== post.id && post.comments.length > 0 && (
                      <button
                        onClick={() => setActiveCommentPostId(post.id)}
                        className="text-[10.5px] font-bold text-stone-400 hover:text-stone-700 transition block"
                      >
                        View all {post.comments.length} comments
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. FUN TABLE TALK & COHORT ICEBREAKERS WITH SAMPLE ANSWERS                */}
      {/* ========================================================================= */}
      {activeZone === 'games' && (() => {
        const filteredIcebreakers = icebreakers.filter((c) => {
          if (iceActiveCategory === 'all') return true;
          return c.category === iceActiveCategory;
        });
        const currentCard = filteredIcebreakers.length > 0
          ? filteredIcebreakers[currentIceIdx % filteredIcebreakers.length]
          : icebreakers[0];

        const allCardAnswers = [
          ...(currentCard.answers || []),
          ...(customCardResponses[currentCard.id] || [])
        ];

        const handleAddCustomResponse = (cardId: string) => {
          if (!newCardAnswerInput.trim()) return;
          const existing = customCardResponses[cardId] || [];
          setCustomCardResponses({
            ...customCardResponses,
            [cardId]: [...existing, `🗣️ "${newCardAnswerInput.trim()}"`]
          });
          setNewCardAnswerInput('');
          setSharingSuccess('✨ Added sister response to this table card!');
          setTimeout(() => setSharingSuccess(''), 2000);
        };

        const handleCastPollVote = (cardId: string, optIdx: number) => {
          const key = `${cardId}_${optIdx}`;
          const current = userPollVotes[key] || 0;
          setUserPollVotes({
            ...userPollVotes,
            [key]: current + 1,
            [`user_voted_${cardId}`]: optIdx
          });
          setSharingSuccess('🗳️ Voted in table poll!');
          setTimeout(() => setSharingSuccess(''), 1800);
        };

        const handleNextCard = () => {
          setFlipped(true);
          setTimeout(() => {
            setFlipped(false);
            setCurrentIceIdx((prev) => (prev + 1) % filteredIcebreakers.length);
          }, 180);
        };

        const handlePrevCard = () => {
          setFlipped(true);
          setTimeout(() => {
            setFlipped(false);
            setCurrentIceIdx((prev) => (prev - 1 + filteredIcebreakers.length) % filteredIcebreakers.length);
          }, 180);
        };

        const handleShuffleCard = () => {
          setFlipped(true);
          setTimeout(() => {
            setFlipped(false);
            const randomIdx = Math.floor(Math.random() * filteredIcebreakers.length);
            setCurrentIceIdx(randomIdx);
          }, 180);
        };

        return (
          <div className="bg-white rounded-3xl border border-[#E8DCCB] p-4 sm:p-5 shadow-xs relative overflow-hidden text-left space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E8DCCB]/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#800020] text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Fun Table Talk</span>
                    <span className="text-[9px] bg-[#FAF6F0] text-[#800020] border border-[#E8DCCB] font-extrabold px-2 py-0.5 rounded-full lowercase">
                      with answers
                    </span>
                  </h3>
                  <span className="text-[9.5px] text-stone-500 font-medium">
                    Questions, sister sample answers & live vibe polls
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsAllCardsModalOpen(true)}
                className="text-[9.5px] font-bold text-[#800020] bg-[#FAF6F0] hover:bg-[#F4ECE1] border border-[#E8DCCB] px-2.5 py-1.5 rounded-xl transition flex items-center gap-1 cursor-pointer"
                title="Browse All Questions"
              >
                <BookOpen className="w-3 h-3" />
                <span>All ({icebreakers.length})</span>
              </button>
            </div>

            {/* Category Selector Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'All Topics' },
                { id: 'fun', label: '✨ Fun & Quirky' },
                { id: 'meaningful', label: '💫 Meaningful' },
                { id: 'would-you-rather', label: '⚡ Vibe Polls' },
                { id: 'random', label: '🎲 Spontaneous' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setIceActiveCategory(cat.id); setCurrentIceIdx(0); }}
                  className={`text-[9.5px] px-3 py-1.5 rounded-full font-bold transition cursor-pointer border whitespace-nowrap ${
                    iceActiveCategory === cat.id
                      ? 'bg-[#800020] border-[#800020] text-white shadow-2xs font-extrabold'
                      : 'bg-[#FAF6F0] hover:bg-[#F4ECE1] border-[#E8DCCB] text-stone-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Main Interactive Table Talk Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentCard.id}_${currentIceIdx}`}
                initial={{ rotateY: flipped ? 80 : 0, opacity: 0, scale: 0.96 }}
                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                exit={{ rotateY: -80, opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="bg-[#FAF6F0] rounded-2xl border border-[#E8DCCB] p-4.5 space-y-3.5 shadow-2xs relative"
              >
                {/* Card Meta Bar */}
                <div className="flex justify-between items-center pb-2 border-b border-[#E8DCCB]/60">
                  <span className="text-[9.5px] uppercase font-black text-[#800020] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#800020] animate-pulse" />
                    {currentCard.category.replace('-', ' ')} Theme
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-stone-400 font-bold">
                      Prompt {(currentIceIdx % filteredIcebreakers.length) + 1} / {filteredIcebreakers.length}
                    </span>
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="py-1">
                  <blockquote className="text-sm font-black text-stone-900 leading-snug tracking-tight font-sans">
                    "{currentCard.question}"
                  </blockquote>
                </div>

                {/* Toggle to show/hide Answers */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => setShowAnswers(!showAnswers)}
                    className="text-[10px] font-extrabold text-[#800020] flex items-center gap-1.5 hover:underline cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    <span>{showAnswers ? 'Hide Answers & Talking Sparks' : '💡 View Answers & Talking Sparks'}</span>
                  </button>
                  <span className="text-[9px] text-stone-400 font-bold">
                    {allCardAnswers.length} Sample {allCardAnswers.length === 1 ? 'Answer' : 'Answers'}
                  </span>
                </div>

                {/* Answers & Talking Points Drawer */}
                {showAnswers && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2.5 pt-1"
                  >
                    {/* Sample Answers Box */}
                    <div className="bg-white/90 rounded-xl border border-[#E8DCCB] p-3 space-y-2">
                      <div className="flex items-center gap-1.5 text-[9.5px] font-extrabold text-stone-500 uppercase tracking-wider">
                        <Quote className="w-3 h-3 text-[#800020]" />
                        <span>Sister Responses & Sample Answers</span>
                      </div>

                      <div className="space-y-1.5">
                        {allCardAnswers.map((ans, aIdx) => (
                          <div 
                            key={aIdx}
                            className="bg-[#FAF6F0]/80 rounded-lg p-2 text-xs text-stone-800 font-medium leading-relaxed border border-[#E8DCCB]/60"
                          >
                            {ans}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Vibe Poll (for Would-You-Rather Cards) */}
                    {currentCard.quickPollOptions && currentCard.quickPollOptions.length > 0 && (
                      <div className="bg-white/90 rounded-xl border border-amber-200/80 p-3 space-y-2">
                        <span className="text-[9.5px] font-extrabold text-amber-800 uppercase tracking-wider block">
                          🗳️ Table Quick Poll — Tap Your Pick:
                        </span>

                        <div className="space-y-1.5">
                          {currentCard.quickPollOptions.map((opt, oIdx) => {
                            const voteKey = `${currentCard.id}_${oIdx}`;
                            const userPicked = userPollVotes[`user_voted_${currentCard.id}`] === oIdx;
                            const totalVotes = currentCard.quickPollOptions!.reduce(
                              (sum, o, idx) => sum + o.votes + (userPollVotes[`${currentCard.id}_${idx}`] || 0), 0
                            );
                            const optVotes = opt.votes + (userPollVotes[voteKey] || 0);
                            const percent = Math.round((optVotes / totalVotes) * 100) || 50;

                            return (
                              <div
                                key={oIdx}
                                onClick={() => handleCastPollVote(currentCard.id, oIdx)}
                                className={`relative overflow-hidden p-2 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                                  userPicked
                                    ? 'border-[#800020] bg-rose-50/60 ring-1 ring-[#800020]'
                                    : 'border-[#E8DCCB] hover:border-stone-400 bg-white'
                                }`}
                              >
                                <div 
                                  className="absolute top-0 bottom-0 left-0 bg-[#800020]/10 rounded-xl transition-all duration-500" 
                                  style={{ width: `${percent}%` }}
                                />
                                <div className="relative z-10 flex items-center gap-1.5">
                                  {userPicked && <Check className="w-3.5 h-3.5 text-[#800020] stroke-[3]" />}
                                  <span className="text-xs font-bold text-stone-800">{opt.label}</span>
                                </div>
                                <span className="relative z-10 text-[10px] font-black text-[#800020]">
                                  {percent}% ({optVotes})
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Spark Tip */}
                    {currentCard.sparkTip && (
                      <div className="bg-amber-50/80 rounded-xl border border-amber-200/80 p-2.5 flex items-start gap-2 text-stone-700">
                        <span className="text-sm">✨</span>
                        <p className="text-[10.5px] font-semibold leading-relaxed">
                          <strong className="text-amber-900 font-extrabold">Table Spark: </strong>
                          {currentCard.sparkTip}
                        </p>
                      </div>
                    )}

                    {/* Add Custom Sister Answer Form */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <input
                        type="text"
                        value={newCardAnswerInput}
                        onChange={(e) => setNewCardAnswerInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleAddCustomResponse(currentCard.id); }}
                        placeholder="Add your own answer or funny sister response..."
                        className="flex-1 bg-white border border-[#E8DCCB] text-xs px-3 py-2 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#800020]"
                      />
                      <button
                        onClick={() => handleAddCustomResponse(currentCard.id)}
                        disabled={!newCardAnswerInput.trim()}
                        className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1 ${
                          newCardAnswerInput.trim()
                            ? 'bg-[#800020] text-white hover:bg-[#6B0E1D] shadow-xs'
                            : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Add</span>
                      </button>
                    </div>

                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons Row */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                onClick={handlePrevCard}
                className="py-2.5 bg-[#FAF6F0] hover:bg-[#F4ECE1] text-stone-700 border border-[#E8DCCB] font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <button
                onClick={handleShuffleCard}
                className="py-2.5 bg-[#FAF6F0] hover:bg-[#F4ECE1] text-[#800020] border border-[#E8DCCB] font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                title="Shuffle Random Card"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Shuffle</span>
              </button>

              <button
                onClick={handleNextCard}
                className="py-2.5 bg-[#800020] hover:bg-[#6B0E1D] text-white font-black text-xs rounded-xl shadow-xs flex items-center justify-center gap-1 transition cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick All Questions Drawer Modal */}
            <AnimatePresence>
              {isAllCardsModalOpen && (
                <div
                  className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center p-2"
                  onClick={() => setIsAllCardsModalOpen(false)}
                >
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-t-3xl w-full max-w-md p-5 text-left relative space-y-3.5 border-t border-[#E8DCCB] max-h-[85vh] overflow-y-auto"
                  >
                    <div className="flex items-center justify-between border-b border-[#F4ECE1] pb-2.5">
                      <div>
                        <h3 className="text-sm font-black text-stone-900">All Fun Table Talk Prompts</h3>
                        <span className="text-[10px] text-stone-500">Pick any card to discuss with your table sisters</span>
                      </div>
                      <button
                        onClick={() => setIsAllCardsModalOpen(false)}
                        className="p-1.5 bg-stone-100 rounded-full text-stone-500 hover:bg-stone-200 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {icebreakers.map((card, idx) => (
                        <div
                          key={card.id}
                          onClick={() => {
                            setIceActiveCategory('all');
                            setCurrentIceIdx(idx);
                            setIsAllCardsModalOpen(false);
                          }}
                          className={`p-3.5 rounded-2xl border transition cursor-pointer space-y-1.5 ${
                            currentCard.id === card.id
                              ? 'bg-[#FAF6F0] border-[#800020] ring-1 ring-[#800020]'
                              : 'bg-white border-[#E8DCCB] hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black uppercase text-[#800020] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                              {card.category}
                            </span>
                            <span className="text-[9px] font-mono text-stone-400">Card #{idx + 1}</span>
                          </div>
                          <p className="text-xs font-bold text-stone-900 leading-snug">"{card.question}"</p>
                          {card.answers && (
                            <p className="text-[10px] text-stone-500 font-medium line-clamp-1 italic">
                              Sample: {card.answers[0]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        );
      })()}

      {/* ========================================================================= */}
      {/* 4. FULLSCREEN INSTAGRAM STORY VIEWER MODAL                                */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeStoryIdx !== null && stories[activeStoryIdx] && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2"
            onClick={() => setActiveStoryIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm h-[680px] bg-stone-900 rounded-[32px] overflow-hidden flex flex-col justify-between shadow-2xl border border-stone-800"
            >
              {/* Progress Bars */}
              <div className="absolute top-3 left-3 right-3 z-30 flex gap-1">
                {stories.map((_, sIdx) => (
                  <div key={sIdx} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-100"
                      style={{
                        width: sIdx < activeStoryIdx ? '100%' : sIdx === activeStoryIdx ? `${storyProgress}%` : '0%'
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Story Header */}
              <div className="absolute top-6 left-3 right-3 z-30 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <img 
                    src={stories[activeStoryIdx].authorAvatar} 
                    alt={stories[activeStoryIdx].authorName} 
                    className="w-8 h-8 rounded-full object-cover border border-white"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black drop-shadow">{stories[activeStoryIdx].authorName}</span>
                      <span className="text-[9px] text-stone-300 font-mono">
                        {formatRemainingTime(stories[activeStoryIdx].expiresAt)}
                      </span>
                    </div>
                    <span className="text-[9px] text-amber-200 font-semibold drop-shadow flex items-center gap-0.5">
                      <MapPin className="w-2.5 h-2.5" /> {stories[activeStoryIdx].location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {stories[activeStoryIdx].isMyStory && (
                    <button
                      onClick={() => handleDeleteActiveStory(stories[activeStoryIdx].id)}
                      className="p-1.5 bg-black/40 hover:bg-red-600 rounded-full text-white transition cursor-pointer"
                      title="Delete My Story"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => setActiveStoryIdx(null)}
                    className="p-1.5 bg-black/40 hover:bg-black/70 rounded-full text-white transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Story Framed Image */}
              <div className="relative w-full h-full flex items-center justify-center bg-black p-4">
                <div className="w-full max-w-[320px]">
                  {renderFramedImage(
                    stories[activeStoryIdx].imageUrl,
                    stories[activeStoryIdx].frame as FrameType,
                    stories[activeStoryIdx].filter as FilterType,
                    stories[activeStoryIdx].caption,
                    stories[activeStoryIdx].sticker,
                    undefined,
                    stories[activeStoryIdx].frameColor || 'classic-white',
                    false
                  )}
                </div>

                {/* Big Reaction Emoji Fly Effect */}
                <AnimatePresence>
                  {storyReactionEmoji && (
                    <motion.div
                      initial={{ scale: 0.5, y: 50, opacity: 1 }}
                      animate={{ scale: 2, y: -100, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute z-40 text-5xl pointer-events-none"
                    >
                      {storyReactionEmoji}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Left/Right Tap Zones */}
                <div 
                  onClick={() => {
                    if (activeStoryIdx > 0) {
                      setActiveStoryIdx(activeStoryIdx - 1);
                      setStoryProgress(0);
                    }
                  }}
                  className="absolute left-0 top-16 bottom-20 w-1/3 z-20 cursor-pointer" 
                />
                <div 
                  onClick={() => {
                    if (activeStoryIdx < stories.length - 1) {
                      setActiveStoryIdx(activeStoryIdx + 1);
                      setStoryProgress(0);
                    } else {
                      setActiveStoryIdx(null);
                    }
                  }}
                  className="absolute right-0 top-16 bottom-20 w-1/3 z-20 cursor-pointer" 
                />
              </div>

              {/* Bottom Quick Reactions & Reply Bar */}
              <div className="absolute bottom-3 left-3 right-3 z-30 space-y-2">
                <div className="flex justify-around bg-black/40 backdrop-blur-xs p-1.5 rounded-full border border-white/10">
                  {['❤️', '🔥', '👏', '😍', '☕', '✨'].map((em) => (
                    <button
                      key={em}
                      onClick={() => handleSendStoryReaction(em)}
                      className="text-base hover:scale-125 active:scale-95 transition cursor-pointer p-1"
                    >
                      {em}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="text"
                    value={storyReplyText}
                    onChange={(e) => setStoryReplyText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && storyReplyText) {
                        setSharingSuccess(`Reply sent to ${stories[activeStoryIdx].authorName}!`);
                        setStoryReplyText('');
                        setTimeout(() => setSharingSuccess(''), 2000);
                      }
                    }}
                    placeholder={`Reply to ${stories[activeStoryIdx].authorName}...`}
                    className="flex-1 bg-white/20 backdrop-blur-md text-white text-xs px-3.5 py-2.5 rounded-full placeholder-white/60 focus:outline-none border border-white/20"
                  />
                  <button
                    onClick={() => {
                      if (storyReplyText) {
                        setSharingSuccess(`Reply sent to ${stories[activeStoryIdx].authorName}!`);
                        setStoryReplyText('');
                        setTimeout(() => setSharingSuccess(''), 2000);
                      }
                    }}
                    className="p-2.5 bg-[#800020] text-white rounded-full hover:bg-rose-700 transition cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 5. CREATE NEW POST MODAL (CHOOSE PHOTO, FRAME, LOCATION & EXPIRY)         */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isCreatePostOpen && (
          <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center p-2"
            onClick={() => setIsCreatePostOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl w-full max-w-sm p-5 text-left relative space-y-3.5 border-t border-[#E8DCCB] max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-[#F4ECE1] pb-2.5">
                <div>
                  <h3 className="text-sm font-black text-stone-900">
                    {isPostingStory ? 'Create 24h Community Story' : 'New Community Post'}
                  </h3>
                  <span className="text-[9.5px] text-rose-600 font-extrabold flex items-center gap-1 mt-0.5">
                    <Clock className="w-2.5 h-2.5" /> Automatically deletes in 24 hours
                  </span>
                </div>
                <button 
                  onClick={() => setIsCreatePostOpen(false)}
                  className="p-1.5 bg-stone-100 rounded-full text-stone-500 hover:bg-stone-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Photo preview */}
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                  1. Choose Snapshot
                </span>
                
                {newPostImage ? (
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-stone-900 border border-[#E8DCCB] p-2 flex items-center justify-center">
                    <div className="w-full max-w-[260px]">
                      {renderFramedImage(
                        newPostImage,
                        newPostFrame,
                        newPostFilter,
                        newPostCaption,
                        undefined,
                        undefined,
                        newPostFrameColor,
                        false
                      )}
                    </div>
                    <button
                      onClick={() => setNewPostImage('')}
                      className="absolute top-3 right-3 p-1.5 bg-black/70 text-white rounded-full hover:bg-red-600 transition cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        const fallbackImages = [
                          'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=800',
                          'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
                          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
                        ];
                        setNewPostImage(fallbackImages[Math.floor(Math.random() * fallbackImages.length)]);
                      }}
                      className="p-3 bg-[#FAF6F0] hover:bg-[#F4ECE1] border border-dashed border-[#E8DCCB] rounded-xl text-center cursor-pointer flex flex-col items-center justify-center gap-1"
                    >
                      <Camera className="w-5 h-5 text-[#800020]" />
                      <span className="text-[9.5px] font-bold text-stone-700">Sample Snap</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsCreatePostOpen(false);
                        setActiveZone('snapchat');
                        if (!useRealCamera) startWebcam();
                      }}
                      className="p-3 bg-[#FAF6F0] hover:bg-[#F4ECE1] border border-dashed border-[#E8DCCB] rounded-xl text-center cursor-pointer flex flex-col items-center justify-center gap-1"
                    >
                      <Sparkles className="w-5 h-5 text-[#800020]" />
                      <span className="text-[9.5px] font-bold text-stone-700">Snap Studio</span>
                    </button>

                    {recentPhotos.length > 0 && (
                      <button
                        onClick={() => setNewPostImage(recentPhotos[0].dataUrl)}
                        className="p-3 bg-[#FAF6F0] hover:bg-[#F4ECE1] border border-[#E8DCCB] rounded-xl text-center cursor-pointer flex flex-col items-center justify-center gap-1"
                      >
                        <ImageIcon className="w-5 h-5 text-emerald-700" />
                        <span className="text-[9.5px] font-bold text-stone-700">Recent Snap</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Frame selector for manual post */}
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                  2. Choose Frame Style
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['polaroid', 'collage-2x2', 'filmstrip', 'minimal-white'] as const).map(frm => (
                    <button
                      key={frm}
                      onClick={() => setNewPostFrame(frm)}
                      className={`text-[9.5px] py-1.5 rounded-xl border text-center font-bold capitalize cursor-pointer ${
                        newPostFrame === frm ? 'bg-[#800020] text-white border-[#800020]' : 'bg-[#FAF6F0] text-stone-600 border-[#E8DCCB]'
                      }`}
                    >
                      {frm.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Caption Input */}
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                  3. Caption & Safe Meetup Note
                </span>
                <textarea
                  value={newPostCaption}
                  onChange={(e) => setNewPostCaption(e.target.value)}
                  placeholder="Tell your sisters about this moment or safe spot..."
                  className="w-full bg-[#FAF6F0] border border-[#E8DCCB] rounded-xl p-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#800020] h-18 resize-none font-medium"
                />
              </div>

              {/* Location Tag */}
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                  4. Meetup Location
                </span>
                <select
                  value={newPostLocation}
                  onChange={(e) => setNewPostLocation(e.target.value)}
                  className="w-full bg-[#FAF6F0] border border-[#E8DCCB] rounded-xl p-2 text-xs font-bold text-stone-800 focus:outline-none focus:border-[#800020]"
                >
                  <option value="DLF CyberHub, Gurgaon">☕ DLF CyberHub, Gurgaon</option>
                  <option value="Galleria Market, DLF Phase 4">🛍️ Galleria Market, Phase 4</option>
                  <option value="Leisure Valley Park, Sector 29">🌿 Leisure Valley Park</option>
                  <option value="Golf Course Road, Gurgaon">🏙️ Golf Course Road</option>
                  <option value="Blue Tokai Coffee, Gurgaon">☕ Blue Tokai Safe Spot</option>
                </select>
              </div>

              <button
                onClick={handleCreateManualPost}
                disabled={!newPostImage}
                className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 ${
                  newPostImage 
                    ? 'bg-[#800020] hover:bg-[#6B0E1D] text-white shadow-xs' 
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Publish 24-Hour {isPostingStory ? 'Story' : 'Post'}</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 6. DELETE POST CONFIRMATION DIALOG                                        */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {postToDelete && (
          <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setPostToDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-5 w-full max-w-xs text-center space-y-3 shadow-xl border border-[#E8DCCB]"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-stone-900">Delete Post Immediately?</h4>
                <p className="text-[11px] text-stone-500 font-medium mt-1 leading-relaxed">
                  Posts auto-delete after 24 hours to preserve confidential privacy, but you can remove this post right now.
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setPostToDelete(null)}
                  className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  Keep
                </button>
                <button
                  onClick={handleConfirmDeletePost}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                >
                  Delete Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 7. SHARE TO GROUP CHAT DIALOG                                             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedPhotoForShare && (
          <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center p-2"
            onClick={() => setSelectedPhotoForShare(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl w-full max-w-sm p-5 text-left relative space-y-3 border-t border-[#E8DCCB]"
            >
              <div className="flex items-center justify-between border-b border-[#F4ECE1] pb-2">
                <div>
                  <h3 className="text-sm font-black text-stone-900">Share to Circle Chat</h3>
                  <span className="text-[9.5px] text-stone-500">Pick a joined circle room</span>
                </div>
                <button 
                  onClick={() => setSelectedPhotoForShare(null)}
                  className="p-1.5 bg-stone-100 rounded-full text-stone-500 hover:bg-stone-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {joinedMeetups.length === 0 ? (
                  <div className="text-center py-5 bg-[#FAF6F0] rounded-xl border border-dashed border-[#E8DCCB] p-3">
                    <span className="text-xs font-bold text-stone-600 block">No joined meetups yet</span>
                    <span className="text-[10px] text-stone-400 block mt-1">
                      Join a coffee walk or pilates circle to unlock direct group rooms!
                    </span>
                  </div>
                ) : (
                  joinedMeetups.map((mId) => {
                    const label = mId === 'm1' ? 'Sunday Coffee Walk ☕' : mId === 'm2' ? 'Pilates Circle 🧘‍♀️' : 'Circle Room';
                    return (
                      <button
                        key={mId}
                        onClick={() => {
                          setSharingSuccess(`Shared snapshot directly into ${label}!`);
                          setSelectedPhotoForShare(null);
                          setTimeout(() => setSharingSuccess(''), 2500);
                        }}
                        className="w-full p-3 bg-[#FAF6F0] hover:bg-[#F4ECE1] border border-[#E8DCCB] rounded-xl text-left flex items-center justify-between transition cursor-pointer"
                      >
                        <span className="text-xs font-bold text-stone-800">{label}</span>
                        <span className="text-[9.5px] font-black text-[#800020] bg-white border border-[#E8DCCB] px-2.5 py-1 rounded-lg">
                          Send
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
