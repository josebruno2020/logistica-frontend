import { Address } from "@/models/Address";
import { Product } from "@/models/Product";
import { HttpService } from "./http.service";

export interface ShippingCreateProps {
  product: Product;
  collectionAddress: Address;
  deliveryAddress: Address;
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
  }: ShippingCreateProps): Promise<void> {
    try {
      const { body } = await this.httpService.post({
        uri: "shippings",
        body: { product, collectionAddress, deliveryAddress },
      });

      console.log(body);
      alert("Frete simulado com sucesso");
    } catch (err: any) {
      alert(`Nao foi possivel simular o frete: ${err.message}`);
      console.log(err);
    }
  }
}
