import { Address } from "./Address";
import { Product } from "./Product";
import { ShippingResult } from "./ShippingResult";

export class Shipping {
  id: string;
  collectionAddress: Address;
  deliveryAddress: Address;
  product: Product;
  distance: number;
  createdAt: Date;
  updatedAt: Date;

  faster?: ShippingResult;
  cheaper?: ShippingResult;
}
