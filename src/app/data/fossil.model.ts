export interface FossilLocation {
  id: string;
  name: string;
  species: string;
  era: string;
  period: string;          // e.g. "Cretaceous"
  yearDiscovered: number;
  description: string;
  funFact: string;
  lat: number;
  lng: number;
  discovered: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'chroma';
  imageUrl?: string;
}
