import { StaticImageData } from 'next/image';

export interface PreviousEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  attendees: string;
  imageUrl: StaticImageData;
  category: string;
}

export interface UpcomingEvent {
  id: number;
  name: string;
  date: string;
}