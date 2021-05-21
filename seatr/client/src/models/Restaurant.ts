import Menu from './Menu';

interface Restaurant {
  menu: Array<Menu>;
  backgroundHref: string;
  description: string;
  logoHref: string;
  name: string;
  distance?: string;
  // tags?: Array<string>,
  // maxSeatCount: number,
  // currentSeats: number,
}

export default Restaurant;
