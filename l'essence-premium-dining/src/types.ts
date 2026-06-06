/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'signature' | 'appetizer' | 'main' | 'dessert' | 'wine';
  price: number;
  isSignature?: boolean;
  image: string;
  winePairing?: string;
  ingredients: string[];
}

export type DiningZone = 'main-hall' | 'glasshouse-garden' | 'chefs-vault';

export interface DiningZoneInfo {
  id: DiningZone;
  name: string;
  description: string;
  capacityText: string;
  depositText: string;
  ambiance: string;
}

export interface Reservation {
  id: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  zone: DiningZone;
  specialRequests: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
}
