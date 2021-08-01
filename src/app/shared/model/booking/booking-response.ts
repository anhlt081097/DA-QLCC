import {BookingHistoryResponse} from '../booking-history/booking-history-response';

export class BookingResponse {
  id: number;
  fullName: string;
  address: string;
  email: string;
  phone: string;
  description: string;
  userName: number;
  houseName: string;
  id_house: number;
  price: number;
  costsIncurred: number;
  discount: number;
  deposit: boolean;
  dateIn: string;
  dateOut: string;
  creatorName: number;
  createDate: string;
  status: string;
  depositPrice: string;
  identityCard: string;
  bookingHistoryResponses: BookingHistoryResponse[];
}

