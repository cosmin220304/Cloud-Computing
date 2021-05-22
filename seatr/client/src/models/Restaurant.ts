import MenuItem from "./MenuItem";

interface Restaurant {
  menu: Array<MenuItem>;
  backgroundHref: string;
  description: string;
  logoHref: string;
  name: string;
  distance?: string;
  tags?: Array<string>;
  maxSeatCount: number;
  currentSeats: number;
}

export default Restaurant;
