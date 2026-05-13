export type OfferStatus = "pending" | "accepted" | "declined";

export interface Offer {
  id: string;
  gigId: string;
  submittedById: string;
  listerId: string;
  price: number;
  message?: string;
  status: OfferStatus;
  createdAt: string;
}
