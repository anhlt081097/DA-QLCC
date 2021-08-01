import {FeedBackResponse} from "../feed-back/feed-back-response";


export class HouseResponse {
  id: number;
  houseName: string;
  id_house: number;
  amountRoom: number;
  price: number;
  size: number;
  capacity: number;
  image: string;
  description: string;
  status: boolean;
  id_homeStay: number;
  star: number;
  scores: number;
  feedbackResponses: FeedBackResponse[];
}
