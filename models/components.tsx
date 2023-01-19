import { Timestamp } from "firebase/firestore";

export interface CommentType {
  id: string;
  name: string;
  comment: string;
  timePost: Timestamp;
}
