import MenuItem from "./MenuItem";

interface Restaurant {
  menu: Array<MenuItem>;
  backgroundHref: string;
  description: string;
  logoHref: string;
  name: string;
  distance?: string;
}

export default Restaurant;
