import { ObjectId, WithId, Document } from "mongodb";
import Change from "./Change";

export default interface Money extends WithId<Document> {
  id?: ObjectId;
  change: Change;
  totalChange: number;
  buyingChange: Change;
  buyingTotalChange: number;
}
