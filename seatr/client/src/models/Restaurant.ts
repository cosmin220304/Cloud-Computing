import MenuItem from "./MenuItem";

interface Restaurant {
  menu: Array<MenuItem>;
  backgroundHref: string;
  description: string;
  logoHref: string;
  name: string;
  distance?: string;
  tags: Array<string>;
  maxSeatCount: number;
  currentAvailableSeats: number;
  rating: number;
  priceRange: number;
}

export default Restaurant;
