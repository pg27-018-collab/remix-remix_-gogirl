import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, Search, Plus, Send, Image as ImageIcon, Mic, Phone, Video, 
  MoreVertical, ArrowLeft, Users, ShieldCheck, Check, CheckCheck, Smile, 
  Paperclip, Info, Share2, X, Lock, Sparkles, Heart, ThumbsUp, Laugh, Flame,
  Volume2, Play, Pause, Camera, Hash, Pin, PinOff, ChevronLeft, ChevronRight, Crown
} from 'lucide-react';
import { UserProfile, ChatMessage } from '../types';

interface GroupChat {
  id: string;
  name: string;
  description: string;
  avatar: string;
  category: 'General' | 'Delhi NCR' | 'Gurugram' | 'Food & Coffee' | 'Music & Events' | 'Fitness & Hikes' | 'Books & Study';
  membersCount: number;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: ChatMessageWithReaction[];
  members: { name: string; avatar: string; role?: string }[];
}

interface ChatMessageWithReaction extends ChatMessage {
  reaction?: string;
  mediaType?: 'image' | 'audio';
  mediaUrl?: string;
  audioDuration?: string;
}

interface CommunityChatAppProps {
  userProfile: UserProfile;
}

export default function CommunityChatApp({ userProfile }: CommunityChatAppProps) {
  // State for groups
  const [groups, setGroups] = useState<GroupChat[]>(() => {
    const saved = localStorage.getItem('gogirl_whatsapp_groups');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'g1',
        name: 'Gurugram & Delhi NCR Girls Hub 🌸',
        description: 'Official safe community chat for girls across Delhi, CyberHub, and Noida. Share meetups, safety alerts, and general hangout plans!',
        avatar: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=200',
        category: 'Delhi NCR',
        membersCount: 142,
        unreadCount: 3,
        lastMessage: 'Priya: Is anyone free for cold brew at CyberHub this Saturday evening?',
        lastMessageTime: '11:42 AM',
        members: [
          { name: 'Ananya Roy', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', role: 'Group Admin' },
          { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
          { name: 'Riya Sen', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200' },
          { name: 'Sneha Kapoor', avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200' },
        ],
        messages: [
          {
            id: 'm1',
            sender: 'Ananya Roy',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
            text: 'Hey everyone! Welcome to the official Delhi NCR community chat group 🎉 Please check out our verified safe venue recommendations and pinned guidelines.',
            timestamp: '10:15 AM',
            isPinned: true,
            pinnedBy: 'Ananya Roy (Group Admin)',
            pinnedAt: '10:16 AM',
            status: 'read',
            readBy: [
              { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', readAt: '10:16 AM' },
              { name: 'Riya Sen', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', readAt: '10:17 AM' },
              { name: 'Sneha Kapoor', avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200', readAt: '10:20 AM' }
            ]
          },
          {
            id: 'm2',
            sender: 'Riya Sen',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
            text: 'So happy to be here! Anyone up for coffee or a weekend stroll?',
            timestamp: '10:20 AM',
            status: 'read',
            readBy: [
              { name: 'Ananya Roy', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', role: 'Group Admin', readAt: '10:21 AM' },
              { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', readAt: '10:22 AM' }
            ]
          },
          {
            id: 'm3',
            sender: 'Priya Sharma',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
            text: 'Is anyone free for cold brew at CyberHub this Saturday evening?',
            timestamp: '11:42 AM',
            status: 'read',
            readBy: [
              { name: 'Ananya Roy', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', role: 'Group Admin', readAt: '11:43 AM' },
              { name: 'Riya Sen', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', readAt: '11:43 AM' }
            ]
          },
          {
            id: 'm4',
            sender: userProfile.name,
            avatar: userProfile.avatar,
            text: 'Count me in! I love CyberHub cafés. Let us meet near Blue Tokai ☕',
            timestamp: '11:43 AM',
            status: 'read',
            readBy: [
              { name: 'Ananya Roy', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', role: 'Group Admin', readAt: '11:44 AM' },
              { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', readAt: '11:44 AM' },
              { name: 'Riya Sen', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200', readAt: '11:45 AM' },
              { name: 'Sneha Kapoor', avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200', readAt: '11:45 AM' }
            ]
          }
        ]
      },
      {
        id: 'g2',
        name: 'CyberHub Coffee & Dessert Lovers ☕',
        description: 'For café hopping, pastry reviews, and casual evening coffee meetups in Gurgaon.',
        avatar: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=200',
        category: 'Food & Coffee',
        membersCount: 68,
        unreadCount: 1,
        lastMessage: 'Meera: Blue Tokai just launched their hazelnut tart!',
        lastMessageTime: '09:15 AM',
        members: [
          { name: 'Meera Nair', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', role: 'Group Admin' },
          { name: 'Pooja Verma', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200' },
        ],
        messages: [
          {
            id: 'm201',
            sender: 'Meera Nair',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
            text: 'Blue Tokai just launched their hazelnut tart! Group discount active for GoGirl members.',
            timestamp: '09:15 AM',
            isPinned: true,
            pinnedBy: 'Meera Nair (Group Admin)',
            pinnedAt: '09:16 AM'
          }
        ]
      },
      {
        id: 'g3',
        name: 'Indie Concerts & Jazz Nights 🎷',
        description: 'Coordinating group tickets, live gigs, and music festivals safely together.',
        avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=200',
        category: 'Music & Events',
        membersCount: 85,
        unreadCount: 0,
        lastMessage: 'Kavya: Who wants to join for acoustic night this Friday?',
        lastMessageTime: 'Yesterday',
        members: [
          { name: 'Kavya Singh', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200', role: 'Group Admin' }
        ],
        messages: [
          {
            id: 'm301',
            sender: 'Kavya Singh',
            avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
            text: 'Who wants to join for acoustic night this Friday?',
            timestamp: 'Yesterday'
          }
        ]
      },
      {
        id: 'g4',
        name: 'Quiet Cafés & Study Lounge 📚',
        description: 'Focus sessions, coworking recommendations, and reading circles around NCR.',
        avatar: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=200',
        category: 'Books & Study',
        membersCount: 52,
        unreadCount: 0,
        lastMessage: 'Tanya: Third Wave Roasters is super quiet today!',
        lastMessageTime: 'Aug 10',
        members: [
          { name: 'Tanya Mehta', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200' }
        ],
        messages: [
          {
            id: 'm401',
            sender: 'Tanya Mehta',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
            text: 'Third Wave Roasters is super quiet today!',
            timestamp: 'Aug 10'
          }
        ]
      }
    ];
  });

  // Active chat group state
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Admin Permissions Toggle (Enabled by default so users can test pinning immediately)
  const [userAdminMode, setUserAdminMode] = useState<boolean>(true);

  // Active Pinned Message Carousel Index
  const [activePinnedIndex, setActivePinnedIndex] = useState(0);

  // New Group Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [newGroupCategory, setNewGroupCategory] = useState<GroupChat['category']>('General');
  const [newGroupAvatar, setNewGroupAvatar] = useState('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=200');

  // Active Chat Message Input State
  const [messageText, setMessageText] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordingTimer, setRecordingTimer] = useState(0);
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [copiedInvite, setCopiedInvite] = useState(false);
  
  // Read Receipts Modal state
  const [selectedMessageForReceipts, setSelectedMessageForReceipts] = useState<ChatMessageWithReaction | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save to localStorage when groups change
  useEffect(() => {
    localStorage.setItem('gogirl_whatsapp_groups', JSON.stringify(groups));
  }, [groups]);

  // Scroll to bottom when opening or adding messages
  useEffect(() => {
    if (activeGroupId) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeGroupId, groups]);

  // Recording timer simulation
  useEffect(() => {
    let interval: any;
    if (isRecordingVoice) {
      interval = setInterval(() => {
        setRecordingTimer(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTimer(0);
    }
    return () => clearInterval(interval);
  }, [isRecordingVoice]);

  const activeGroup = groups.find(g => g.id === activeGroupId);

  // Check if current user has admin status in active group
  const isCurrentUserAdmin = userAdminMode || Boolean(
    activeGroup?.members.some(m => m.name === userProfile.name && (m.role?.toLowerCase().includes('admin') || m.role?.toLowerCase().includes('creator')))
  );

  // Pinned messages list for active group
  const pinnedMessages = activeGroup?.messages.filter(m => m.isPinned) || [];

  // Handle Pin / Unpin message by Group Admin
  const handleTogglePinMessage = (msgId: string) => {
    if (!activeGroupId) return;

    setGroups(prevGroups => prevGroups.map(g => {
      if (g.id === activeGroupId) {
        let isPinning = false;
        let targetText = '';

        const updatedMessages = g.messages.map(m => {
          if (m.id === msgId) {
            const nextPinned = !m.isPinned;
            isPinning = nextPinned;
            targetText = m.text || (m.mediaType === 'image' ? 'Photo Attachment' : 'Voice Note');
            return {
              ...m,
              isPinned: nextPinned,
              pinnedBy: nextPinned ? `${userProfile.name} (Group Admin)` : undefined,
              pinnedAt: nextPinned ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
            };
          }
          return m;
        });

        const snippet = targetText.length > 35 ? targetText.slice(0, 35) + '...' : targetText;
        const systemMsg: ChatMessageWithReaction = {
          id: `sys_pin_${Date.now()}`,
          sender: 'System',
          avatar: '',
          text: isPinning
            ? `📌 ${userProfile.name} pinned a message to the top: "${snippet}"`
            : `📌 ${userProfile.name} unpinned a message.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        return {
          ...g,
          messages: [...updatedMessages, systemMsg]
        };
      }
      return g;
    }));
  };

  // Toggle member Admin Role
  const handleToggleMemberRole = (memberName: string) => {
    if (!activeGroupId) return;
    setGroups(prevGroups => prevGroups.map(g => {
      if (g.id === activeGroupId) {
        const updatedMembers = g.members.map(m => {
          if (m.name === memberName) {
            const isAlreadyAdmin = m.role?.includes('Admin');
            return {
              ...m,
              role: isAlreadyAdmin ? undefined : 'Group Admin'
            };
          }
          return m;
        });
        return { ...g, members: updatedMembers };
      }
      return g;
    }));
  };

  // Filter groups
  const filteredGroups = groups.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          g.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'All' || g.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  // Handle Create Group
  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const newGroup: GroupChat = {
      id: `g_${Date.now()}`,
      name: newGroupName.trim(),
      description: newGroupDesc.trim() || 'Welcome to our new GoGirl community group!',
      avatar: newGroupAvatar,
      category: newGroupCategory,
      membersCount: 1,
      unreadCount: 0,
      lastMessage: `${userProfile.name} created group "${newGroupName.trim()}"`,
      lastMessageTime: 'Just now',
      members: [
        { name: userProfile.name, avatar: userProfile.avatar, role: 'Group Creator' }
      ],
      messages: [
        {
          id: `m_${Date.now()}`,
          sender: 'System',
          avatar: '',
          text: `🎉 ${userProfile.name} created group "${newGroupName.trim()}". Start messaging now!`,
          timestamp: 'Just now'
        }
      ]
    };

    setGroups([newGroup, ...groups]);
    setActiveGroupId(newGroup.id);
    setShowCreateModal(false);
    setNewGroupName('');
    setNewGroupDesc('');
  };

  // Send Message with Read Receipt lifecycle
  const handleSendMessage = (textToSend?: string, mediaType?: 'image' | 'audio', mediaUrl?: string) => {
    const content = textToSend || messageText;
    if (!content.trim() && !mediaUrl) return;
    if (!activeGroupId) return;

    const newMsgId = `m_${Date.now()}`;
    const sentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const currentGroup = groups.find(g => g.id === activeGroupId);
    const otherMembers = currentGroup?.members.filter(m => m.name !== userProfile.name) || [];

    const newMsg: ChatMessageWithReaction = {
      id: newMsgId,
      sender: userProfile.name,
      avatar: userProfile.avatar,
      text: content.trim(),
      timestamp: sentTime,
      mediaType,
      mediaUrl,
      audioDuration: mediaType === 'audio' ? `${recordingTimer || 4}s` : undefined,
      status: 'sent',
      deliveredTo: [],
      readBy: []
    };

    setGroups(prevGroups => prevGroups.map(g => {
      if (g.id === activeGroupId) {
        return {
          ...g,
          lastMessage: `${userProfile.name}: ${content || (mediaType === 'image' ? '📷 Photo' : '🎤 Voice note')}`,
          lastMessageTime: 'Just now',
          messages: [...g.messages, newMsg]
        };
      }
      return g;
    }));

    setMessageText('');
    setShowPhotoPicker(false);
    setIsRecordingVoice(false);

    // Step 2: Delivered after 1.2s (Double grey checkmarks)
    setTimeout(() => {
      setGroups(prevGroups => prevGroups.map(g => {
        if (g.id === activeGroupId) {
          return {
            ...g,
            messages: g.messages.map(m => {
              if (m.id === newMsgId) {
                return {
                  ...m,
                  status: 'delivered',
                  deliveredTo: otherMembers.map(mem => ({
                    name: mem.name,
                    avatar: mem.avatar,
                    role: mem.role,
                    readAt: sentTime
                  }))
                };
              }
              return m;
            })
          };
        }
        return g;
      }));
    }, 1200);

    // Step 3: Read after 2.8s (Double blue checkmarks)
    setTimeout(() => {
      const readTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setGroups(prevGroups => prevGroups.map(g => {
        if (g.id === activeGroupId) {
          return {
            ...g,
            messages: g.messages.map(m => {
              if (m.id === newMsgId) {
                return {
                  ...m,
                  status: 'read',
                  readBy: otherMembers.map(mem => ({
                    name: mem.name,
                    avatar: mem.avatar,
                    role: mem.role,
                    readAt: readTime
                  }))
                };
              }
              return m;
            })
          };
        }
        return g;
      }));
    }, 2800);
  };

  // Toggle Reaction on message
  const handleAddReaction = (msgId: string, emoji: string) => {
    if (!activeGroupId) return;
    setGroups(prevGroups => prevGroups.map(g => {
      if (g.id === activeGroupId) {
        const updatedMsgs = g.messages.map(m => {
          if (m.id === msgId) {
            return { ...m, reaction: m.reaction === emoji ? undefined : emoji };
          }
          return m;
        });
        return { ...g, messages: updatedMsgs };
      }
      return g;
    }));
  };

  // Preset photos for quick sharing in WhatsApp group
  const presetPhotos = [
    { url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=400', label: 'Coffee Cup' },
    { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400', label: 'Café Vibe' },
    { url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400', label: 'Concert Stage' },
    { url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400', label: 'Group Photo' },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#efeae2] relative overflow-hidden select-none">
      
      {/* ----------------- VIEW 1: GROUPS LIST VIEW ----------------- */}
      {!activeGroupId ? (
        <div className="flex flex-col h-full bg-[#f0f2f5] text-left">
          
          {/* WhatsApp Style Top Header */}
          <div className="bg-[#008069] text-white px-4 py-3 shadow-md flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-base font-extrabold leading-tight">Go Girl Community</h1>
                <p className="text-[10px] text-emerald-100 font-medium">WhatsApp-Style Safe Group Chats</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-3 py-1.5 bg-white text-[#008069] rounded-full text-xs font-black shadow-xs hover:bg-emerald-50 transition active:scale-95 cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" /> New Group
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-2.5 bg-white border-b border-gray-200">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search or start new group chat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#f0f2f5] text-xs text-gray-900 rounded-xl outline-none focus:ring-1 focus:ring-[#008069]"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 text-gray-400">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto mt-2.5 pb-1 scrollbar-none">
              {['All', 'Delhi NCR', 'Food & Coffee', 'Music & Events', 'Books & Study'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-[10.5px] font-bold whitespace-nowrap transition cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#008069] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Group Chats List */}
          <div className="flex-1 overflow-y-auto bg-white divide-y divide-gray-100 scrollbar-none">
            {filteredGroups.length === 0 ? (
              <div className="p-8 text-center text-gray-400 space-y-2">
                <Users className="w-8 h-8 mx-auto text-gray-300" />
                <p className="text-xs font-bold text-gray-600">No community groups found</p>
                <p className="text-[11px] text-gray-400">Create your own group chat to invite girls around you!</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="mt-2 px-4 py-2 bg-[#008069] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Create Group
                </button>
              </div>
            ) : (
              filteredGroups.map((group) => (
                <div
                  key={group.id}
                  onClick={() => {
                    setActiveGroupId(group.id);
                    // Clear unread
                    setGroups(prev => prev.map(g => g.id === group.id ? { ...g, unreadCount: 0 } : g));
                  }}
                  className="p-3 hover:bg-gray-50 active:bg-gray-100 transition cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="relative shrink-0">
                      <img
                        src={group.avatar}
                        alt={group.name}
                        className="w-12 h-12 rounded-full object-cover border border-gray-200"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="text-xs font-extrabold text-gray-900 truncate pr-2">{group.name}</h3>
                        <span className="text-[10px] text-gray-400 font-medium shrink-0">{group.lastMessageTime}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-[11px] text-gray-500 truncate font-medium pr-2">{group.lastMessage}</p>
                        {group.unreadCount > 0 && (
                          <span className="w-4 h-4 bg-[#25d366] text-white text-[9.5px] font-black rounded-full flex items-center justify-center shrink-0 shadow-xs">
                            {group.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (

        /* ----------------- VIEW 2: FULL SCREEN CONVERSATION VIEW ----------------- */
        <div className="flex flex-col h-full bg-[#efeae2] relative text-left">
          
          {/* WhatsApp Header Bar */}
          <div className="bg-[#008069] text-white px-3 py-2.5 flex items-center justify-between shadow-md z-20 shrink-0">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <button
                onClick={() => setActiveGroupId(null)}
                className="p-1 hover:bg-white/10 rounded-full transition cursor-pointer shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>

              <div
                onClick={() => setShowGroupInfo(true)}
                className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
              >
                <div className="relative shrink-0">
                  <img
                    src={activeGroup?.avatar}
                    alt={activeGroup?.name}
                    className="w-9 h-9 rounded-full object-cover border border-white/20 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white" title="Active" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xs font-black text-white truncate leading-tight flex items-center gap-1.5">
                    {activeGroup?.name}
                    {isCurrentUserAdmin && (
                      <span className="text-[8.5px] bg-amber-400 text-amber-950 font-black px-1.5 py-0.2 rounded-full uppercase shrink-0">
                        ADMIN
                      </span>
                    )}
                  </h2>
                  <p className="text-[9.5px] text-emerald-100 truncate font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" /> {activeGroup?.membersCount} members • Online now
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => alert(`Initiating safe encrypted voice call for ${activeGroup?.name}`)}
                className="p-2 hover:bg-white/10 rounded-full text-white cursor-pointer"
                title="Voice Call"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={() => alert(`Initiating video group call for ${activeGroup?.name}`)}
                className="p-2 hover:bg-white/10 rounded-full text-white cursor-pointer"
                title="Video Call"
              >
                <Video className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowGroupInfo(!showGroupInfo)}
                className="p-2 hover:bg-white/10 rounded-full text-white cursor-pointer"
                title="Group Details"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* TOP PINNED MESSAGES ANNOUNCEMENT BANNER FOR GROUP CHAT */}
          {pinnedMessages.length > 0 && (
            <div className="bg-[#fff9e6] border-b border-amber-300/80 px-3 py-2 flex items-center justify-between shadow-xs z-15 shrink-0 text-left">
              <div 
                onClick={() => {
                  const target = pinnedMessages[activePinnedIndex % pinnedMessages.length];
                  if (target) {
                    const el = document.getElementById(`msg-${target.id}`);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      el.classList.add('ring-2', 'ring-amber-500', 'bg-amber-100/80');
                      setTimeout(() => {
                        el.classList.remove('ring-2', 'ring-amber-500', 'bg-amber-100/80');
                      }, 2500);
                    }
                  }
                }}
                className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer group"
                title="Click to jump to pinned message in chat"
              >
                <div className="w-7 h-7 rounded-full bg-amber-200 border border-amber-300 flex items-center justify-center shrink-0 shadow-2xs">
                  <Pin className="w-3.5 h-3.5 text-amber-800 fill-amber-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-black text-amber-900 uppercase tracking-wide flex items-center gap-1">
                      📌 PINNED MESSAGE ({activePinnedIndex + 1}/{pinnedMessages.length})
                    </span>
                    <span className="text-[9px] text-amber-700 font-bold truncate">
                      • {pinnedMessages[activePinnedIndex % pinnedMessages.length]?.pinnedBy || 'Group Admin'}
                    </span>
                  </div>
                  <p className="text-[11.5px] font-extrabold text-stone-900 truncate leading-snug group-hover:underline">
                    {pinnedMessages[activePinnedIndex % pinnedMessages.length]?.text || (pinnedMessages[activePinnedIndex % pinnedMessages.length]?.mediaType === 'image' ? '📷 Photo attachment' : '🎤 Voice Note')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 ml-2">
                {pinnedMessages.length > 1 && (
                  <div className="flex items-center bg-amber-200/60 rounded-lg p-0.5 border border-amber-300">
                    <button
                      onClick={() => setActivePinnedIndex(prev => (prev - 1 + pinnedMessages.length) % pinnedMessages.length)}
                      className="p-1 text-amber-900 hover:bg-amber-300 rounded transition cursor-pointer"
                      title="Previous Pinned Message"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setActivePinnedIndex(prev => (prev + 1) % pinnedMessages.length)}
                      className="p-1 text-amber-900 hover:bg-amber-300 rounded transition cursor-pointer"
                      title="Next Pinned Message"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {isCurrentUserAdmin && (
                  <button
                    onClick={() => {
                      const target = pinnedMessages[activePinnedIndex % pinnedMessages.length];
                      if (target) handleTogglePinMessage(target.id);
                    }}
                    className="p-1.5 text-amber-900 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer font-extrabold text-[10px] flex items-center gap-1"
                    title="Unpin Message"
                  >
                    <PinOff className="w-3.5 h-3.5 text-red-600" />
                    <span className="hidden sm:inline">Unpin</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Chat Messages Feed Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px] scrollbar-none">
            
            {/* Encryption & Safety Banner Notice */}
            <div className="mx-auto max-w-xs bg-[#ffe299] text-[#543b00] text-[10px] p-2 rounded-xl text-center shadow-xs font-medium flex items-center justify-center gap-1.5">
              <Lock className="w-3 h-3 shrink-0" />
              <span>Messages are end-to-end protected in this verified women circle.</span>
            </div>

            {/* Render Messages */}
            {activeGroup?.messages.map((msg) => {
              const isMe = msg.sender === userProfile.name;
              const isSystem = msg.sender === 'System';

              if (isSystem) {
                return (
                  <div key={msg.id} className="text-center my-2">
                    <span className="bg-amber-50 text-amber-900 text-[10.5px] font-extrabold px-3.5 py-1 rounded-full shadow-2xs border border-amber-250 inline-flex items-center gap-1">
                      {msg.text}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  id={`msg-${msg.id}`}
                  className={`flex items-end gap-1.5 ${isMe ? 'justify-end' : 'justify-start'} transition-all duration-300 p-0.5 rounded-2xl`}
                >
                  {!isMe && (
                    <img
                      src={msg.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'}
                      alt={msg.sender}
                      className="w-6 h-6 rounded-full object-cover border border-gray-300 shrink-0 mb-1"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  <div
                    className={`relative max-w-[78%] px-3 py-2 rounded-2xl shadow-xs text-xs transition-all ${
                      msg.isPinned
                        ? 'bg-amber-50 text-gray-900 rounded-br-2px border-2 border-amber-400 ring-2 ring-amber-200/60'
                        : isMe 
                          ? 'bg-[#d9fdd3] text-gray-900 rounded-br-2px border border-emerald-200' 
                          : 'bg-white text-gray-900 rounded-bl-2px border border-gray-200'
                    }`}
                  >
                    {/* Pinned Announcement Badge on Bubble */}
                    {msg.isPinned && (
                      <div className="flex items-center justify-between text-[9px] font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md mb-1.5 border border-amber-300 shadow-3xs">
                        <span className="flex items-center gap-1">
                          <Pin className="w-3 h-3 text-amber-800 fill-amber-600 animate-pulse" />
                          PINNED ANNOUNCEMENT
                        </span>
                        {msg.pinnedBy && <span className="text-[8.5px] text-amber-800 font-extrabold">{msg.pinnedBy}</span>}
                      </div>
                    )}

                    {!isMe && (
                      <div className="text-[10px] font-extrabold text-[#008069] mb-0.5 flex items-center justify-between gap-2">
                        <span>{msg.sender}</span>
                        {activeGroup?.members.find(m => m.name === msg.sender)?.role?.includes('Admin') && (
                          <span className="text-[8.5px] bg-emerald-100 text-[#008069] px-1.5 py-0.2 rounded font-black border border-emerald-200 flex items-center gap-0.5">
                            <Crown className="w-2.5 h-2.5 text-[#008069]" /> ADMIN
                          </span>
                        )}
                      </div>
                    )}

                    {/* Image Attachment Rendering */}
                    {msg.mediaType === 'image' && msg.mediaUrl && (
                      <div className="mb-1.5 rounded-xl overflow-hidden border border-black/10">
                        <img
                          src={msg.mediaUrl}
                          alt="Attachment"
                          className="w-full max-h-48 object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    {/* Audio Voice Note Rendering */}
                    {msg.mediaType === 'audio' && (
                      <div className="flex items-center gap-2 py-1 pr-2">
                        <div className="w-7 h-7 rounded-full bg-[#008069] text-white flex items-center justify-center shrink-0">
                          <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                        </div>
                        <div className="flex-1 h-1.5 bg-gray-300 rounded-full overflow-hidden">
                          <div className="w-2/3 h-full bg-[#008069]" />
                        </div>
                        <span className="text-[9.5px] font-mono text-gray-500 font-bold">{msg.audioDuration || '0:04'}</span>
                      </div>
                    )}

                    <p className="text-[11.5px] leading-relaxed font-medium whitespace-pre-wrap break-words">{msg.text}</p>

                    <div className="flex items-center justify-end gap-1 mt-0.5">
                      <span className="text-[9px] text-gray-500 font-semibold">{msg.timestamp}</span>
                      {isMe && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMessageForReceipts(msg);
                          }}
                          className="flex items-center gap-0.5 hover:scale-105 transition-all cursor-pointer group/receipt"
                          title={
                            msg.status === 'sent'
                              ? 'Sent (1 grey checkmark)'
                              : msg.status === 'delivered'
                              ? 'Delivered to group members (2 grey checkmarks)'
                              : `Read by ${msg.readBy?.length || (activeGroup?.members ? activeGroup.members.length - 1 : 3)} members (Double blue checkmarks). Click for read receipt log.`
                          }
                        >
                          {(!msg.status || msg.status === 'read') ? (
                            <span className="flex items-center gap-0.5 bg-[#FAF6F0] px-1 py-0.2 rounded-md border border-[#E8DCCB] shadow-3xs">
                              <CheckCheck className="w-3.5 h-3.5 text-coral-500 stroke-[2.5]" />
                              <span className="text-[8.5px] font-mono font-black text-coral-600">
                                {msg.readBy?.length || (activeGroup?.members ? activeGroup.members.length - 1 : 3)}
                              </span>
                            </span>
                          ) : msg.status === 'delivered' ? (
                            <CheckCheck className="w-3.5 h-3.5 text-gray-400 stroke-[2.5]" />
                          ) : (
                            <Check className="w-3.5 h-3.5 text-gray-400 stroke-[2.5]" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Quick Reactions Bar */}
                    {msg.reaction && (
                      <div className="absolute -bottom-2 right-2 bg-white px-1.5 py-0.5 rounded-full text-[10px] shadow-xs border border-gray-200">
                        {msg.reaction}
                      </div>
                    )}
                  </div>

                  {/* Reaction Selector, Read Receipts & Admin Pin Button */}
                  <div className="opacity-90 hover:opacity-100 transition-opacity flex items-center gap-1 bg-white/95 backdrop-blur-xs px-1.5 py-1 rounded-full border border-gray-200 shadow-xs">
                    {/* Message Read Info Button for Sent Messages */}
                    {isMe && (
                      <button
                        onClick={() => setSelectedMessageForReceipts(msg)}
                        className="p-1 rounded-full text-gray-400 hover:text-coral-600 hover:bg-[#FAF6F0] transition cursor-pointer"
                        title="View read receipts & member view log"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Admin Pin Toggle Button */}
                    {isCurrentUserAdmin && (
                      <button
                        onClick={() => handleTogglePinMessage(msg.id)}
                        className={`p-1 rounded-full transition cursor-pointer ${
                          msg.isPinned 
                            ? 'text-amber-700 bg-amber-100 hover:bg-amber-200 ring-1 ring-amber-300' 
                            : 'text-gray-400 hover:text-amber-700 hover:bg-amber-50'
                        }`}
                        title={msg.isPinned ? "Unpin message (Admin)" : "Pin message to top of chat (Admin)"}
                      >
                        <Pin className={`w-3.5 h-3.5 ${msg.isPinned ? 'fill-amber-600' : ''}`} />
                      </button>
                    )}

                    {['❤️', '👍', '😂', '🔥'].map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => handleAddReaction(msg.id, emoji)}
                        className="text-[10px] hover:scale-125 transition cursor-pointer"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Photo Picker Drawer */}
          <AnimatePresence>
            {showPhotoPicker && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-white p-3 border-t border-gray-200 shadow-lg z-20 space-y-2"
              >
                <div className="flex justify-between items-center text-xs font-bold text-gray-700">
                  <span>Share Photo in Group</span>
                  <button onClick={() => setShowPhotoPicker(false)} className="text-gray-400">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {presetPhotos.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(item.label, 'image', item.url)}
                      className="group relative rounded-xl overflow-hidden border border-gray-200 hover:opacity-90 cursor-pointer"
                    >
                      <img src={item.url} alt={item.label} className="w-full h-16 object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] font-bold p-0.5 text-center truncate">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Voice Recording Simulator Drawer */}
          {isRecordingVoice && (
            <div className="bg-red-50 border-t border-red-200 p-2.5 px-4 flex items-center justify-between text-xs text-red-700 font-bold z-20 animate-pulse">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                <span>Recording Voice Note... ({recordingTimer}s)</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsRecordingVoice(false)}
                  className="px-2.5 py-1 bg-gray-200 text-gray-700 rounded-lg text-[10px]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSendMessage("Voice Note", 'audio')}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg text-[10px] font-extrabold flex items-center gap-1"
                >
                  <Send className="w-3 h-3" /> Send
                </button>
              </div>
            </div>
          )}

          {/* Bottom Chat Input Bar */}
          <div className="bg-[#f0f2f5] p-2 px-3 border-t border-gray-200 flex items-center gap-2 z-20 shrink-0">
            <button
              onClick={() => setShowPhotoPicker(!showPhotoPicker)}
              className="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition cursor-pointer"
              title="Attach Photo"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder={`Message #${activeGroup?.name}...`}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-white text-xs px-3.5 py-2.5 rounded-full outline-none text-gray-900 border border-gray-200 focus:border-[#008069]"
            />

            {!messageText.trim() ? (
              <button
                onClick={() => setIsRecordingVoice(!isRecordingVoice)}
                className={`p-2.5 rounded-full text-white transition active:scale-95 cursor-pointer ${
                  isRecordingVoice ? 'bg-red-600 animate-pulse' : 'bg-[#008069] hover:bg-emerald-700'
                }`}
                title="Voice Note"
              >
                <Mic className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => handleSendMessage()}
                className="p-2.5 bg-[#008069] hover:bg-emerald-700 text-white rounded-full transition active:scale-95 cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Group Details Drawer Side Overlay */}
          <AnimatePresence>
            {showGroupInfo && activeGroup && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="absolute inset-0 bg-white z-30 flex flex-col overflow-y-auto scrollbar-none"
              >
                <div className="bg-[#008069] text-white p-4 flex items-center justify-between">
                  <h3 className="text-sm font-extrabold flex items-center gap-2">
                    <Info className="w-4 h-4" /> Group Info
                  </h3>
                  <button onClick={() => setShowGroupInfo(false)} className="p-1 hover:bg-white/10 rounded-full">
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="p-4 space-y-4 text-left">
                  <div className="text-center space-y-2">
                    <img
                      src={activeGroup.avatar}
                      alt={activeGroup.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-gray-200 shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <h2 className="text-sm font-black text-gray-900">{activeGroup.name}</h2>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">{activeGroup.description}</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200 space-y-1">
                    <div className="text-[10px] font-black text-gray-400 uppercase">Share Group Invite Link</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-gray-700 truncate">gogirl.app/chat/{activeGroup.id}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(`https://gogirl.app/chat/${activeGroup.id}`);
                          setCopiedInvite(true);
                          setTimeout(() => setCopiedInvite(false), 2000);
                        }}
                        className="px-2.5 py-1 bg-[#008069] text-white rounded-lg text-[10px] font-bold cursor-pointer"
                      >
                        {copiedInvite ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Admin Permissions Simulation Control */}
                  <div className="bg-amber-50/80 p-3 rounded-2xl border border-amber-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Crown className="w-4 h-4 text-amber-700 fill-amber-400" />
                        <span className="text-xs font-black text-amber-900">Admin Mode (My Account)</span>
                      </div>
                      <button
                        onClick={() => setUserAdminMode(!userAdminMode)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold transition cursor-pointer ${
                          userAdminMode 
                            ? 'bg-amber-500 text-white shadow-2xs' 
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {userAdminMode ? 'Admin Mode: ON' : 'Member Mode'}
                      </button>
                    </div>
                    <p className="text-[10px] text-amber-800 font-medium leading-tight">
                      {userAdminMode 
                        ? 'You have Group Admin privileges to pin/unpin messages to the top of chat for all members.'
                        : 'Switch to Admin Mode to test pinning and managing pinned announcements.'}
                    </p>
                  </div>

                  {/* Pinned Messages Drawer Section */}
                  <div className="bg-[#fff9e6] border border-amber-200 p-3 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                        <Pin className="w-3.5 h-3.5 text-amber-700 fill-amber-500" /> Pinned Messages ({pinnedMessages.length})
                      </h4>
                      <span className="text-[9px] text-amber-800 font-extrabold bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                        Admin Pinned
                      </span>
                    </div>

                    {pinnedMessages.length === 0 ? (
                      <p className="text-[10.5px] text-amber-800/80 font-medium text-center py-2 bg-white/60 rounded-xl border border-amber-150">
                        No messages pinned yet. Group admins can pin important messages from the chat feed!
                      </p>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-0.5 scrollbar-none">
                        {pinnedMessages.map((pMsg) => (
                          <div
                            key={pMsg.id}
                            onClick={() => {
                              setShowGroupInfo(false);
                              setTimeout(() => {
                                const el = document.getElementById(`msg-${pMsg.id}`);
                                if (el) {
                                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                  el.classList.add('ring-2', 'ring-amber-500', 'bg-amber-100/80');
                                  setTimeout(() => {
                                    el.classList.remove('ring-2', 'ring-amber-500', 'bg-amber-100/80');
                                  }, 2500);
                                }
                              }, 250);
                            }}
                            className="p-2.5 bg-white rounded-xl border border-amber-200 shadow-2xs cursor-pointer hover:border-amber-400 transition"
                          >
                            <div className="flex items-center justify-between text-[10px] font-extrabold text-gray-500 mb-1">
                              <span className="text-[#008069] flex items-center gap-1">
                                {pMsg.sender}
                              </span>
                              <span className="text-gray-400">{pMsg.timestamp}</span>
                            </div>
                            <p className="text-[11px] text-gray-800 font-semibold line-clamp-2 leading-tight">
                              {pMsg.text || (pMsg.mediaType === 'image' ? '📷 Photo attachment' : '🎤 Voice Note')}
                            </p>
                            <div className="mt-1.5 flex items-center justify-between pt-1 border-t border-amber-100">
                              <span className="text-[9px] text-amber-700 font-bold">
                                {pMsg.pinnedBy || 'Group Admin'}
                              </span>
                              {isCurrentUserAdmin && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleTogglePinMessage(pMsg.id);
                                  }}
                                  className="text-[9.5px] text-red-600 font-extrabold flex items-center gap-0.5 hover:underline"
                                >
                                  <PinOff className="w-3 h-3 text-red-500" /> Unpin
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Members List */}
                  <div>
                    <h4 className="text-xs font-extrabold text-gray-900 mb-2">
                      Group Members ({activeGroup.members.length})
                    </h4>
                    <div className="space-y-2">
                      {activeGroup.members.map((mem, idx) => {
                        const isMemAdmin = mem.role?.includes('Admin') || mem.role?.includes('Creator');
                        return (
                          <div key={idx} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-150">
                            <div className="flex items-center gap-2.5">
                              <img src={mem.avatar} alt={mem.name} className="w-8 h-8 rounded-full object-cover border border-gray-200" referrerPolicy="no-referrer" />
                              <div>
                                <span className="text-xs font-extrabold text-gray-850 block">{mem.name}</span>
                                {mem.role && (
                                  <span className="text-[9px] font-bold text-[#008069] flex items-center gap-0.5">
                                    <Crown className="w-2.5 h-2.5" /> {mem.role}
                                  </span>
                                )}
                              </div>
                            </div>
                            {userAdminMode && mem.name !== userProfile.name && (
                              <button
                                onClick={() => handleToggleMemberRole(mem.name)}
                                className={`text-[9.5px] font-bold px-2 py-1 rounded-lg border transition cursor-pointer ${
                                  isMemAdmin 
                                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                }`}
                              >
                                {isMemAdmin ? 'Remove Admin' : 'Make Admin'}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}

      {/* ----------------- CREATE NEW GROUP MODAL ----------------- */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-sm rounded-3xl p-4 shadow-2xl space-y-3 text-left border border-gray-200"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#008069]" /> Create Community Group
                </h3>
                <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateGroup} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[10.5px] font-bold text-gray-600 mb-1">Group Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurgaon Weekend Hikes ⛰️"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008069] font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold text-gray-600 mb-1">Category Vibe</label>
                  <select
                    value={newGroupCategory}
                    onChange={(e) => setNewGroupCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008069] font-bold"
                  >
                    <option value="General">General</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Gurugram">Gurugram</option>
                    <option value="Food & Coffee">Food & Coffee</option>
                    <option value="Music & Events">Music & Events</option>
                    <option value="Fitness & Hikes">Fitness & Hikes</option>
                    <option value="Books & Study">Books & Study</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold text-gray-600 mb-1">Description</label>
                  <textarea
                    rows={2}
                    placeholder="What is this group chat for?"
                    value={newGroupDesc}
                    onChange={(e) => setNewGroupDesc(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008069]"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#008069] text-white font-black rounded-xl shadow-xs hover:bg-emerald-700"
                  >
                    Create Group
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
        {/* Read Receipts & Message Info Modal */}
        {selectedMessageForReceipts && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[85vh] text-left"
            >
              {/* Modal Header */}
              <div className="bg-[#008069] text-white p-3.5 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCheck className="w-5 h-5 text-cyan-200 stroke-[2.5]" />
                  <div>
                    <h3 className="text-sm font-black leading-tight">Message Read Receipts</h3>
                    <p className="text-[10px] text-emerald-100 font-medium">Group member view receipts</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessageForReceipts(null)}
                  className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Message Bubble Preview */}
              <div className="p-3.5 bg-[#efeae2] border-b border-gray-200">
                <div className="text-[9.5px] font-black text-gray-500 mb-1 uppercase tracking-wider">Message Sent</div>
                <div className="bg-[#d9fdd3] text-gray-900 rounded-2xl rounded-tr-xs p-3 border border-emerald-200 text-xs shadow-xs">
                  {selectedMessageForReceipts.mediaType === 'image' && selectedMessageForReceipts.mediaUrl && (
                    <img src={selectedMessageForReceipts.mediaUrl} alt="Attachment" className="w-full h-32 object-cover rounded-xl mb-2 border border-black/10" referrerPolicy="no-referrer" />
                  )}
                  <p className="font-medium whitespace-pre-wrap leading-relaxed">{selectedMessageForReceipts.text}</p>
                  <div className="flex items-center justify-end gap-1.5 mt-1.5">
                    <span className="text-[9.5px] text-gray-500 font-semibold">{selectedMessageForReceipts.timestamp}</span>
                    {selectedMessageForReceipts.status === 'sent' ? (
                      <Check className="w-3.5 h-3.5 text-gray-400 stroke-[2.5]" />
                    ) : selectedMessageForReceipts.status === 'delivered' ? (
                      <CheckCheck className="w-3.5 h-3.5 text-gray-400 stroke-[2.5]" />
                    ) : (
                      <CheckCheck className="w-3.5 h-3.5 text-coral-500 stroke-[2.5]" />
                    )}
                  </div>
                </div>
              </div>

              {/* Read Receipts Member List */}
              <div className="p-4 overflow-y-auto space-y-4 flex-1">
                {/* Read By Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-gray-800 flex items-center gap-1.5">
                      <CheckCheck className="w-4 h-4 text-coral-500 stroke-[2.5]" /> Read by ({(selectedMessageForReceipts.readBy && selectedMessageForReceipts.readBy.length > 0) ? selectedMessageForReceipts.readBy.length : (activeGroup?.members ? activeGroup.members.length - 1 : 3)})
                    </span>
                    <span className="text-[9.5px] font-bold bg-[#FAF6F0] text-coral-600 px-2 py-0.5 rounded-full border border-[#E8DCCB] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral-500 animate-pulse" /> Read Receipts
                    </span>
                  </div>

                  {(!selectedMessageForReceipts.readBy || selectedMessageForReceipts.readBy.length === 0) && selectedMessageForReceipts.status === 'sent' ? (
                    <div className="text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                      <p className="text-xs text-gray-400 font-bold">Waiting for members to view message...</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {(selectedMessageForReceipts.readBy && selectedMessageForReceipts.readBy.length > 0
                        ? selectedMessageForReceipts.readBy
                        : (activeGroup?.members.filter(m => m.name !== userProfile.name) || []).map(m => ({
                            name: m.name,
                            avatar: m.avatar,
                            role: m.role,
                            readAt: selectedMessageForReceipts.timestamp
                          }))
                      ).map((member, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E8DCCB]">
                          <div className="flex items-center gap-2.5">
                            <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover border border-[#E8DCCB]" referrerPolicy="no-referrer" />
                            <div>
                              <div className="flex items-center gap-1">
                                <span className="text-xs font-bold text-gray-900">{member.name}</span>
                                {member.role && (
                                  <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-black">
                                    {member.role}
                                  </span>
                                )}
                              </div>
                              <span className="text-[9.5px] text-gray-500 font-medium">Read at {member.readAt}</span>
                            </div>
                          </div>
                          <CheckCheck className="w-4 h-4 text-coral-500 stroke-[2.5]" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Delivered To Section */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-gray-700 flex items-center gap-1.5">
                      <CheckCheck className="w-4 h-4 text-gray-400 stroke-[2.5]" /> Delivered to ({activeGroup?.membersCount || 4} members)
                    </span>
                    <span className="text-[9.5px] font-bold text-gray-400">All Devices</span>
                  </div>
                  <p className="text-[10.5px] text-gray-500 leading-relaxed font-medium bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                    Message delivered to all connected devices in <span className="font-bold text-gray-700">{activeGroup?.name}</span>.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
                <button
                  onClick={() => setSelectedMessageForReceipts(null)}
                  className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Close Read Receipts
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
