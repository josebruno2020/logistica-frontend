import { Address } from "@/models/Address";
import { HttpService } from "./http.service";

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export class PostalCodeService {
  private httpService: HttpService;
  constructor() {
    this.httpService = new HttpService();
  }

  async setAddressByPostalCode(postalCode: string): Promise<Address> {
    try {
      const { body } = await this.httpService.get<ViaCepResponse>({
        baseUrl: "https://viacep.com.br",
        uri: `ws/${postalCode}/json/`,
      });
      const address = Object.assign(new Address(), {
        postalCode,
        city: body.localidade,
        state: body.uf,
        neighborhood: body.bairro,
        street: body.logradouro,
      });

      return address;
    } catch (err: any) {
      alert(`Erro ao buscar o CEP no Via CEP: ${JSON.stringify(err.message)}`);
      return new Address();
    }
  }
}
