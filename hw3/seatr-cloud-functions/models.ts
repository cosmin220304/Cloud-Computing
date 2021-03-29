export interface User {
  id: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  code: string;
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
