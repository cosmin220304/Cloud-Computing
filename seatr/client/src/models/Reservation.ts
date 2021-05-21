interface Reservation {
  _id: string;
  userPhone: string;
  restaurantName: string;
  seatCount: number;
  reservationDate: Date;
  status: "PENDING" | "ACCEPTED" | "DECLINE" | string;
}

export default Reservation;
