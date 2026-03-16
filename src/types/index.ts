export interface Project {
  id: number;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  city: {
    ar: string;
    en: string;
  };
  gallery: string[];
  sold_percentage: number;
  units_count: number;
  rooms: number;
  area: number;
  price_from: number;
}
