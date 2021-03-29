export interface User {
  email: string;
  passHash: string;
  reservationIds: [string];
}

export interface Restaurant {
  name: string;
  menu: [
    {
      name: string;
      price: string;
    }
  ];
  reservationIds: [string];
}

export interface Reservation {
  validFrom: Date;
  validUntil: Date;
  restaurantId: string;
  userId: string;
  numberOfSeats: number;
}
