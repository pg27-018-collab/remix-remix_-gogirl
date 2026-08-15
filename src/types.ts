/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  name: string;
  phone: string;
  age: number;
  idType: 'Aadhaar' | 'Passport' | 'Driver License';
  idNumber: string;
  isVerified: boolean;
  personality: 'Introvert' | 'Ambivert' | 'Extrovert';
  fridayNight: 'Cozy in' | 'Low-key out' | 'Out out';
  interests: string[];
  schedulePreference?: 'Morning' | 'Night';
  groupSizePreference?: 'Small groups' | 'Big settings';
  planningStyle?: 'Spontaneous' | 'Planned';
  avatar: string;
  trustedContacts: TrustedContact[];
}

export interface TrustedContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

export interface Meetup {
  id: string;
  title: string;
  description: string;
  host: {
    name: string;
    avatar: string;
    personality: string;
    verified: boolean;
  };
  date: string;
  time: string;
  locationName: string;
  area: string;
  category: 'Coffee' | 'Books' | 'Concert' | 'Active' | 'Movies' | 'Art';
  vibe: string;
  maxMembers: number;
  currentMembers: string[]; // List of avatar image paths or names of joined members
  tags: string[];
  chatMessages?: ChatMessage[];
}

export interface ReadReceiptMember {
  name: string;
  avatar: string;
  role?: string;
  readAt: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  timestamp: string;
  isPinned?: boolean;
  pinnedBy?: string;
  pinnedAt?: string;
  status?: 'sent' | 'delivered' | 'read';
  readBy?: ReadReceiptMember[];
  deliveredTo?: ReadReceiptMember[];
}

export interface SafePlace {
  id: string;
  name: string;
  type: 'Café' | 'Restaurant' | 'Bookstore' | 'Workspace' | 'Park' | 'Fitness';
  description: string;
  address: string;
  area: string;
  safetyRating: number;
  safetyFeatures: string[];
  discount: string;
  imageUrl: string;
  galleryImages?: string[];
  offersFreeDrink: boolean;
  allFemaleStaff: boolean;
}

export interface IcebreakerCard {
  id: string;
  question: string;
  category: 'fun' | 'meaningful' | 'random' | 'would-you-rather';
  answers?: string[];
  quickPollOptions?: { label: string; votes: number }[];
  sparkTip?: string;
}

export interface CheckInState {
  isActive: boolean;
  durationMs: number;
  elapsedMs: number;
  purpose: string;
  emergencyTriggered: boolean;
}

export interface CustomPhoto {
  id: string;
  dataUrl: string;
  timestamp: string;
  filter: string;
  frame: string;
}
