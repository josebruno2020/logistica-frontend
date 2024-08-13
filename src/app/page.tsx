"use client";

import AddressForm from "@/components/home/address-form/address-form";
import ProductForm from "@/components/home/product-form/product-form";
import PageTitle from "@/components/shared/page-title/page-title";
import { Address } from "@/models/Address";
import { Product } from "@/models/Product";
import { ShippingService } from "@/services/shipping.service";
import React, { useRef } from "react";

export default function Home() {
  const shippingService = new ShippingService();
  const productFormRef = useRef<{ getProductData: () => Product }>(null);
  const addressFormRef = useRef<{ getAddressData: () => Address }>(null);
  const deliveryAddressFormRef = useRef<{ getAddressData: () => Address }>(
    null
  );

  const validateProduct = (product: Product): boolean => {
    const keys = Object.keys(product);
    return keys.length >= 3;
  };

  const validateAddress = (address: Address): boolean => {
    const addressKeys = Object.keys(address);
    console.log(addressKeys);
    return addressKeys.length >= 6;
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const product = productFormRef.current?.getProductData();
    const collectionAddress = addressFormRef.current?.getAddressData();
    const deliveryAddress = deliveryAddressFormRef.current?.getAddressData();
    console.log({ product, collectionAddress, deliveryAddress });

    if (!product || !collectionAddress || !deliveryAddress) {
      alert("preencha as informações obrigatórias");
      return;
    }

    if (!validateProduct(product)) {
      alert("Preencha todas as informações de produto!");
      return;
    }

    if (!validateAddress(collectionAddress)) {
      alert("Preencha todas as informações do endereço de retirada!");
      return;
    }

    await shippingService.create({
      product,
      collectionAddress,
      deliveryAddress,
    });
  };

  return (
    <main className="flex flex-col items-center justify-between p-10">
      <PageTitle title="Simulador de Frete" />

      <div className="w-100-l">
        <form>
          <ProductForm ref={productFormRef} />
          <AddressForm title="Endereço de Retirada:" ref={addressFormRef} />
          <AddressForm
            title="Endereço de Entrega:"
            ref={deliveryAddressFormRef}
          />

          <button className="submit mt-5" type="submit" onClick={handleSubmit}>
            Salvar
          </button>
        </form>
      </div>
    </main>
  );
}
