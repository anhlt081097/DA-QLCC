import {BookingResponse} from "../booking/booking-response";

export class TransactionResponse {
  id: number;
  dateRelease: string;
  totalPrice: number;
  creatorName: string;
  bookingResponse: BookingResponse;
  }
