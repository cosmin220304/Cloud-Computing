import Menu from './Menu';

interface Restaurant {
  menu: Array<Menu>;
  backgroundHref: string;
  description: string;
  logoHref: string;
  name: string;
  distance?: string;
}

export default Restaurant;
