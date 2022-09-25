import { ObjectId, WithId, Document } from "mongodb";

export default interface Product extends WithId<Document> {
  id: ObjectId;
  name: string;
  code: string;
  price: number;
  quantity: number;
}
