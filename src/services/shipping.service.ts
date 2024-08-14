import { Address } from "@/models/Address";
import { Product } from "@/models/Product";
import { Shipping } from "@/models/Shipping";
import { ShippingResult } from "@/models/ShippingResult";
import { HttpService } from "./http.service";

export interface ShippingCreateProps {
  product: Product;
  collectionAddress: Address;
  deliveryAddress: Address;
}

export class ShippingCreateResponse {
  shipping: Shipping;
  cheaper: ShippingResult;
  faster: ShippingResult;
}

export class ShippingService {
  private httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  async create({
    product,
    collectionAddress,
    deliveryAddress,
  }: ShippingCreateProps): Promise<ShippingCreateResponse> {
    try {
      const { body } = await this.httpService.post<ShippingCreateResponse>({
        uri: "shippings",
        body: { product, collectionAddress, deliveryAddress },
      });

      return body;
    } catch (err: any) {
      alert(`Nao foi possivel simular o frete: ${err.message}`);
      throw err;
    }
  }

  async list(): Promise<ShippingCreateResponse[]> {
    const { body } = await this.httpService.get<ShippingCreateResponse[]>({
      uri: "shippings/lasts",
      headers: {
        "Content-type": "application/json",
      },
    });

    return body;
  }
}
