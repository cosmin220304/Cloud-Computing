export interface User {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  code: number;
  codeCreationDate: Date;
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
